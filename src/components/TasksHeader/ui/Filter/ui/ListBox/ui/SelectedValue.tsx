import { isArray, isString } from '../../../../../../../utils/typeGuards';
import { SPECIAL_CHAR } from '../../../config/filterConfig';
import { FilterValue, Operator, Unit } from '../../../types/filters';

interface SelectedValueProps {
  value: FilterValue[] | Operator | string | Unit;
}

const SELECT_KEY = 'Select filter';
const SELECT_VALUE = 'Select option';

export const stringifyValue = (i: string) => i.split(SPECIAL_CHAR)[0];

export function SelectedValue({ value }: SelectedValueProps) {
  if (isString(value)) {
    return <span className="block">{value === 'none' ? SELECT_KEY : stringifyValue(value).replaceAll('_', ' ')}</span>;
  }

  if (isArray(value)) {
    const title = value.map((i) => (isString(i) ? stringifyValue(i) : stringifyValue(i.value))).join(', ');

    return (
      <div title={title} className="flex items-center h-5 max-w-5 gap-1">
        {value.length === 0 ? (
          <span className="block">{SELECT_VALUE}</span>
        ) : (
          value.map((i) => (
            <span key={isString(i) ? i : i.id} className="block truncate">
              {isString(i) ? stringifyValue(i) : stringifyValue(i.value)}
            </span>
          ))
        )}
      </div>
    );
  }

  return <span className="block">{stringifyValue(value.value)}</span>;
}
