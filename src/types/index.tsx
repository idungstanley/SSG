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

export type explorerItemType = 'folder' | 'file';

export type itemType =
  | 'inbox_file'
  | 'inbox'
  | explorerItemType
  | 'template'
  | 'directory'
  | 'hub'
  | 'subhub'
  | 'task'
  | 'wallet'
  | 'list'
  | 'subWallet'
  | 'create_hub'
  | 'create_wallet'
  | 'create_list'
  | 'create_task';

export interface IPilotTab {
  id: number;
  label: string;
  icon: JSX.Element;
}

export interface IPilotSection {
  id: number;
  element: JSX.Element;
}
