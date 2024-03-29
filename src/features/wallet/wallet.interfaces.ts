import { IList, IView } from '../hubs/hubs.interfaces';
import { IField, ITask_statuses } from '../list/list.interfaces';

export interface IWallet {
  id: string;
  name: string;
  hub_id: string;
  parent_id: string;
  color?: string;
  updated_at: string;
  created_at: string;
  archived_at: null | string;
  deleted_at: null | string;
  children: IWallet[];
  lists: IList[];
  description: string;
}

export interface IWalletRes {
  data: {
    wallets: IWallet[];
    lists: [];
  };
}

export interface IWalletDetails {
  id: string;
  name: string;
  color: null;
  shape: null;
  hub_id: string;
  parent_id: null;
  updated_at: string;
  created_at: string;
  archived_at: null;
  deleted_at: null;
  description: null;
  task_views: IView[];
  directory_items: [];
  checklists: [];
  custom_field_columns: IField[];
  task_statuses: ITask_statuses[];
}

export interface IWalletDetailRes {
  data: {
    wallet: IWalletDetails;
    lists: [];
  };
}
