import { TrashIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setFilters } from '../../../../../../features/task/taskSlice';
import { filterConfig } from '../../config/filterConfig';
import { FilterValue, Key } from '../../types/filters';
import { ListBox } from '../ListBox';
import { Label } from './Label';

const generateFilter = (key: Key): FilterValue => ({ id: Date.now(), key, values: [], option: 'is' });

interface AddNewItemProps {
  onHideNewItem: VoidFunction;
}

export function AddNewItem({ onHideNewItem }: AddNewItemProps) {
  const { filters } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const onAdd = (key: Key) => {
    dispatch(setFilters([...filters, generateFilter(key)]));
    onHideNewItem();
  };

  return (
    <div className="grid grid-rows-1 grid-cols-autoFrAutoFrAuto space-x-2 w-full items-center">
      <Label show={filters.length === 0} />

      <ListBox setSelected={(newValue) => onAdd(newValue)} selected="none" values={Object.keys(filterConfig)} />

      <div></div>
      <div></div>

      {/* delete button */}
      <button type="button" onClick={onHideNewItem}>
        <TrashIcon className="w-5 h-5 cursor-pointer text-gray-400" aria-hidden="true" />
      </button>
    </div>
  );
}
