export interface IInbox {
  id: string;
  email_key: string;
  name: string;
  initials: string;
  colour: string;
  unfiled_count: number;
  is_new: boolean;
  has_email_whitelist: number;
  last_received_at: string;
  last_filed_at: null | string;
  archived_at: null | string;
  created_at: string;
  updated_at: string;
  is_watch: boolean;
}

export interface IResponseInboxes {
  data: {
    inboxes: IInbox[];
  };
}

export interface IPinnedInboxes {
  data: {
    pinned_inboxes: IInbox[];
  };
}

export type inboxType = 'active' | 'hidden' | 'archived' | 'trashed';