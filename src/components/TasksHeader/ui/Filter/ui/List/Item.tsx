import { TrashIcon } from '@heroicons/react/24/outline';
import { TaskKey } from '../../../../../../features/task/interface.tasks';
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
  return (
    <div className="grid grid-rows-1 grid-cols-autoFrAutoFrAuto space-x-2 w-full items-center">
      <Label show={index === 0} />

      {/* key */}
      <ListBox
        setSelected={(newValue) => onChange({ newValue, id: filter.id, type: 'key' })}
        selected={filter.key}
        values={Object.keys(filterConfig)}
      />

      {/* option */}
      <ListBox
        setSelected={(newValue) => onChange({ newValue, id: filter.id, type: 'option' })}
        selected={filter.option}
        values={filterConfig[filter.key as TaskKey].options}
      />

      {/* value */}
      <ListBox
        setSelected={(newValue) => onChange({ newValue, id: filter.id, type: 'value' })}
        selected={filter.values}
        values={filterConfig[filter.key as TaskKey].values}
      />

      {/* delete button */}
      <button type="button" onClick={() => onDelete(filter.id)}>
        <TrashIcon className="w-5 h-5 cursor-pointer text-gray-400" aria-hidden="true" />
      </button>
    </div>
  );
}
