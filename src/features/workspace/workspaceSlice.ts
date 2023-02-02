import { createSlice } from "@reduxjs/toolkit";

interface workspaceState {
  workspace: string[];
  showSidebar: boolean;
  currentItemId: string | null;
  currentItemType?: string | null;
  activePlaceId: number | boolean;
  showExtendedBar: boolean;
  sidebarWidth: number;
  extendedSidebarWidth: number;
  showHub: boolean;
  showWallet: boolean;
  showMenuDropDown: boolean;
  showModal: boolean;
  searchIsActive: boolean;
  isExtSearchActive: boolean;
  activeItemId: string | null;
  activeItemType: string | null;
  activeItemName: string | null;
  currentWalletId: string | null;
  currentSubWalletId: string | null;
  currentWalletName: string | null;
  showPilot: boolean;
  showPilotIconView: boolean;
  activeSubCommunicationTabId: number | null;
  activeSubDetailsTabId: number | null;
}

const initialState: workspaceState = {
  workspace: [],
  showSidebar: true,
  currentItemId: null,
  currentItemType: null,
  activePlaceId: 0,
  showExtendedBar: false,
  sidebarWidth: 300,
  showHub: false,
  showWallet: false,
  showMenuDropDown: false,
  showModal: false,
  searchIsActive: false,
  extendedSidebarWidth: 240,
  isExtSearchActive: false,
  activeItemId: null,
  activeItemType: null,
  activeItemName: null,
  currentSubWalletId: null,
  currentWalletId: null,
  currentWalletName: null,
  showPilot: false,
  showPilotIconView: false,
  activeSubDetailsTabId: 1,
  activeSubCommunicationTabId: 1,
};

export const wsSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    createWorkspace(state, action) {
      state.workspace.push(action.payload);
    },
    setShowSidebar(state, action) {
      if (action.payload === "CHANGE") {
        return {
          ...state,
          showSidebar: !state.showSidebar,
        };
      } else if (action.payload === true) {
        state.showSidebar = action.payload;
      } else if (action.payload === false) {
        state.showSidebar = action.payload;
      }
      state.showSidebar;
    },
    setSidebarWidth(state, action) {
      state.sidebarWidth = action.payload;
    },
    setShowPilot(state, action) {
      state.showPilot = action.payload;
    },
    setShowPilotIconView(state, action) {
      state.showPilotIconView = action.payload;
    },
    setExtendedSidebarWidth(state, action) {
      state.extendedSidebarWidth = action.payload;
    },
    setSearchIsActive(state, action) {
      if (action.payload === "TOGGLE") {
        return {
          ...state,
          searchIsActive: !state.searchIsActive,
        };
      }
    },
    setIsExtSearchActive(state, action) {
      if (action.payload === "TOGGLE") {
        return {
          ...state,
          isExtSearchActive: !state.isExtSearchActive,
        };
      }
    },
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    setShowMenuDropDown(state, action) {
      state.showMenuDropDown = action.payload;
    },
    setShowExtendedBar(state, action) {
      state.showExtendedBar = action.payload;
    },
    setShowHub(state, action) {
      state.showHub = action.payload;
    },
    setShowWallet(state, action) {
      state.showWallet = action.payload;
    },
    setActivePlaceId: (state, action) => {
      return {
        ...state,
        activePlaceId: state.activePlaceId === action.payload || action.payload,
      };
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
  setShowSidebar,
  setCurrentItem,
  resetCurrentItem,
  setActivePlaceId,
  setShowExtendedBar,
  setShowHub,
  setShowWallet,
  setSidebarWidth,
  setShowMenuDropDown,
  setShowModal,
  setSearchIsActive,
  setExtendedSidebarWidth,
  setIsExtSearchActive,
  setActiveItem,
  setCurrentWalletId,
  setCurrenSubtWalletId,
  setCurrentWalletName,
  setShowPilot,
  setShowPilotIconView,
  setActiveSubCommunicationTabId,
  setActiveSubDetailsTabId,
} = wsSlice.actions;

export default wsSlice.reducer;
