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
  showPreview: string;
}

export interface IUserState {
  // add darkTheme or showArchived values
  showPreview: boolean;
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
