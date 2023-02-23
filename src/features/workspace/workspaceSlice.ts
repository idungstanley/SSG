import { createSlice } from "@reduxjs/toolkit";

interface workspaceState {
  workspace: string[];
  currentItemId: string | null;
  currentItemType?: string | null;
  activePlaceId: number | null | boolean;
  pilotWidth: number;
  showHub: boolean;
  showWallet: boolean;
  showMenuDropDown: boolean;
  showModal: boolean;
  searchIsActive: boolean;
  isExtSearchActive: boolean;
  activeItemId?: string | null;
  activeItemType?: string | null;
  activeItemName: string | null;
  currentWalletId: string | null;
  currentSubWalletId: string | null;
  currentWalletName: string | null;
  showPilot: boolean;
  sidebarWidthRD: number;
  showPilotIconView: boolean;
  showAddHotKeyDropdown: boolean;
  showRemoveHotKeyDropdown: boolean;
  activeEntity: {id: string | null, type: string | null}
  showPilotListView: boolean;
  activeTabId: number | null;
  activeHotKeyTabId: number | null;
  activeSubCommunicationTabId: number | null;
  activeSubDetailsTabId: number | null;
  activeSubTimeClockTabId: number | null;
  activeSubChecklistTabId: number | null;
}

const initialState: workspaceState = {
  workspace: [],
  currentItemId: null,
  currentItemType: null,
  activePlaceId: null,
  pilotWidth: 400,
  showHub: false,
  showWallet: false,
  showMenuDropDown: false,
  showModal: false,
  searchIsActive: false,
  isExtSearchActive: false,
  activeItemId: null,
  activeItemType: null,
  activeItemName: null,
  currentSubWalletId: null,
  currentWalletId: null,
  currentWalletName: null,
  showPilot: false,
  showPilotIconView: false,
  showPilotListView: false,
  activeTabId: 0,
  sidebarWidthRD: 260,
  activeHotKeyTabId: 0,
  activeSubDetailsTabId: 1,
  activeSubTimeClockTabId: 0,
  activeSubCommunicationTabId: 1,
  activeSubChecklistTabId: 2,
  showAddHotKeyDropdown: false,
  showRemoveHotKeyDropdown: false,
  activeEntity: {id: null, type: null}
};

export const wsSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    createWorkspace(state, action) {
      state.workspace.push(action.payload);
    },
    setPilotWidth(state, action) {
      state.pilotWidth = action.payload;
    },
    setShowPilot(state, action) {
      state.showPilot = action.payload;
    },
    setShowPilotIconView(state, action) {
      state.showPilotIconView = action.payload;
    },
    setShowPilotListView(state, action) {
      state.showPilotListView = action.payload;
    },
    setSearchIsActive(state, action) {
      if (action.payload === 'TOGGLE') {
        return {
          ...state,
          searchIsActive: !state.searchIsActive,
        };
      }
    },
    setIsExtSearchActive(state, action) {
      if (action.payload === 'TOGGLE') {
        return {
          ...state,
          isExtSearchActive: !state.isExtSearchActive,
        };
      }
    },
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    setShowAddHotKeyDropdown(state, action) {
      state.showAddHotKeyDropdown = action.payload;
    },
    setShowRemoveHotKeyDropdown(state, action) {
      state.showRemoveHotKeyDropdown = action.payload;
    },
    setShowMenuDropDown(state, action) {
      state.showMenuDropDown = action.payload;
    },
    setActiveEntity(state, action) {
      state.activeEntity = action.payload;
    },
    setShowHub(state, action) {
      state.showHub = action.payload;
    },
    setSidebarWidthRD(state, action) {
      state.sidebarWidthRD = action.payload;
    },
    setShowWallet(state, action) {
      state.showWallet = action.payload;
    },
    setActivePlaceId: (state, action) => {
      state.activePlaceId = action.payload;
    },
    setCurrentItem(state, action) {
      state.currentItemId = action.payload.currentItemId;
      state.currentItemType = action.payload.currentItemType;
    },
    setActiveItem(state, action) {
      state.activeItemId = action.payload.activeItemId;
      state.activeItemType = action.payload.activeItemType;
      state.activeItemName = action.payload.activeItemName;
    },
    setCurrentWalletId(state, action) {
      state.currentWalletId = action.payload;
    },
    setActiveSubCommunicationTabId(state, action) {
      state.activeSubCommunicationTabId = action.payload;
    },
    setActiveSubDetailsTabId(state, action) {
      state.activeSubDetailsTabId = action.payload;
    },
    setActiveTabId(state, action) {
      state.activeTabId = action.payload;
    },
    setActiveHotKeyId(state, action) {
      state.activeHotKeyTabId = action.payload;
    },
    setActiveSubTimeClockTabId(state, action) {
      state.activeSubTimeClockTabId = action.payload;
    },
    setActiveSubChecklistTabId(state, action) {
      state.activeSubChecklistTabId = action.payload;
    },
    setCurrentWalletName(state, action) {
      state.currentWalletName = action.payload;
    },
    setCurrenSubtWalletId(state, action) {
      state.currentSubWalletId = action.payload;
    },
    resetCurrentItem(state) {
      state.currentItemId = null;
      state.currentItemType = null;
    },
    checkIfWs: (state) => state,
  },
});

export const {
  createWorkspace,
  checkIfWs,
  setCurrentItem,
  resetCurrentItem,
  setActivePlaceId,
  setShowHub,
  setShowWallet,
  setShowMenuDropDown,
  setShowModal,
  setSearchIsActive,
  setIsExtSearchActive,
  setActiveItem,
  setCurrentWalletId,
  setCurrenSubtWalletId,
  setCurrentWalletName,
  setShowPilot,
  setShowPilotIconView,
  setActiveSubCommunicationTabId,
  setActiveSubDetailsTabId,
  setActiveSubTimeClockTabId,
  setPilotWidth,
  setShowPilotListView,
  setActiveTabId,
  setActiveSubChecklistTabId,
  setShowAddHotKeyDropdown,
  setShowRemoveHotKeyDropdown,
  setActiveHotKeyId,
  setActiveEntity,
  setSidebarWidthRD
} = wsSlice.actions;

export default wsSlice.reducer;
