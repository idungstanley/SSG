import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    createList(state, action) {
      state.list.push(action.payload);
    },
    getList(state, action) {
      state.list = action.payload;
    },
    checkIfList: (state) => state,
  },
});

export const { createList, checkIfList, getList } = listSlice.actions;
export default listSlice.reducer;
