import { Fragment, ReactNode, useEffect, useState } from 'react';
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
import { AdditionalListBox } from './AdditionalListBox';
import toast from 'react-hot-toast';
import SaveFilterToast from '../../Toast';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setFiltersUpdated, setSubtasksFiltersUpdated } from '../../../../../../../features/task/taskSlice';

interface ListBoxProps {
  values: FilterValue[] | Operator[] | string[] | Unit[];
  selected: FilterValue[] | Operator | string | Unit;
  showSearch?: boolean;
  controlledOptionsDisplay?: true;
  filterKey?: FilterKey;
  children?: ReactNode;
  setSelected: (i: FilterValue[] | Operator | string) => void;
  onSelectOrDeselectAll?: (data: Pick<onSelectOrDeselectAllProps, 'type'>) => void;
  onUndoChanges?: (i: FilterValue[]) => void;
}

const DEFAULT_PREV_STATE = {
  state: [],
  isSet: false
};

export function ListBox({
  values,
  selected,
  showSearch,
  controlledOptionsDisplay,
  filterKey,
  children,
  setSelected,
  onSelectOrDeselectAll,
  onUndoChanges
}: ListBoxProps) {
  const dispatch = useAppDispatch();

  const { splitSubTaskState: isSplitMode, selectedTaskParentId } = useAppSelector((state) => state.task);

  const [query, setQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [selectAll, setSelectAll] = useState<'select' | 'deselect'>('select');
  const [prevState, setPrevState] = useState<{ state: FilterValue[]; isSet: boolean }>(DEFAULT_PREV_STATE);

  const showSelectAll = !!onSelectOrDeselectAll;

  // manage select and deselect values
  useEffect(() => {
    if (!showSelectAll) {
      return;
    }

    const selectedValues = selected as FilterValue[];
    const availableValues = values as FilterValue[];

    if (
      selectedValues.length &&
      availableValues.length &&
      selectedValues.length === availableValues.length &&
      selectAll === 'select'
    ) {
      setSelectAll('deselect');
    }

    if (selectedValues.length < availableValues.length && selectAll === 'deselect') {
      setSelectAll('select');
    }
  }, [selected, values, selectAll]);

  const resetPrevState = () => setPrevState(DEFAULT_PREV_STATE);

  const onToggleSelect = () => {
    if (onSelectOrDeselectAll) {
      onSelectOrDeselectAll({ type: selectAll });
      setSelectAll(selectAll === 'select' ? 'deselect' : 'select');
    }
  };

  const onClickCancel = () => {
    if (onUndoChanges) {
      onUndoChanges(prevState.state);
    }
  };

  const onClickConfirm = () => {
    setShowOptions(false);
    resetPrevState();
    if (isSplitMode && selectedTaskParentId) {
      dispatch(setSubtasksFiltersUpdated(true));
    } else {
      dispatch(setFiltersUpdated(true));
    }
    toast.custom(
      (t) => (
        <SaveFilterToast
          title="This view has unsaved Changes"
          body="Please Kindly save changes or cancel to discard"
          toastId={t.id}
          extended="taskFilter"
        />
      ),
      {
        position: 'bottom-right',
        duration: Infinity
      }
    );
  };

  const onClickField = () => {
    setShowOptions((prev) => !prev);

    if (!prevState.isSet) {
      // set prev state on mount
      setPrevState({ state: selected as FilterValue[], isSet: true });
    } else {
      // clear prev state on unmount
      resetPrevState();
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
          onClick={isDefined(controlledOptionsDisplay) ? onClickField : undefined}
          className="whitespace-nowrap capitalize relative w-full flex-grow cursor-pointer border shadow-sm rounded-lg bg-white py-2 pl-3 pr-10 text-left"
        >
          <SelectedValue filterKey={filterKey} value={selected} />

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden />
          </span>
        </Listbox.Button>

        {/* additional option */}
        {children}

        <Transition
          show={isDefined(controlledOptionsDisplay) ? showOptions : undefined}
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute right-0 w-80 z-10 flex flex-col mt-1 max-h-72 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                    {selectAll === 'select' ? 'Select All' : 'Deselect All'}
                  </button>
                </div>
              ) : null}

              {/* list items */}
              {filteredValues.map((value, index) => (
                <Listbox.Option
                  key={index}
                  className={cl(
                    'relative cursor-pointer text-left select-none py-2 pr-10 pl-4 w-full whitespace-nowrap rounded-md',
                    'hover:bg-primary-100 hover:text-primary-700',
                    'text-gray-900'
                  )}
                  value={value}
                >
                  <ListBoxItem selected={selected} value={value} />
                </Listbox.Option>
              ))}
            </Listbox.Options>

            {/* buttons to manage dropdown visibility */}
            {controlledOptionsDisplay ? (
              <div className="w-full flex items-center justify-between space-x-2 mt-3 px-2">
                <button
                  disabled={!prevState.isSet}
                  onClick={onClickCancel}
                  className="border bg-gray-200 px-4 py-2 text-xs text-gray-700"
                >
                  Cancel
                </button>
                <button onClick={onClickConfirm} className="border bg-primary-200 px-4 py-2 text-xs text-primary-700">
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
ListBox.Additional = AdditionalListBox;
