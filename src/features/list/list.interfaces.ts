export interface IListDetails {
  id: string;
  name: string;
  color: null;
  shape: null;
  hub_id: null;
  wallet_id: string;
  parent_id: null;
  updated_at: string;
  created_at: string;
  archived_at: null;
  deleted_at: null;
  description: null;
  directory_items: [];
  custom_fields: [];
  checklists: [];
}

export interface IListDetailRes {
  data: {
    list: IListDetails;
  };
}
