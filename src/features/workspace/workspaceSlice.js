import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workspace: [],
};

export const wsSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    createWorkspace(state, action) {
      state.workspace.push(action.payload);
    },
    checkIfWs: (state) => state,
  },
});

export const { createWorkspace, checkIfWs } = wsSlice.actions;

export default wsSlice.reducer;
