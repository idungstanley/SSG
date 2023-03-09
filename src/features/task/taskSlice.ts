import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { tagItem } from '../../pages/workspace/pilot/components/details/properties/subDetailsIndex/PropertyDetails';
import { listColumnProps } from '../../pages/workspace/tasks/component/views/ListColumns';
import { IParent } from './interface.tasks';

export interface ImyTaskData {
  id: string;
  name: string;
  description: string | null;
  list_id: string;
  parent_id: string | null;
  priority: string | null | [{ id: string; initials: string; colour: string; name: string }];
  start_date: string | null;
  end_date: string | null;
  status?: string | null;
  assignees?: [{ id: string; initials: string; colour: string; name: string }];
  updated_at?: string;
  created_at?: string;
  archived_at?: string | null;
  deleted_at?: string | null;
  [key: string]: string | number | undefined | null | [{ id: string; initials: string; colour: string; name: string }];
}

export interface ImyTaskData2 {
  id?: string;
  name?: string;
  description?: string | null;
  list_id?: string;
  list?: { id: string; name: string; parent: IParent };
  parent_id?: string | null;
  priority?: string | null | [{ id: string; initials: string; colour: string; name: string }];
  start_date?: string | null;
  end_date?: string | null;
  status?: string | null;
  tags?: [];
  directory_items?: [];
  assignees?: [{ id: string; initials: string; colour: string; name: string }];
  updated_at?: string;
  created_at?: string;
  group_assignees?: [];
  custom_fields?: [];
  archived_at?: string | null;
  deleted_at?: string | null;
  [key: string]:
    | string
    | number
    | undefined
    | { id: string; name: string; parent: IParent }
    | []
    | null
    | [{ id: string; initials: string; colour: string; name: string }];
}

interface TaskState {
  task: string[];
  currentTaskIdForPilot: string | null;
  watchersData: string[];
  removeWatcherId: null | string;
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
  toggleAssignCurrentTaskId: null | undefined | string;
  currentParentTaskId: null;
  getSubTaskId: null;
  currentParentSubTaskId: null;
  currentParentSubTaskId2: null | string;
  currentParentSubTaskId3: null;
  currentParentSubTaskId4: string | null | undefined;
  initial_description: string | undefined;
  initial_start_date: null | undefined;
  initial_end_date: null | undefined;
  openUpdateEntryId: null | undefined;
  updateStatusModalId: null;
  updateStatusModalIdForPilot: null;
  currentTaskStatusId: null | string | undefined;
  currentTaskPriorityId: null | string | undefined;
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
  initial_description: '',
  initial_start_date: null,
  initial_end_date: null,
  openUpdateEntryId: null,
  updateStatusModalId: null,
  updateStatusModalIdForPilot: null,
  currentTaskStatusId: null,
  currentTaskPriorityId: null,
  triggerAsssignTask: false
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTaskSlice(state, action: PayloadAction<string>) {
      state.task.push(action.payload);
    },
    setTaskIdForPilot(state, action: PayloadAction<string | null>) {
      state.currentTaskIdForPilot = action.payload;
    },
    getTaskData(state, action: PayloadAction<{ id: string }[] | undefined>) {
      const taskDataArray = action.payload;
      // taskDataArray.unshift(myObj);
      if (taskDataArray) {
        state.myTaskData = taskDataArray as ImyTaskData[];
      }
    },
    getTaskColumns(state, action: PayloadAction<listColumnProps[]>) {
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
                    hidden: !prev.hidden
                  };
                } else {
                  return prev;
                }
              })
            : state.taskColumns.map((prev) => {
                if (prev.field === action.payload) {
                  return {
                    ...prev,
                    hidden: !prev.hidden
                  };
                } else {
                  return prev;
                }
              })
      };
    },

    getListView(state, action: PayloadAction<boolean>) {
      state.listView = action.payload;
    },
    getComfortableView(state, action: PayloadAction<boolean>) {
      state.comfortableView = action.payload;
    },
    getComfortableViewWrap(state, action: PayloadAction<boolean>) {
      state.comfortableViewWrap = action.payload;
    },
    getCompactView(state, action: PayloadAction<boolean>) {
      state.CompactView = action.payload;
    },
    getCompactViewWrap(state, action: PayloadAction<boolean>) {
      state.CompactViewWrap = action.payload;
    },
    setAddNewTaskItem(state, action: PayloadAction<boolean>) {
      state.addNewTaskItem = action.payload;
    },
    getTableView(state, action: PayloadAction<boolean>) {
      state.tableView = action.payload;
    },
    getBoardView(state, action: PayloadAction<boolean>) {
      state.boardView = action.payload;
    },

    setShowTaskNavigation(state, action: PayloadAction<boolean>) {
      state.showTaskNavigation = action.payload;
    },

    setWatchersData(state, action: PayloadAction<string>) {
      state.watchersData.push(action.payload);
    },
    setRmWatcher(state, action: PayloadAction<null | string>) {
      state.removeWatcherId = action.payload;
    },

    setCurrTeamMemId(state, action: PayloadAction<null | string>) {
      state.currTeamMemberId = action.payload;
    },

    setCurrentTaskId(state, action: PayloadAction<null>) {
      state.current_task_id = action.payload;
    },
    setCloseTaskListView(state, action: PayloadAction<boolean>) {
      state.closeTaskListView = action.payload;
    },
    setToggleAssignCurrentTaskId(state, action: PayloadAction<null | string | undefined>) {
      state.toggleAssignCurrentTaskId = action.payload;
    },
    setCurrentParentTaskId(state, action: PayloadAction<null>) {
      state.currentParentTaskId = action.payload;
    },
    setGetSubTaskId(state, action: PayloadAction<null>) {
      state.getSubTaskId = action.payload;
    },
    setCurrentParentSubTaskId(state, action: PayloadAction<null>) {
      state.currentParentSubTaskId = action.payload;
    },
    setCurrentParentSubTaskId2(state, action: PayloadAction<null | string>) {
      state.currentParentSubTaskId2 = action.payload;
    },
    setCurrentParentSubTaskId3(state, action: PayloadAction<null>) {
      state.currentParentSubTaskId3 = action.payload;
    },
    setCurrentParentSubTaskId4(state, action: PayloadAction<null | string | undefined>) {
      state.currentParentSubTaskId4 = action.payload;
    },
    setCurrentTaskStatusId(state, action: PayloadAction<null | string | undefined>) {
      state.currentTaskStatusId = action.payload;
    },
    setCurrentTaskPriorityId(state, action: PayloadAction<null | string | undefined>) {
      state.currentTaskPriorityId = action.payload;
    },
    setUpdateEntries(
      state,
      action: PayloadAction<{
        initial_description?: string | undefined;
        initial_start_date?: null | undefined;
        initial_end_date?: null | undefined;
        openUpdateEntryId?: null | undefined;
      }>
    ) {
      state.initial_description = action.payload.initial_description;
      state.initial_start_date = action.payload.initial_start_date;
      state.initial_end_date = action.payload.initial_end_date;
      state.openUpdateEntryId = action.payload.openUpdateEntryId;
    },
    setUpdateStatusModalId(state, action: PayloadAction<null>) {
      state.updateStatusModalId = action.payload;
    },
    checkIfTask: (state) => state,
    setTriggerAsssignTask(state, action: PayloadAction<boolean>) {
      state.triggerAsssignTask = action.payload;
    }
  }
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
  setTriggerAsssignTask
} = taskSlice.actions;
export default taskSlice.reducer;
