import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
import RecordRTC from 'recordrtc';
import {
  FilterFieldsWithOption,
  FiltersOption,
  FilterWithId
} from '../../components/TasksHeader/ui/Filter/types/filters';
import { DEFAULT_FILTERS_OPTION } from '../../components/TasksHeader/ui/Filter/config/filterConfig';
import { Header } from '../../components/Pilot/components/TimeClock/ClockLog';
import { isArrayOfStrings } from '../../utils/typeGuards';

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
      name: string;
    }
  ];
}
export interface ActiveTaskColumnProps {
  id: string;
  header: string;
}

export type SortOption = {
  dir: 'asc' | 'desc';
  field: string;
};

interface customPropertyInfo {
  name: string;
  type: string;
  color: string | null;
  style?: {
    is_bold?: string;
    is_italic?: string;
    is_underlined?: string;
  };
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

interface entityForCustom {
  id: string | undefined;
  type: string | undefined;
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
  meMode: boolean;
  showTaskNavigation: boolean;
  addNewTaskItem: boolean;
  selectedIndex: number | null;
  selectedIndexStatus: string | null;
  selectedIndexListId: string | null;
  hilightNewTask: boolean;
  closeTaskListView: boolean;
  toggleAssignCurrentTaskId: string | null | undefined;
  currentParentTaskId: string | null;
  getSubTaskId: null | string | undefined;
  initial_description: string | undefined;
  initial_start_date: null | undefined | string;
  initial_end_date: null | undefined | string;
  openUpdateEntryId: null | undefined | string;
  updateStatusModalId: string | null;
  updateStatusModalIdForPilot: null;
  currentTaskStatusId: string | null;
  currentTaskPriorityId: string | null | undefined;
  groupByStatus: string | null;
  showTaskUploadModal: boolean;
  timerStatus: boolean;
  sortAbleArr: SortOption[];
  sortArr: string[];
  timeSortStatus: boolean;
  timeArr: string[];
  timeSortArr: string[];
  timeLogColumnData: Header[];
  screenRecording: 'idle' | 'recording';
  recorder: RecordRTC | null;
  stream: MediaStream | null;
  updateCords: number;
  activeTaskColumn: ActiveTaskColumnProps;
  timerDetails: ITimerDetails;
  duration: IDuration;
  period: number | undefined;
  activeTimeOut: {
    clockLimit: number;
    timeoutReminder: number;
  };
  sortType: TaskKey;
  searchValue: string;
  assigneeIds: string[];
  selectedDate: ISelectedDate | null;
  HistoryFilterMemory: IHistoryFilterMemory | null;
  filters: FilterFieldsWithOption;
  statusId: string;
  currTaskListId: string;
  entityForCustom: entityForCustom;
  customSuggestionField: IExtraFields[];
  newTaskData: ImyTaskData | undefined;
  newCustomPropertyDetails: customPropertyInfo;
  editCustomProperty: IField | undefined;
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
  showTaskNavigation: false,
  addNewTaskItem: false,
  closeTaskListView: true,
  selectedIndex: null,
  selectedIndexStatus: null,
  selectedIndexListId: null,
  toggleAssignCurrentTaskId: null,
  currentParentTaskId: null,
  getSubTaskId: null,
  initial_description: '',
  initial_start_date: null,
  initial_end_date: null,
  openUpdateEntryId: null,
  updateStatusModalId: null,
  updateStatusModalIdForPilot: null,
  currentTaskStatusId: null,
  currentTaskPriorityId: null,
  groupByStatus: 'status',
  showTaskUploadModal: false,
  timerStatus: false,
  sortAbleArr: [],
  sortArr: [],
  timeSortStatus: false,
  timeArr: [],
  timeSortArr: [],
  timeLogColumnData: [],
  screenRecording: 'idle',
  stream: null,
  recorder: null,
  updateCords: Date.now(),
  activeTaskColumn: { id: '', header: '' },
  timerDetails: { description: '', isBillable: false },
  duration: { s: 0, m: 0, h: 0 },
  period: undefined,
  activeTimeOut: { clockLimit: 0, timeoutReminder: 0 },
  sortType: 'status',
  searchValue: '',
  assigneeIds: [],
  filters: {
    fields: [],
    option: DEFAULT_FILTERS_OPTION
  },
  selectedDate: null,
  HistoryFilterMemory: null,
  statusId: '',
  currTaskListId: '',
  entityForCustom: { id: undefined, type: undefined },
  customSuggestionField: [],
  newTaskData: undefined,
  newCustomPropertyDetails: {
    name: '',
    type: 'Select Property Type',
    color: null,
    style: {
      is_bold: '0',
      is_italic: '0',
      is_underlined: '0'
    }
  },
  editCustomProperty: undefined
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
    setSelectedIndex(state, action: PayloadAction<number | null>) {
      state.selectedIndex = action.payload;
    },
    setSelectedIndexStatus(state, action: PayloadAction<string>) {
      state.selectedIndexStatus = action.payload;
    },
    setSelectedIndexListId(state, action: PayloadAction<string>) {
      state.selectedIndexListId = action.payload;
    },
    setSortType(state, action: PayloadAction<TaskKey>) {
      state.sortType = action.payload;
    },
    setTaskIdForPilot(state, action: PayloadAction<string | null>) {
      state.currentTaskIdForPilot = action.payload;
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
    setActiveTaskColumn(state, action: PayloadAction<ActiveTaskColumnProps>) {
      state.activeTaskColumn = action.payload;
    },
    setShowTaskNavigation(state, action: PayloadAction<boolean>) {
      state.showTaskNavigation = action.payload;
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
    setGroupByStatus(state, action: PayloadAction<string | null>) {
      state.groupByStatus = action.payload;
    },
    setShowTaskUploadModal(state, action: PayloadAction<boolean>) {
      state.showTaskUploadModal = action.payload;
    },
    setTimerStatus(state, action: PayloadAction<boolean>) {
      state.timerStatus = action.payload;
    },
    setSortArray(state, action: PayloadAction<SortOption[]>) {
      state.sortAbleArr = action.payload;
    },
    setSortArr(state, action: PayloadAction<string[]>) {
      state.sortArr = action.payload;
    },
    setTimeSortStatus(state, action: PayloadAction<boolean>) {
      state.timeSortStatus = action.payload;
    },
    setTimeArr(state, action: PayloadAction<string[]>) {
      state.timeArr = action.payload;
    },
    setTimeSortArr(state, action: PayloadAction<string[] | Header[]>) {
      isArrayOfStrings(action.payload)
        ? (state.timeSortArr = action.payload)
        : (state.timeLogColumnData = action.payload);
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
    setActiveTimeout(state, action: PayloadAction<{ clockLimit: number; timeoutReminder: number }>) {
      state.activeTimeOut = action.payload;
    },
    setTaskSelectedDate(state, action: PayloadAction<ISelectedDate | null>) {
      state.selectedDate = action.payload;
    },
    setHistoryMemory(state, action: PayloadAction<IHistoryFilterMemory | null>) {
      state.HistoryFilterMemory = action.payload;
    },
    setEntityForCustom(state, action: PayloadAction<entityForCustom>) {
      state.entityForCustom = action.payload;
    },
    setCustomSuggetionsField(state, action: PayloadAction<IExtraFields>) {
      state.customSuggestionField = [...state.customSuggestionField, action.payload];
    },
    setNewCustomPropertyDetails(state, action: PayloadAction<customPropertyInfo>) {
      state.newCustomPropertyDetails = action.payload;
    },
    setEditCustomProperty(state, action: PayloadAction<IField | undefined>) {
      state.editCustomProperty = action.payload;
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
  setTaskIdForPilot,
  setCurrTeamMemId,
  getTaskColumns,
  getComfortableView,
  getComfortableViewWrap,
  getVerticalGrid,
  getSingleLineView,
  getTaskUpperCase,
  getVerticalGridlinesTask,
  getCompactView,
  getCompactViewWrap,
  setSelectedIndex,
  setSelectedIndexStatus,
  setSelectedIndexListId,
  setHilightNewTask,
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
  setUpdateEntries,
  setUpdateStatusModalId,
  setCurrentTaskStatusId,
  setCurrentTaskPriorityId,
  setGroupByStatus,
  setShowTaskUploadModal,
  setTimerStatus,
  setTimerDetails,
  setSortArray,
  setSortArr,
  setTimeSortStatus,
  setTimeArr,
  setTimeSortArr,
  setScreenRecording,
  setScreenRecordingMedia,
  setUpdateCords,
  setActiveTaskColumn,
  setUpdateTimerDuration,
  setStopTimer,
  setTimerInterval,
  setActiveTimeout,
  setSortType,
  setTaskSelectedDate,
  setHistoryMemory,
  setEntityForCustom,
  setCustomSuggetionsField,
  setNewCustomPropertyDetails,
  setEditCustomProperty
} = taskSlice.actions;
export default taskSlice.reducer;
