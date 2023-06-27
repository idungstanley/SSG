import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FilterKey, FilterValue, onSelectOrDeselectAllProps, Operator, Unit } from '../../../types/filters';
import { cl } from '../../../../../../../utils';
import { SelectedValue } from './SelectedValues/SelectedValue';
import { ListBoxItem } from './Item';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { filterValueBySearchQuery } from '../../../lib/filterUtils';
import { Input } from './Input';
import { Date } from './Date';
import { isDefined } from '../../../../../../../utils/typeGuards';

interface ListBoxProps {
  values: FilterValue[] | Operator[] | string[] | Unit[];
  selected: FilterValue[] | Operator | string | Unit;
  setSelected: (i: FilterValue[] | Operator | string) => void;
  showSearch?: boolean;
  onSelectOrDeselectAll?: (data: Pick<onSelectOrDeselectAllProps, 'type'>) => void;
  controlledOptionsDisplay?: true;
  key?: FilterKey;
}

export function ListBox({
  values,
  selected,
  setSelected,
  showSearch,
  onSelectOrDeselectAll,
  controlledOptionsDisplay,
  key
}: ListBoxProps) {
  const [query, setQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const showSelectAll = !!onSelectOrDeselectAll;
  const [selectAll, setSelectAll] = useState(true);

  const onToggleSelect = () => {
    if (onSelectOrDeselectAll) {
      const type = selectAll ? 'select' : 'deselect';
      onSelectOrDeselectAll({ type });

      setSelectAll((prev) => !prev);
    }
  };

  const filteredValues =
    showSearch && query.length > 0
      ? (values.map((i) => (filterValueBySearchQuery(i, query) ? i : null)).filter(Boolean) as
          | FilterValue[]
          | Operator[])
      : values;

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative flex-grow">
        <Listbox.Button
          onClick={isDefined(controlledOptionsDisplay) ? () => setShowOptions((prev) => !prev) : undefined}
          className="whitespace-nowrap capitalize relative w-full flex-grow cursor-pointer border shadow-sm rounded-lg bg-white py-2 pl-3 pr-10 text-left"
        >
          <SelectedValue key={key} value={selected} />

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          show={isDefined(controlledOptionsDisplay) ? showOptions : undefined}
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className='className="absolute left-0 z-10 mt-1 h-72 rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"'>
            <Listbox.Options className="overflow-auto h-full w-full">
              {/* search */}
              {showSearch ? (
                <div className="w-full flex items-center gap-2 p-1 border-b border-gray-400 mb-2">
                  <MagnifyingGlassIcon className="w-4 h-4" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    className="p-0 m-0 w-full text-gray-900 border-0 ring-0 focus:ring-0 focus:outline-0 appearance-none"
                    placeholder="Search..."
                    autoFocus
                  />
                </div>
              ) : null}

              {/* additional options */}
              {showSelectAll ? (
                <div className="flex w-full p-1 justify-between items-center">
                  <button onClick={onToggleSelect} className="text-primary-500 text-xs">
                    {selectAll ? 'Select All' : 'Deselect All'}
                  </button>
                </div>
              ) : null}

              {/* list items */}
              {filteredValues.map((value, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    cl(
                      'relative cursor-default text-left select-none py-2 pr-10 pl-4 w-full whitespace-nowrap rounded-md',
                      active ? 'bg-primary-100 text-primary-700' : 'text-gray-900'
                    )
                  }
                  value={value}
                >
                  <ListBoxItem selected={selected} value={value} />
                </Listbox.Option>
              ))}
            </Listbox.Options>

            {/* buttons to manage dropdown visibility */}
            {controlledOptionsDisplay ? (
              <div className="w-full flex items-center justify-between space-x-2 mt-2">
                <button
                  onClick={() => setShowOptions(false)}
                  className="border bg-gray-500 px-4 py-2 text-xs text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowOptions(false)}
                  className="border bg-primary-500 px-4 py-2 text-xs text-white"
                >
                  Confirm
                </button>
              </div>
            ) : null}
          </div>
        </Transition>
      </div>
    </Listbox>
  );
}

ListBox.Input = Input;
ListBox.Date = Date;
