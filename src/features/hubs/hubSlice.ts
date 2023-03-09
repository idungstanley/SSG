import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HubState {
  hub: string[];
  currHubId: string | null;
  currSubHubId: null;
  currSubHubIdType: null;
  delHub: boolean;
  showSubItems: boolean;
  showEditHubModal: boolean;
  archiveHub: boolean;
  sidebarSettings: boolean;
  toggleArchive: number;
  showMenuDropdown: null | string;
  showMenuDropdownType: null;
  SubDropdownMenu: boolean;
  SubMenuId: null;
  SubMenuType: null;
  hubParentId: null;
  refType: null;
  prevName: string;
  showFavEditInput: null | string;
  triggerFavUpdate: boolean;
  favUpdateName: null | string;
}

const initialState: HubState = {
  hub: [],
  currHubId: null,
  currSubHubId: null,
  currSubHubIdType: null,
  delHub: false,
  showEditHubModal: false,
  showSubItems: false,
  archiveHub: false,
  sidebarSettings: false,
  toggleArchive: 0,
  showMenuDropdown: null,
  showMenuDropdownType: null,
  SubDropdownMenu: false,
  SubMenuId: null,
  SubMenuType: null,
  hubParentId: null,
  refType: null,
  prevName: '',
  showFavEditInput: null,
  triggerFavUpdate: false,
  favUpdateName: null
};

export const hubSlice = createSlice({
  name: 'hub',
  initialState,
  reducers: {
    createHub(state, action: PayloadAction<string>) {
      state.hub.push(action.payload);
    },
    getHub(state, action: PayloadAction<string[]>) {
      state.hub = action.payload;
    },
    setDelHub(state, action: PayloadAction<boolean>) {
      state.delHub = action.payload;
    },
    setShowEditHubModal(state, action: PayloadAction<boolean>) {
      state.showEditHubModal = action.payload;
    },
    getCurrHubId(state, action: PayloadAction<string | null>) {
      state.currHubId = action.payload;
    },
    getCurrSubHubId(state, action: PayloadAction<{ currSubHubId: null; currSubHubIdType: null }>) {
      state.currSubHubId = action.payload.currSubHubId;
      state.currSubHubIdType = action.payload.currSubHubIdType;
    },
    getSubMenu(state, action: PayloadAction<{ SubMenuId: null; SubMenuType: null }>) {
      state.SubMenuId = action.payload.SubMenuId;
      state.SubMenuType = action.payload.SubMenuType;
    },
    setShowSubItems(state, action: PayloadAction<boolean>) {
      state.showSubItems = action.payload;
    },
    setArchiveHub(state, action: PayloadAction<boolean>) {
      state.archiveHub = action.payload;
    },
    setShowSidebarSettings(state, action: PayloadAction<boolean>) {
      state.sidebarSettings = action.payload;
    },
    setToggleArchive(state, action: PayloadAction<number>) {
      state.toggleArchive = action.payload;
    },
    setshowMenuDropdown(state, action: PayloadAction<{ showMenuDropdown: null; showMenuDropdownType: null }>) {
      state.showMenuDropdown = action.payload.showMenuDropdown;
      state.showMenuDropdownType = action.payload.showMenuDropdownType;
    },
    closeMenu(state) {
      state.showMenuDropdown = null;
      state.showMenuDropdownType = null;
    },
    setSubDropdownMenu(state, action: PayloadAction<boolean>) {
      state.SubDropdownMenu = action.payload;
    },
    setHubParentId(state, action: PayloadAction<null>) {
      state.hubParentId = action.payload;
    },
    getMenuRef(state, action: PayloadAction<null>) {
      state.refType = action.payload;
    },
    getPrevName(state, action: PayloadAction<string>) {
      state.prevName = action.payload;
    },
    setShowFavEditInput(state, action: PayloadAction<string | null>) {
      state.showFavEditInput = action.payload;
    },
    setTriggerFavUpdate(state, action: PayloadAction<boolean>) {
      state.triggerFavUpdate = action.payload;
    },
    setFavUpdateName(state, action: PayloadAction<string | null>) {
      state.favUpdateName = action.payload;
    },
    chechIfHub: (state) => state
  }
});

export const {
  createHub,
  getHub,
  chechIfHub,
  getCurrHubId,
  getCurrSubHubId,
  setDelHub,
  getSubMenu,
  setShowSubItems,
  setArchiveHub,
  setShowSidebarSettings,
  setToggleArchive,
  setShowEditHubModal,
  setshowMenuDropdown,
  setSubDropdownMenu,
  setHubParentId,
  closeMenu,
  getMenuRef,
  getPrevName,
  setShowFavEditInput,
  setTriggerFavUpdate,
  setFavUpdateName
} = hubSlice.actions;
export default hubSlice.reducer;
