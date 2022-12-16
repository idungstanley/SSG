import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workspace: [],
  showSidebar: true,
  currentItemId: null,
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
    setCurrentItemId(state, action) {
      state.currentItemId = action.payload;
    },
    checkIfWs: (state) => state,
  },
});

export const {
  createWorkspace, checkIfWs, setShowSidebar, setCurrentItemId,
} = wsSlice.actions;

export default wsSlice.reducer;
