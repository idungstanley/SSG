import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { ITeamMemberInvitesReq } from './teamMemberInvites.interface';

const inviteCode: string = JSON.parse(
  localStorage.getItem('teamMemberInviteCode') as string
);

// Get team member invites
export const useGetTeamMemberInvites = (page: number) => {
  const queryClient = useQueryClient();

  return useQuery<ITeamMemberInvitesReq>(
    ['team_member_invites', { page }],
    async () => {
      const url = 'settings/team-member-invites';

      return requestNew(
        {
          url,
          method: 'GET',
          params: {
            page,
          },
        },
        true
      );
    },
    {
      onSuccess: (data) => {
        data.data.team_member_invites.map((teamMemberInvite) =>
          queryClient.setQueryData(
            ['team_member_invite', teamMemberInvite.id],
            teamMemberInvite
          )
        );
      },
    }
  );
};

// Get team member invite
export const useGetTeamMemberInvite = (teamMemberInviteId: string) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['team_member_invite', teamMemberInviteId],
    async () => {
      const data = await requestNew(
        {
          url: `settings/team-member-invites/${teamMemberInviteId}`,
          method: 'GET',
        },
        true
      );
      return data.data.team_member_invite;
    },
    {
      initialData: queryClient.getQueryData([
        'team_member_invite',
        teamMemberInviteId,
      ]),
      enabled: teamMemberInviteId != null,
    }
  );
};

//Accept team member invite
export const useAcceptTeamMemberInvite = (acceptInviteTrigger: boolean) => {
  return useQuery(
    ['team_member_invite', inviteCode],
    async () => {
      const data = await requestNew(
        {
          url: `workspace/accept-invite/${inviteCode}`,
          method: 'POST',
        },
        true
      );
      return data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem('user', JSON.stringify(data?.data.user));
        localStorage.setItem(
          'currentWorkspaceId',
          JSON.stringify(data?.data.user.default_workspace_id)
        );
      },
      enabled: acceptInviteTrigger == true && inviteCode != null,
    }
  );
};

// Delete team member invite
export const deleteTeamMemberInviteService = async (data: {
  teamMemberId: string;
}) => {
  const response = requestNew(
    {
      url: `/settings/team-member-invites/${data.teamMemberId}`,
      method: 'DELETE',
    },
    true
  );
  return response;
};

export function useDeleteTeamMemberInvite(teamMemberId: string) {
  const queryClient = useQueryClient();

  return useMutation(() => deleteTeamMemberInviteService({ teamMemberId }), {
    onSuccess: () => {
      // Invalida all pages of team member invites
      queryClient.invalidateQueries(['team_member_invites']);
    },
  });
}

// Resend team member invite
export const resendTeamMemberInviteService = async (data: {
  teamMemberId: string;
}) => {
  const response = requestNew(
    {
      url: `/settings/team-member-invites/${data.teamMemberId}/resend`,
      method: 'POST',
    },
    true
  );
  return response;
};

export function useResendTeamMemberInvite(teamMemberId: string) {
  return useMutation(() => resendTeamMemberInviteService({ teamMemberId }));
}

// Create team member invite
export const createTeamMemberInviteService = async (data: {
  email: string;
  teamMemberRoleKey: string;
  name: string;
}) => {
  const response = requestNew(
    {
      url: 'settings/team-member-invites',
      method: 'POST',
      params: {
        email: data.email,
        name: data.name,
        team_member_role_key: data.teamMemberRoleKey,
      },
    },
    true
  );
  return response;
};
