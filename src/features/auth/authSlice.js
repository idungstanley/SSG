import { createSlice } from '@reduxjs/toolkit';

// Get user credentials from localStorage
const localStorageUser = JSON.parse(localStorage.getItem('user'));
const localStorageAccessToken = JSON.parse(localStorage.getItem('accessToken'));
const localStorageCurrentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId'));
const localStorageCurrentUserId = JSON.parse(localStorage.getItem('currentUserId'));

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorageUser,
    accessToken: localStorageAccessToken,
    currentWorkspaceId: localStorageCurrentWorkspaceId,
    currentUserId: localStorageCurrentUserId,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.currentWorkspaceId = action.payload.currentWorkspaceId;
      state.currentUserId = action.payload.currentUserId;
    },
    setCurrentWorkspace: (state, action) => {
      state.currentWorkspaceId = action.payload.workspaceId;
    },
    logout: (state) => state,
    switchWorkspace: (state) => state,
  },
});

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentWorkspaceId = (state) => state.auth.currentWorkspaceId;

export const {
  setCurrentUser,
  setCurrentWorkspace,
  logout,
  switchWorkspace,
} = authSlice.actions;

// Action creators are generated for each case reducer function
export default authSlice.reducer;
