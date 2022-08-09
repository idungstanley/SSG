import { mainApi } from '../../api';

const teamMemberApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeamMembers: builder.query({
      query: (data) => ({
        url: `/settings/team-members?page=${data.page}&search=${data.search}`,
      }),
      providesTags: (result) => (result ? [...result.data.team_members.map(({ id }) => ({ type: 'TeamMembers', id })), { type: 'TeamMembers', id: 'LIST' }] : [{ type: 'TeamMembers', id: 'LIST' }]),
    }),
    deactivateTeamMember: builder.mutation({
      query: (data) => ({
        url: `/settings/team-members/${data.teamMemberId}/deactivate`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => {
        console.log(result);
        console.log(error);
        return [{ type: 'TeamMembers', id: arg.teamMemberId }];
      },
    }),
    reactivateTeamMember: builder.mutation({
      query: (data) => ({
        url: `/settings/team-members/${data.teamMemberId}/reactivate`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => {
        console.log(result);
        console.log(error);
        return [{ type: 'TeamMembers', id: arg.teamMemberId }];
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTeamMembersQuery,
  useDeactivateTeamMemberMutation,
  useReactivateTeamMemberMutation,
} = teamMemberApi;
export default teamMemberApi;
