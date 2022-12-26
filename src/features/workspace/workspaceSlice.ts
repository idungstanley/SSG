import { createSlice } from '@reduxjs/toolkit';


interface workspaceState {
workspace: string[],
showSidebar: boolean
currentItemId?: string | null
currentItemType?: string | null
}

const initialState: workspaceState = {
  workspace: [],
  showSidebar: true,
  currentItemId: null,
  currentItemType: null,
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
  createWorkspace, checkIfWs, setShowSidebar, setCurrentItem, resetCurrentItem,
} = wsSlice.actions;

export default wsSlice.reducer;
