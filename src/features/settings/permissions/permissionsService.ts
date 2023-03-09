import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { IPermission, IPermissionFromList, IPermissionsReq } from './permissions.interfaces';

// Get permissions list
export const useGetPermissionsList = () =>
  useQuery(
    ['workspace_permissions_list'],
    async () => {
      const url = 'settings/permissions';

      const data = await requestNew<{ data: { permissions: IPermissionFromList[] } }>(
        {
          url,
          method: 'GET'
        },
        true
      );

      return data;
    },
    { select: (res) => res }
  );

// Get permissions values
export const useGetPermissionsValues = () => {
  const queryClient = useQueryClient();

  return useQuery<IPermission[]>(
    ['workspace_permissions_values'],
    async () => {
      const url = 'settings/permissions/roles';

      const data = await requestNew<IPermissionsReq>(
        {
          url,
          method: 'GET'
        },
        true
      );

      return data.data.values;
    },
    {
      onSuccess: (successData) => {
        successData.map((permissionValue) =>
          queryClient.setQueryData(
            [
              'workspace_permission_value',
              {
                teamMemberRoleKey: permissionValue.team_member_role_key,
                workspacePermissionKey: permissionValue.permission_key
              }
            ],
            permissionValue
          )
        );
      }
    }
  );
};

// Get individual permission value
export const useGetPermissionValue = (teamMemberRoleKey: string, workspacePermissionKey: string) => {
  const queryClient = useQueryClient();

  return useQuery<IPermission | undefined>(
    [
      'workspace_permission_value',
      {
        teamMemberRoleKey,
        workspacePermissionKey
      }
    ],
    () =>
      queryClient.getQueryData([
        'workspace_permission_value',
        {
          teamMemberRoleKey,
          workspacePermissionKey
        }
      ]),
    {
      initialData: () =>
        queryClient.getQueryData([
          'workspace_permission_value',
          {
            teamMemberRoleKey,
            workspacePermissionKey
          }
        ])
    }
  );
};

// Change role permission service
export const changeRolePermissionService = (data: {
  teamMemberRoleKey: string;
  workspacePermissionKey: string;
  isPermissionAllowed: number;
}) => {
  const response = requestNew<{ data: { updated_permissions: IPermission[] } }>(
    {
      url: 'settings/permissions/change-role-permission',
      method: 'POST',
      params: {
        team_member_role_key: data.teamMemberRoleKey,
        workspace_permission_key: data.workspacePermissionKey,
        permission_allowed: data.isPermissionAllowed
      }
    },
    true
  );
  return response;
};
