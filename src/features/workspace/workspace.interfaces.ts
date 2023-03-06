export interface IWorkspaceRes {
  data: {
    workspace: {
      id: string;
      name: string;
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
  colour: string;
  initials: string;
  last_activity_at: string;
}

export interface IAllWorkspacesRes {
  data: {
    workspaces: IWorkspace[];
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
