import React, { useState } from 'react';
import RoundedArrowUpDown from './RoundedArrowUpDown';
import SortDirectionCheck from './SortDirectionCheck';
import SortModal from '../../../../../../../components/SortModal/SortModal';
import { setActiveTaskColumn, setSortArr, setSortArray } from '../../../../../../../features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';

export type SortOption = {
  dir: 'asc' | 'desc';
  field: string;
};

interface PropertyHeaderProps {
  id: string;
  value: string;
}

export default function TaskListPropertyHead({ id, value }: PropertyHeaderProps) {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { baseColor } = useAppSelector((state) => state.account);
  const { sortArr, sortAbleArr } = useAppSelector((state) => state.task);
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [headerId, setheaderId] = useState<string>('');
  const sortAbles: string[] = ['Task', 'Start Date', 'End Date', 'Priority', 'Assignees'];
  const [querySwitch, setQuerySwitch] = useState<boolean>(false);
  const handleSort = (header: string, id: string | undefined, order: 'asc' | 'desc') => {
    const headerTxt = header === 'Assignees' ? 'assignee' : header === 'Task' ? 'name' : header.toLowerCase();
    setheaderId(id as string);
    if (sortArr.includes(headerTxt)) return setShowSortModal(!showSortModal);
    dispatch(setSortArr([...sortArr, header as string]));
    dispatch(setSortArray([...sortAbleArr, { dir: order, field: headerTxt }]));
    setQuerySwitch(!querySwitch);
  };

  const handleRemoveFilter = (title?: string): void => {
    const headerTxt = title === 'Assignees' ? 'assignee' : title === 'Task' ? 'name' : title?.toLowerCase();
    dispatch(setSortArr(sortArr.filter((el) => el !== title)));
    dispatch(setSortArray(sortAbleArr.filter((el) => el.field !== headerTxt)));
  };

  const setOptions = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string, header: string) => {
    dispatch(setActiveTaskColumn({ id: id, header: header }));
    setheaderId(id);
    setShowSortModal(!showSortModal);
    setAnchorEl(event.currentTarget);
  };

  const dirCheck = (col: string): SortOption | undefined => {
    const headerTxt = col === 'Assignees' ? 'assignee' : col === 'Task' ? 'name' : col.toLowerCase();
    return sortAbleArr.find((el) => el.field === headerTxt);
  };

  return (
    <div
      className={`relative flex items-center space-x-1 text-xs font-medium uppercase hover:bg-gray-200 hover:text-gray-50 group ${
        value !== 'Task' && value !== 'Tags' && 'justify-center w-24'
      }`}
      style={{ color: '#78828d', fontSize: '12px' }}
    >
      <span
        className="font-bold truncate cursor-pointer hover:text-clip hover:w-10"
        onClick={(e) => setOptions(e, id, value)}
      >
        {value}
      </span>
      {sortAbles.includes(value) && (
        <>
          {sortArr.length >= 1 && sortArr.includes(value) ? (
            ''
          ) : (
            <RoundedArrowUpDown value={value} id={id as string | undefined} handleSort={handleSort} />
          )}
          {sortArr.includes(value) && sortAbles.includes(value) && (
            <SortDirectionCheck
              bgColor={baseColor}
              sortItemLength={sortArr.length}
              sortIndex={sortArr.indexOf(value)}
              sortValue={value}
              sortDesc={dirCheck(value)?.dir === 'desc'}
              handleRemoveSortFn={handleRemoveFilter}
            />
          )}
        </>
      )}
      {showSortModal && headerId === id && (
        <SortModal
          handleClose={handleClose}
          anchorEl={anchorEl}
          toggleModal={setShowSortModal}
          handleSortFn={handleSort}
          setAnchorEl={setAnchorEl}
        />
      )}
    </div>
  );
}
