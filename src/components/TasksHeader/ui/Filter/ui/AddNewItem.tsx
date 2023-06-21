import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setFilters } from '../../../../../features/task/taskSlice';
import { filterConfig } from '../config/filterConfig';
import { generateFilter } from '../lib/filterUtils';
import { FilterKey } from '../types/filters';
import { ListBox } from './ListBox';
import { DeleteItem } from './FilterItem/DeleteItem';
import { Label } from './FilterItem/Label';

interface AddNewItemProps {
  onHideNewItem: VoidFunction;
}

export function AddNewItem({ onHideNewItem }: AddNewItemProps) {
  const { filters } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const onAdd = (key: FilterKey) => {
    dispatch(setFilters([...filters, generateFilter(key)]));
    onHideNewItem();
  };

  return (
    <div className="flex items-center w-full space-x-2">
      <Label show={filters.length === 0} />

      <ListBox
        setSelected={(newValue) => onAdd(newValue as FilterKey)}
        selected="none"
        values={Object.keys(filterConfig)}
      />

      <DeleteItem onClick={onHideNewItem} />
    </div>
  );
}
