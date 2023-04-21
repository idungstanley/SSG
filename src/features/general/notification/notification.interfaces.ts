export interface INotification {
  id: string;
  type: string;
  model_id: string;
  model_type: string;
  affected_model_id: null;
  affected_model_type: null;
  is_shown: number;
  created_at: string;
  created_by: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      avatar_path: null;
    };
    colour: string;
    initials: string;
    created_at: string;
    updated_at: string;
  };
  model: {
    id: string;
    name: string;
    list_id: string;
    parent_id: null;
    priority: null;
    status: string;
    start_date: null;
    end_date: null;
    updated_at: string;
    created_at: string;
    archived_at: null;
    deleted_at: null;
    descendants: [];
  };
}

export interface IPagination {
  page: number;
  per_page: number;
  has_more_pages: boolean;
}

export interface INotificationRes {
  data: {
    notifications: INotification[];
    count: string | number;
    pagination: IPagination;
  };
}
