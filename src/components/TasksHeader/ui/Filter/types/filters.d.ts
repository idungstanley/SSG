import { TaskKey } from '../../../../../features/task/interface.tasks';

export type Filter = Record<Key, FilterValues>;

type Option = 'is' | 'is not' | 'is set' | 'is not set';
export type Key = Pick<TaskKey, 'priority', 'status'>;
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

type ValueType = 'key' | 'option' | 'value';

export interface onChangeProps {
  newValue: Value | Option | TaskKey;
  id: Id;
  type: ValueType;
}
