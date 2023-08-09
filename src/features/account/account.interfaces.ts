import { IHistoryFilterMemory, ISelectedDate } from '../task/interface.tasks';

export interface IWorkspace {
  id: string;
  name: string;
  color: string;
  initials: string;
  last_activity_at: string;
}

export interface IAccountReq {
  data: {
    workspaces: IWorkspace[];
  };
}

export interface IUserParams {
  // add darkTheme or showArchived values
  showPreview?: string;
  sidebarWidth?: number;
}

export interface IUserCalendarParams {
  selectedDate: ISelectedDate | null;
  HistoryFilterMemory?: IHistoryFilterMemory | null;
}

export interface IUserState {
  // add darkTheme or showArchived values
  showPreview: boolean;
}

export interface IUserSettings {
  key: string;
  is_json: boolean;
  resolution?: string | null;
  value: IUserParams;
  created_at: string;
  updated_at: string;
}

export interface IUserSettingsRes {
  data: {
    settings: IUserSettings[];
  };
}

export interface Place {
  name: string;
  id: string;
  place: JSX.Element;
  icon?: JSX.Element;
  link?: string;
  source?: string;
}
