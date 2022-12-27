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
