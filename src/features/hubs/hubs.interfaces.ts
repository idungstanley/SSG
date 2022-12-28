export interface IHubs {
  id: string;
  name: string;
  parent_id: string;
  archived_at: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface IResponseCreateHubs {
 data: {
  hubs: IHubs[];
 }
}

export interface IResponseGetHubs {
 data: {
  hubs: IHubs[];
 }
}