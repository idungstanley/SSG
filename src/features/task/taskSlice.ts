import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { tagItem } from '../../pages/workspace/pilot/components/details/properties/subDetailsIndex/PropertyDetails';
import { listColumnProps } from '../../pages/workspace/tasks/component/views/ListColumns';
import { IField } from '../list/list.interfaces';
import {
  IDuration,
  IExtraFields,
  IHistoryFilterMemory,
  IParent,
  ISelectedDate,
  ITimerDetails,
  Status,
  TaskKey
} from './interface.tasks';
import { SortOption } from '../../pages/workspace/tasks/component/views/listLevel/TaskListViews';
import RecordRTC from 'recordrtc';
import {
  FilterFieldsWithOption,
  FiltersOption,
  FilterWithId
} from '../../components/TasksHeader/ui/Filter/types/filters';
import { DateString } from '../../components/DatePicker/DatePicker';
import { DEFAULT_FILTERS_OPTION } from '../../components/TasksHeader/ui/Filter/config/filterConfig';

export interface ICustomField {
  id: string;
  task_id: null | string;
  custom_field_id: string;
  custom_field: IField;
  name: string;
  type: string;
  values: [
    {
      id: string;
      value: string;
    }
  ];
}
export interface ActiveTaskColumnProps {
  id: string;
  header: string;
}

export interface ImyTaskData {
  id: string;
  name: string;
  description: string | null;
  list_id: string;
  parent_id: string | null;
  priority: string | null | [{ id: string; initials: string; color: string; name: string }];
  start_date: string | null;
  descendants_count: number;
  checklist_items_count: number;
  checklist_done_items_count: number;
  has_descendants: boolean;
  has_attachments: boolean;
  end_date: string | null;
  status: Status;
  assignees?: [{ id: string; initials: string; color: string; name: string; avatar_path: string | null }];
  group_assignees?: {
    color: string;
    id: string;
    initials: string;
    name: string;
  }[];
  updated_at?: string;
  created_at?: string;
  archived_at?: string | null;
  deleted_at?: string | null;
  custom_fields: ICustomField[];
  list?: { id: string; name: string; parent: IParent };
}

export interface ImyTaskData2 {
  id?: string;
  name?: string;
  description?: string | null;
  list_id?: string;
  list?: { id: string; name: string; parent: IParent };
  parent_id?: string | null;
  priority?: string | null | [{ id: string; initials: string; color: string; name: string }];
  start_date?: string | null;
  end_date?: string | null;
  status?: string | null;
  tags?: [];
  directory_items?: [];
  assignees?: [{ id: string; initials: string; color: string; name: string }];
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
    | [{ id: string; initials: string; color: string; name: string }];
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
  currentTaskId: string | null;
  selectedTasksArray: string[];
  listView: boolean;
  comfortableView: boolean;
  comfortableViewWrap: boolean;
  verticalGrid: boolean;
  showNewTaskField: boolean;
  showNewTaskId: string;
  singleLineView: boolean;
  toggleAllSubtask: boolean;
  CompactView: boolean;
  taskUpperCase: boolean;
  verticalGridlinesTask: boolean;
  CompactViewWrap: boolean;
  tableView: boolean;
  meMode: boolean;
  boardView: boolean;
  calenderView: boolean;
  mapView: boolean;
  taskStatus: string | null;
  showTaskNavigation: boolean;
  addNewTaskItem: boolean;
  selectedIndex: number | null;
  hilightNewTask: boolean;
  closeTaskListView: boolean;
  toggleAssignCurrentTaskId: string | null | undefined;
  currentParentTaskId: string | null;
  getSubTaskId: null | string | undefined;
  currentParentSubTaskId: null | string;
  currentParentSubTaskId2: null | string;
  currentParentSubTaskId3: null | string;
  currentParentSubTaskId4: string | null | undefined;
  initial_description: string | undefined;
  initial_start_date: null | undefined | string;
  initial_end_date: null | undefined | string;
  openUpdateEntryId: null | undefined | string;
  updateStatusModalId: string | null;
  updateStatusModalIdForPilot: null;
  currentTaskStatusId: string | null;
  currentTaskPriorityId: string | null | undefined;
  triggerAsssignTask: boolean;
  groupByStatus: string | null;
  showTaskUploadModal: boolean;
  timerStatus: boolean;
  filterTaskByAssigneeIds: string | null | undefined;
  sortAbleArr: SortOption[];
  sortArr: string[];
  timeArr: string[];
  timeSortArr: string[];
  screenRecording: 'idle' | 'recording';
  recorder: RecordRTC | null;
  stream: MediaStream | null;
  updateCords: number;
  activeTaskColumn: ActiveTaskColumnProps;
  timerDetails: ITimerDetails;
  duration: IDuration;
  fetchedTime: { h: number; m: number; s: number } | null;
  period: number | undefined;
  sortType: TaskKey;
  searchValue: string;
  assigneeIds: string[];
  selectedDate: ISelectedDate | null;
  HistoryFilterMemory: IHistoryFilterMemory | null;
  filters: FilterFieldsWithOption;
  FilterDateString: DateString | null;
  statusId: string;
  currTaskListId: string;
  newColInstance: [{ id: number; value: string }];
  listIdForCustom: string | undefined;
  listViewHeads: listColumnProps[];
  customSuggestionField: IExtraFields[];
  newTaskData: ImyTaskData | undefined;
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
  currentTaskId: null,
  listView: true,
  comfortableView: true,
  comfortableViewWrap: false,
  showNewTaskField: false,
  meMode: false,
  showNewTaskId: '',
  singleLineView: true,
  hilightNewTask: false,
  selectedTasksArray: [],
  verticalGrid: false,
  taskUpperCase: false,
  toggleAllSubtask: false,
  verticalGridlinesTask: true,
  CompactView: false,
  CompactViewWrap: false,
  tableView: false,
  boardView: false,
  calenderView: false,
  mapView: false,
  taskStatus: null,
  showTaskNavigation: false,
  addNewTaskItem: false,
  closeTaskListView: true,
  selectedIndex: null,
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
  triggerAsssignTask: false,
  groupByStatus: 'status',
  showTaskUploadModal: false,
  timerStatus: false,
  filterTaskByAssigneeIds: null,
  sortAbleArr: [],
  sortArr: [],
  timeArr: [],
  timeSortArr: [],
  screenRecording: 'idle',
  stream: null,
  recorder: null,
  updateCords: Date.now(),
  activeTaskColumn: { id: '', header: '' },
  timerDetails: { description: '', isBillable: false },
  duration: { s: 0, m: 0, h: 0 },
  fetchedTime: null,
  period: undefined,
  sortType: 'status',
  searchValue: '',
  assigneeIds: [],
  filters: {
    fields: [],
    option: DEFAULT_FILTERS_OPTION
  },
  selectedDate: null,
  HistoryFilterMemory: null,
  FilterDateString: null,
  statusId: '',
  currTaskListId: '',
  newColInstance: [{ id: 1, value: '' }],
  listIdForCustom: '',
  listViewHeads: [],
  customSuggestionField: [],
  newTaskData: undefined
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setFilterFields(state, action: PayloadAction<FilterWithId[]>) {
      state.filters = { ...state.filters, fields: action.payload };
    },
    setFilterOption(state, action: PayloadAction<FiltersOption>) {
      state.filters = { ...state.filters, option: action.payload };
    },
    setAssigneeIds(state, action: PayloadAction<string[]>) {
      state.assigneeIds = action.payload;
    },
    setStatusId(state, action: PayloadAction<string>) {
      state.statusId = action.payload;
    },
    setCurrTaskListId(state, action: PayloadAction<string>) {
      state.currTaskListId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSelectedIndex(state, action: PayloadAction<number>) {
      state.selectedIndex = action.payload;
    },
    setSortType(state, action: PayloadAction<TaskKey>) {
      state.sortType = action.payload;
    },
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
    setHilightNewTask(state, action: PayloadAction<boolean>) {
      state.hilightNewTask = action.payload;
    },
    setMeMode(state, action: PayloadAction<boolean>) {
      state.meMode = action.payload;
    },
    setToggleAllSubtask(state, action: PayloadAction<boolean>) {
      state.toggleAllSubtask = action.payload;
    },
    setShowNewTaskField(state, action: PayloadAction<boolean>) {
      state.showNewTaskField = action.payload;
    },
    setShowNewTaskId(state, action: PayloadAction<string>) {
      state.showNewTaskId = action.payload;
    },
    getTaskUpperCase(state, action: PayloadAction<boolean>) {
      state.taskUpperCase = action.payload;
    },
    getVerticalGridlinesTask(state, action: PayloadAction<boolean>) {
      state.verticalGridlinesTask = action.payload;
    },
    setSelectedTasksArray(state, action: PayloadAction<string[]>) {
      state.selectedTasksArray = action.payload;
    },
    getSingleLineView(state, action: PayloadAction<boolean>) {
      state.singleLineView = action.payload;
    },
    getVerticalGrid(state, action: PayloadAction<boolean>) {
      state.verticalGrid = action.payload;
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
    setActiveTaskColumn(state, action: PayloadAction<ActiveTaskColumnProps>) {
      state.activeTaskColumn = action.payload;
    },
    getCalendeView(state, action: PayloadAction<boolean>) {
      state.calenderView = action.payload;
    },
    getMapView(state, action: PayloadAction<boolean>) {
      state.mapView = action.payload;
    },
    setTaskStatus(state, action: PayloadAction<string | null>) {
      state.taskStatus = action.payload;
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

    setCurrentTaskId(state, action: PayloadAction<string | null>) {
      state.currentTaskId = action.payload;
    },
    setCloseTaskListView(state, action: PayloadAction<boolean>) {
      state.closeTaskListView = action.payload;
    },
    setToggleAssignCurrentTaskId(state, action: PayloadAction<string | null | undefined>) {
      state.toggleAssignCurrentTaskId = action.payload;
    },
    setCurrentParentTaskId(state, action: PayloadAction<string | null>) {
      state.currentParentTaskId = action.payload;
    },
    setGetSubTaskId(state, action: PayloadAction<null | string | undefined>) {
      state.getSubTaskId = action.payload;
    },
    setCurrentParentSubTaskId(state, action: PayloadAction<null | string>) {
      state.currentParentSubTaskId = action.payload;
    },
    setCurrentParentSubTaskId2(state, action: PayloadAction<null | string>) {
      state.currentParentSubTaskId2 = action.payload;
    },
    setCurrentParentSubTaskId3(state, action: PayloadAction<null | string>) {
      state.currentParentSubTaskId3 = action.payload;
    },
    setCurrentParentSubTaskId4(state, action: PayloadAction<null | string | undefined>) {
      state.currentParentSubTaskId4 = action.payload;
    },
    setCurrentTaskStatusId(state, action: PayloadAction<string | null>) {
      state.currentTaskStatusId = action.payload;
    },
    setCurrentTaskPriorityId(state, action: PayloadAction<string | null | undefined>) {
      state.currentTaskPriorityId = action.payload;
    },
    setUpdateEntries(
      state,
      action: PayloadAction<{
        initial_description?: string | undefined;
        initial_start_date?: null | undefined | string;
        initial_end_date?: null | undefined | string;
        openUpdateEntryId?: null | undefined | string;
      }>
    ) {
      state.initial_description = action.payload.initial_description;
      state.initial_start_date = action.payload.initial_start_date;
      state.initial_end_date = action.payload.initial_end_date;
      state.openUpdateEntryId = action.payload.openUpdateEntryId;
    },
    setUpdateStatusModalId(state, action: PayloadAction<string | null>) {
      state.updateStatusModalId = action.payload;
    },
    checkIfTask: (state) => state,
    setTriggerAsssignTask(state, action: PayloadAction<boolean>) {
      state.triggerAsssignTask = action.payload;
    },
    setGroupByStatus(state, action: PayloadAction<string | null>) {
      state.groupByStatus = action.payload;
    },
    setShowTaskUploadModal(state, action: PayloadAction<boolean>) {
      state.showTaskUploadModal = action.payload;
    },
    setTimerStatus(state, action: PayloadAction<boolean>) {
      state.timerStatus = action.payload;
    },
    setFilterTaskByAssigneeIds(state, action: PayloadAction<string | null | undefined>) {
      state.filterTaskByAssigneeIds = action.payload;
    },
    setSortArray(state, action: PayloadAction<SortOption[]>) {
      state.sortAbleArr = action.payload;
    },
    setSortArr(state, action: PayloadAction<string[]>) {
      state.sortArr = action.payload;
    },
    setTimeArr(state, action: PayloadAction<string[]>) {
      state.timeArr = action.payload;
    },
    setTimeSortArr(state, action: PayloadAction<string[]>) {
      state.timeSortArr = action.payload;
    },
    setScreenRecording(state, action: PayloadAction<'idle' | 'recording'>) {
      state.screenRecording = action.payload;
    },
    setScreenRecordingMedia(state, action: PayloadAction<{ recorder: RecordRTC | null; stream: MediaStream | null }>) {
      const { recorder, stream } = action.payload;
      state.stream = stream;
      state.recorder = recorder;
    },
    setUpdateCords(state) {
      state.updateCords = Date.now();
    },
    setUpdateTimerDuration(state, action: PayloadAction<IDuration>) {
      state.duration = action.payload;
    },
    setStopTimer(state) {
      state.timerStatus = !state.timerStatus;
    },
    setTimerDetails(state, action: PayloadAction<ITimerDetails>) {
      state.timerDetails = action.payload;
    },
    setTimerInterval(state, action: PayloadAction<number | undefined>) {
      state.period = action.payload;
    },
    setTaskSelectedDate(state, action: PayloadAction<ISelectedDate | null>) {
      state.selectedDate = action.payload;
    },
    setHistoryMemory(state, action: PayloadAction<IHistoryFilterMemory | null>) {
      state.HistoryFilterMemory = action.payload;
    },
    setFilterDateString(state, action: PayloadAction<DateString | null>) {
      state.FilterDateString = action.payload;
    },
    setFetchedTime(state, action: PayloadAction<{ h: number; m: number; s: number } | null>) {
      state.fetchedTime = action.payload;
    },
    setNewColInstance(state, action: PayloadAction<{ id: number; value: string }>) {
      state.newColInstance.push(action.payload);
    },
    setListIdForCustom(state, action: PayloadAction<string | undefined>) {
      state.listIdForCustom = action.payload;
    },
    setHeads(state, action: PayloadAction<listColumnProps[]>) {
      state.listViewHeads = action.payload;
    },
    setCustomSuggetionsField(state, action: PayloadAction<IExtraFields>) {
      state.customSuggestionField = [...state.customSuggestionField, action.payload];
    },
    setNewTask(state, action: PayloadAction<ImyTaskData | undefined>) {
      state.newTaskData = action.payload;
    }
  }
});

export const {
  setFilterFields,
  setFilterOption,
  setAssigneeIds,
  setStatusId,
  setCurrTaskListId,
  setSearchValue,
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
  getVerticalGrid,
  getSingleLineView,
  getTaskUpperCase,
  getVerticalGridlinesTask,
  getCompactView,
  getCompactViewWrap,
  setSelectedIndex,
  getTableView,
  getBoardView,
  getCalendeView,
  setHilightNewTask,
  getMapView,
  setTaskStatus,
  setMeMode,
  setShowTaskNavigation,
  setShowNewTaskField,
  setShowNewTaskId,
  setRmWatcher,
  setCurrentTaskId,
  setToggleAllSubtask,
  setSelectedTasksArray,
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
  setGroupByStatus,
  setShowTaskUploadModal,
  setTimerStatus,
  setTimerDetails,
  setFilterTaskByAssigneeIds,
  setSortArray,
  setSortArr,
  setTimeArr,
  setTimeSortArr,
  setScreenRecording,
  setScreenRecordingMedia,
  setUpdateCords,
  setActiveTaskColumn,
  setUpdateTimerDuration,
  setFetchedTime,
  setStopTimer,
  setTimerInterval,
  setSortType,
  setTaskSelectedDate,
  setHistoryMemory,
  setFilterDateString,
  setNewColInstance,
  setListIdForCustom,
  setHeads,
  setCustomSuggetionsField,
  setNewTask
} = taskSlice.actions;
export default taskSlice.reducer;
