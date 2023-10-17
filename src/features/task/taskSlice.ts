import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { listColumnProps } from '../../pages/workspace/tasks/component/views/ListColumns';
import { IField, IFieldValue, ITask_statuses } from '../list/list.interfaces';
import {
  Header,
  IDuration,
  IExtraFields,
  IHistoryFilterMemory,
  IParent,
  ISelectedDate,
  ITaskFullList,
  ITimeEntriesRes,
  ITimerDetails,
  Status,
  Tag,
  Task,
  TaskKey,
  teamMember
} from './interface.tasks';
import {
  FilterFieldsWithOption,
  FiltersOption,
  FilterWithId
} from '../../components/TasksHeader/ui/Filter/types/filters';
import { DEFAULT_FILTERS_OPTION } from '../../components/TasksHeader/ui/Filter/config/filterConfig';
import { ITeamMembersAndGroup } from '../settings/teamMembersAndGroups.interfaces';
import { ItaskViews } from '../hubs/hubs.interfaces';
import { ITeamMember } from '../workspace/workspace.interfaces';

export interface ICustomField {
  id: string;
  values: IFieldValue[];
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

export interface IDuplicateTaskObj {
  task_name: string;
  task_id: string;
  list_id: string;
  is_everything: boolean;
  popDuplicateTaskModal: boolean;
  fullTask: Task | null;
}

export interface ImyTaskData {
  id: string;
  name: string;
  description: string | null;
  list_id: string;
  parent_id: string | null;
  parentName?: string;
  priority: string | null | [{ id: string; initials: string; color: string; name: string }];
  start_date: string | null;
  descendants_count: number;
  closed_subtasks_count: number;
  checklist_items_count: number;
  checklist_done_items_count: number;
  task_statuses: ITask_statuses[];
  has_descendants: boolean;
  has_attachments: boolean;
  end_date: string | null;
  status: Status;
  assignees: ITeamMembersAndGroup[];
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
  custom_field_columns: IField[];
  list?: { id: string; name: string; parent: IParent; color?: string };
  tags: Tag[];
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

interface fileUploadPropsType {
  openModal: boolean;
  fieldId?: string;
  listId?: string;
  taskId?: string;
}

export interface IPreferenceState {
  flyoutToast: boolean;
  dontPostWithEnter: boolean;
  markdown: boolean;
  hotkeys: boolean;
  notepad: boolean;
}

export interface IUseSettingsProfile {
  hotkeys: string;
  is_json: number;
  key: string;
  resolution: null;
  value: boolean;
}

export const TWO_SUBTASKS_LEVELS = 'two_levels';
export const THREE_SUBTASKS_LEVELS = 'three_levels';

interface TaskState {
  tasks: Record<string, ITaskFullList[]>;
  subtasks: Record<string, ITaskFullList[]>;
  currentTaskIdForPilot: string | null;
  watchersData: string[];
  removeWatcherId: null | string;
  currTeamMemberId: null | string;
  preferenceState: IPreferenceState;
  userSettingsProfile: IUseSettingsProfile[];
  myTaskData: ImyTaskData[];
  taskColumns: listColumnProps[];
  hideTask: listColumnProps[];
  currentTaskId: string | null;
  newTaskPriority: string;
  selectedTasksArray: string[];
  selectedIndexListId: string | null;
  saveSettingLocal: { [key: string]: boolean } | null;
  saveSettingList: ItaskViews | undefined;
  saveSettingOnline: { [key: string]: boolean } | null;
  comfortableView: boolean;
  comfortableViewWrap: boolean;
  duplicateTaskObj: IDuplicateTaskObj;
  currentSelectedDuplicateArr: string[];
  verticalGrid: boolean;
  showNewTaskField: boolean;
  showNewTaskId: string;
  singleLineView: boolean;
  escapeKey: boolean;
  hilightNewlyCreatedTask: boolean;
  copyNewlyCreatedTask: boolean;
  toggleAllSubtask: boolean;
  toggleAllSubtaskSplit: string;
  separateSubtasksMode: boolean;
  CompactView: boolean;
  taskUpperCase: boolean;
  verticalGridlinesTask: boolean;
  splitSubTaskState: boolean;
  splitSubTaskLevels: string[];
  CompactViewWrap: boolean;
  triggerSaveSettings: boolean;
  triggerAutoSave: boolean;
  triggerSaveSettingsModal: boolean;
  meMode: boolean;
  autoSave: boolean;
  showTaskNavigation: boolean;
  addNewTaskItem: boolean;
  selectedIndex: number | null;
  defaultSubtaskListId: null | string;
  selectedIndexStatus: string | null;
  selectedListIds: string[];
  selectedTaskParentId: string;
  selectedTaskType: string;
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
  subtaskDefaultStatusId: string | null;
  timerStatus: boolean;
  timeType: string;
  sortAbleArr: SortOption[];
  sortArr: string[];
  timeSortStatus: boolean;
  timeArr: string[];
  timeSortArr: SortOption[];
  timeLogColumnData: Header[];
  screenRecording: 'idle' | 'recording';
  recorder: MediaRecorder | null;
  stream: MediaStream | null;
  updateCords: number;
  activeTaskColumn: ActiveTaskColumnProps;
  timerDetails: ITimerDetails;
  duration: IDuration;
  recorderDuration: IDuration;
  period: number | undefined;
  recorderPeriod: number | undefined;
  activeTimeOut: {
    clockLimit: number;
    timeoutReminder: number;
  };
  sortType: TaskKey;
  searchValue: string;
  assigneeIds: string[];
  selectedDate: ISelectedDate | null;
  HistoryFilterMemory: IHistoryFilterMemory | null;
  timeAssigneeFilter: ITimeEntriesRes | undefined;
  timeAssignees: teamMember[] | undefined;
  filters: FilterFieldsWithOption;
  subtasksfilters: Record<string, FilterFieldsWithOption>;
  isFiltersUpdated: boolean;
  isSubtasksFiltersUpdated: boolean;
  statusId: string;
  currTaskListId: string;
  entityForCustom: entityForCustom;
  customSuggestionField: IExtraFields[];
  newTaskData: ImyTaskData | undefined;
  newCustomPropertyDetails: customPropertyInfo;
  editCustomProperty: IField | undefined;
  dragToBecomeSubTask: boolean;
  fileUploadProps: fileUploadPropsType;
}

const initialState: TaskState = {
  tasks: {},
  subtasks: {},
  currentTaskIdForPilot: null,
  watchersData: [],
  currTeamMemberId: null,
  preferenceState: {
    flyoutToast: false,
    dontPostWithEnter: false,
    markdown: false,
    hotkeys: false,
    notepad: false
  },
  userSettingsProfile: [],
  removeWatcherId: null,
  myTaskData: [],
  taskColumns: [],
  hideTask: [],
  currentTaskId: null,
  comfortableView: true,
  comfortableViewWrap: false,
  showNewTaskField: false,
  meMode: false,
  escapeKey: false,
  hilightNewlyCreatedTask: false,
  copyNewlyCreatedTask: false,
  autoSave: false,
  showNewTaskId: '',
  singleLineView: false,
  saveSettingLocal: null,
  saveSettingList: undefined,
  saveSettingOnline: null,
  duplicateTaskObj: {
    task_name: '',
    task_id: '',
    list_id: '',
    is_everything: true,
    popDuplicateTaskModal: true,
    fullTask: null
  },
  selectedTasksArray: [],
  selectedIndexListId: null,
  verticalGrid: false,
  taskUpperCase: false,
  newTaskPriority: 'normal',
  currentSelectedDuplicateArr: [],
  triggerSaveSettings: false,
  triggerAutoSave: false,
  triggerSaveSettingsModal: false,
  toggleAllSubtask: false,
  toggleAllSubtaskSplit: '',
  verticalGridlinesTask: false,
  splitSubTaskState: false,
  splitSubTaskLevels: [],
  separateSubtasksMode: false,
  CompactView: false,
  CompactViewWrap: false,
  showTaskNavigation: false,
  addNewTaskItem: false,
  closeTaskListView: true,
  selectedIndex: null,
  subtaskDefaultStatusId: null,
  defaultSubtaskListId: null,
  selectedIndexStatus: null,
  selectedListIds: [],
  selectedTaskParentId: '',
  selectedTaskType: '',
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
  timeType: 'clock',
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
  timerDetails: { description: '', isBillable: false, label: '', tags: '' },
  duration: { s: 0, m: 0, h: 0 },
  recorderDuration: { s: 0, m: 0, h: 0 },
  period: undefined,
  recorderPeriod: undefined,
  activeTimeOut: { clockLimit: 0, timeoutReminder: 0 },
  sortType: 'status',
  searchValue: '',
  assigneeIds: [],
  filters: {
    fields: [],
    option: DEFAULT_FILTERS_OPTION
  },
  subtasksfilters: {},
  isFiltersUpdated: true,
  isSubtasksFiltersUpdated: false,
  selectedDate: null,
  HistoryFilterMemory: null,
  timeAssigneeFilter: undefined,
  timeAssignees: undefined,
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
  editCustomProperty: undefined,
  dragToBecomeSubTask: false,
  fileUploadProps: {
    fieldId: undefined,
    taskId: undefined,
    listId: undefined,
    openModal: false
  }
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Record<string, ITaskFullList[]>>) {
      state.tasks = action.payload;
    },
    setSubtasks(state, action: PayloadAction<Record<string, ITaskFullList[]>>) {
      state.subtasks = action.payload;
    },
    setFilterFields(state, action: PayloadAction<FilterWithId[]>) {
      state.filters = { ...state.filters, fields: action.payload };
    },
    setFilterOption(state, action: PayloadAction<FiltersOption>) {
      state.filters = { ...state.filters, option: action.payload };
    },
    setSubtasksFilters(state, action: PayloadAction<Record<string, FilterFieldsWithOption>>) {
      state.subtasksfilters = action.payload;
    },
    setPreferenceState(state, action: PayloadAction<IPreferenceState>) {
      state.preferenceState = action.payload;
    },
    setUserSettingsProfile(state, action: PayloadAction<IUseSettingsProfile[]>) {
      state.userSettingsProfile = action.payload;
    },
    setFiltersUpdated(state, action: PayloadAction<boolean>) {
      state.isFiltersUpdated = action.payload;
    },
    setSubtasksFiltersUpdated(state, action: PayloadAction<boolean>) {
      state.isSubtasksFiltersUpdated = action.payload;
    },
    setEscapeKey(state, action: PayloadAction<boolean>) {
      state.escapeKey = action.payload;
    },
    setHilightNewlyCreatedTask(state, action: PayloadAction<boolean>) {
      state.hilightNewlyCreatedTask = action.payload;
    },
    setCopyNewlyCreatedTask(state, action: PayloadAction<boolean>) {
      state.copyNewlyCreatedTask = action.payload;
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
    setDuplicateTaskObj(state, action: PayloadAction<IDuplicateTaskObj>) {
      state.duplicateTaskObj = action.payload;
    },
    setCurrentSelectedDuplicateArr(state, action: PayloadAction<string[]>) {
      state.currentSelectedDuplicateArr = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSaveSettingLocal(state, action: PayloadAction<{ [key: string]: boolean } | null>) {
      state.saveSettingLocal = action.payload;
    },
    setSaveSettingList(state, action: PayloadAction<ItaskViews | undefined>) {
      state.saveSettingList = action.payload;
    },
    setSaveSettingOnline(state, action: PayloadAction<{ [key: string]: boolean } | null>) {
      state.saveSettingOnline = action.payload;
    },
    setSelectedIndex(state, action: PayloadAction<number | null>) {
      state.selectedIndex = action.payload;
    },
    setSelectedIndexStatus(state, action: PayloadAction<string>) {
      state.selectedIndexStatus = action.payload;
    },
    setDefaultSubtaskId(state, action: PayloadAction<string | null>) {
      state.defaultSubtaskListId = action.payload;
    },
    setSubtaskDefaultStatusId(state, action: PayloadAction<string | null>) {
      state.subtaskDefaultStatusId = action.payload;
    },
    setSelectedListIds(state, action: PayloadAction<string[]>) {
      state.selectedListIds = action.payload;
    },
    setSelectedTaskParentId(state, action: PayloadAction<string>) {
      state.selectedTaskParentId = action.payload;
    },
    setSelectedTaskType(state, action: PayloadAction<string>) {
      state.selectedTaskType = action.payload;
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
        hideTask: state.hideTask.length
          ? state.hideTask.map((prev) => {
              if (prev.id === action.payload) {
                return {
                  ...prev,
                  hidden: !prev.hidden
                };
              }
              return prev;
            })
          : state.taskColumns.map((prev) => {
              if (prev.id === action.payload) {
                return {
                  ...prev,
                  hidden: !prev.hidden
                };
              }
              return prev;
            })
      };
    },
    getComfortableView(state, action: PayloadAction<boolean>) {
      state.comfortableView = action.payload;
    },
    setTriggerSaveSettings(state, action: PayloadAction<boolean>) {
      state.triggerSaveSettings = action.payload;
    },
    setTriggerAutoSave(state, action: PayloadAction<boolean>) {
      state.triggerAutoSave = action.payload;
    },
    setTriggerSaveSettingsModal(state, action: PayloadAction<boolean>) {
      state.triggerSaveSettingsModal = action.payload;
    },
    setDragToBecomeSubTask(state, action: PayloadAction<boolean>) {
      state.dragToBecomeSubTask = action.payload;
    },
    getComfortableViewWrap(state, action: PayloadAction<boolean>) {
      state.comfortableViewWrap = action.payload;
    },
    getCompactView(state, action: PayloadAction<boolean>) {
      state.CompactView = action.payload;
    },
    setMeMode(state, action: PayloadAction<boolean>) {
      state.meMode = action.payload;
    },
    setAutoSave(state, action: PayloadAction<boolean>) {
      state.autoSave = action.payload;
    },
    setToggleAllSubtask(state, action: PayloadAction<boolean>) {
      state.toggleAllSubtask = action.payload;
      state.separateSubtasksMode = false;
    },
    setSeparateSubtasksMode(state, action: PayloadAction<boolean>) {
      state.separateSubtasksMode = action.payload;
      state.toggleAllSubtask = false;
      state.toggleAllSubtaskSplit = '';
    },
    setToggleAllSubtaskSplit(state, action: PayloadAction<string>) {
      state.toggleAllSubtaskSplit = action.payload;
      state.toggleAllSubtask = false;
      state.separateSubtasksMode = false;
    },
    setShowNewTaskField(state, action: PayloadAction<boolean>) {
      state.showNewTaskField = action.payload;
    },
    setShowNewTaskId(state, action: PayloadAction<string>) {
      state.showNewTaskId = action.payload;
    },
    setNewTaskPriority(state, action: PayloadAction<string>) {
      state.newTaskPriority = action.payload;
    },
    getTaskUpperCase(state, action: PayloadAction<boolean>) {
      state.taskUpperCase = action.payload;
    },
    getVerticalGridlinesTask(state, action: PayloadAction<boolean>) {
      state.verticalGridlinesTask = action.payload;
    },
    getSplitSubTask(state, action: PayloadAction<boolean>) {
      state.splitSubTaskState = action.payload;
    },
    getSplitSubTaskLevels(state, action: PayloadAction<string[]>) {
      state.splitSubTaskLevels = action.payload;
    },
    setSelectedTasksArray(state, action: PayloadAction<string[]>) {
      state.selectedTasksArray = action.payload;
    },
    setSelectedIndexListId(state, action: PayloadAction<string | null>) {
      state.selectedIndexListId = action.payload;
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
    setTimeType(state, action: PayloadAction<string>) {
      state.timeType = action.payload;
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
    setTimeSortArr(state, action: PayloadAction<SortOption[]>) {
      state.timeSortArr = action.payload;
    },
    setTimeLogColumnData(state, action: PayloadAction<Header[]>) {
      state.timeLogColumnData = action.payload;
    },
    setScreenRecording(state, action: PayloadAction<'idle' | 'recording'>) {
      state.screenRecording = action.payload;
    },
    setScreenRecordingMedia(
      state,
      action: PayloadAction<{ recorder: MediaRecorder | null; stream: MediaStream | null }>
    ) {
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
    setUpdateRecoderDuration(state, action: PayloadAction<IDuration>) {
      state.recorderDuration = action.payload;
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
    setRecorderInterval(state, action: PayloadAction<number | undefined>) {
      state.recorderPeriod = action.payload;
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
    setTimeAssigneeFilter(state, action: PayloadAction<ITimeEntriesRes | undefined>) {
      state.timeAssigneeFilter = action.payload;
    },
    setTimeAssignee(state, action: PayloadAction<teamMember[] | undefined>) {
      state.timeAssignees = action.payload;
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
    },
    setOpenFileUploadModal(state, action: PayloadAction<fileUploadPropsType>) {
      state.fileUploadProps = action.payload;
    }
  }
});

export const {
  setTasks,
  setSubtasks,
  setFilterFields,
  setFilterOption,
  setSubtasksFilters,
  setFiltersUpdated,
  setSubtasksFiltersUpdated,
  setAssigneeIds,
  setStatusId,
  setCurrTaskListId,
  setSearchValue,
  setTaskIdForPilot,
  setCurrTeamMemId,
  setEscapeKey,
  setHilightNewlyCreatedTask,
  setCopyNewlyCreatedTask,
  getTaskColumns,
  getComfortableView,
  getComfortableViewWrap,
  getVerticalGrid,
  setPreferenceState,
  setUserSettingsProfile,
  getSingleLineView,
  getTaskUpperCase,
  setDuplicateTaskObj,
  setCurrentSelectedDuplicateArr,
  getVerticalGridlinesTask,
  getSplitSubTask,
  getSplitSubTaskLevels,
  getCompactView,
  getCompactViewWrap,
  setSelectedIndex,
  setSelectedIndexStatus,
  setSelectedListIds,
  setSaveSettingLocal,
  setSaveSettingList,
  setSelectedTaskParentId,
  setSelectedTaskType,
  setMeMode,
  setAutoSave,
  setShowTaskNavigation,
  setShowNewTaskField,
  setShowNewTaskId,
  setNewTaskPriority,
  setRmWatcher,
  setCurrentTaskId,
  setDefaultSubtaskId,
  setToggleAllSubtask,
  setToggleAllSubtaskSplit,
  setSeparateSubtasksMode,
  setSelectedTasksArray,
  setSelectedIndexListId,
  setAddNewTaskItem,
  setCloseTaskListView,
  setTriggerSaveSettings,
  setTriggerAutoSave,
  setToggleAssignCurrentTaskId,
  setCurrentParentTaskId,
  setGetSubTaskId,
  hideTaskColumns,
  setSubtaskDefaultStatusId,
  setUpdateEntries,
  setTriggerSaveSettingsModal,
  setSaveSettingOnline,
  setUpdateStatusModalId,
  setCurrentTaskStatusId,
  setCurrentTaskPriorityId,
  setGroupByStatus,
  setShowTaskUploadModal,
  setTimerStatus,
  setTimeType,
  setTimerDetails,
  setSortArray,
  setSortArr,
  setTimeSortStatus,
  setTimeArr,
  setTimeSortArr,
  setTimeLogColumnData,
  setScreenRecording,
  setScreenRecordingMedia,
  setUpdateCords,
  setActiveTaskColumn,
  setUpdateTimerDuration,
  setUpdateRecoderDuration,
  setRecorderInterval,
  setStopTimer,
  setTimerInterval,
  setActiveTimeout,
  setSortType,
  setTaskSelectedDate,
  setHistoryMemory,
  setTimeAssigneeFilter,
  setTimeAssignee,
  setEntityForCustom,
  setCustomSuggetionsField,
  setNewCustomPropertyDetails,
  setEditCustomProperty,
  setDragToBecomeSubTask,
  setOpenFileUploadModal
} = taskSlice.actions;
export default taskSlice.reducer;
