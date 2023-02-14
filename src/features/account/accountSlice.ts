import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from './account.interfaces';

const showPreviewFromLS = localStorage.getItem('showPreview');

interface AccountState {
  settings: IUserState;
  showSidebar: boolean;
}

const initialState: AccountState = {
  settings: {
    showPreview: showPreviewFromLS ? JSON.parse(showPreviewFromLS) : false,
  },
  showSidebar: true,
};

export const accountSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setAccountSettings: (state, action: PayloadAction<IUserState>) => {
      state.settings = action.payload;
    },
    setShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { setAccountSettings, setShowSidebar } = accountSlice.actions;

export default accountSlice.reducer;
