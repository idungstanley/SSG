import { useAppSelector } from '../../../app/hooks';
import { isString } from '../../../utils/typeGuards';
import { FilterKey, FilterValue } from '../ui/Filter/types/filters';

const DATE_KEYS: Partial<FilterKey>[] = ['created_at', 'end_date', 'start_date'];

const SPECIAL_KEYS: Partial<FilterKey>[] = ['assignees', 'tags', ...DATE_KEYS];

const getValues = (values: FilterValue[]) => values.map((i) => (isString(i) ? i : i.id));

export const generateFilters = () => {
  const { filters } = useAppSelector((state) => state.task);

  const assignee = filters.find((i) => i.key === 'assignees');
  const tags = filters.find((i) => i.key === 'tags');

  const dates = filters.filter((i) => DATE_KEYS.includes(i.key));

  const other = filters.filter((i) => !SPECIAL_KEYS.includes(i.key));

  return {
    filters: {
      assignees: assignee ? (assignee.values.length ? getValues(assignee.values) : assignee.operator.key) : undefined,
      fields: [
        tags
          ? {
              field: 'tag',
              op: tags.operator.key,
              values: tags.values.length ? getValues(tags.values) : undefined
            }
          : null,

        ...dates.map((i) => ({
          field: i.key,
          op: i.operator.key,
          values: i.values.length ? i.values : undefined,
          start: i.operator.start,
          count: i.operator.count,
          unit: i.operator.unit?.key
        })),

        ...other.map((i) => ({
          field: i.key,
          op: i.operator.key,
          values: i.values.length ? getValues(i.values) : undefined
        }))
      ].filter(Boolean)
    }
  };
};
