import { ImyTaskData } from './taskSlice';

export interface UpdateTaskProps {
  task_id: string | null | undefined;
  priorityDataUpdate?: string;
  statusDataUpdate?: string;
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
  assignees: [{ id: string; initials: string; colour: string }];
  group_assignees: [];
  tags: [];
}

export interface ICheckListRes {
  id: string;
  name: string;
  items: ICheckListItems[];
}

export interface ITaskFullList {
  id: string;
  name: string;
  description: string | null;
  list_id: string;
  parent_id: string | null;
  priority: string | null | [{ id: string; initials: string; colour: string; name: string }];
  status: string | null | undefined;
  start_date: string | null;
  end_date: string | null;
  assignees?: [{ id: string; initials: string; colour: string; name: string }] | undefined;
  group_assignees?: [];
  custom_fields?: [];
  tags?: [];
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
  };

  [key: string]:
    | string
    | number
    | undefined
    | null
    | []
    | ICheckListRes[]
    | {
        id: string;
        name: string;
        parents: IParent;
      }
    | [{ id: string; initials: string; colour: string; name: string }];
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
  };
}
