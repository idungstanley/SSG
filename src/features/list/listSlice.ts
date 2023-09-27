import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListColourProps } from '../../components/tasks/ListItem';
import { ITaskFullList, TaskId } from '../task/interface.tasks';
import { StatusTaskListProps } from './list.interfaces';
import { IList } from '../hubs/hubs.interfaces';

interface ListState {
  list: string[];
  currentListId: string | null | undefined;
  createTaskFromTop: boolean;
  archiveList: boolean;
  toggleArchiveList: boolean;
  listColour: ListColourProps | undefined | string;
  editList: boolean;
  draggableItemId: null | TaskId;
  draggableTask: null | ITaskFullList;
  dragOverTask: null | ITaskFullList;
  dragOverList: null | IList;
  dragOverItemId: null | string;
  statusTaskListDetails: StatusTaskListProps;
}

const initialState: ListState = {
  list: [],
  currentListId: null,
  createTaskFromTop: false,
  archiveList: false,
  toggleArchiveList: false,
  listColour: { innerColour: 'white', outerColour: 'black' },
  editList: false,
  draggableItemId: null,
  draggableTask: null,
  dragOverTask: null,
  dragOverList: null,
  dragOverItemId: null,
  statusTaskListDetails: { listId: undefined, listName: undefined }
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setDraggableItem: (state, action: PayloadAction<TaskId | null>) => {
      state.draggableItemId = action.payload;
    },
    setDraggableTask: (state, action: PayloadAction<ITaskFullList>) => {
      state.draggableTask = action.payload;
    },
    setDragOverTask: (state, action: PayloadAction<ITaskFullList | null>) => {
      state.dragOverTask = action.payload;
    },
    setDragOverList: (state, action: PayloadAction<IList | null>) => {
      state.dragOverList = action.payload;
    },
    setDragOverItem: (state, action: PayloadAction<TaskId | null>) => {
      state.dragOverItemId = action.payload;
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
    setStatusTaskListDetails(state, action: PayloadAction<StatusTaskListProps>) {
      state.statusTaskListDetails = action.payload;
    },
    setListPaletteColor(state, action: PayloadAction<ListColourProps | undefined | string>) {
      (state.listColour as ListColourProps).innerColour = (action.payload as ListColourProps).innerColour;
      (state.listColour as ListColourProps).outerColour = (action.payload as ListColourProps).outerColour;
    },
    setToggleArchiveList(state, action: PayloadAction<boolean>) {
      state.toggleArchiveList = action.payload;
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
  setDraggableTask,
  setDragOverTask,
  setDragOverList,
  createList,
  checkIfList,
  getList,
  setCurrentListId,
  setCreateTaskFromTop,
  setArchiveList,
  setToggleArchiveList,
  setListPaletteColor,
  setEditList,
  setDragOverItem,
  setStatusTaskListDetails
} = listSlice.actions;
export default listSlice.reducer;
