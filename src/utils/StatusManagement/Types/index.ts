export type Status = 'open' | 'custom' | 'closed';

export type StatusType = {
  color: string | null;
  id: string | null;
  model_id?: string | null;
  model_type?: string | null;
  type: string | null;
  position: number;
  name: string;
  is_default?: number | null;
};

export type BoardSectionsType = {
  [name: string]: StatusType[];
};

export interface GroupStyles {
  backgroundColor: string;
  boxShadow: string;
}

export interface ModelType {
  modelId: string | null;
  modelType: string | null;
}
