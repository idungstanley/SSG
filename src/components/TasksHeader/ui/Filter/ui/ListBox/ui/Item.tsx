import { CheckIcon } from '@heroicons/react/24/outline';
import { cl } from '../../../../../../../utils';
import { isString, isArray } from '../../../../../../../utils/typeGuards';
import { FilterValue, Operator, Unit } from '../../../types/filters';
import { stringifyValue } from './SelectedValues/SelectedValue';

type Selected = FilterValue[] | Operator | string | Unit;
type Value = FilterValue | Operator | string | Unit;

interface ListBoxItemProps {
  value: Value;
  selected: Selected;
}

const checkSelected = (selected: Selected, value: Value) => {
  const extendedValue = isString(value) ? value : 'id' in value ? value.id : value.key;

  const extendedSelected = isString(selected)
    ? [selected]
    : isArray(selected)
    ? selected.map((i) => (isString(i) ? i : i.id))
    : [selected.key];

  return extendedSelected.includes(extendedValue);
};

export function ListBoxItem({ value, selected }: ListBoxItemProps) {
  const isSelected = checkSelected(selected, value);

  // just string
  if (isString(value)) {
    return (
      <>
        <span className={cl('block whitespace-nowrap capitalize', isSelected ? 'font-medium' : 'font-normal')}>
          {stringifyValue(value).replaceAll('_', ' ')}
        </span>
        {isSelected ? (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-600">
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
      </>
    );
  }

  // is Operator
  if ('key' in value) {
    return (
      <>
        <span className={cl('block whitespace-nowrap capitalize', isSelected ? 'font-medium' : 'font-normal')}>
          {isString(value) ? stringifyValue(value) : stringifyValue(value.value)}
        </span>
        {isSelected ? (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-600">
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
      </>
    );
  }

  // is FilterValue
  return (
    <>
      <span className={cl('block whitespace-nowrap capitalize', isSelected ? 'font-medium' : 'font-normal')}>
        {stringifyValue(
          (
            value as {
              id: string;
              value: string;
              color?: string | undefined;
              initials?: string | undefined;
            }
          ).value
        )}
      </span>
      {isSelected ? (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-600">
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
    </>
  );
}
