import { createSlice } from '@reduxjs/toolkit';

interface workspaceState {
  workspace: string[];
  showSidebar: boolean;
  currentItemId: string | null;
  currentItemType?: string | null;
  activePlaceId: number | boolean;
  showExtendedBar: boolean;
  sidebarWidth: number;
  showHub: boolean;
  showWallet: boolean;
}

const initialState: workspaceState = {
  workspace: [],
  showSidebar: true,
  currentItemId: null,
  currentItemType: null,
  activePlaceId: 0,
  showExtendedBar: false,
  sidebarWidth: 270,
  showHub: false,
  showWallet: false,
};

export const wsSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    createWorkspace(state, action) {
      state.workspace.push(action.payload);
    },
    setShowSidebar(state, action) {
      state.showSidebar = action.payload;
    },
    setSidebarWidth(state, action) {
      state.sidebarWidth = action.payload;
    },
    setShowExtendedBar(state, action) {
      state.showExtendedBar = action.payload;
    },
    setShowHub(state, action){
      state.showHub = action.payload;
    },
    setShowWallet(state, action){
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
} = wsSlice.actions;

export default wsSlice.reducer;
