import { createSlice } from '@reduxjs/toolkit';

interface ListState {
  list: string[];
  currentListId: null;
}

const initialState: ListState = {
  list: [],
  currentListId: null,
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
    setCurrentListId(state, action) {
      state.currentListId = action.payload;
    },
    checkIfList: (state) => state,
  },
});

export const { createList, checkIfList, getList, setCurrentListId } =
  listSlice.actions;
export default listSlice.reducer;
