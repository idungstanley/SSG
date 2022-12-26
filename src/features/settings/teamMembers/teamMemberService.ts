import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { ITeamMembersAndGroupsReq } from '../teamMembersAndGroups.interfaces';

// Get team members
export const useGetTeamMembers = (data: { page: number; query: string }) => {
  const queryClient = useQueryClient();

  return useQuery<ITeamMembersAndGroupsReq>(
    ['team_members', { page: data.page, query: data.query }],
    async () => {
      const url = 'settings/team-members';

      return requestNew(
        {
          url,
          method: 'GET',
          params: {
            page: data.page,
            search: data.query,
          },
        },
        true
      );
    },
    {
      onSuccess: (successData) => {
        successData.data.team_members?.map((teamMember) =>
          queryClient.setQueryData(['team_member', teamMember.id], teamMember)
        );
      },
    }
  );
};

// Get team member
export const useGetTeamMember = (teamMemberId: string) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['team_member', teamMemberId],
    async () => {
      const data = await requestNew(
        {
          url: `settings/team-members/${teamMemberId}`,
          method: 'GET',
        },
        true
      );
      return data.data.team_member;
    },
    {
      initialData: queryClient.getQueryData(['team_member', teamMemberId]),
      enabled: teamMemberId != null,
    }
  );
};

// Deactivate team member service
export const deactivateTeamMemberService = async (data: {
  teamMemberId: string;
}) => {
  const response = requestNew(
    {
      url: `/settings/team-members/${data.teamMemberId}/deactivate`,
      method: 'POST',
    },
    true
  );
  return response;
};

export function useDeactivateTeamMember(teamMemberId: string) {
  const queryClient = useQueryClient();

  return useMutation(() => deactivateTeamMemberService({ teamMemberId }), {
    onSuccess: (successData) => {
      queryClient.setQueryData(
        ['team_member', teamMemberId],
        successData.data.team_member
      );
    },
  });
}

// Reactivate team member service
export const reactivateTeamMemberService = async (data: {
  teamMemberId: string;
}) => {
  const response = requestNew(
    {
      url: `/settings/team-members/${data.teamMemberId}/reactivate`,
      method: 'POST',
    },
    true
  );
  return response;
};

export function useReactivateTeamMember(teamMemberId: string) {
  const queryClient = useQueryClient();

  return useMutation(() => reactivateTeamMemberService({ teamMemberId }), {
    onSuccess: (successData) => {
      queryClient.setQueryData(
        ['team_member', teamMemberId],
        successData.data.team_member
      );
    },
  });
}

// Remove team member
export const removeTeamMemberService = async (data: {
  teamMemberId: string;
}) => {
  const response = requestNew(
    {
      url: `/settings/team-members/${data.teamMemberId}/remove`,
      method: 'POST',
    },
    true
  );
  return response;
};

export function useRemoveTeamMember(teamMemberId: string) {
  const queryClient = useQueryClient();

  return useMutation(() => removeTeamMemberService({ teamMemberId }), {
    onSuccess: () => {
      // Invalidate all pages of team_members
      queryClient.invalidateQueries(['team_members']);
    },
  });
}
