import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const showPreviewFromLS = localStorage.getItem('showPreview');

interface ISettings {
  showPreview: boolean;
  showArchived: boolean;
}

interface AccountState {
  settings: ISettings;
}

const initialState: AccountState = {
  settings: {
    showPreview: showPreviewFromLS ? JSON.parse(showPreviewFromLS) : false,
    showArchived: false,
  },
};

export const accountSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setAccountSettings: (state, action: PayloadAction<ISettings>) => {
      state.settings = action.payload;
    },
  },
});

export const { setAccountSettings } = accountSlice.actions;

export default accountSlice.reducer;
