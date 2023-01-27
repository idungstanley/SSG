import { createSlice } from '@reduxjs/toolkit';

interface workspaceState {
  workspace: string[];
  showSidebar: boolean;
  currentItemId: string | null;
  currentItemType?: string | null;
  activePlaceId: number | null;
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
  currentWalletId: string | null;
  currentSubWalletId: string | null;
  currentWalletName: string | null;
}

const initialState: workspaceState = {
  workspace: [],
  showSidebar: true,
  currentItemId: null,
  currentItemType: null,
  activePlaceId: null,
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
  currentSubWalletId: null,
  currentWalletId: null,
  currentWalletName: null,
};

export const wsSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    createWorkspace(state, action) {
      state.workspace.push(action.payload);
    },
    setShowSidebar(state, action) {
      if (action.payload === 'CHANGE') {
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
    setExtendedSidebarWidth(state, action) {
      state.extendedSidebarWidth = action.payload;
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
      state.activePlaceId = action.payload;
    },
    setCurrentItem(state, action) {
      state.currentItemId = action.payload.currentItemId;
      state.currentItemType = action.payload.currentItemType;
    },
    setActiveItem(state, action) {
      state.activeItemId = action.payload.activeItemId;
      state.activeItemType = action.payload.activeItemType;
    },
    setCurrentWalletId(state, action) {
      state.currentWalletId = action.payload;
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
} = wsSlice.actions;

export default wsSlice.reducer;
