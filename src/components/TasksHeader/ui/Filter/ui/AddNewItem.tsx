import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { generateFilter } from '../lib/filterUtils';
import { FilterKey, FilterOption } from '../types/filters';
import { ListBox } from './ListBox';
import { DeleteItem } from './FilterItem/DeleteItem';
import { Label } from './FilterItem/Label';
import { setFilterFields, setFiltersUpdated, setSubtasksFilters } from '../../../../../features/task/taskSlice';

interface AddNewItemProps {
  onHideNewItem: VoidFunction;
  initialFilters: FilterOption;
}

export function AddNewItem({ onHideNewItem, initialFilters }: AddNewItemProps) {
  const dispatch = useAppDispatch();

  const { selectedTaskParentId, splitSubTaskState: splitMode, subtasksfilters } = useAppSelector((state) => state.task);

  const {
    filters: { fields: filters }
  } = useAppSelector((state) => state.task);

  const createUpdatedFilter = (key: FilterKey) => {
    const oldField = subtasksfilters[selectedTaskParentId]?.fields;
    return {
      ...subtasksfilters,
      [selectedTaskParentId]: {
        ...subtasksfilters[selectedTaskParentId],
        fields: oldField?.length ? [...oldField, generateFilter(key)] : [generateFilter(key)]
      }
    };
  };

  const onAdd = (key: FilterKey) => {
    if (splitMode) {
      dispatch(setSubtasksFilters(createUpdatedFilter(key)));
    } else {
      dispatch(setFilterFields([...filters, generateFilter(key)]));
    }
    dispatch(setFiltersUpdated(false));
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
