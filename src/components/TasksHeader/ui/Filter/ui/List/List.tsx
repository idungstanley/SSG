import { useState } from 'react';
import { TaskKey } from '../../../../../../features/task/interface.tasks';
import { FilterValue, Id, Option, onChangeProps } from '../../types/filters';
import { AddNewItem } from './AddNewItem';
import { Item } from './Item';

// const mocked = [
//   {
//     id: 1685525669426,
//     key: 'priority',
//     values: ['important'],
//     option: 'is'
//   },
//   {
//     id: 1685525669427,
//     key: 'status',
//     values: ['completed'],
//     option: 'not is'
//   }
// ];

export function List() {
  const [showAddNewItem, setShowAddNewItem] = useState(false);
  const [filters, setFilters] = useState<FilterValue[]>([]);

  const onDelete = (id: Id) => setFilters((prev) => prev.filter((i) => i.id !== id));

  const onChange = ({ newValue, id, type }: onChangeProps) =>
    setFilters((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          switch (type) {
            case 'key': {
              i.key = newValue as TaskKey;
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
    );

  const onAdd = (newValue: TaskKey) => {
    setShowAddNewItem(false);
    setFilters((prev) => [...prev, { id: Date.now(), key: newValue, values: [], option: 'is' }]);
  };

  return (
    <div className="space-y-4 w-full p-2">
      {filters.map((filter, index) => (
        <Item index={index} onDelete={onDelete} onChange={onChange} filter={filter} key={filter.key} />
      ))}

      {showAddNewItem ? (
        <AddNewItem isFirst={filters.length === 0} onAdd={onAdd} onDelete={() => setShowAddNewItem(false)} />
      ) : null}

      <button type="button" onClick={() => setShowAddNewItem(true)}>
        <p className="text-xs text-gray-500">+ Add filter</p>
      </button>
    </div>
  );
}
