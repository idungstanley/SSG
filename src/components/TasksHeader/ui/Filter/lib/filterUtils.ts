import { isString } from '../../../../../utils/typeGuards';
import { filterConfig, operators } from '../config/filterConfig';
import {
  FilterId,
  FilterKey,
  FilterValue,
  FilterWithId,
  onChangeProps,
  onSelectOrDeselectAllProps,
  Operator,
  Unit
} from '../types/filters';

interface AdditionalProps {
  initialValue?: FilterValue;
}

export const generateFilter = (key: FilterKey, props?: AdditionalProps): FilterWithId => ({
  id: Date.now(),
  key,
  values: props?.initialValue ? [props.initialValue] : [],
  operator: filterConfig[key]?.operators[0] ?? operators.eq
});

export const filterValueBySearchQuery = (value: FilterValue | Operator | Unit, query: string) =>
  isString(value)
    ? value.includes(query.toLowerCase().trim())
    : (
        value as {
          id: string;
          value: string;
          color?: string | undefined;
          initials?: string | undefined;
        }
      ).value.includes(query.toLowerCase().trim());

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

export const selectOrDeselectAllFilter = (
  { newValues, id, type }: onSelectOrDeselectAllProps,
  filters: FilterWithId[]
) =>
  filters.map((i) => {
    if (i.id === id) {
      const newFilter = { ...i };

      const updatedValues = type === 'deselect' ? [] : [...newValues];
      return { ...newFilter, values: updatedValues };
    }

    return i;
  });

export const undoChanges = ({ prevState, id }: { prevState: FilterValue[]; id: FilterId }, filters: FilterWithId[]) =>
  filters.map((i) => {
    if (i.id === id) {
      const newFilter = { ...i };

      return { ...newFilter, values: [...prevState] };
    }

    return i;
  });

export const filterUniqueValues = (
  initialValues: FilterValue[],
  existingValues: FilterWithId[],
  id: FilterId,
  key: FilterKey
) => {
  // create array of values or id's
  const adjustedExistingValues = existingValues
    .filter((i) => i.id !== id && i.key === key)
    .map((i) => i.values)
    .flat();

  return initialValues.filter((i) => !adjustedExistingValues.includes(isString(i) ? i : i.id));
};
