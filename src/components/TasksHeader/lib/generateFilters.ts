import { useAppSelector } from '../../../app/hooks';
import { isString } from '../../../utils/typeGuards';
import { SPECIAL_CHAR } from '../ui/Filter/config/filterConfig';
import { FilterKey, FilterValue, FilterWithId, FiltersOption } from '../ui/Filter/types/filters';

const DATE_KEYS: Partial<FilterKey>[] = ['created_at', 'end_date', 'start_date'];

const FILTER_KEYS = {
  assignee: 'assignee',
  tag: 'tag'
};

const SPECIAL_KEYS: Partial<FilterKey>[] = ['assignees', 'tags', ...DATE_KEYS];

const getValues = (values: FilterValue[]) => values.map((i) => (isString(i) ? i : i.id));

const getKey = (i: string) => i.split(SPECIAL_CHAR)[1] ?? i.split(SPECIAL_CHAR)[0];

export const generateFilters = () => {
  const {
    filters: { fields: filters, option: op }
  } = useAppSelector((state) => state.task);

  const assignee = filters.filter((i) => i.key === SPECIAL_KEYS[0]);
  const tags = filters.find((i) => i.key === SPECIAL_KEYS[1]);

  const dates = filters.filter((i) => DATE_KEYS.includes(i.key));

  const other = filters.filter((i) => !SPECIAL_KEYS.includes(i.key));

  return {
    filters: {
      op,
      fields: [
        tags
          ? {
              field: FILTER_KEYS.tag,
              op: tags.operator.key,
              values: tags.values.length ? getValues(tags.values) : null
            }
          : null,

        ...assignee.map((i) => ({
          field: FILTER_KEYS.assignee,
          op: i.operator.key,
          values: i.values.length ? getValues(i.values) : null
        })),

        ...dates.map((i) => ({
          field: i.key,
          op: i.operator.key,
          values: i.values.length ? i.values : null,
          start: i.operator.start,
          count: i.operator.count,
          unit: i.operator.unit?.key
        })),

        ...other.map((i) => ({
          field: getKey(i.key),
          op: i.operator.key,
          values: i.values.length ? getValues(i.values) : null
        }))
      ].filter(Boolean)
    }
  };
};

export const generateFiltersSubtasks = (op: FiltersOption, filters: FilterWithId[]) => {
  const assignee = filters.filter((i) => i.key === SPECIAL_KEYS[0]);
  const tags = filters.find((i) => i.key === SPECIAL_KEYS[1]);

  const dates = filters.filter((i) => DATE_KEYS.includes(i.key));

  const other = filters.filter((i) => !SPECIAL_KEYS.includes(i.key));

  return {
    filters: {
      op,
      fields: [
        tags
          ? {
              field: FILTER_KEYS.tag,
              op: tags.operator.key,
              values: tags.values.length ? getValues(tags.values) : null
            }
          : null,

        ...assignee.map((i) => ({
          field: FILTER_KEYS.assignee,
          op: i.operator.key,
          values: i.values.length ? getValues(i.values) : null
        })),

        ...dates.map((i) => ({
          field: i.key,
          op: i.operator.key,
          values: i.values.length ? i.values : null,
          start: i.operator.start,
          count: i.operator.count,
          unit: i.operator.unit?.key
        })),

        ...other.map((i) => ({
          field: getKey(i.key),
          op: i.operator.key,
          values: i.values.length ? getValues(i.values) : null
        }))
      ].filter(Boolean)
    }
  };
};
