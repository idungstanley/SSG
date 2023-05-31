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
            switch (type) {
              case 'key': {
                i.key = newValue as Key;
                i.values = [];
                break;
              }
              case 'option': {
                i.option = newValue as Option;
                break;
              }
              case 'value': {
                const isExists = i.values.includes(newValue);
                i.values = isExists ? [...i.values.filter((j) => j !== newValue)] : [...i.values, newValue];

                break;
              }
            }
          }

          return i;
        })
      )
    );

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
