import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';

// Get permissions list
export const useGetPermissionsList = () => useQuery(
  ['workspace_permissions_list'],
  async () => {
    const url = 'settings/permissions';

    const data = await requestNew({
      url,
      method: 'GET',
    }, true);

    return data.data.permissions;
  },
);

// Get permissions values
export const useGetPermissionsValues = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['workspace_permissions_values'],
    async () => {
      const url = 'settings/permissions/roles';

      const data = await requestNew({
        url,
        method: 'GET',
      }, true);

      return data.data.values;
    },
    {
      onSuccess: (successData) => {
        successData.map((permissionValue) => queryClient.setQueryData(['workspace_permission_value', {
          teamMemberRoleKey: permissionValue.team_member_role_key,
          workspacePermissionKey: permissionValue.permission_key,
        }], permissionValue));
      },
    },
  );
};

// Get individual permission value
export const useGetPermissionValue = (teamMemberRoleKey, workspacePermissionKey) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['workspace_permission_value', {
      teamMemberRoleKey,
      workspacePermissionKey,
    }],
    () => queryClient.getQueryData(['workspace_permission_value', {
      teamMemberRoleKey,
      workspacePermissionKey,
    }]),
    {
      initialData: () => queryClient.getQueryData(['workspace_permission_value', {
        teamMemberRoleKey,
        workspacePermissionKey,
      }]),
    },
  );
};

// Change role permission service
export const changeRolePermissionService = async (data) => {
  const response = requestNew({
    url: 'settings/permissions/change-role-permission',
    method: 'POST',
    params: {
      team_member_role_key: data.teamMemberRoleKey,
      workspace_permission_key: data.workspacePermissionKey,
      permission_allowed: data.isPermissionAllowed,
    },
  }, true);
  return response;
};
