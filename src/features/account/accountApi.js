import { mainApi } from '../api';

const accountApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyWorkspaces: builder.query({
      query: () => ({
        url: '/auth/account/workspaces',
      }),
      providesTags: (result) => (result ? [...result.data.workspaces.map(({ id }) => ({ type: 'MyWorkspaces', id })), { type: 'MyWorkspaces', id: 'LIST' }] : [{ type: 'MyWorkspaces', id: 'LIST' }]),
    }),
    switchWorkspace: builder.mutation({
      query: (data) => ({
        url: `auth/account/workspaces/${data.workspaceId}/switch`,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyWorkspacesQuery,
  useSwitchWorkspaceMutation,
} = accountApi;
export default accountApi;
