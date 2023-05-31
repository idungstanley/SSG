import { useState } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { AddNewItem } from './AddNewItem';
import { Item } from './Item';

export function List() {
  const [showAddNewItem, setShowAddNewItem] = useState(false);
  const { filters } = useAppSelector((state) => state.task);

  return (
    <div className="space-y-4 w-full p-2">
      {filters.map((filter, index) => (
        <Item index={index} filter={filter} key={filter.key} />
      ))}

      {showAddNewItem ? <AddNewItem onHideNewItem={() => setShowAddNewItem(false)} /> : null}

      <button type="button" onClick={() => setShowAddNewItem(true)}>
        <p className="text-xs text-gray-500">+ Add filter</p>
      </button>
    </div>
  );
}
