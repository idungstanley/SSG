export interface ITeamMembersAndGroup {
  id: string;
  name?: string;
  user: {
    name: string;
    id: string;
    email: string;
    initials?: string | undefined;
  };
  initials: string;
  colour: string;
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
