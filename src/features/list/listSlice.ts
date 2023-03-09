import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListState {
  list: string[];
  currentListId: string | null;
  createTaskFromTop: boolean;
  delList: boolean;
  archiveList: boolean;
  toggleArchiveList: boolean;
}

const initialState: ListState = {
  list: [],
  currentListId: null,
  createTaskFromTop: false,
  delList: false,
  archiveList: false,
  toggleArchiveList: false
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    createList(state, action: PayloadAction<string>) {
      state.list.push(action.payload);
    },
    getList(state, action: PayloadAction<string[]>) {
      state.list = action.payload;
    },
    setArchiveList(state, action: PayloadAction<boolean>) {
      state.archiveList = action.payload;
    },
    setToggleArchiveList(state, action: PayloadAction<boolean>) {
      state.toggleArchiveList = action.payload;
    },
    setDeleteList(state, action: PayloadAction<boolean>) {
      state.delList = action.payload;
    },
    setCurrentListId(state, action: PayloadAction<string | null>) {
      state.currentListId = action.payload;
    },
    setCreateTaskFromTop(state, action: PayloadAction<boolean>) {
      state.createTaskFromTop = action.payload;
    },
    checkIfList: (state) => state
  }
});

export const {
  createList,
  checkIfList,
  getList,
  setCurrentListId,
  setCreateTaskFromTop,
  setDeleteList,
  setArchiveList,
  setToggleArchiveList
} = listSlice.actions;
export default listSlice.reducer;
