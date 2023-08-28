import { IList, IWallet, IHub } from '../../../../../features/hubs/hubs.interfaces';

export interface Wallet extends IWallet {
  children: Wallet[];
  lists: List[];
}

export interface List extends IList {
  children: List[];
}

export interface StatusProps {
  color: string | null;
  id: string | null;
  model_id?: string | null;
  model_type?: string | null;
  type: string | null;
  position: number;
  name: string;
  is_default?: number | null;
}

export interface Hub extends IHub {
  children: Hub[];
  wallets: Wallet[];
  lists: List[];
}

export interface InputData {
  hubs: Hub[];
  wallets: Wallet[];
  lists: List[];
}

export interface ListProps {
  hubs: Hub[];
}

export interface ItemProps {
  id: string;
  name: string;
  parentId: string | null;
}
