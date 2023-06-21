import { isString } from '../../../../../utils/typeGuards';
import { filterConfig } from '../config/filterConfig';
import { FilterKey, FilterValue, FilterWithId, onChangeProps, Operator, Unit } from '../types/filters';

export const generateFilter = (key: FilterKey, initialValue?: FilterValue): FilterWithId => ({
  id: Date.now(),
  key,
  values: initialValue ? [initialValue] : [],
  operator: filterConfig[key].operators[0]
});

export const filterValueBySearchQuery = (value: FilterValue | Operator | Unit, query: string) =>
  isString(value) ? value.includes(query.toLowerCase().trim()) : value.value.includes(query.toLowerCase().trim());

export const modifyFilters = ({ newValue, id, type }: onChangeProps, filters: FilterWithId[]) =>
  filters.map((i) => {
    if (i.id === id) {
      const newFilter = { ...i };
      switch (type) {
        case 'key': {
          newFilter.key = newValue as FilterKey;
          newFilter.values = [];
          return newFilter;
        }
        case 'operator': {
          const newOperator = newValue as Operator;
          const updatedFilter = { ...newFilter, operator: newOperator };
          if (!newOperator.requireValues) {
            updatedFilter.values = [];
          }
          return updatedFilter;
        }
        case 'value': {
          const value = newValue as FilterValue;
          const isExists = newFilter.values.includes(value as FilterValue);
          const updatedValues = isExists ? newFilter.values.filter((j) => j !== value) : [...newFilter.values, value];
          return { ...newFilter, values: updatedValues };
        }
        case 'count': {
          const value = newValue as number;
          if (value !== 0) {
            const updatedOperator = { ...newFilter.operator, count: value };
            return { ...newFilter, operator: updatedOperator, values: [] };
          }
          return newFilter;
        }
        case 'unit': {
          const updatedOperator = { ...newFilter.operator, unit: newValue as Unit };
          return { ...newFilter, operator: updatedOperator };
        }
        case 'start': {
          const updatedOperator = { ...newFilter.operator, start: newValue as string };
          return { ...newFilter, operator: updatedOperator };
        }
        default: {
          return newFilter;
        }
      }
    }
    return i;
  });
