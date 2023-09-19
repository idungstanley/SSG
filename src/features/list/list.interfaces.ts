import { ListColourProps } from '../../components/tasks/ListItem';
import { IList, ItaskViews } from '../hubs/hubs.interfaces';
import {
  ICheckListRes,
  autoProgressProperties,
  currencyProperties,
  manualProgressProperties,
  ratingProperties
} from './../task/interface.tasks';

export type Options = { id: string; color: string; name: string }[] | null;

export interface IField {
  color: null | string;
  id: string;
  is_bold: null | string;
  is_italic: null | string;
  is_underlined: null | string;
  options: Options;
  name: string;
  type: string;
  properties?: currencyProperties | ratingProperties | manualProgressProperties | autoProgressProperties;
}

export interface taskCountFields {
  created_at: string;
  id: string;
  name: string;
  list_id: string;
  task_status: { id: string; name: string; color: string; position: number; type: string };
  task_status_id: string;
  task_status_counts: number;
  updated_at: string;
}

export interface ITask_statuses {
  color: string;
  created_at: string;
  id: string;
  model_id: string;
  model_type: string;
  is_default: number;
  name: string;
  position: number;
  type: string;
  updated_at: string;
}

export interface StatusTaskListProps {
  listName?: string;
  listId?: string;
}

export interface IListDetails {
  id: string;
  name: string;
  color: null | { outerColour: string };
  shape: null;
  hub_id: null | string;
  wallet_id: string | null;
  parent_id: null | string;
  updated_at: string;
  task_views?: ItaskViews[];
  task_statuses: ITask_statuses[];
  created_at: string;
  archived_at: null | string;
  deleted_at: null | string;
  description: null | string;
  directory_items: string[];
  custom_field_columns: IField[];
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
    lists: IList[];
  };
}
