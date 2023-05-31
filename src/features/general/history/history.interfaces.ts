export interface IActivityLog {
  id: string;
  model_id: string;
  model: string;
  type: string;
  category: string;
  field: null | string;
  old_value: null | string;
  new_value: null | string;
  created_by: {
    user: {
      name: string;
      color: string;
      initials: string;
      avatar_path: null | string;
    };
  };
  created_at: string;
}

export interface IHistoryRes {
  data: {
    activity_logs: IActivityLog[];
  };
}
