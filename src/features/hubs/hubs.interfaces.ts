import { IField, ITask_statuses } from '../list/list.interfaces';
import { Status } from '../task/interface.tasks';

export interface IHub {
  id: string;
  type: string;
  name: string;
  path: string | null;
  parent_id: string | null;
  archived_at: string | null;
  deleted_at: string | null;
  created_at: string;
  color?: string | null;
  updated_at: string;
  has_descendants: boolean;
  current_workspace_id: string;
  description: string;
}

export interface IView {
  created_at: string;
  id: string;
  is_required: number;
  is_pinned: number;
  name: string;
  team_member_id: null;
  type: string;
  updated_at: string;
  view_settings: null | { [key: string]: boolean };
}
export interface IHubDetails {
  id: string;
  name: string;
  color: null;
  path?: string | null;
  shape: null;
  parent_id: null;
  updated_at: string;
  created_at: string;
  archived_at: null;
  deleted_at: null;
  description: null;
  directory_items: [];
  checklists: [];
  tags?: [];
  status: Status;
  priority?: string | null | undefined;
  task_views: IView[];
  task_statuses: ITask_statuses[];
  custom_field_columns: IField[];
}

export interface IHubDetailRes {
  data: {
    hub: IHubDetails;
  };
}
export interface IHubDetailResErr {
  data: {
    data: {
      need_confirmation?: boolean;
    };
  };
}

export interface IWallet {
  id: string;
  type: string;
  name: string;
  hub_id: string;
  color?: string;
  parent_id: string;
  updated_at: string;
  tasks_count: number;
  created_at: string;
  archived_at: null | string;
  deleted_at: null | string;
  has_descendants: boolean;
  description: string;
}

export interface IList {
  hub_id: string | null;
  wallet_id: null | string;
  parent_id: null | string;
  archived_at: null | string;
  deleted_at: null | string;
  id: string;
  type: string;
  name: string;
  color: string;
  tasks_count: number;
  updated_at: string;
  created_at: string;
  shape: string;
  description: string;
}

export interface IResponseCreateHubs {
  data: {
    hubs: IHub[];
  };
}

export interface IResponseGetHubs {
  data: {
    hubs: IHubDetails[];
  };
}

export interface IFavorites {
  name: string;
  id: string;
  model_type: string;
  model_id: string;
  color?: string | null;
}

export interface IFavoritesRes {
  data: {
    favorites: IFavorites[];
    pagination: {
      page: number;
      per_page: number;
      has_more_pages: boolean;
    };
  };
}

export interface IHubReq {
  data: {
    hubs: IHub[];
    wallets: IWallet[];
    lists: IList[];
  };
}

export interface IHubsRes {
  data: {
    hubs: IHub[];
    wallets: IWallet[];
    lists: IList[];
  };
}
