export interface ITeamMember {
  accepted_invite_at: string;
  color: string;
  created_at: string;
  deleted_status: null | string;
  hub_id: string;
  id: string;
  invited_at: string;
  is_deleted: boolean;
  is_online: boolean;
  last_activity_at: string;
  role: {
    key: string;
    name: string;
  };
  updated_at: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar_path: null | string;
    color: string;
    initials: string;
    timezone: string;
  };
  name: string;
  initials: string;
}

export interface ITeamMembersAndGroupsReq {
  data: {
    team_members: ITeamMember[];
    team_member_groups: ITeamMember[];
    pagination: {
      page: number;
      per_page: number;
      has_more_pages: boolean;
      first_item: number;
      last_item: number;
      on_first_page: boolean;
      on_last_page: boolean;
      total: number;
    };
  };
}
