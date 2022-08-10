import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';

// Get team member groups
export const useGetTeamMemberGroups = (page) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['team_member_groups', { page }],
    async () => {
      const url = 'settings/team-member-groups';

      return requestNew({
        url,
        method: 'GET',
        params: {
          page,
        },
      });
    },
    {
      onSuccess: (data) => {
        data.data.team_member_groups.map((teamMemberGroup) => queryClient.setQueryData(['team_member_group', teamMemberGroup.id], teamMemberGroup));
      },
    },
  );
};

// Get team member group
export const useGetTeamMemberGroup = (teamMemberGroupId) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['team_member_group', teamMemberGroupId],
    async () => {
      const data = await requestNew({
        url: `settings/team-member-groups/${teamMemberGroupId}`,
        method: 'GET',
      });
      return data.data.team_member_group;
    },
    {
      initialData: queryClient.getQueryData(['team_member_group', teamMemberGroupId]),
      enabled: teamMemberGroupId != null,
    },
  );
};

// Create team member group
export const createTeamMemberGroupService = async (data) => {
  const response = requestNew({
    url: 'settings/team-member-groups',
    method: 'POST',
    params: {
      name: data.name,
    },
  });
  return response;
};

// Update team member group service
export const updateTeamMemberGroupService = async (data) => {
  const response = requestNew({
    url: `settings/team-member-groups/${data.teamMemberGroupId}`,
    method: 'PUT',
    params: {
      name: data.name,
    },
  });
  return response;
};

// Delete team member group service
export const deleteTeamMemberGroupService = async (data) => {
  const response = requestNew({
    url: `settings/team-member-groups/${data.teamMemberGroupId}`,
    method: 'DELETE',
  });
  return response;
};

// Remove team member from group service
export const removeTeamMemberFromGroupService = async (data) => {
  const response = requestNew({
    url: `settings/team-member-groups/${data.teamMemberGroupId}/remove-team-member/${data.teamMemberId}`,
    method: 'POST',
  });
  return response;
};

// Add team member to group service
export const addTeamMemberToGroupService = async (data) => {
  const response = requestNew({
    url: `settings/team-member-groups/${data.teamMemberGroupId}/add-team-member/${data.teamMemberId}`,
    method: 'POST',
  });
  return response;
};
