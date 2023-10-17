import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { ITeamMember, RoleRes } from '../../workspace/teamMembers.intrfaces';
import { ITeamMembersAndGroupsReq } from '../teamMembersAndGroups.interfaces';

// Get team members
export const useGetTeamMembers = (data: { page: number; query: string; isEnabled?: boolean }) => {
  const queryClient = useQueryClient();
  const enabled = data.isEnabled ? data.isEnabled : true;

  return useQuery<ITeamMembersAndGroupsReq>(
    ['team_members', { page: data.page, query: data.query }],
    async () => {
      const url = 'settings/team-members';

      return requestNew({
        url,
        method: 'GET',
        params: {
          page: data.page,
          search: data.query
        }
      });
    },
    {
      enabled,
      onSuccess: (successData) => {
        successData.data.team_members?.map((teamMember) =>
          queryClient.setQueryData(['team_member', teamMember.id], teamMember)
        );
      }
    }
  );
};

// Get team member
export const useGetTeamMember = (teamMemberId: string) => {
  const queryClient = useQueryClient();

  return useQuery<ITeamMember>(
    ['team_member', teamMemberId],
    async () => {
      const data = await requestNew<{ data: { team_member: ITeamMember } }>({
        url: `settings/team-members/${teamMemberId}`,
        method: 'GET'
      });
      return data.data.team_member;
    },
    {
      initialData: queryClient.getQueryData(['team_member', teamMemberId]),
      enabled: teamMemberId != null
    }
  );
};

//Change Team Member Role
export const useChangeRole = ({ teamMember, role }: { teamMember: string; role: string }) => {
  const data = requestNew<{ data: RoleRes }>({
    url: `settings/team-members/${teamMember}/change-role`,
    method: 'POST',
    data: {
      team_member_role_key: role
    }
  });
  return data;
};

// Deactivate team member service
export const changeTeamMemberRole = async (data: { teamMemberId: string }) => {
  const response = requestNew<{ data: { team_member: ITeamMember } }>({
    url: `/settings/team-members/${data.teamMemberId}/change-role`,
    method: 'POST',
    data: {
      role: 'high'
    }
  });
  return response;
};

export function useChangeTeamMeberRole(teamMemberId: string) {
  const queryClient = useQueryClient();

  return useMutation(() => changeTeamMemberRole({ teamMemberId }), {
    onSuccess: (successData) => {
      queryClient.setQueryData(['team_member', teamMemberId], successData.data.team_member);
    }
  });
}

// Deactivate team member service
export const deactivateTeamMemberService = async (data: { teamMemberId: string }) => {
  const response = requestNew<{ data: { team_member: ITeamMember } }>({
    url: `/settings/team-members/${data.teamMemberId}?status=disabled`,
    method: 'DELETE'
  });
  return response;
};

export function useDeactivateTeamMember(teamMemberId: string) {
  const queryClient = useQueryClient();

  return useMutation(() => deactivateTeamMemberService({ teamMemberId }), {
    onSuccess: (successData) => {
      queryClient.setQueryData(['team_member', teamMemberId], successData.data.team_member);
    }
  });
}

// Reactivate team member service
export const reactivateTeamMemberService = async (data: { teamMemberId: string }) => {
  const response = requestNew<{ data: { team_member: ITeamMember } }>({
    url: `/settings/team-members/${data.teamMemberId}/reactivate`,
    method: 'POST'
  });
  return response;
};

export function useReactivateTeamMember(teamMemberId: string) {
  const queryClient = useQueryClient();

  return useMutation(() => reactivateTeamMemberService({ teamMemberId }), {
    onSuccess: (successData) => {
      queryClient.setQueryData(['team_member', teamMemberId], successData.data.team_member);
    }
  });
}

// Remove team member
export const removeTeamMemberService = async (data: { teamMemberId: string }) => {
  const response = requestNew({
    url: `/settings/team-members/${data.teamMemberId}`,
    method: 'DELETE'
  });
  return response;
};

export function useRemoveTeamMember(teamMemberId: string) {
  const queryClient = useQueryClient();

  return useMutation(() => removeTeamMemberService({ teamMemberId }), {
    onSuccess: () => {
      // Invalidate all pages of team_members
      queryClient.invalidateQueries(['team_members']);
    }
  });
}
