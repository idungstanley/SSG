export interface IHrHub {
  id: string;
  type: string;
  name: string;
  path: string | null;
  parent_id: string | null;
  archived_at: string | null;
  deleted_at: string | null;
  created_at: string;
  color?: string | null;
  updated_at: string;
  has_descendants: boolean;
  current_workspace_id: string;
  description: string;
}

export interface IHrHubsRes {
  data: {
    tree: IHrHub[];
  };
}
