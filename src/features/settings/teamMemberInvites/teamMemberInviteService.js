import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';

// Get team member invites
export const useGetTeamMemberInvites = (page) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['team_member_invites', { page }],
    async () => {
      const url = 'settings/team-member-invites';

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
        data.data.team_member_invites.map((teamMemberInvite) => queryClient.setQueryData(['team_member_invite', teamMemberInvite.id], teamMemberInvite));
      },
    },
  );
};

// Get team member invite
export const useGetTeamMemberInvite = (teamMemberInviteId) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['team_member_invite', teamMemberInviteId],
    async () => {
      const data = await requestNew({
        url: `settings/team-member-invites/${teamMemberInviteId}`,
        method: 'GET',
      });
      return data.data.team_member_invite;
    },
    {
      initialData: queryClient.getQueryData(['team_member_invite', teamMemberInviteId]),
      enabled: teamMemberInviteId != null,
    },
  );
};

// Delete team member invite
export const deleteTeamMemberInviteService = async (data) => {
  const response = requestNew({
    url: `/settings/team-member-invites/${data.teamMemberId}`,
    method: 'DELETE',
  });
  return response;
};

export function useDeleteTeamMemberInvite(teamMemberId) {
  const queryClient = useQueryClient();

  return useMutation(() => deleteTeamMemberInviteService({ teamMemberId }), {
    onSuccess: () => {
      // Invalida all pages of team member invites
      queryClient.invalidateQueries(['team_member_invites']);
    },
  });
}

// Resend team member invite
export const resendTeamMemberInviteService = async (data) => {
  const response = requestNew({
    url: `/settings/team-member-invites/${data.teamMemberId}/resend`,
    method: 'POST',
  });
  return response;
};

export function useResendTeamMemberInvite(teamMemberId) {
  return useMutation(() => resendTeamMemberInviteService({ teamMemberId }));
}

// Create team member invite
export const createTeamMemberInviteService = async (data) => {
  const response = requestNew({
    url: 'settings/team-member-invites',
    method: 'POST',
    params: {
      email: data.email,
      team_member_role_key: data.teamMemberRoleKey,
    },
  });
  return response;
};
