import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hub } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';

interface HubState {
  hub: Hub[];
  currHubId: string | null;
  currSubHubId: string | null;
  currSubHubIdType: string | null;
  delHub: boolean;
  showSubItems: boolean;
  showEditHubModal: boolean;
  archiveHub: boolean;
  sidebarSettings: boolean;
  toggleArchive: number;
  showMenuDropdown: string | null | undefined;
  showMenuDropdownType: string | null | undefined;
  SubDropdownMenu: boolean;
  SubMenuId: string | null | undefined;
  SubMenuType: string | null | undefined;
  hubParentId: string | null;
  refType: null;
  prevName: string;
  showFavEditInput: null | string;
  triggerFavUpdate: boolean;
  favUpdateName: null | string;
  createWLID: string | null;
  editHub: boolean;
  openedHubId: string[];
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
  favUpdateName: null,
  createWLID: null,
  editHub: false,
  openedHubId: []
};

export const hubSlice = createSlice({
  name: 'hub',
  initialState,
  reducers: {
    createHub(state, action: PayloadAction<Hub>) {
      state.hub.push(action.payload);
    },
    getHub(state, action: PayloadAction<Hub[]>) {
      state.hub = action.payload;
    },
    setDelHub(state, action: PayloadAction<boolean>) {
      state.delHub = action.payload;
    },
    setEditHub(state, action: PayloadAction<boolean>) {
      state.editHub = action.payload;
    },
    setShowEditHubModal(state, action: PayloadAction<boolean>) {
      state.showEditHubModal = action.payload;
    },
    getCurrHubId(state, action: PayloadAction<string | null>) {
      state.currHubId = action.payload;
    },
    setCreateWLID(state, action: PayloadAction<string | null>) {
      state.createWLID = action.payload;
    },
    getCurrSubHubId(state, action: PayloadAction<{ currSubHubId: string | null; currSubHubIdType: string | null }>) {
      state.currSubHubId = action.payload.currSubHubId;
      state.currSubHubIdType = action.payload.currSubHubIdType;
    },
    getSubMenu(
      state,
      action: PayloadAction<{ SubMenuId?: string | null | undefined; SubMenuType?: string | null | undefined }>
    ) {
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
    setshowMenuDropdown(
      state,
      action: PayloadAction<{
        showMenuDropdown?: string | null | undefined;
        showMenuDropdownType?: string | null | undefined;
      }>
    ) {
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
    setHubParentId(state, action: PayloadAction<string | null>) {
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
    setOpenedHubId(state, action: PayloadAction<string>) {
      let newArr = [];
      if (state.openedHubId.includes(action.payload)) {
        newArr = state.openedHubId.filter((i) => i !== action.payload);
      } else {
        newArr = [...state.openedHubId, action.payload];
      }
      state.openedHubId = newArr;
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
  setOpenedHubId,
  closeMenu,
  getMenuRef,
  getPrevName,
  setShowFavEditInput,
  setTriggerFavUpdate,
  setFavUpdateName,
  setCreateWLID,
  setEditHub
} = hubSlice.actions;
export default hubSlice.reducer;
