import { TrashIcon } from '@heroicons/react/24/outline';
import { filterConfig } from '../../config/filterConfig';
import { FilterValue, Id, onChangeProps } from '../../types/filters';
import { ListBox } from '../ListBox';
import { Label } from './Label';

interface ItemProps {
  filter: FilterValue;
  onChange: ({ newValue, id }: onChangeProps) => void;
  onDelete: (i: Id) => void;
  index: number;
}

export function Item({ filter, onChange, onDelete, index }: ItemProps) {
  const { key, values, option, id } = filter;

  const showValuesListBox = option === 'is' || option === 'is not';

  return (
    <div className="grid grid-rows-1 grid-cols-autoFrAutoFrAuto space-x-2 w-full items-center">
      <Label show={index === 0} />

      {/* key */}
      <ListBox
        setSelected={(newValue) => onChange({ newValue, id, type: 'key' })}
        selected={key}
        values={Object.keys(filterConfig)}
      />

      {/* needed for grid */}
      {!showValuesListBox ? <div></div> : null}

      {/* option */}
      <ListBox
        setSelected={(newValue) => onChange({ newValue, id, type: 'option' })}
        selected={option}
        values={filterConfig[key].options}
      />

      {/* value */}
      {showValuesListBox ? (
        <ListBox
          setSelected={(newValue) => onChange({ newValue, id, type: 'value' })}
          selected={values}
          values={filterConfig[key].values}
        />
      ) : null}

      {/* delete button */}
      <button type="button" onClick={() => onDelete(id)}>
        <TrashIcon className="w-5 h-5 cursor-pointer text-gray-400" aria-hidden="true" />
      </button>
    </div>
  );
}
