export type Filter = Record<TaskKey, FilterValues>;

type Option = 'is' | 'not is' | 'is set';
export type Value = string;
export type Id = number;

interface FilterValues {
  values: Value[];
  options: Option[];
}

export interface FilterValue {
  id: Id;
  option: Option;
  values: Value[];
  key: TaskKey;
}
