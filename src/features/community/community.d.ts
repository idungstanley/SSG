import { ITeamMember } from '../workspace/workspace.interfaces';

interface GraphItem {
  hour: number;
  count: number;
}

export interface TeamMemberWithStatus extends ITeamMember {
  is_online: boolean;
}

export interface CommunityRes {
  graph: GraphItem[];
  team_members: TeamMemberWithStatus[];
}
