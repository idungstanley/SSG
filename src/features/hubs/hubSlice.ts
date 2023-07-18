import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hub } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';

interface HubState {
  hub: Hub[];
  selectedTreeDetails: { name: null | string | undefined; id: string | null; type: null | string };
  toggleTree: boolean;
  currHubId: string | null;
  currSubHubId: string | null;
  currSubHubIdType: string | null;
  delHub: boolean;
  updateCords: number;
  showSubItems: boolean;
  showEditHubModal: boolean;
  archiveHub: boolean;
  sidebarSettings: boolean;
  toggleArchive: number;
  parentHubExt: { id: string | null; type: string | null };
  subHubExt: { id: string | null; type: string | null };
  showMenuDropdown: string | null | undefined;
  showMenuDropdownType: string | null | undefined;
  sideBarCreateTaskListId: string | null;
  SubDropdownMenu: boolean;
  entityToCreate: string | null;
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
  sideBarCreateTaskListId: null,
  SubDropdownMenu: false,
  SubMenuId: null,
  SubMenuType: null,
  updateCords: Date.now(),
  hubParentId: null,
  refType: null,
  prevName: '',
  showFavEditInput: null,
  triggerFavUpdate: false,
  favUpdateName: null,
  createWLID: null,
  editHub: false,
  openedHubId: [],
  parentHubExt: { id: null, type: null },
  subHubExt: { id: null, type: null },
  selectedTreeDetails: { name: null, id: null, type: null },
  toggleTree: false,
  entityToCreate: null
};

export const hubSlice = createSlice({
  name: 'hub',
  initialState,
  reducers: {
    createHub(state, action: PayloadAction<Hub>) {
      state.hub.push(action.payload);
    },
    setSelectedTreeDetails(
      state,
      action: PayloadAction<{ name: string | null | undefined; id: string | null; type: string | null }>
    ) {
      state.selectedTreeDetails = action.payload;
    },
    getHub(state, action: PayloadAction<Hub[]>) {
      state.hub = action.payload;
    },
    setDelHub(state, action: PayloadAction<boolean>) {
      state.delHub = action.payload;
    },
    setToggleTree(state, action: PayloadAction<boolean>) {
      state.toggleTree = action.payload;
    },
    setEditHub(state, action: PayloadAction<boolean>) {
      state.editHub = action.payload;
    },
    setShowEditHubModal(state, action: PayloadAction<boolean>) {
      state.showEditHubModal = action.payload;
    },
    setParentHubExt(state, action: PayloadAction<{ id: string | null; type: string | null }>) {
      state.parentHubExt = action.payload;
    },
    setSubHubExt(state, action: PayloadAction<{ id: string | null; type: string | null }>) {
      state.subHubExt = action.payload;
    },
    getCurrHubId(state, action: PayloadAction<string | null>) {
      state.currHubId = action.payload;
    },
    setEntityToCreate(state, action: PayloadAction<string | null>) {
      state.entityToCreate = action.payload;
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
    setSideBarCreateTaskListId(state, action: PayloadAction<string | null>) {
      state.sideBarCreateTaskListId = action.payload;
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
    setUpdateCords(state) {
      state.updateCords = Date.now();
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
  setToggleTree,
  setShowSubItems,
  setArchiveHub,
  setShowSidebarSettings,
  setToggleArchive,
  setShowEditHubModal,
  setUpdateCords,
  setSideBarCreateTaskListId,
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
  setEditHub,
  setParentHubExt,
  setSubHubExt,
  setSelectedTreeDetails,
  setEntityToCreate
} = hubSlice.actions;
export default hubSlice.reducer;
