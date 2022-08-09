import { mainApi } from '../../api';

const permissionsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query({
      query: () => ({
        url: '/settings/permissions',
      }),
    }),
    getPermissionValues: builder.query({
      query: () => ({
        url: '/settings/permissions/roles',
      }),
    }),
    changeRolePermission: builder.mutation({
      query: (data) => ({
        url: '/settings/permissions/change-role-permission',
        method: 'POST',
        body: {
          team_member_role_key: data.teamMemberRoleKey,
          workspace_permission_key: data.workspacePermissionKey,
          permission_allowed: data.isPermissionAllowed,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPermissionsQuery,
  useGetPermissionValuesQuery,
  useChangeRolePermissionMutation,
} = permissionsApi;
export default permissionsApi;
