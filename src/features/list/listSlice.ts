import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListColourProps } from '../../components/tasks/ListItem';
import { TaskId } from '../task/interface.tasks';

interface ListState {
  list: string[];
  currentListId: string | null | undefined;
  createTaskFromTop: boolean;
  delList: boolean;
  archiveList: boolean;
  toggleArchiveList: boolean;
  listColour: ListColourProps | undefined | string;
  editList: boolean;
  draggableTaskId: null | TaskId;
}

const initialState: ListState = {
  list: [],
  currentListId: null,
  createTaskFromTop: false,
  delList: false,
  archiveList: false,
  toggleArchiveList: false,
  listColour: { innerColour: 'white', outerColour: 'black' },
  editList: false,
  draggableTaskId: null
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setDraggableItem: (state, action: PayloadAction<TaskId | null>) => {
      state.draggableTaskId = action.payload;
    },
    createList(state, action: PayloadAction<string>) {
      state.list.push(action.payload);
    },
    getList(state, action: PayloadAction<string[]>) {
      state.list = action.payload;
    },
    setArchiveList(state, action: PayloadAction<boolean>) {
      state.archiveList = action.payload;
    },
    setEditList(state, action: PayloadAction<boolean>) {
      state.editList = action.payload;
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
  setDraggableItem,
  createList,
  checkIfList,
  getList,
  setCurrentListId,
  setCreateTaskFromTop,
  setDeleteList,
  setArchiveList,
  setToggleArchiveList,
  setListPaletteColor,
  setEditList
} = listSlice.actions;
export default listSlice.reducer;
