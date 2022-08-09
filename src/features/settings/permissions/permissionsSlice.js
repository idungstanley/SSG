import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import permissionsApi from './permissionsApi';

// Adapters
export const permissionsAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
});

export const permissionValuesAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
});

// Selectors
export const permissionsSelectors = permissionsAdapter.getSelectors((state) => state.permissions.permissions);
export const permissionValuesSelectors = permissionValuesAdapter.getSelectors((state) => state.permissions.permissionValues);

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    updatingWorkspacePermissionKey: null,
    updatingTeamMemberRoleKey: null,
    permissions: permissionsAdapter.getInitialState(),
    permissionValues: permissionValuesAdapter.getInitialState(),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(permissionsApi.endpoints.getPermissions.matchFulfilled, (state, { payload }) => {
        permissionsAdapter.setAll(state.permissions, payload.data.permissions);
      })
      .addMatcher(permissionsApi.endpoints.getPermissionValues.matchFulfilled, (state, { payload }) => {
        permissionValuesAdapter.setAll(state.permissionValues, payload.data.values);
      })
      .addMatcher(permissionsApi.endpoints.changeRolePermission.matchPending, (state, { meta }) => {
        state.updatingWorkspacePermissionKey = meta.arg.originalArgs.workspacePermissionKey;
        state.updatingTeamMemberRoleKey = meta.arg.originalArgs.teamMemberRoleKey;
      })
      .addMatcher(permissionsApi.endpoints.changeRolePermission.matchFulfilled, (state, { payload }) => {
        state.updatingWorkspacePermissionKey = null;
        state.updatingTeamMemberRoleKey = null;

        const updatedPermissions = payload.data.updated_permissions;

        /* eslint-disable */
        for (var i = 0; i < updatedPermissions.length; i++) {
          permissionValuesAdapter.updateOne(state.permissionValues, {
            id: `${updatedPermissions[i].workspace_permission_key}|${updatedPermissions[i].team_member_role_key}`,
            changes: {
              value: updatedPermissions[i].value,
            },
          });
        }
        /* eslint-enable */
      })
      .addMatcher(permissionsApi.endpoints.changeRolePermission.matchRejected, (state) => {
        state.updatingWorkspacePermissionKey = null;
        state.updatingTeamMemberRoleKey = null;
      });
  },
});

export default permissionsSlice.reducer;
