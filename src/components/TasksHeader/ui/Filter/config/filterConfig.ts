import dayjs from 'dayjs';
import { FilterOption, OperatorOption, Unit, UnitOption } from '../types/filters';

export const SPECIAL_CHAR = '%%%';
export const DEFAULT_FILTERS_OPTION = 'and';

export const ADDITIONAL_OPERATORS = ['any', 'all'];

const units: UnitOption = {
  d: { key: 'd', value: 'days' },
  w: { key: 'w', value: 'weeks' },
  m: { key: 'm', value: 'months' },
  y: { key: 'y', value: 'years' }
};

export const operators: OperatorOption = {
  eq: { key: 'eq', value: 'is', requireValues: true },
  ne: { key: 'ne', value: 'is not', requireValues: true },
  set: { key: 'set', value: 'is set' },
  ns: { key: 'ns', value: 'is not set' },

  today: { key: 'today', value: 'today' },
  yesterday: { key: 'yesterday', value: 'yesterday' },
  tomorrow: { key: 'tomorrow', value: 'tomorrow' },
  week: { key: 'week', value: 'this week' },
  next_week: { key: 'next_week', value: 'next week' },
  last_month: { key: 'last_month', value: 'last month' },
  month: { key: 'month', value: 'this month' },
  next_month: { key: 'next_month', value: 'next month' },
  overdue: { key: 'overdue', value: 'overdue' },
  year: { key: 'year', value: 'this year' },
  after_today: { key: 'after_today', value: 'after today' },
  next_year: { key: 'next_year', value: 'next year' },
  next7: { key: 'next7', value: 'next 7 days' },
  last_year: { key: 'last_year', value: 'last year' },
  last7: { key: 'last7', value: 'last 7 days' },
  earlier: { key: 'earlier', value: 'today & earlier' },
  quarter: { key: 'quarter', value: 'this quarter' },
  last_quarter: { key: 'last_quarter', value: 'last quarter' },
  next_quarter: { key: 'next_quarter', value: 'next quarter' },
  next: { key: 'next', value: 'next', count: 1, unit: units.d },
  last: { key: 'last', value: 'last', count: 1, unit: units.d },
  lt: { key: 'lt', value: 'before date', start: dayjs().format('YYYY-MM-DD') },
  gt: { key: 'gt', value: 'after date', start: dayjs().format('YYYY-MM-DD') },
  ed: { key: 'eq', value: 'exact date', start: dayjs().format('YYYY-MM-DD') }
};

const priorityValues = ['low', 'normal', 'high', 'urgent'];
export const unitValues: Unit[] = [units.d, units.m, units.w, units.y];

export const filterConfig: FilterOption = {
  priority: { values: [...priorityValues], operators: [operators.eq, operators.ne] },
  status: { values: [], operators: [operators.eq, operators.ne] }, // dynamic
  assignees: { operators: [operators.eq, operators.ns, operators.set], values: [] }, // dynamic
  tags: { operators: [operators.eq, operators.ns, operators.set], values: [] }, // dynamic
  start_date: {
    operators: [
      operators.ns,
      operators.set,
      operators.today,
      operators.tomorrow,
      operators.yesterday,
      operators.week,
      operators.next_week,
      operators.month,
      operators.last_month,
      operators.next_month,
      operators.overdue,
      operators.after_today,
      operators.year,
      operators.next_year,
      operators.last_year,
      operators.next7,
      operators.last7,
      operators.earlier,
      operators.quarter,
      operators.last_quarter,
      operators.next_quarter,
      operators.next,
      operators.last,
      operators.lt,
      operators.gt,
      operators.ed
    ],
    values: [],
    units: [...unitValues]
  },
  end_date: {
    operators: [
      operators.ns,
      operators.set,
      operators.today,
      operators.tomorrow,
      operators.yesterday,
      operators.week,
      operators.next_week,
      operators.month,
      operators.last_month,
      operators.next_month,
      operators.overdue,
      operators.after_today,
      operators.year,
      operators.next_year,
      operators.last_year,
      operators.next7,
      operators.last7,
      operators.earlier,
      operators.quarter,
      operators.last_quarter,
      operators.next_quarter,
      operators.next,
      operators.last,
      operators.lt,
      operators.gt,
      operators.ed
    ],
    values: [],
    units: [...unitValues]
  },
  created_at: {
    operators: [
      operators.today,
      operators.tomorrow,
      operators.yesterday,
      operators.week,
      operators.next_week,
      operators.month,
      operators.last_month,
      operators.next_month,
      operators.overdue,
      operators.after_today,
      operators.year,
      operators.next_year,
      operators.last_year,
      operators.next7,
      operators.last7,
      operators.earlier,
      operators.quarter,
      operators.last_quarter,
      operators.next_quarter,
      operators.next,
      operators.last,
      operators.lt,
      operators.gt,
      operators.ed
    ],
    values: [],
    units: [...unitValues]
  }
};
