import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hubs: [],
};

export const hubSlice = createSlice({
  name: 'hub',
  initialState,
  reducers: {
    createHub(state, action) {
      state.hub.push(action.payload);
    },
    chechIfHub: (state) => state,

  },
});

export const { createHub, chechIfHub } = hubSlice.actions;
export default hubSlice.reducer;
