export interface ITeamMemberGroup {
  id: string;
  name: string;
  team_member_group_id: string;
  team_member_id: string;
  team_member: {
    initials: string;
    colour: string;
    user: {
      email: string;
      name: string;
    };
  };
}

export interface ITeamMemberGroupsReq {
  group_team_members: ITeamMemberGroup[];
  name: string;
  id: string;
  initials: string;
  colour: string;
  created_at: string;
  updated_at: string;
}
