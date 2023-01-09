export interface IWatcher {
  id: string;
  model_id: string;
  model_type: string;
  updated_at: string;
  created_at: string;
  team_member_id: string;
  team_member: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      avatar_path: null | string;
    };
    role: {
      key: string;
      name: string;
    };
    colour: string;
    initials: string;
    created_at: string;
    updated_at: string;
  };
}

export interface IWatchersRes {
  data: { watchers: IWatcher[] };
}
