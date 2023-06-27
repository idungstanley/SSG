import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setFilterFields } from '../../../../../../features/task/taskSlice';
import { unitValues } from '../../config/filterConfig';
import { FilterId, FilterOption, FilterWithId, onChangeProps, onSelectOrDeselectAllProps } from '../../types/filters';
import { Label } from './Label';
import { ListBox } from '../ListBox';
import { modifyFilters, selectOrDeselectAllFilter } from '../../lib/filterUtils';
import { DeleteItem } from './DeleteItem';

interface ItemProps {
  filter: FilterWithId;
  initialFilters: FilterOption;
}

export function Item({ filter, initialFilters }: ItemProps) {
  const dispatch = useAppDispatch();
  const {
    filters: { fields: filters }
  } = useAppSelector((state) => state.task);

  const { key, values, operator, id } = filter;

  const onDelete = (id: FilterId) => dispatch(setFilterFields(filters.filter((i) => i.id !== id)));

  const onChange = (data: onChangeProps) => {
    dispatch(setFilterFields(modifyFilters(data, filters)));
  };

  const onSelectOrDeselectAll = ({ type }: Pick<onSelectOrDeselectAllProps, 'type'>) =>
    dispatch(setFilterFields(selectOrDeselectAllFilter({ type, newValues: initialFilters[key].values, id }, filters)));

  return (
    <div className="flex items-center w-full space-x-2">
      <Label
        isButton={filters.findIndex((i) => i.id === id) !== 0}
        disabled={filters.findIndex((i) => i.id === id) > 1}
      />

      {/* key */}
      <ListBox
        setSelected={(newValue) => onChange({ newValue, id, type: 'key' })}
        selected={key}
        values={Object.keys(initialFilters)}
      />

      {/* operator */}
      {initialFilters[key] ? (
        <ListBox
          setSelected={(newValue) => onChange({ newValue, id, type: 'operator' })}
          selected={operator}
          values={initialFilters[key].operators}
        />
      ) : null}

      {/* values */}
      {operator.requireValues ? (
        <ListBox
          setSelected={(newValue) => onChange({ newValue, id, type: 'value' })}
          selected={values}
          values={initialFilters[key].values}
          onSelectOrDeselectAll={onSelectOrDeselectAll}
          showSearch
        />
      ) : null}

      {/* count */}
      {'count' in operator ? (
        <ListBox.Input
          initialValue={operator.count}
          onChange={(newValue) => onChange({ newValue, id, type: 'count' })}
        />
      ) : null}

      {/* unit */}
      {'unit' in operator ? (
        <ListBox
          setSelected={(newValue) => onChange({ newValue, id, type: 'unit' })}
          selected={operator.unit ?? unitValues[0]}
          values={unitValues}
        />
      ) : null}

      {/* date picker */}
      {'start' in operator && operator.start ? (
        <ListBox.Date onChange={(newValue) => onChange({ newValue, id, type: 'start' })} value={operator.start} />
      ) : null}

      <DeleteItem onClick={() => onDelete(id)} />
    </div>
  );
}
