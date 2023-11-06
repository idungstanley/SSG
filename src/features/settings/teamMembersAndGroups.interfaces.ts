import { GraphItem } from '../community/community';

export interface ITeamMembersAndGroup {
  color: string | undefined;
  id: string;
  name?: string;
  is_active?: boolean;
  is_online: boolean;
  invited_at: string;
  user: {
    color?: string;
    name: string;
    id: string;
    email: string;
    initials: string;
    avatar_path?: string | null;
  };
  initials: string;
  colour?: string;
  role: {
    key: string;
    name: string;
  };
}

export interface ITeamMembersAndGroupsReq {
  data: {
    team_member_groups: ITeamMembersAndGroup[];
    team_members: ITeamMembersAndGroup[];
    graph: GraphItem[];
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
