import { mainApi } from '../../api';

const teamMemberGroupApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createTeamMemberGroup: builder.mutation({
      query: (data) => ({
        url: '/settings/team-member-groups',
        method: 'POST',
        body: {
          name: data.name,
        },
      }),
      invalidatesTags: (result, error) => {
        console.log(result);
        console.log(error);

        if (!error) {
          return [{ type: 'TeamMemberGroups', id: 'LIST' }];
        }

        return null;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useCreateTeamMemberGroupMutation } = teamMemberGroupApi;
export default teamMemberGroupApi;
