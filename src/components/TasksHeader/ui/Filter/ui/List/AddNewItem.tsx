import { TrashIcon } from '@heroicons/react/24/outline';
import { TaskKey } from '../../../../../../features/task/interface.tasks';
import { filterConfig } from '../../config/filterConfig';
import { ListBox } from '../ListBox';

interface AddNewItemProps {
  onAdd: (newValue: TaskKey) => void;
  onDelete: VoidFunction;
}

export function AddNewItem({ onAdd, onDelete }: AddNewItemProps) {
  return (
    <div className="grid grid-rows-1 grid-cols-frAutoFrAuto space-x-2 w-full items-center">
      <ListBox
        setSelected={(newValue) => onAdd(newValue as TaskKey)}
        selected="none"
        values={Object.keys(filterConfig)}
      />

      <div></div>
      <div></div>

      {/* delete button */}
      <button type="button" onClick={onDelete}>
        <TrashIcon className="w-5 h-5 cursor-pointer text-gray-400" aria-hidden="true" />
      </button>
    </div>
  );
}
