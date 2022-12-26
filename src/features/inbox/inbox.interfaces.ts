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

interface IFolderAncestor {
  id: string;
  name: string;
  parent_id: null | string;
  hex_colour: string;
  tailwind_colour: string;
  created_at: string;
  updated_at: string;
}

export interface IFolderForFilling {
  id: string;
  name: string;
  parent_id: null | string;
  full_path: string;
  ancestor_path: null | string;
  ancestors: IFolderAncestor[];
  hex_colour: string;
  tailwind_colour: string;
  created_at: string;
  updated_at: string;
}

export interface IFoldersForFillingReq {
  data: {
    query: string;
    folders: IFolderForFilling[];
  };
}

export interface IInboxFile {
  id: string;
  inbox_file_source: {
    id: string;
    physical_file_id: string;
    upload_method: {
      key: string;
      name: string;
    };
    sent_from_email: null | string;
    created_by_team_member: null | {
      user: {
        name: string;
        email: string;
      };
    };
    display_name: string;
    size: number;
    file_format: {
      key: string;
      extension: string;
      name: string;
      mime: string;
      icon_name: string;
    };
    created_at: string;
    updated_at: string;
  };
  inbox_id: string;
  display_name: null | string;
  status: 'pending' | string;
  created_at: string;
  updated_at: string;
  archived_at: null;
}

export interface IInboxFilesReq {
  data: {
    inbox_files: IInboxFile[];
    archived_files_count: number;
    not_archived_files_count: number;
    pagination: {
      page: number;
      per_page: number;
      has_more_pages: boolean;
    };
  };
}

interface IEmail {
  id: string;
  email: string;
}

export interface IEmailListReq {
  data: {
    list: IEmail[];
  };
}

interface IResponsibleTeamMemberAndGroup {
  id: string;
  team_member_group_id?: string;
  team_member_id?: string;
  team_member_group?: {
    name: string;
  };
  team_member?: {
    user: {
      name: string;
      email: string;
    };
  };
}

export interface IResponsibleDataReq {
  data: {
    inbox_responsible_team_member_groups?: IResponsibleTeamMemberAndGroup[];
    inbox_responsible_team_members?: IResponsibleTeamMemberAndGroup[];
  };
}

interface IBlacklistFile {
  id: string;
  inbox_file: {
    id: string;
  };
}

export interface IBlackListInboxFilesReq {
  data: {
    blacklist: IBlacklistFile[];
  };
}

interface IInboxFileLog {
  id: string;
  type: string;
  team_member: {
    colour: string;
    initials: string;
    name: string;
  } | null;
}

export interface IInboxFileLogsReq {
  data: {
    logs: IInboxFileLog[];
  };
}
