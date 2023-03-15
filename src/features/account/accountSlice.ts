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

interface PaletteDropdownProps {
  paletteId?: string | null;
  paletteType?: string | null;
}

interface AccountState {
  settings: IUserState;
  showSidebar: boolean;
  paletteDropdown?: string | null;
  paletteType?: string | null;
}

const initialState: AccountState = {
  settings: {
    showPreview: JSON.parse(showPreviewFromLS ?? 'false') as boolean
  },
  showSidebar,
  paletteDropdown: null,
  paletteType: null
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
      state.paletteDropdown = action.payload.paletteId;
      state.paletteType = action.payload.paletteType;
    }
  }
});

export const { setAccountSettings, setShowSidebar, setPaletteDropDown } = accountSlice.actions;

export default accountSlice.reducer;
