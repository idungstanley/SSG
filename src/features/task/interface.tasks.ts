export interface UpdateTaskProps {
  task_id: string | null;
  priorityDataUpdate?: string;
  statusDataUpdate?: string;
}

export interface ITaskFullList {
  id: string;
  name: string;
  description: string;
  list_id: string;
  parent_id: null;
  priority: null;
  status: string;
  start_date: null;
  end_date: null;
  assignees: [];
  group_assignees: [];
  custom_fields: [];
  tags: [];
  updated_at: string;
  created_at: string;
  archived_at: null;
  deleted_at: null;
  directory_items: [];
  list: {
    id: string;
    name: string;
    parents: {
      hubs: [
        {
          id: string;
          name: string;
          parent_id: null;
        }
      ];
      wallets: [];
      lists: [];
    };
  };
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
