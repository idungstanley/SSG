import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  changeRolePermissionService,
  useGetPermissionValue,
  useGetPermissionsList,
} from '../../../../features/settings/permissions/permissionsService';
import { Checkbox } from '../../../../components';
import { IPermission } from '../../../../features/settings/permissions/permissions.interfaces';

interface PermissionsCheckboxProps {
  teamMemberRoleKey: string;
  workspacePermissionKey: string;
}

export default function PermissionsCheckbox({
  teamMemberRoleKey,
  workspacePermissionKey,
}: PermissionsCheckboxProps) {
  const queryClient = useQueryClient();

  const { data: currentPermissionValue, status: currentPermissionStatus } =
    useGetPermissionValue(teamMemberRoleKey, workspacePermissionKey);

  const { status: permissionsListStatus } = useGetPermissionsList();

  // Mutations
  const changeRolePermissionMutation = useMutation(
    changeRolePermissionService,
    {
      onSuccess: (successData) => {
        const updatedPermissions: IPermission[] = successData.data.updated_permissions;

        updatedPermissions.map((updatedPermissionValue) =>
          queryClient.setQueryData(
            [
              'workspace_permission_value',
              {
                teamMemberRoleKey: updatedPermissionValue.team_member_role_key,
                workspacePermissionKey: updatedPermissionValue.permission_key,
              },
            ],
            updatedPermissionValue
          )
        );
      },
    }
  );

  const changeRole = () => {
    if (!currentPermissionValue || currentPermissionStatus !== 'success') {
      return false;
    }

    changeRolePermissionMutation.mutate({
      teamMemberRoleKey,
      workspacePermissionKey,
      isPermissionAllowed: currentPermissionValue.value === true ? 0 : 1,
    });

    return true;
  };

  return (
    <Checkbox
      checked={
        currentPermissionStatus === 'success' &&
        currentPermissionValue?.value === true
      }
      onChange={changeRole}
      height="h-6"
      width="w-6"
      loading={changeRolePermissionMutation.status === 'loading'}
      disabled={
        permissionsListStatus !== 'success' ||
        currentPermissionStatus !== 'success' ||
        currentPermissionValue?.can_be_changed !== true
      }
      spinnerSize={8}
    />
  );
}
