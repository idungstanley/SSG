import { ListColourProps } from '../../components/tasks/ListItem';
import { ICheckListRes } from './../task/interface.tasks';

export type Property = string[] | null;

export interface IField {
  id: string;
  model: string;
  model_id: string;
  name: string;
  type: string;
  properties: Property;
  created_at: string;
}

export interface IListDetails {
  id: string;
  name: string;
  color: null;
  shape: null;
  hub_id: null | string;
  wallet_id: string | null;
  parent_id: null | string;
  updated_at: string;
  created_at: string;
  archived_at: null | string;
  deleted_at: null | string;
  description: null | string;
  directory_items: string[];
  custom_fields: IField[];
  checklists: ICheckListRes[];
}

export interface listProps {
  id: string;
  name: string;
  color?: ListColourProps | string;
  shape?: string;
}

export interface IListDetailRes {
  data: {
    list: IListDetails;
  };
}
export interface listDetails {
  data: {
    lists: listProps[];
  };
}
