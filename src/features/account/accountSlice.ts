import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from "./account.interfaces";

const showPreviewFromLS = localStorage.getItem('showPreview');

interface AccountState {
  settings: IUserState;
}

const initialState: AccountState = {
  settings: {
    showPreview: showPreviewFromLS ? JSON.parse(showPreviewFromLS) : false,
  },
};

export const accountSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setAccountSettings: (state, action: PayloadAction<IUserState>) => {
      state.settings = action.payload;
    },
  },
});

export const { setAccountSettings } = accountSlice.actions;

export default accountSlice.reducer;
