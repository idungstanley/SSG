import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from './account.interfaces';

const showPreviewFromLS = localStorage.getItem('showPreview') as string;

// const sidebarFromLS: { sidebarWidth: number; showSidebar: boolean } =
//   JSON.parse(localStorage.getItem('sidebar') || '""');

const sidebarFromLS = localStorage.getItem('sidebar');

const showSidebar = sidebarFromLS
  ? (
      JSON.parse(sidebarFromLS) as {
        sidebarWidth: number;
        showSidebar: boolean;
      }
    ).showSidebar
  : true;

export interface PaletteDropdownProps {
  paletteId?: string | null;
  paletteType?: string | null;
  show?: boolean;
}

interface AccountState {
  settings: IUserState;
  showSidebar: boolean;
  paletteDropdown: PaletteDropdownProps;
  showUploadImage: boolean;
  userName: string;
}

const initialState: AccountState = {
  settings: {
    showPreview: JSON.parse(showPreviewFromLS ?? 'false') as boolean
  },
  showSidebar,
  paletteDropdown: { show: false },
  showUploadImage: false,
  userName: ''
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
    setPaletteDropDown: (state, action: PayloadAction<PaletteDropdownProps>) => {
      state.paletteDropdown = action.payload;
    },
    setShowUploadImage: (state, action: PayloadAction<boolean>) => {
      state.showUploadImage = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    }
  }
});

export const { setAccountSettings, setShowSidebar, setPaletteDropDown, setShowUploadImage, setUserName } =
  accountSlice.actions;

export default accountSlice.reducer;
