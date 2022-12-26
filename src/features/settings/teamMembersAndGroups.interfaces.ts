interface ITeamMembersAndGroup {
  id: string;
  name?: string;
  user?: {
    name: string;
  };
}

export interface ITeamMembersAndGroupsReq {
  data: {
    team_member_groups?: ITeamMembersAndGroup[];
    team_members?: ITeamMembersAndGroup[];
  };
}
