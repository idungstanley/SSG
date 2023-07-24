import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { generateFilter } from '../lib/filterUtils';
import { FilterKey, FilterOption } from '../types/filters';
import { ListBox } from './ListBox';
import { DeleteItem } from './FilterItem/DeleteItem';
import { Label } from './FilterItem/Label';
import { setFilterFields } from '../../../../../features/task/taskSlice';

interface AddNewItemProps {
  onHideNewItem: VoidFunction;
  initialFilters: FilterOption;
}

export function AddNewItem({ onHideNewItem, initialFilters }: AddNewItemProps) {
  const {
    filters: { fields: filters }
  } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const onAdd = (key: FilterKey) => {
    dispatch(setFilterFields([...filters, generateFilter(key)]));
    onHideNewItem();
  };

  return (
    <div className="flex items-center w-full space-x-2">
      <Label isButton={filters.length > 0} disabled={filters.length > 1} />

      <ListBox
        setSelected={(newValue) => onAdd(newValue as FilterKey)}
        selected="none"
        values={Object.keys(initialFilters)}
      />

      <DeleteItem onClick={onHideNewItem} />
    </div>
  );
}
