export interface ITeamMember {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar_path: null | string;
  };
  name: string;
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
