import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hub, StatusProps } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { matchedStatusProps } from '../../common/Prompt';

interface HubState {
  hub: Hub[];
  selectedTreeDetails: { name: null | string | undefined; id: string | null; type: null | string };
  toggleTree: boolean;
  currHubId: string | null;
  updateCords: number;
  showSubItems: boolean;
  showEditHubModal: boolean;
  archiveHub: boolean;
  sidebarSettings: boolean;
  toggleArchive: number;
  parentHubExt: { id: string | null; type: string | null };
  showMenuDropdown: string | null | undefined;
  showMenuDropdownType: string | null | undefined;
  listIdCreateTask: string;
  sideBarCreateTaskListId: string | null;
  SubDropdownMenu: boolean;
  entityToCreate: string | null;
  SubMenuId: string | null | undefined;
  SubMenuType: string | null | undefined;
  refType: null;
  prevName: string;
  showFavEditInput: null | string;
  triggerFavUpdate: boolean;
  favUpdateName: null | string;
  createWLID: string | null;
  editHub: boolean;
  spaceStatuses: StatusProps[];
  statusesToMatch: StatusProps[];
  matchedStatus: matchedStatusProps[];
}

const initialState: HubState = {
  hub: [],
  currHubId: null,
  showEditHubModal: false,
  showSubItems: false,
  archiveHub: false,
  sidebarSettings: false,
  toggleArchive: 0,
  showMenuDropdown: null,
  showMenuDropdownType: null,
  sideBarCreateTaskListId: null,
  listIdCreateTask: '',
  SubDropdownMenu: false,
  SubMenuId: null,
  SubMenuType: null,
  updateCords: Date.now(),
  refType: null,
  prevName: '',
  showFavEditInput: null,
  triggerFavUpdate: false,
  favUpdateName: null,
  createWLID: null,
  editHub: false,
  parentHubExt: { id: null, type: null },
  selectedTreeDetails: { name: null, id: null, type: null },
  toggleTree: false,
  entityToCreate: null,
  spaceStatuses: [
    { color: null, is_default: null, id: null, model_id: null, model: null, type: null, position: 0, name: '' }
  ],
  statusesToMatch: [],
  matchedStatus: []
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
    setSpaceStatuses(state, action: PayloadAction<StatusProps[]>) {
      state.spaceStatuses = action.payload;
    },
    setStatusesToMatch(state, action: PayloadAction<StatusProps[]>) {
      state.statusesToMatch = action.payload;
    },
    setMatchedStatus(state, action: PayloadAction<matchedStatusProps[]>) {
      state.matchedStatus = action.payload;
    },
    getHub(state, action: PayloadAction<Hub[]>) {
      state.hub = action.payload;
    },
    setToggleTree(state, action: PayloadAction<boolean>) {
      state.toggleTree = action.payload;
    },
    setListIdCreateTask(state, action: PayloadAction<string>) {
      state.listIdCreateTask = action.payload;
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
    getCurrHubId(state, action: PayloadAction<string | null>) {
      state.currHubId = action.payload;
    },
    setEntityToCreate(state, action: PayloadAction<string | null>) {
      state.entityToCreate = action.payload;
    },
    setCreateWLID(state, action: PayloadAction<string | null>) {
      state.createWLID = action.payload;
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
    chechIfHub: (state) => state
  }
});

export const {
  createHub,
  getHub,
  chechIfHub,
  getCurrHubId,
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
  setListIdCreateTask,
  setSubDropdownMenu,
  closeMenu,
  getMenuRef,
  getPrevName,
  setShowFavEditInput,
  setTriggerFavUpdate,
  setFavUpdateName,
  setSpaceStatuses,
  setCreateWLID,
  setEditHub,
  setParentHubExt,
  setSelectedTreeDetails,
  setEntityToCreate,
  setStatusesToMatch,
  setMatchedStatus
} = hubSlice.actions;
export default hubSlice.reducer;
