import { isArray, isString } from '../../../../../../../utils/typeGuards';
import { FilterValue, Operator, Unit } from '../../../types/filters';

interface SelectedValueProps {
  value: FilterValue[] | Operator | string | Unit;
}

const SELECT_KEY = 'Select filter';
const SELECT_VALUE = 'Select option';

export function SelectedValue({ value }: SelectedValueProps) {
  if (isString(value)) {
    return <span className="block">{value === 'none' ? SELECT_KEY : value.replaceAll('_', ' ')}</span>;
  }

  if (isArray(value)) {
    const title = value.map((i) => (isString(i) ? i : i.value)).join(', ');

    return (
      <div title={title} className="flex items-center h-5 max-w-5 gap-1">
        {value.length === 0 ? (
          <span className="block">{SELECT_VALUE}</span>
        ) : (
          value.map((i) => (
            <span key={isString(i) ? i : i.id} className="block truncate">
              {isString(i) ? i : i.value}
            </span>
          ))
        )}
      </div>
    );
  }

  return <span className="block">{value.value}</span>;
}
