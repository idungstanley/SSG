import { createSlice } from '@reduxjs/toolkit';

export interface ImyTaskData {
  id: string;
  name: string;
  description: string | null;
  list_id: string;
  parent_id: string | null;
  priority: string | null;
  start_date: string | null;
  end_date: string | null;
  assignees: string[];
  group_assignees: string[];
  updated_at: string;
  created_at: string;
  archived_at: string | null;
  deleted_at: string | null;
  directory_items: string[];
}

interface TaskState {
  task: string[];
  currentTaskIdForPilot: null;
  watchersData: string[];
  removeWatcherId: null;
  currTeamMemberId: null;
  myTaskData: ImyTaskData[];
  current_task_id: null;
  listView: boolean;
  tableView: boolean;
  showTaskNavigation: boolean;
  addNewTaskItem: boolean;
  closeTaskListView: boolean;
  toggleAssignCurrentTaskId: null;
  currentParentTaskId: null;
  getSubTaskId: null;
  currentParentSubTaskId: null;
  currentParentSubTaskId2: null;
  currentParentSubTaskId3: null;
  currentParentSubTaskId4: null;
  initial_description: string;
  initial_start_date: null;
  initial_end_date: null;
  openUpdateEntryId: null;
  updateStatusModalId: null;
  updateStatusModalIdForPilot: null;
}

const initialState: TaskState = {
  task: [],
  currentTaskIdForPilot: null,
  watchersData: [],
  currTeamMemberId: null,
  removeWatcherId: null,
  myTaskData: [],
  current_task_id: null,
  listView: true,
  tableView: false,
  showTaskNavigation: false,
  addNewTaskItem: false,
  closeTaskListView: true,
  toggleAssignCurrentTaskId: null,
  currentParentTaskId: null,
  getSubTaskId: null,
  currentParentSubTaskId: null,
  currentParentSubTaskId2: null,
  currentParentSubTaskId3: null,
  currentParentSubTaskId4: null,
  initial_description: '',
  initial_start_date: null,
  initial_end_date: null,
  openUpdateEntryId: null,
  updateStatusModalId: null,
  updateStatusModalIdForPilot: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTaskSlice(state, action) {
      state.task.push(action.payload);
    },
    setTaskIdForPilot(state, action) {
      state.currentTaskIdForPilot = action.payload;
    },
    getTaskData(state, action) {
      const taskDataArray = action.payload;
      // taskDataArray.unshift(myObj);
      if (taskDataArray) {
        state.myTaskData = taskDataArray;
      }
    },
    getListView(state, action) {
      state.listView = action.payload;
    },
    setAddNewTaskItem(state, action) {
      state.addNewTaskItem = action.payload;
    },
    getTableView(state, action) {
      state.tableView = action.payload;
    },

    setShowTaskNavigation(state, action) {
      state.showTaskNavigation = action.payload;
    },

    setWatchersData(state, action) {
      state.watchersData.push(action.payload);
    },
    setRmWatcher(state, action) {
      state.removeWatcherId = action.payload;
    },

    setCurrTeamMemId(state, action) {
      state.currTeamMemberId = action.payload;
    },

    setCurrentTaskId(state, action) {
      state.current_task_id = action.payload;
    },
    setCloseTaskListView(state, action) {
      state.closeTaskListView = action.payload;
    },
    setToggleAssignCurrentTaskId(state, action) {
      state.toggleAssignCurrentTaskId = action.payload;
    },
    setCurrentParentTaskId(state, action) {
      state.currentParentTaskId = action.payload;
    },
    setGetSubTaskId(state, action) {
      state.getSubTaskId = action.payload;
    },
    setCurrentParentSubTaskId(state, action) {
      state.currentParentSubTaskId = action.payload;
    },
    setCurrentParentSubTaskId2(state, action) {
      state.currentParentSubTaskId2 = action.payload;
    },
    setCurrentParentSubTaskId3(state, action) {
      state.currentParentSubTaskId3 = action.payload;
    },
    setCurrentParentSubTaskId4(state, action) {
      state.currentParentSubTaskId4 = action.payload;
    },
    setUpdateEntries(state, action) {
      state.initial_description = action.payload.initial_description;
      state.initial_start_date = action.payload.initial_start_date;
      state.initial_end_date = action.payload.initial_end_date;
      state.openUpdateEntryId = action.payload.openUpdateEntryId;
    },
    setUpdateStatusModalId(state, action) {
      state.updateStatusModalId = action.payload;
    },
    checkIfTask: (state) => state,
  },
});

export const {
  createTaskSlice,
  setTaskIdForPilot,
  checkIfTask,
  setWatchersData,
  setCurrTeamMemId,
  getTaskData,
  getListView,
  getTableView,
  setShowTaskNavigation,
  setRmWatcher,
  setCurrentTaskId,
  setAddNewTaskItem,
  setCloseTaskListView,
  setToggleAssignCurrentTaskId,
  setCurrentParentTaskId,
  setGetSubTaskId,
  setCurrentParentSubTaskId,
  setCurrentParentSubTaskId2,
  setCurrentParentSubTaskId3,
  setCurrentParentSubTaskId4,
  setUpdateEntries,
  setUpdateStatusModalId,
} = taskSlice.actions;
export default taskSlice.reducer;
