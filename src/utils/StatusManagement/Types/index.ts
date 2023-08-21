export type Status = 'open' | 'custom' | 'closed';

export type StatusType = {
  color: string | null;
  id: string | null;
  model_id?: string | null;
  model?: string | null;
  type: string | null;
  position: number;
  name?: string | null;
  is_default?: number | null;
};

export type BoardSections = {
  [name: string]: StatusType[];
};
