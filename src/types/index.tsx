export interface IUser {
  default_workspace_id: string;
}

export interface IErrorRequest {
  status: number;
  data: {
    message: {
      title: string;
      body: string;
    };
  };
  statusText: string;
  message: string;
}

export interface ISuccessRequest {
  message: {
    title: string;
    body: string;
  };
}

export type inboxType = 'active' | 'hidden' | 'archived' | 'trashed';