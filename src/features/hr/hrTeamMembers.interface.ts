export interface IHrTeamMemberInterface {
  id: string;
  hub_id: string;
  team_member: {
    id: string;
    color: string | null;
    created_at: string;
    updated_at: string;
    user: {
      id: string;
      name: string;
      email: string;
      avatar_path: string | null;
      color: string | null;
      initials: string;
      timezone: string | null;
    };
  };
  hr_role: string;
  location: string | null;
  lat: string | null;
  lon: string | null;
  start_date: string | null;
  salary: string | null;
  salary_currency: string | null;
  allowance: number;
  created_at: string;
  updated_at: string;
}

export interface IHrTeamMembersInterface {
  data: {
    hr_team_members: IHrTeamMemberInterface[];
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

export interface IHrAddTeamMemberInterface {
  data: {
    teamMember: {
      hub_id: string;
      team_member_id: string;
      hr_role: string;
      location: string | null;
      lat: string | null;
      lon: string | null;
      start_date: string | null;
      salary: string | null;
      salary_currency: string | null;
      allowance: number;
      created_at: string;
      updated_at: string;
    };
  };
}
