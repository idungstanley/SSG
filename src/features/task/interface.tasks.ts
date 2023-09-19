import dayjs, { Dayjs } from 'dayjs';
import { teamGroups, teamMember } from '../../pages/workspace/tasks/timeclock/entryLists/EntryList';
import { ICustomField, ImyTaskData } from './taskSlice';
import { ITeamMembersAndGroup } from '../settings/teamMembersAndGroups.interfaces';
import { Header } from '../../components/Pilot/components/TimeClock/ClockLog';
import { IField } from '../list/list.interfaces';

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

export interface TaskAssignee {
  id: string;
  color: string;
  name: string;
  initials: string;
  avatar_path: null;
}

export interface ICheckListItems {
  id: string;
  name: string;
  is_done: number;
  assignees: [{ id: string; initials: string; color: string; name: string; avatar_path: string | null }];
  group_assignees: [];
  tags: [];
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
  position: string;
  type: string;
  updated_at: string;
}

export interface Status {
  id: string;
  name: string;
  color: string;
  position: string;
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
  parent_id: string | null;
  parentName?: string;
  priority: string | null | [{ id: string; initials: string; color: string; name: string }];
  status: IStatus;
  has_descendants: boolean;
  descendants_count: number;
  checklist_items_count: number;
  checklist_done_items_count: number;
  has_attachments: boolean;
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
  list?: {
    id: string;
    name: string;
    parents: IParent;
    color?: string;
  };
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
    tasks: ImyTaskData[];
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

export interface IEntries {
  id: string;
  duration: number;
  start_date: string;
  end_date: string;
  description: string;
  is_billable: number;
  team_member: teamMember;
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
}

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

export interface currencyProperties {
  currency: string;
  symbol: string;
}

export interface ratingProperties {
  emoji: string;
  number: number;
}

export interface manualProgressProperties {
  start_value: number;
  end_value: number;
}

export interface autoProgressProperties {
  tracking: {
    Subtasks: boolean;
    Checklists: boolean;
  };
  complete_on?: number;
}
