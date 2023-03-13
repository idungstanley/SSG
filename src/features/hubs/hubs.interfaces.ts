export interface IHub {
  id: string;
  name: string;
  parent_id: string | null;
  archived_at: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface IHubDetails {
  id: string;
  name: string;
  color: null;
  shape: null;
  parent_id: null;
  updated_at: string;
  created_at: string;
  archived_at: null;
  deleted_at: null;
  description: null;
  directory_items: [];
  checklists: [];
}

export interface IHubDetailRes {
  data: {
    hub: IHubDetails;
  };
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

export interface IFavorites {
  name: string;
  id: string;
  model_type: string;
  model_id: string;
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
