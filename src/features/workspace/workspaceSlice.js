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
  },
});

export const { createWorkspace } = wsSlice.actions;

export default wsSlice.reducer;
