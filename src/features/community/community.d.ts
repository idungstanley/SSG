import { ITeamMembersAndGroup } from '../settings/teamMembersAndGroups.interfaces';

interface GraphItem {
  hour: number;
  count: number;
}

export interface TeamMemberWithStatus extends ITeamMembersAndGroup {
  is_online: boolean;
}

export interface CommunityRes {
  data: {
    graph: GraphItem[];
    team_members: TeamMemberWithStatus[];
  };
}
