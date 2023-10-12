import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialPlaces } from '../../layout/components/MainLayout/Sidebar/components/Places';
import { IUserParams, IUserState, Place } from './account.interfaces';
import { STORAGE_KEYS } from '../../app/config/dimensions';
import { IPaletteData } from '../workspace/workspace.interfaces';

const showPreviewFromLS = localStorage.getItem('showPreview') as string;

const sidebarFromLS = localStorage.getItem('sidebar');
//get sidebar width from local storage
const sidebarWidthFromLS = JSON.parse(localStorage.getItem(STORAGE_KEYS.SIDEBAR_WIDTH) || '""') as number;

const pilotWidthFromLS = JSON.parse(localStorage.getItem(STORAGE_KEYS.PILOT_WIDTH) || '""') as number;

const extendedBarWidthFromLS = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXTENDED_BAR_WIDTH) || '""') as number;

const hotKeysFromLS = JSON.parse(localStorage.getItem(STORAGE_KEYS.HOT_KEYS) || '""') as string[];

const idsFromLS = JSON.parse(localStorage.getItem('placeItem') || '[]') as string[];

const isPilotMinifiedFromLS = (JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_SETTINGS_DATA) || '""') as IUserParams)
  .isPilotMinified;

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
  scrollTop: string | number;
  baseColor: string;
  lightBaseColor: string;
  userSettingsData?: IUserParams;
  places: Place[];
  selectListColours: string[];
  calculatedContentWidth: string;
  colourPaletteData: IPaletteData[];
}

const initialState: AccountState = {
  settings: {
    showPreview: JSON.parse(showPreviewFromLS ?? 'false') as boolean
  },
  showSidebar,
  paletteDropdown: { show: false },
  showUploadImage: false,
  userName: '',
  scrollTop: '',
  baseColor: '#BF00FFB2',
  lightBaseColor: '#BF00FF21',
  userSettingsData: {
    showPreview: '',
    sidebarWidth: sidebarWidthFromLS,
    isFavoritePinned: false,
    pilotWidth: pilotWidthFromLS,
    isPilotMinified: isPilotMinifiedFromLS,
    extendedBarWidth: extendedBarWidthFromLS,
    hotkeys: hotKeysFromLS
  },
  places: [...initialPlaces.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id))],
  calculatedContentWidth: '',
  selectListColours: [],
  colourPaletteData: []
};

export const accountSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setPlaces: (state, action: PayloadAction<Place[]>) => {
      state.places = action.payload;
    },
    setAccountSettings: (state, action: PayloadAction<IUserState>) => {
      state.settings = action.payload;
    },
    SetUserSettingsStore: (state, action: PayloadAction<IUserParams>) => {
      state.userSettingsData = action.payload;
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
    setSelectedListColours: (state, action: PayloadAction<string[]>) => {
      state.selectListColours = action.payload;
    },
    setColourPaletteData: (state, action: PayloadAction<IPaletteData[]>) => {
      state.colourPaletteData = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setCalculatedContentWidth: (state, action: PayloadAction<string>) => {
      state.calculatedContentWidth = action.payload;
    },
    setScrollTop: (state, action: PayloadAction<string | number>) => {
      state.scrollTop = action.payload;
    }
  }
});

export const {
  setPlaces,
  setAccountSettings,
  setScrollTop,
  setShowSidebar,
  setPaletteDropDown,
  setShowUploadImage,
  setUserName,
  SetUserSettingsStore,
  setCalculatedContentWidth,
  setSelectedListColours,
  setColourPaletteData
} = accountSlice.actions;

export default accountSlice.reducer;
