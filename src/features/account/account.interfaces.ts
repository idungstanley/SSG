export interface IWorkspace {
  id: string;
  name: string;
  colour: string;
  initials: string;
  last_activity_at: string;
}

export interface IAccountReq {
  data: {
    workspaces: IWorkspace[];
  };
}

export interface IUserParams {
  showPreview: string;
}

export interface IUserSettings {
  key: string;
  is_json: boolean;
  value: IUserParams;
  created_at: string;
  updated_at: string;
}

export interface IUserSettingsRes {
  data: {
    settings: IUserSettings[];
  };
}
