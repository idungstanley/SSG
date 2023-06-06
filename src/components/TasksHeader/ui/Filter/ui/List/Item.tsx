import { TrashIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setFilters } from '../../../../../../features/task/taskSlice';
import { filterConfig } from '../../config/filterConfig';
import { FilterValue, Id, Key, onChangeProps, Option } from '../../types/filters';
import { ListBox } from '../ListBox';
import { Label } from './Label';

interface ItemProps {
  filter: FilterValue;
  index: number;
}

export function Item({ filter, index }: ItemProps) {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.task);

  const { key, values, option, id } = filter;

  const showValuesListBox = option === 'is' || option === 'is not';

  const onDelete = (id: Id) => dispatch(setFilters(filters.filter((i) => i.id !== id)));

  const onChange = ({ newValue, id, type }: onChangeProps) =>
    dispatch(
      setFilters(
        filters.map((i) => {
          if (i.id === id) {
            const newFilter = { ...i };
            switch (type) {
              case 'key': {
                newFilter.key = newValue as Key;
                newFilter.values = [];
                break;
              }
              case 'option': {
                newFilter.option = newValue as Option;
                break;
              }
              case 'value': {
                const isExists = newFilter.values.includes(newValue);
                newFilter.values = isExists
                  ? [...newFilter.values.filter((j) => j !== newValue)]
                  : [...newFilter.values, newValue];
                break;
              }
            }
            return newFilter;
          }
          return i;
        })
      )
    );

  return (
    <div className="grid items-center w-full grid-rows-1 space-x-2 grid-cols-autoFrAutoFrAuto">
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
        <TrashIcon className="w-5 h-5 text-gray-400 cursor-pointer" aria-hidden="true" />
      </button>
    </div>
  );
}
