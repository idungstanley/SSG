export interface ITeamMembersAndGroup {
  color: string | undefined;
  id: string;
  name?: string;
  is_active?: boolean;
  invited_at: boolean;
  user: {
    color: string | undefined;
    name: string;
    id: string;
    email: string;
    initials: string;
  };
  initials: string;
  colour: string;
  role: {
    key: string;
    name: string;
  };
}

export interface ITeamMembersAndGroupsReq {
  data: {
    team_member_groups: ITeamMembersAndGroup[];
    team_members: ITeamMembersAndGroup[];
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
