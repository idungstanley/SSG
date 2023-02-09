import { createSlice } from "@reduxjs/toolkit";

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
  currentTaskIdForPilot: any;
  watchersData: string[];
  removeWatcherId: null;
  currTeamMemberId: null;
  myTaskData: ImyTaskData[];
  taskColumns: any[];
  hideTask: any[];
  current_task_id: null;
  listView: boolean;
  tableView: boolean;
  boardView: boolean;
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
  currentTaskStatusId: null;
  currentTaskPriorityId: null;
  currentTaskIdForTag: null;
  unAssignTadId: null;
  renameTagId: null;
  showTagColorDialogueBox: boolean;
}

const initialState: TaskState = {
  task: [],
  currentTaskIdForPilot: null,
  watchersData: [],
  currTeamMemberId: null,
  removeWatcherId: null,
  myTaskData: [],
  taskColumns: [],
  hideTask: [],
  current_task_id: null,
  listView: true,
  tableView: false,
  boardView: false,
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
  initial_description: "",
  initial_start_date: null,
  initial_end_date: null,
  openUpdateEntryId: null,
  updateStatusModalId: null,
  updateStatusModalIdForPilot: null,
  currentTaskStatusId: null,
  currentTaskPriorityId: null,
  currentTaskIdForTag: null,
  unAssignTadId: null,
  renameTagId: null,
  showTagColorDialogueBox: false,
};

export const taskSlice = createSlice({
  name: "task",
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

    getTaskColumns(state, action) {
      state.taskColumns = action.payload;
    },
    hideTaskColumns(state, action) {
      return {
        ...state,
        hideTask:
          state.hideTask.length != 0
            ? state.hideTask.map((prev) => {
                if (prev.field === action.payload) {
                  return {
                    ...prev,
                    hidden: !prev.hidden,
                  };
                } else {
                  return prev;
                }
              })
            : state.taskColumns.map((prev) => {
                if (prev.field === action.payload) {
                  return {
                    ...prev,
                    hidden: !prev.hidden,
                  };
                } else {
                  return prev;
                }
              }),
      };
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
    getBoardView(state, action) {
      state.boardView = action.payload;
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
    setCurrentTaskStatusId(state, action) {
      state.currentTaskStatusId = action.payload;
    },
    setCurrentTaskPriorityId(state, action) {
      state.currentTaskPriorityId = action.payload;
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
    setCurrentTaskIdForTag(state, action) {
      state.currentTaskIdForTag = action.payload;
    },
    setRenameTagId(state, action) {
      state.renameTagId = action.payload;
    },
    setShowTagColorDialogBox(state, action) {
      state.showTagColorDialogueBox = action.payload;
    },
    triggerUnassignTag(state, action) {
      state.unAssignTadId = action.payload.unAssignTadId;
      state.currentTaskIdForTag = action.payload.currentTaskIdForTag;
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
  getTaskColumns,
  getListView,
  getTableView,
  getBoardView,
  setShowTaskNavigation,
  setRmWatcher,
  setCurrentTaskId,
  setAddNewTaskItem,
  setCloseTaskListView,
  setToggleAssignCurrentTaskId,
  setCurrentParentTaskId,
  setGetSubTaskId,
  hideTaskColumns,
  setCurrentParentSubTaskId,
  setCurrentParentSubTaskId2,
  setCurrentParentSubTaskId3,
  setCurrentParentSubTaskId4,
  setUpdateEntries,
  setUpdateStatusModalId,
  setCurrentTaskStatusId,
  setCurrentTaskPriorityId,
  triggerUnassignTag,
  setCurrentTaskIdForTag,
  setRenameTagId,
  setShowTagColorDialogBox,
} = taskSlice.actions;
export default taskSlice.reducer;
