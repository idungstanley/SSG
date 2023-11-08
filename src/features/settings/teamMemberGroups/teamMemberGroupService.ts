import { ITeamMemberGroupsReq } from './teamMemberGroups.interfaces';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { ITeamMembersAndGroupsReq } from '../teamMembersAndGroups.interfaces';

// Get team member groups
export const useGetTeamMemberGroups = (page: number, notFetch?: boolean) => {
  const queryClient = useQueryClient();
  const enabled = notFetch ? notFetch : true;

  return useQuery<ITeamMembersAndGroupsReq>(
    ['team_member_groups', { page }],
    async () => {
      const url = 'settings/team-member-groups';

      return requestNew({
        url,
        method: 'GET',
        params: {
          page
        }
      });
    },
    {
      enabled,
      onSuccess: (data) => {
        data.data.team_member_groups?.map((teamMemberGroup) =>
          queryClient.setQueryData(['team_member_group', teamMemberGroup.id], teamMemberGroup)
        );
      }
    }
  );
};

// Get team member group
export const useGetTeamMemberGroup = (teamMemberGroupId?: string) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['team_member_group', teamMemberGroupId],
    async () => {
      const data = await requestNew<ITeamMemberGroupsReq>({
        url: `settings/team-member-groups/${teamMemberGroupId}`,
        method: 'GET'
      });
      return data.data.team_member_group;
    },
    {
      initialData: queryClient.getQueryData(['team_member_group', teamMemberGroupId]),
      enabled: !!teamMemberGroupId
    }
  );
};

// Create team member group
export const createTeamMemberGroupService = async (data: { name: string }) => {
  const response = requestNew({
    url: 'settings/team-member-groups',
    method: 'POST',
    data: {
      name: data.name
    }
  });
  return response;
};

// Update team member group service
export const updateTeamMemberGroupService = async (data: { name: string; teamMemberGroupId?: string }) => {
  const response = requestNew({
    url: `settings/team-member-groups/${data.teamMemberGroupId}`,
    method: 'PUT',
    data: {
      name: data.name
    }
  });
  return response;
};

// Delete team member group service
export const deleteTeamMemberGroupService = async (data: { teamMemberGroupId?: string }) => {
  const response = requestNew({
    url: `settings/team-member-groups/${data.teamMemberGroupId}`,
    method: 'DELETE'
  });
  return response;
};

// Remove team member from group service
export const removeTeamMemberFromGroupService = async (data: { teamMemberGroupId: string; teamMemberId: string }) => {
  const response = requestNew({
    url: `settings/team-member-groups/${data.teamMemberGroupId}/remove-team-member/${data.teamMemberId}`,
    method: 'POST'
  });
  return response;
};

// Add team member to group service
export const addTeamMemberToGroupService = async (data: { teamMemberGroupId?: string; teamMemberId: string }) => {
  const response = requestNew({
    url: `settings/team-member-groups/${data.teamMemberGroupId}/add-team-member/${data.teamMemberId}`,
    method: 'POST'
  });
  return response;
};
