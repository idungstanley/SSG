export interface IHub {
  id: string;
  name: string;
  parent_id: string | null;
  archived_at: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface IWallet {
  id: string;
  name: string;
  hub_id: string;
  parent_id: null | string;
  updated_at: string;
  created_at: string;
  archived_at: null | string;
  deleted_at: null | string;
}

export interface IList {
  id: string;
  name: string;
  updated_at: string;
  created_at: string;
}

export interface IResponseCreateHubs {
  data: {
    hubs: IHub[];
  };
}

export interface IResponseGetHubs {
  data: {
    hubs: IHub[];
  };
}

export interface IHubReq {
  data: {
    hubs: IHub[];
    wallets: IWallet[];
    lists: IList[];
  };
}
