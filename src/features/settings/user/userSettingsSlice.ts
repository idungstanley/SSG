import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserData } from '../../workspace/workspace.interfaces';

interface userSettingState {
  name: string | undefined;
  isNewUpdate: boolean;
  userData: IUserData | null | undefined;
  avatar_path?: string | null;
  color?: string;
  date_format?: string;
  default_workspace_id?: string;
  email?: string;
  initials?: string;
  start_week?: string;
  theme_color?: string | null;
  timezone?: string;
  time_format?: string;
  currentUserModal: boolean;
  showAvatarUpload: boolean;
  showConfirmationModal: boolean;
  triggerDeleteAvatar: boolean;
}

const initialState: userSettingState = {
  name: '',
  isNewUpdate: false,
  userData: null,
  avatar_path: null,
  color: undefined,
  date_format: '',
  default_workspace_id: '',
  email: '',
  initials: '',
  start_week: '',
  theme_color: null,
  timezone: '',
  time_format: '',
  currentUserModal: false,
  showAvatarUpload: false,
  showConfirmationModal: false,
  triggerDeleteAvatar: false
};

export const userSettingSlice = createSlice({
  name: 'userSetting',
  initialState,
  reducers: {
    setUserInfo(
      state,
      action: PayloadAction<{
        name?: string | undefined;
        avatar_path?: string | null;
        color?: string | null;
        date_format?: string;
        default_workspace_id?: string;
        email?: string;
        initials?: string;
        start_week?: string;
        theme_color?: string | null;
        timezone?: string;
        time_format?: string;
      }>
    ) {
      state.name = action.payload?.name ?? state.name;
      state.avatar_path = action.payload?.avatar_path ?? state.avatar_path;
      state.color = action.payload?.color ?? state.color;
      state.date_format = action.payload?.date_format ?? state.date_format;
      state.default_workspace_id = action.payload?.default_workspace_id ?? state.default_workspace_id;
      state.email = action.payload?.email ?? state.email;
      state.initials = action.payload?.initials ?? state.initials;
      state.start_week = action.payload?.start_week ?? state.start_week;
      state.theme_color = action.payload?.theme_color ?? state.theme_color;
      state.timezone = action.payload?.timezone ?? state.timezone;
      state.time_format = action.payload?.time_format ?? state.time_format;
    },
    setUserData(state, action: PayloadAction<IUserData | null | undefined>) {
      state.userData = action.payload;
    },
    setCurrentUserModal(state, action: PayloadAction<boolean>) {
      state.currentUserModal = action.payload;
    },
    setShowAvatarUpload(state, action: PayloadAction<boolean>) {
      state.showAvatarUpload = action.payload;
    },
    setShowConfirmationModal(state, action: PayloadAction<boolean>) {
      state.showConfirmationModal = action.payload;
    }
  }
});

export const { setUserInfo, setUserData, setCurrentUserModal, setShowAvatarUpload, setShowConfirmationModal } =
  userSettingSlice.actions;

export default userSettingSlice.reducer;
