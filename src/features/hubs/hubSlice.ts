import { createSlice } from "@reduxjs/toolkit";

interface HubState {
  hub: string[];
  currHubId: null;
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
  triggerAddToFav: boolean;
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
  prevName: "",
  triggerAddToFav: false,
};

export const hubSlice = createSlice({
  name: "hub",
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
    getCurrSubHubId(state, action) {
      state.currSubHubId = action.payload.currSubHubId;
      state.currSubHubIdType = action.payload.currSubHubIdType;
    },
    getSubMenu(state, action) {
      state.SubMenuId = action.payload.SubMenuId;
      state.SubMenuType = action.payload.SubMenuType;
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
    closeMenu(state) {
      state.showMenuDropdown = null;
      state.showMenuDropdownType = null;
    },
    setSubDropdownMenu(state, action) {
      state.SubDropdownMenu = action.payload;
    },
    setHubParentId(state, action) {
      state.hubParentId = action.payload;
    },
    getMenuRef(state, action) {
      state.refType = action.payload;
    },
    getPrevName(state, action) {
      state.prevName = action.payload;
    },
    setTriggerAddToFav(state, { payload }) {
      state.triggerAddToFav = payload;
    },
    chechIfHub: (state) => state,
  },
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
  setTriggerAddToFav,
} = hubSlice.actions;
export default hubSlice.reducer;
