import dayjs, { Dayjs } from 'dayjs';
import { ICustomField, ImyTaskData } from './taskSlice';
import { ITeamMembersAndGroup } from '../settings/teamMembersAndGroups.interfaces';
import { IField, ITask_statuses } from '../list/list.interfaces';
import { RecurFrequency, TypeOptionsProps } from '../../components/DatePicker/RecurringTypes';
import { FilterWithId } from '../../components/TasksHeader/ui/Filter/types/filters';

interface fileFormat {
  key: string;
  extension: string;
  name: string;
  mime: string;
  icon_name: string;
}

interface physicalFile {
  id: string;
  name: string;
  created_at: string;
  display_name: string;
  size: number;
  file_format: fileFormat;
}

export interface attachmentData {
  id: string;
  physical_file: physicalFile;
  path: string;
  team_member: ITeamMembersAndGroup;
}

export interface IAttachmentsRes {
  data: {
    attachments: attachmentData[];
  };
}

export interface UpdateTaskProps {
  task_id_array?: string[];
  task_id?: string;
  priorityDataUpdate?: string;
  statusDataUpdate?: string;
  listIds?: string[];
}

export interface IParent {
  hubs: Array<{ id: string; name: string; parent_id: string | null }> | [];
  lists: Array<{ id: string; name: string; parent_id: string | null }> | [];
  wallets: Array<{ id: string; name: string; parent_id: string | null }> | [];
}

export interface TaskDataGroupingsProps {
  [key: string]: {
    groupListName:
      | string
      | number
      | [{ id: string; initials: string; colour: string; name: string }]
      | { color: string; id: string; initials: string; name: string }[]
      | null
      | undefined;
    key?: string;
    tasksByStatus: {
      [key: string]: ImyTaskData[];
    };
  };
}

export interface TaskDataGroupingsAssigneeProps {
  [key: string]: {
    assigneeName: string | undefined;
    assigneeId?: string | undefined;
    tasks: ITaskFullList[];
  };
}

export interface ICreateChecklistRes {
  data: {
    checklist: ICheckListRes;
  };
}

export interface TaskAssignee {
  id: string;
  color: string;
  name: string;
  initials: string;
  avatar_path: null | string;
}

export interface AssigneeType {
  id: string;
  color: string;
  created_at: string;
  is_online: boolean;
  role: {
    key: string;
    name: string;
  };
  updated_at: string;
  user: {
    avatar_path: null | string;
    color: string;
    email: string;
    id: string;
    initials: string;
    name: string;
    timezone: string;
  };
}

export interface IChecklistItemRes {
  data: {
    checklist_item: ICheckListItems;
  };
}

export interface ICheckListItems {
  id: string;
  name: string;
  is_done: number;
  assignees: AssigneeType[];
  group_assignees: [];
  tags: Tag[];
}

export interface ICheckListRes {
  id: string;
  name: string;
  items: ICheckListItems[];
}

export type TagId = string;

export interface Tag {
  id: TagId;
  color: string;
  name: string;
}

export interface IStatus {
  color: string;
  created_at: string;
  id: string;
  model_id: string;
  model_type: string;
  name: string;
  position: number;
  type: string;
  updated_at: string;
}

export interface Status {
  id: string;
  name: string;
  color: string;
  position: number;
  type: 'open' | string;
  model_id: string;
  model_type: 'hub' | string;
  updated_at: string;
  created_at: string;
}

export type TaskId = string;

export interface ITaskFullList {
  id: TaskId;
  name: string;
  description: string | null;
  avatar_path: string | null;
  list_id: string;
  root_task_ids?: string[];
  parent_id: string | null;
  parentName?: string;
  priority: string | null | [{ id: string; initials: string; color: string; name: string }];
  status: IStatus;
  has_descendants: boolean;
  filters: { model: string; model_id: string; data: FilterWithId[] } | null;
  descendants?: ITaskFullList[];
  descendants_count: number;
  closed_subtasks_count: number;
  checklist_items_count: number;
  checklist_done_items_count: number;
  has_attachments: boolean;
  task_statuses: ITask_statuses[];
  start_date: string | null;
  end_date: string | null;
  assignees: ITeamMembersAndGroup[];
  group_assignees?: [];
  custom_fields?: ICustomField[];
  custom_field_columns: IField[];
  tags: Tag[];
  updated_at: string;
  created_at: string;
  archived_at: string | null;
  deleted_at: string | null;
  directory_items?: [];
  checklists?: ICheckListRes[];
  listColor?: unknown;
  list?: {
    color: string;
    id?: string | undefined;
    name?: string | undefined;
    parents?: IParent | undefined;
  };
  watchers: ITeamMembersAndGroup[];
}

export interface IGroupingAssignee {
  unFilteredTaskData: ITaskFullList[];
}

export interface IPaginator {
  page: number;
  per_page: number;
  has_more_pages: boolean;
}

export interface IFullTaskRes {
  data: {
    tasks: ITaskFullList[];
    paginator: IPaginator;
  };
}

export interface IFullTaskRes2 {
  data: {
    tasks: ImyTaskData[];
    paginator: IPaginator;
  };
}

export interface ITaskListRes {
  data: {
    tasks: ITaskFullList[];
    paginator: IPaginator;
  };
}

export interface ITaskFullListObj {
  filteredTaskData: ITaskFullList;
}

export interface GroupedTaskType {
  groupListName: string;
  key: string;
  tasks: ITaskFullList[];
}

export interface KeyItemTypes {
  ['list_id']: GroupedTaskType;
}

export interface ITaskRes {
  data: {
    task: ITaskFullList;
  };
}

export interface teamMember {
  id: string;
  user: {
    id: string;
    initials: string;
    name: string;
    color: string;
    avatar_path: string;
  };
}

export interface teamGroups {
  id: string;
  name: string;
  color: string;
  initials: string;
}

export interface IEntries {
  id: string;
  duration: number;
  start_date: string;
  end_date: string;
  description: string;
  is_billable: number;
  team_member: teamMember;
  type: string;
}

export interface ITimeEntriesRes {
  data: {
    time_entries: IEntries[];
    total_duration: number;
    pagination: {
      page: number;
      per_page: number;
      has_more_pages: boolean;
    };
    filters: {
      team_members: teamMember[];
      team_member_groups: teamGroups[];
    };
  };
}

export interface ITimerDetails {
  isBillable: boolean;
  description: string;
  label?: string;
  tags?: string;
}

export type Header = {
  title: string;
  hidden: boolean;
  value: string;
  sorted: boolean;
};

export interface IDuration {
  s: number;
  m: number;
  h: number;
}

export interface ISelectedDate {
  from?: Dayjs;
  to?: Dayjs;
}

export interface IHistoryFilterMemory {
  time?: { from?: string; to?: string };
  user?: string;
  btnCheckedStates?: boolean[];
  timePoint?: string;
  hoveredDate?: dayjs.Dayjs | null;
}

export interface IExtraFields {
  label: string;
  type: string;
  depth: number;
}

export interface IUserCalendarParams {
  selectedDate: ISelectedDate | null;
  HistoryFilterMemory: IHistoryFilterMemory | null;
}

export interface ITimeEntryParams {
  key: string;
  value: string[] | Header[] | [][];
}

export interface IUserSettings {
  key: string;
  is_json: boolean;
  resolution?: string | null;
  value: IUserCalendarParams;
  created_at: string;
  updated_at: string;
}

export interface IUserSettingsTimeEntryRes {
  key: string;
  value: string[] | Header[];
}

export interface IUserSettingsRes {
  data: {
    settings: IUserSettings;
  };
}

export interface IUserSettingsUpdateRes {
  data: {
    settings: IUserSettingsTimeEntryRes;
  };
}

type ValueOf<T> = T[keyof T];

export type Task = ImyTaskData | ITaskFullList;

export type TaskValue = ValueOf<Task>;

export type TaskKey = keyof Pick<
  ITaskFullList,
  'status' | 'priority' | 'assignees' | 'tags' | 'start_date' | 'end_date' | 'created_at'
>;

// remove this
export type TaskKeyof = keyof Task;

export interface newTaskDataRes {
  data: {
    task: ImyTaskData;
  };
}

export interface customPropertiesProps {
  tracking?: {
    Subtasks: boolean;
    Checklists: boolean;
  };
  complete_on?: number;
  start_value?: number;
  end_value?: number;
  emoji?: string;
  number?: number;
  currency?: string;
  symbol?: string;
  include_groups?: boolean;
  single_user?: boolean;
  formula?: string;
}

export interface ITaskRecurResponse {
  data: {
    task_recur: {
      id: string;
      type: string;
      execution_type: string;
      new_task: string | string[];
    };
  };
}

export interface ITaskCreateProps {
  taskId?: string;
  type: string;
  execution_type: string;
  type_options?: TypeOptionsProps;
  new_task?: string | string[];
  recur_options?: RecurFrequency;
}
