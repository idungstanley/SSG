import { IList } from '../hubs/hubs.interfaces';
import { IField } from '../list/list.interfaces';

export interface IWallet {
  id: string;
  name: string;
  hub_id: string;
  parent_id: null;
  color?: string;
  updated_at: string;
  created_at: string;
  archived_at: null;
  deleted_at: null;
  children: IWallet[];
  lists: IList[];
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
  directory_items: [];
  checklists: [];
  custom_fields: IField[];
}

export interface IWalletDetailRes {
  data: {
    wallet: IWalletDetails;
    lists: [];
  };
}
