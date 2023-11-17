import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import { ReactNode, useEffect } from 'react';
import { FilterKey, FilterValue, onSelectOrDeselectAllProps, Operator, Unit } from '../../../types/filters';
import { cl } from '../../../../../../../utils';
import { SelectedValue } from './SelectedValues/SelectedValue';
import { ListBoxItem } from './Item';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { filterValueBySearchQuery } from '../../../lib/filterUtils';
import { Input } from './Input';
import { Date } from './Date';
import { AdditionalListBox } from './AdditionalListBox';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setFiltersUpdated, setSubtasksFiltersUpdated } from '../../../../../../../features/task/taskSlice';

interface ListBoxProps {
  values: FilterValue[] | Operator[] | string[] | Unit[];
  selected: FilterValue[] | Operator | string | Unit;
  showSearch?: boolean;
  filterKey?: FilterKey;
  children?: ReactNode;
  setSelected: (i: FilterValue[] | Operator | string) => void;
  onSelectOrDeselectAll?: (data: Pick<onSelectOrDeselectAllProps, 'type'>) => void;
}

const DEFAULT_PREV_STATE = {
  state: [],
  isSet: false
};

export function ListBox({
  values,
  selected,
  showSearch,
  filterKey,
  children,
  setSelected,
  onSelectOrDeselectAll
}: ListBoxProps) {
  const dispatch = useAppDispatch();

  const { splitSubTaskState: isSplitMode, selectedTaskParentId } = useAppSelector((state) => state.task);

  const [query, setQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [selectAll, setSelectAll] = useState<'select' | 'deselect'>('select');
  const [prevState, setPrevState] = useState<{ state: FilterValue[]; isSet: boolean }>(DEFAULT_PREV_STATE);

  const showSelectAll = !!onSelectOrDeselectAll;

  useEffect(() => {
    if (!showSelectAll) return;

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

  const onClickField = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);

    if (!prevState.isSet) {
      setPrevState({ state: selected as FilterValue[], isSet: true });
    } else {
      resetPrevState();
    }
  };

  const filteredValues =
    showSearch && query.length > 0
      ? (values.map((i) => (filterValueBySearchQuery(i, query) ? i : null)).filter(Boolean) as
          | FilterValue[]
          | Operator[])
      : values;

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={onClickField}
        className="text-black flex gap-5 border border-gray-500 py-1 px-2 rounded w-full"
      >
        <SelectedValue filterKey={filterKey} value={selected} />
        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden />
      </button>
      {children}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        PaperProps={{
          style: {
            borderRadius: '10px'
          }
        }}
        style={{ maxHeight: '372px' }}
      >
        {/* search */}
        {showSearch ? (
          <div className="w-full flex items-center gap-2 p-y border-b border-gray-400 mb-2">
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
          <button
            key={index}
            className={cl(
              'relative cursor-pointer text-left select-none py-2 pr-10 pl-4 w-full whitespace-nowrap rounded-md flex gap-2 font-semibold',
              'hover:bg-primary-100 hover:text-primary-700'
            )}
            style={{ minWidth: '150px' }}
            onClick={() => {
              if (isSplitMode && selectedTaskParentId) {
                dispatch(setSubtasksFiltersUpdated(true));
              } else {
                dispatch(setFiltersUpdated(true));
              }
              setSelected(value as string);
              handleClose();
            }}
          >
            <ListBoxItem selected={selected} value={value} />
          </button>
        ))}
      </Menu>
    </div>
  );
}

ListBox.Input = Input;
ListBox.Date = Date;
ListBox.Additional = AdditionalListBox;
