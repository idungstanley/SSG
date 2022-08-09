import { createSlice } from '@reduxjs/toolkit';
import accountApi from '../account/accountApi';

// Get user credentials from localStorage
const localStorageUser = JSON.parse(localStorage.getItem('user'));
const localStorageAccessToken = JSON.parse(localStorage.getItem('accessToken'));
const localStorageCurrentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId'));

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorageUser,
    accessToken: localStorageAccessToken,
    currentWorkspaceId: localStorageCurrentWorkspaceId,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.currentWorkspaceId = action.payload.currentWorkspaceId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(accountApi.endpoints.switchWorkspace.matchFulfilled, (state, { payload }) => {
        state.currentWorkspaceId = payload.data.workspace.id;
        localStorage.setItem('currentWorkspaceId', JSON.stringify(payload.data.workspace.id));
      });
  },
});

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentWorkspaceId = (state) => state.auth.currentWorkspaceId;

export const {
  setCurrentUser,
} = authSlice.actions;

// Action creators are generated for each case reducer function
export default authSlice.reducer;
