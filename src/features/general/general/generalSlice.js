import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    test: false,
  },
  reducers: {
    setTest: (state, action) => {
      state.test = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTest,
} = generalSlice.actions;

export default generalSlice.reducer;
