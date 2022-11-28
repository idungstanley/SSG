import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hub: [],
};

export const hubSlice = createSlice({
  name: 'hub',
  initialState,
  reducers: {
    createHub(state, action) {
      state.hub.push(action.payload);
    },

    getHub(state, action) {
      state.hub = action.payload;
    },
    chechIfHub: (state) => state,

  },
});

export const { createHub, getHub, chechIfHub } = hubSlice.actions;
export default hubSlice.reducer;
