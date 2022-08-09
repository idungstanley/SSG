import { mainApi } from '../../api';

const teamMemberInviteApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeamMemberInvites: builder.query({
      query: (data) => ({
        url: `/settings/team-member-invites?page=${data.page}`,
      }),
      providesTags: (result) => (result ? [...result.data.team_member_invites.map(({ id }) => ({ type: 'TeamMemberInvites', id })), { type: 'TeamMemberInvites', id: 'LIST' }] : [{ type: 'TeamMemberInvites', id: 'LIST' }]),
    }),
    inviteTeamMember: builder.mutation({
      query: (data) => ({
        url: '/settings/team-member-invites',
        method: 'POST',
        body: {
          email: data.email,
          team_member_role_key: data.teamMemberRoleKey,
        },
      }),
      invalidatesTags: (result, error) => {
        console.log(result);
        console.log(error);

        if (!error) {
          return [{ type: 'TeamMemberInvites', id: 'LIST' }];
        }

        return null;
      },
    }),
    resendInvite: builder.mutation({
      query: (data) => ({
        url: `/settings/team-member-invites/${data.id}/resend`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => {
        console.log(result);
        console.log(error);

        if (!error) {
          return [{ type: 'TeamMemberInvites', id: arg.id }];
        }

        return null;
      },
    }),
    deleteInvite: builder.mutation({
      query: (data) => ({
        url: `/settings/team-member-invites/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => {
        console.log(result);
        console.log(error);

        if (!error) {
          return [{ type: 'TeamMemberInvites', id: arg.id }];
        }

        return null;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTeamMemberInvitesQuery,
  useInviteTeamMemberMutation,
  useResendInviteMutation,
  useDeleteInviteMutation,
} = teamMemberInviteApi;
export default teamMemberInviteApi;
