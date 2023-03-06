import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

// Get user credentials from localStorage
const UserFromLS = JSON.parse(localStorage.getItem('user') || 'null') as IUser;
const AccessTokenFromLS = JSON.parse(localStorage.getItem('accessToken') || 'null') as string;
const CurrentWorkspaceIdFromLS = JSON.parse(localStorage.getItem('currentWorkspaceId') || 'null') as string;
const CurrentUserIdFromLS = JSON.parse(localStorage.getItem('currentUserId') || 'null') as string;

export interface IUser {
  avatar_path: null | string;
  colour: string;
  default_workspace_id: string;
  email: string;
  initials: string;
  name: string;
  timezone: null | string;
}

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  currentWorkspaceId: string | null;
  currentUserId: string | null;
}

const initialState: AuthState = {
  user: UserFromLS,
  accessToken: AccessTokenFromLS,
  currentWorkspaceId: CurrentWorkspaceIdFromLS,
  currentUserId: CurrentUserIdFromLS
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.currentWorkspaceId = action.payload.currentWorkspaceId;
      state.currentUserId = action.payload.currentUserId;
    },
    setCurrentWorkspace: (state, action: PayloadAction<{ workspaceId: string }>) => {
      state.currentWorkspaceId = action.payload.workspaceId;
    },
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => state,
    switchWorkspace: (state) => state
  }
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentWorkspaceId = (state: RootState) => state.auth.currentWorkspaceId;

export const { setAuthData, setCurrentWorkspace, logout, switchWorkspace, setCurrentUser } = authSlice.actions;

// Action creators are generated for each case reducer function
export default authSlice.reducer;
