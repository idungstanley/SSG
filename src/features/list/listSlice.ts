import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListColourProps } from '../../components/tasks/ListItem';

interface ListState {
  list: string[];
  currentListId: string | null | undefined;
  createTaskFromTop: boolean;
  delList: boolean;
  archiveList: boolean;
  toggleArchiveList: boolean;
  listColour: ListColourProps | undefined | string;
}

const initialState: ListState = {
  list: [],
  currentListId: null,
  createTaskFromTop: false,
  delList: false,
  archiveList: false,
  toggleArchiveList: false,
  listColour: { innerColour: 'white', outerColour: 'black' }
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
    setListPaletteColor(state, action: PayloadAction<ListColourProps | undefined | string>) {
      (state.listColour as ListColourProps).innerColour = (action.payload as ListColourProps).innerColour;
      (state.listColour as ListColourProps).outerColour = (action.payload as ListColourProps).outerColour;
    },
    setToggleArchiveList(state, action: PayloadAction<boolean>) {
      state.toggleArchiveList = action.payload;
    },
    setDeleteList(state, action: PayloadAction<boolean>) {
      state.delList = action.payload;
    },
    setCurrentListId(state, action: PayloadAction<string | null | undefined>) {
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
  setToggleArchiveList,
  setListPaletteColor
} = listSlice.actions;
export default listSlice.reducer;
