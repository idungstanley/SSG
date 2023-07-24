import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { IUser } from '../../auth/authSlice';
import { ITeamMemberInviteRes, ITeamMemberInvitesReq } from './teamMemberInvites.interface';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { SetTriggerGetTeammeberInvite } from './teamMemberInviteSlice';

type SortOption = {
  [key: string]: string | 'asc' | 'desc';
};

type SortingParams = SortOption[];
export const useGetTeamMemberInvites = (page: number) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { sortTeamInviteArr } = useAppSelector((state) => state.teamMemberInvite);
  const sortArrUpdate: SortingParams = sortTeamInviteArr.length <= 0 ? [] : sortTeamInviteArr;

  const serializedParams = sortArrUpdate
    .map((sortField, index) =>
      Object.keys(sortField)
        .map((key) => `sorting[${index}][${encodeURIComponent(key)}]=${encodeURIComponent(sortField[key])}`)
        .join('&')
    )
    .join('&');

  return useQuery<ITeamMemberInvitesReq>(
    ['team_member_invites', { page, sortTeamInviteArr }],
    async () => {
      const url = `settings/team-member-invites?${serializedParams}`;
      return requestNew({
        url,
        method: 'GET',
        params: {
          page
        }
      });
    },
    {
      onSuccess: (data) => {
        data.data.team_member_invites.map((teamMemberInvite) =>
          queryClient.setQueryData(['team_member_invite', teamMemberInvite.id], teamMemberInvite)
        );
        dispatch(SetTriggerGetTeammeberInvite(false));
      }
    }
  );
};

// Get team member invite
export const useGetTeamMemberInvite = (teamMemberInviteId: string) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['team_member_invite', teamMemberInviteId],
    async () => {
      const data = await requestNew<ITeamMemberInviteRes>({
        url: `settings/team-member-invites/${teamMemberInviteId}`,
        method: 'GET'
      });
      return data.data.team_member_invite;
    },
    {
      initialData: queryClient.getQueryData(['team_member_invite', teamMemberInviteId]),
      enabled: teamMemberInviteId != null
    }
  );
};

//Accept team member invite
export const useAcceptTeamMemberInvite = ({ invite }: { invite: string | undefined }) => {
  const data = requestNew<{ data: { user: IUser } }>({
    url: `workspace/accept-invite/${invite}`,
    method: 'POST'
  });
  return data;
};

// Delete team member invite
export const deleteTeamMemberInviteService = async (data: { teamMemberId: string }) => {
  const response = requestNew({
    url: `/settings/team-member-invites/${data.teamMemberId}`,
    method: 'DELETE'
  });
  return response;
};

export function useDeleteTeamMemberInvite(teamMemberId: string) {
  const queryClient = useQueryClient();

  return useMutation(() => deleteTeamMemberInviteService({ teamMemberId }), {
    onSuccess: () => {
      // Invalida all pages of team member invites
      queryClient.invalidateQueries(['team_member_invites']);
    }
  });
}

// Resend team member invite
export const resendTeamMemberInviteService = async (data: { teamMemberId: string }) => {
  const response = requestNew({
    url: `/settings/team-member-invites/${data.teamMemberId}/resend`,
    method: 'POST'
  });
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
  const response = requestNew({
    url: 'settings/team-member-invites',
    method: 'POST',
    data: {
      email: data.email,
      name: data.name,
      team_member_role_key: data.teamMemberRoleKey
    }
  });
  return response;
};
