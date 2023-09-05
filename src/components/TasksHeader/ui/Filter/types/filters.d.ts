import { TaskKey } from '../../../../../features/task/interface.tasks';

type ValueType = 'key' | 'value' | 'operator' | 'count' | 'unit' | 'start';

export interface onChangeProps {
  newValue: Operator | string | FilterValue[] | number | Unit;
  id: Id;
  type: ValueType;
}

export interface onSelectOrDeselectAllProps {
  newValues: FilterValue[];
  id: Id;
  type: 'select' | 'deselect';
}

// operators
type OperatorValue =
  | 'is'
  | 'is not'
  | 'is set'
  | 'is not set'
  | 'today'
  | 'yesterday'
  | 'tomorrow'
  | 'this week'
  | 'next week'
  | 'last month'
  | 'this month'
  | 'next month'
  | 'overdue'
  | 'after today'
  | 'this year'
  | 'next year'
  | 'next 7 days'
  | 'last 7 days'
  | 'last year'
  | 'today & earlier'
  | 'last quarter'
  | 'this quarter'
  | 'next quarter'
  | 'next'
  | 'last'
  | 'exact date'
  | 'before date'
  | 'after date';

type OperatorKey =
  | 'eq'
  | 'ne'
  | 'set'
  | 'ns'
  // date
  | 'today'
  | 'yesterday'
  | 'tomorrow'
  | 'week'
  | 'next_week'
  | 'last_month'
  | 'month'
  | 'next_month'
  | 'overdue'
  | 'after_today'
  | 'year'
  | 'next_year'
  | 'next7'
  | 'last7'
  | 'last_year'
  | 'earlier'
  | 'last_quarter'
  | 'quarter'
  | 'next_quarter'
  | 'next'
  | 'last'
  | 'ed' // eq
  | 'lt'
  | 'gt';

type StartDate = string;

type UnitKey = 'd' | 'm' | 'w' | 'y';
type UnitValue = 'days' | 'months' | 'weeks' | 'years';

interface Unit {
  key: UnitKey;
  value: UnitValue;
}

export type UnitOption = Record<UnitKey, Unit>;

// range - Date range

interface Operator {
  key: OperatorKey;
  value: OperatorValue;
  requireValues?: boolean;
  count?: number;
  unit?: Unit;
  start?: StartDate;
}

export type OperatorOption = Record<OperatorKey, Operator>;

type FilterValue =
  | string
  | { id: string; value: string; color?: string; initials?: string }
  | { id: string; name: string; color?: string };
type FilterId = number;
type FilterKey = TaskKey | string; // string for custom fields

// filters
interface Filter {
  values: FilterValue[];
  operators: Operator[];
  units?: Unit[];
}

export type FiltersOption = 'and' | 'or';

export interface FilterFieldsWithOption {
  fields: FilterWithId[];
  option: FiltersOption;
  search?: string;
}

export interface FilterWithId {
  id: FilterId;
  key: FilterKey;
  operator: Operator;
  values: FilterValue[];
}

export type FilterOption = Record<FilterKey, Filter>;
