export interface IDockOrGroupMember {
  id: string;
  file_id?: string;
  folder_id?: string;
  access_level: {
    key: string;
    name: string;
  };
  team_member: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      avatar_path: null | string;
    };
    colour: string;
    initials: string;
    created_at: string;
    updated_at: string;
  };
  team_member_group: {
    id: string;
    name: string;
    colour: string;
    initials: string;
    created_at: string;
    updated_at: string;
  }
}

export interface IDataAccessReq {
  data: {
    folder_team_members?: IDockOrGroupMember[];
    folder_team_member_groups?: IDockOrGroupMember[];
    file_members?: IDockOrGroupMember[];
  };
}
