import { createSlice } from '@reduxjs/toolkit';

interface ListState {
  list: string[];
  currentListId: null;
  delList: boolean;
  archiveList: boolean;
  toggleArchiveList: boolean;
}

const initialState: ListState = {
  list: [],
  currentListId: null,
  delList: false,
  archiveList: false,
  toggleArchiveList: false,
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
    setArchiveList(state, action) {
      state.archiveList = action.payload;
    },
    setToggleArchiveList(state, action) {
      state.toggleArchiveList = action.payload;
    },
    setDeleteList(state, action) {
      state.delList = action.payload;
    },
    setCurrentListId(state, action) {
      state.currentListId = action.payload;
    },
    checkIfList: (state) => state,
  },
});

export const {
  createList,
  checkIfList,
  getList,
  setCurrentListId,
  setDeleteList,
  setArchiveList,
  setToggleArchiveList,
} = listSlice.actions;
export default listSlice.reducer;
