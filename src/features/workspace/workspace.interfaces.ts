import { ITeamMembersAndGroup } from '../settings/teamMembersAndGroups.interfaces';
import { IUseSettingsProfile } from '../task/taskSlice';

export type TeamMemberGroupsPermissions = {
  access_level: string;
  team_member?: ITeamMembersAndGroup;
  team_member_groups?: ITeamMembersAndGroup;
};

export interface IPermissionsRes {
  data: {
    is_public: number;
    team_member_groups: TeamMemberGroupsPermissions[];
    team_members: TeamMemberGroupsPermissions[];
    parent_id: string | null;
    parent_type: string | null;
    parent: {
      is_public: number;
      team_member_groups: TeamMemberGroupsPermissions[];
      team_members: TeamMemberGroupsPermissions[];
    };
  };
}
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
export interface IAttachments {
  data: {
    attachments: [
      {
        id: string;
        path: string;
        physical_file: {
          created_at: string;
          display_name: string;
          id: string;
          name: string;
          size: number;
          updated_at: string;
          file_format: {
            extension: string;
            icon_name: string;
            key: string;
            mime: string;
            name: string;
          };
        };
        team_member: ITeamMember;
      }
    ];
  };
}

interface IWorkspace {
  id: string;
  name: string;
  color: string;
  initials: string;
  last_activity_at: string;
  created_at: string;
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
  time_format: string;
  clock_type: string;
  is_clock_time: number;
}

export interface IUserRes {
  success: string;
  message: string;
  data: {
    user: IUserData;
    user_settings: IUseSettingsProfile[];
  };
}
export interface IColourRes {
  success: string;
  message: string;
  data: IColourData;
}
export interface IPaletteData {
  id: string;
  name: string | null;
  color: string;
  color_name: string;
  is_pinned: boolean;
  count_uses: number;
}
export interface IColourData {
  palette_colors: IPaletteData[];
}

export interface ITeamMember {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar_path?: null | string;
    initials: string;
    color?: string;
    timezone: string;
  };
  role: {
    key: string;
    name: string;
  };
  last_activity_at: string;
  invited_at: string;
  accepted_invite_at: string;
  color: string;
  initials: string;
  is_active: boolean;
  is_online: boolean;
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

export interface IRecorderLastMemory {
  activeTabId: string | undefined;
  hubId: string | undefined;
  listId: string | undefined;
  taskId: string | undefined;
  workSpaceId: string | undefined;
  viewId: string | undefined;
}

export interface ITimerLastMemory {
  activeTabId: string | undefined;
  hubId: string | undefined | null;
  listId: string | undefined | null;
  taskId: string | undefined | null;
  workSpaceId: string | undefined;
  viewId: string | undefined;
}

export interface WorkSpaceSettingsRes {
  name: string;
  value: string | number;
  key: string;
}

export interface WorkSpaceSettingsUpdateRes {
  value: string | number;
  key: string;
}

export interface IWorkspaceSettingsRes {
  data: {
    workspace_settings: WorkSpaceSettingsRes[];
  };
}

export interface IWorkspaceSettingsUpdateRes {
  data: {
    workspace_setting: WorkSpaceSettingsUpdateRes;
  };
}

export interface IWorkSpaceSettings {
  folder_separator?: string;
  folder_uppercase?: number;
  duplicate_name?: number;
  stop_tracking_hours?: number;
}
