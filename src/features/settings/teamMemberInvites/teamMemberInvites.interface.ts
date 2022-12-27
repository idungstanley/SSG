interface IInvite {
  id: string;
  email: string;
  role: {
    key: string;
    name: string;
  };
  expires_at: string;
  accepted_at: string;
  created_at: string;
  updated_at: string;
}

export interface ITeamMemberInvitesReq {
  data: {
    team_member_invites: IInvite[];
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
