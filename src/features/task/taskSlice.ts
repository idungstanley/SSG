import { createSlice } from "@reduxjs/toolkit";
import { tagItem } from "../../pages/workspace/pilot/components/details/properties/subDetailsIndex/PropertyDetails";
import { listColumnProps } from "../../pages/workspace/tasks/component/views/ListColumns";

export interface ImyTaskData {
  id: string;
  name: string;
  description: string | null;
  list_id: string;
  parent_id: string | null;
  priority:
    | string
    | null
    | [{ id: string; initials: string; colour: string; name: string }];
  start_date: string | null;
  end_date: string | null;
  status?: string | null;
  assignees?: [{ id: string; initials: string; colour: string; name: string }];
  updated_at?: string;
  created_at?: string;
  archived_at?: string | null;
  deleted_at?: string | null;
  [key: string]:
    | string
    | number
    | undefined
    | null
    | [{ id: string; initials: string; colour: string; name: string }]
    | tagItem[];
}

interface TaskState {
  task: string[];
  currentTaskIdForPilot: string | null;
  watchersData: string[];
  removeWatcherId: null;
  currTeamMemberId: null | string;
  myTaskData: ImyTaskData[];
  taskColumns: listColumnProps[];
  hideTask: listColumnProps[];
  current_task_id: null;
  listView: boolean;
  comfortableView: boolean;
  comfortableViewWrap: boolean;
  CompactView: boolean;
  CompactViewWrap: boolean;
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
  triggerAsssignTask: boolean;
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
  comfortableView: true,
  comfortableViewWrap: false,
  CompactView: false,
  CompactViewWrap: false,
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
  triggerAsssignTask: false,
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
    getComfortableView(state, action) {
      state.comfortableView = action.payload;
    },
    getComfortableViewWrap(state, action) {
      state.comfortableViewWrap = action.payload;
    },
    getCompactView(state, action) {
      state.CompactView = action.payload;
    },
    getCompactViewWrap(state, action) {
      state.CompactViewWrap = action.payload;
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
    checkIfTask: (state) => state,
    setTriggerAsssignTask(state, { payload }) {
      state.triggerAsssignTask = payload;
    },
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
  getComfortableView,
  getComfortableViewWrap,
  getCompactView,
  getCompactViewWrap,
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
  setTriggerAsssignTask,
} = taskSlice.actions;
export default taskSlice.reducer;
