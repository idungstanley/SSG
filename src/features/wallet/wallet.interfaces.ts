export interface ICreateWallet {
  id: string;
  name: string;
  hub_id: string;
  parent_id: null;
  updated_at: string;
  created_at: string;
  archived_at: null;
  deleted_at: null;
}

export interface IWallet {
  id: string;
  name: string;
  hub_id: string;
  parent_id: null;
  updated_at: string;
  created_at: string;
  archived_at: null;
  deleted_at: null;
}

export interface IWalletRes {
  data: {
    wallets: IWallet[];
    lists: [];
  };
}
