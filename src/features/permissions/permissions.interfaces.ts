interface ITeamMember {
  id: string;
  user: {
    id: string;
    name: 'Stan';
    email: 'stanislav@cast.by';
    avatar_path: null;
  };
  role: {
    key: 'high';
    name: 'High';
  };
  last_activity_at: '2022-12-21 18:01:12';
  invited_at: '2022-12-21 15:57:02';
  accepted_invite_at: '2022-12-21 16:01:10';
  colour: '#0369A1';
  initials: 'S';
  is_active: true;
  created_at: '2022-12-21T16:01:10.000000Z';
  updated_at: '2022-12-21T18:01:12.000000Z';
}

export interface ITeamMembersReq {
  data: {
    team_members: ITeamMember[];
  };
}
