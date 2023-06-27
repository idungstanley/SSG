import { isArray, isString } from '../../../../../../../../utils/typeGuards';
import { FilterValue, Operator, Unit } from '../../../../types/filters';
import { SELECT_KEY, SELECT_VALUE, stringifyValue } from './SelectedValue';

interface DefaultProps {
  value: FilterValue[] | Operator | string | Unit;
}

export function Default({ value }: DefaultProps) {
  if (isString(value)) {
    return <span className="block">{value === 'none' ? SELECT_KEY : stringifyValue(value).replaceAll('_', ' ')}</span>;
  }

  if (isArray(value)) {
    const title = value.map((i) => (isString(i) ? stringifyValue(i) : stringifyValue(i.value))).join(', ');

    return (
      <div title={title} className="flex items-center h-5 gap-1">
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
