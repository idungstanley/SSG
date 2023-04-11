export interface IWorkspaceRes {
  data: {
    workspace: {
      id: string;
      color: string;
      name: string | undefined;
      company_size: {
        key: string;
        name: string;
      };
    };
  };
}

interface IWorkspace {
  id: string;
  name: string;
  color: string;
  initials: string;
  last_activity_at: string;
}

export interface IAllWorkspacesRes {
  data: {
    workspaces: IWorkspace[];
  };
}

export interface IUserData {
  avatar_path: string | null;
  color: string | null;
  date_format: string;
  default_workspace_id: string;
  email: string;
  initials: string;
  name: string;
  start_week: string;
  theme_color: string | null;
  timezone: string;
}

export interface IUserRes {
  data: {
    user: IUserData;
  };
}

export interface ITeamMember {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar_path: null | string;
  };
  role: {
    key: string;
    name: string;
  };
  last_activity_at: string;
  invited_at: string;
  accepted_invite_at: string;
  colour: string;
  initials: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ITeamMembersRes {
  data: {
    pagination: {
      has_more_pages: boolean;
      page: number;
    };
    team_members: ITeamMember[];
  };
}
