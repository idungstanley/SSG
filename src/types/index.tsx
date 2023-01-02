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

export type commentsType = 'inbox_file' | 'inbox' | 'folder' | 'file';
