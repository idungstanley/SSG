import { useState } from 'react';
import { TaskKey } from '../../../../../../features/task/interface.tasks';
import { filterConfig } from '../../config/filterConfig';
import { FilterValue, Value, Id, Option } from '../../types/filters';
import { ListBox } from '../ListBox';

type Type = 'key' | 'option' | 'value';

export function List() {
  const [filters, setFilters] = useState<FilterValue[]>([
    {
      id: 1685525669426,
      key: 'priority',
      values: ['important'],
      option: 'is'
    },
    {
      id: 1685525669427,
      key: 'status',
      values: ['completed'],
      option: 'not is'
    }
  ]);

  const onChange = ({ newValue, id, type }: { newValue: Value | Option | TaskKey; id: Id; type: Type }) => {
    setFilters((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          switch (type) {
            case 'key': {
              i.key = newValue;
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
  };

  return (
    <div className="space-y-4 w-full p-2">
      {filters.map((filter) => (
        <FilterItem onChange={onChange} filter={filter} key={filter.key} />
      ))}
    </div>
  );
}

interface FilterItemProps {
  filter: FilterValue;
  onChange: ({ newValue, id }: { newValue: Value | Option | TaskKey; id: Id; type: Type }) => void;
}

function FilterItem({ filter, onChange }: FilterItemProps) {
  return (
    <div className="flex space-x-3 w-full items-center justify-between">
      {/* key */}
      <ListBox
        setSelected={(newValue) => onChange({ newValue, id: filter.id, type: 'key' })}
        selected={filter.key}
        values={Object.keys(filterConfig)}
      />

      {/* option */}
      <ListBox
        setSelected={(newValue) => onChange({ newValue, id: filter.id, type: 'option' })}
        selected={filter.option}
        values={filterConfig[filter.key as TaskKey].options}
      />

      {/* value */}
      <ListBox
        setSelected={(newValue) => onChange({ newValue, id: filter.id, type: 'value' })}
        selected={filter.values}
        values={filterConfig[filter.key as TaskKey].values}
      />
    </div>
  );
}
