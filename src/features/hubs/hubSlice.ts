import { createSlice } from '@reduxjs/toolkit';

interface HubState {
  hub: string[];
  currHubId: any;
  delHub: boolean;
  showSubItems: boolean;
  showEditHubModal: boolean;
  archiveHub: boolean;
  sidebarSettings: boolean;
  toggleArchive: number;
  showMenuDropdown: null;
  showMenuDropdownType: null;
  SubDropdownMenu: boolean;
  hubParentId: null;
}

const initialState: HubState = {
  hub: [],
  currHubId: null,
  delHub: false,
  showEditHubModal: false,
  showSubItems: false,
  archiveHub: false,
  sidebarSettings: false,
  toggleArchive: 0,
  showMenuDropdown: null,
  showMenuDropdownType: null,
  SubDropdownMenu: false,
  hubParentId: null,
};

export const hubSlice = createSlice({
  name: 'hub',
  initialState,
  reducers: {
    createHub(state, action) {
      state.hub.push(action.payload);
    },
    getHub(state, action) {
      state.hub = action.payload;
    },
    setDelHub(state, action) {
      state.delHub = action.payload;
    },
    setShowEditHubModal(state, action) {
      state.showEditHubModal = action.payload;
    },
    getCurrHubId(state, action) {
      state.currHubId = action.payload;
    },
    resetCurrHubId(state) {
      state.currHubId = null;
    },
    setShowSubItems(state, action) {
      state.showSubItems = action.payload;
    },
    setArchiveHub(state, action) {
      state.archiveHub = action.payload;
    },
    setShowSidebarSettings(state, action) {
      state.sidebarSettings = action.payload;
    },
    setToggleArchive(state, action) {
      state.toggleArchive = action.payload;
    },
    setshowMenuDropdown(state, action) {
      state.showMenuDropdown = action.payload.showMenuDropdown;
      state.showMenuDropdownType = action.payload.showMenuDropdownType;
    },
    setSubDropdownMenu(state, action) {
      state.SubDropdownMenu = action.payload;
    },
    setHubParentId(state, action) {
      state.hubParentId = action.payload;
    },
    chechIfHub: (state) => state,
  },
});

export const {
  createHub,
  getHub,
  chechIfHub,
  getCurrHubId,
  setDelHub,
  setShowSubItems,
  setArchiveHub,
  setShowSidebarSettings,
  setToggleArchive,
  setShowEditHubModal,
  resetCurrHubId,
  setshowMenuDropdown,
  setSubDropdownMenu,
  setHubParentId,
} = hubSlice.actions;
export default hubSlice.reducer;
