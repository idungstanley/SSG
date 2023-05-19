import React, { useEffect, useRef, useState } from 'react';
import { AiFillCaretRight, AiFillCaretDown, AiOutlineBgColors } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { useDispatch } from 'react-redux';
// import { setSortArray } from '../../features/task/taskSlice';
import Input from '../input/Input';
import { BiSearch } from 'react-icons/bi';
import { BsSortAlphaDown, BsSortAlphaUp } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { SortOption } from '../../pages/workspace/tasks/component/views/listLevel/TaskListViews';
import SortDirectionCheck from '../../pages/workspace/tasks/component/views/listLevel/component/SortDirectionCheck';
import { setSortArr, setSortArray } from '../../features/task/taskSlice';

type SortModalProps = {
  headers: string[];
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSortFn: (header: string, id: string, order: 'asc' | 'desc') => void;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  setAnchorEl?: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

type filterSwitch = {
  title: string;
  toggle: boolean;
};

export default function SortModal({
  headers,
  toggleModal,
  setAnchorEl,
  anchorEl,
  handleClose,
  handleSortFn
}: SortModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { sortAbleArr, activeTaskColumn, sortArr } = useAppSelector((state) => state.task);
  const { baseColor } = useAppSelector((state) => state.account);
  const [sortDropDown, setSortDropDown] = useState<boolean>(false);
  const [sortItems, getSortItems] = useState<SortOption[]>([]);
  const [isSortCheckerDrRemoved, setSortDrChecker] = useState<boolean>(false);
  const [filterDropDown, setFilterDropDown] = useState<filterSwitch[]>([
    { title: 'color', toggle: false },
    { title: 'condition', toggle: false },
    { title: 'value', toggle: false }
  ]);
  const header = activeTaskColumn.header;
  const headerTxt = header === 'Assignees' ? 'assignee' : header === 'Task' ? 'name' : header.toLowerCase();
  const getOrder = sortAbleArr.find((item) => item.field === headerTxt);

  const hasDuplicate = sortAbleArr.some(
    (obj, index, self) =>
      self.findIndex((o) => o[header as keyof typeof obj] === obj[header as keyof typeof obj]) !== index
  );

  useEffect(() => {
    getSortItems(sortAbleArr.filter((item) => item.field === headerTxt));
    if (hasDuplicate) return;
    if (isSortCheckerDrRemoved) dispatch(setSortArr(sortArr.filter((el) => el !== header)));
    setSortDrChecker(false);
  }, [sortAbleArr, isSortCheckerDrRemoved]);

  const handleRemoveFilter = (title?: string, sortCriteria?: string) => {
    const headerTxt = title === 'Assignees' ? 'assignee' : title === 'Task' ? 'name' : title?.toLowerCase();
    if (hasDuplicate) {
      dispatch(
        setSortArray(
          sortAbleArr.filter(
            (el) => el.field !== headerTxt || !Object.prototype.hasOwnProperty.call(el, sortCriteria as PropertyKey)
          )
        )
      );
    } else {
      setSortDrChecker(true);
      setAnchorEl?.(null);
      dispatch(setSortArray(sortAbleArr.filter((el) => el.field !== headerTxt)));
      dispatch(setSortArr(sortArr.filter((el) => el !== title)));
    }
  };

  const open = Boolean(anchorEl);
  const switchBtns = (event: React.MouseEvent, field: string) => {
    event.stopPropagation();
    if (field === 'sortBtn') {
      setSortDropDown((prev) => !prev);
    } else {
      setFilterDropDown((prev) => {
        return prev.map((obj) => (obj.title === field ? { ...obj, toggle: !obj.toggle } : obj));
      });
    }
  };
  console.log(filterDropDown);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        toggleModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [toggleModal]);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      autoFocus={false}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
      className="rounded-md shadow-2xl"
      PaperProps={{
        style: {
          height: '150px',
          overflowY: 'auto',
          width: '300px',
          padding: '8px'
        }
      }}
    >
      <div className="flex flex-col" style={{ zIndex: '9999' }}>
        <div>
          <Input
            name="SearchInput"
            placeholder="Search 'field name' Column"
            onChange={() => ({})}
            trailingIcon={<BiSearch />}
          />
        </div>
        <div className="z-50 flex flex-col justify-start mt-2 space-y-1 capitalize">
          <div className="flex items-center justify-between h-8 px-1 text-xs hover:bg-gray-200 group alt-task">
            <div className="flex items-center gap-1 ">
              {getOrder?.dir === 'desc' ? (
                <>
                  <BsSortAlphaUp />
                  <p className="text-xs">Sort Z - A</p>
                </>
              ) : (
                <>
                  <BsSortAlphaDown />
                  <p className="text-xs">Sort A - Z</p>
                </>
              )}
            </div>
            <div className="flex items-center justify-between">
              <SortDirectionCheck
                bgColor={baseColor}
                sortItemLength={sortItems.length}
                sortIndex={sortItems.findIndex((item) => item.field === getOrder?.field)}
                sortValue={getOrder?.field}
                sortDesc={getOrder?.dir == 'desc'}
                handleRemoveSortFn={handleRemoveFilter}
                sortCriteria="dir"
              />
              <div className="flex items-center">
                <div className="flex flex-col items-center justify-center -space-y-1">
                  <IoIosArrowUp
                    className="text-gray-400"
                    style={{ color: getOrder?.dir == 'asc' ? baseColor : '' }}
                    onClick={() => handleSortFn(activeTaskColumn.header, activeTaskColumn.id, 'asc')}
                  />
                  <IoIosArrowDown
                    className="text-gray-400"
                    style={{ color: getOrder?.dir == 'desc' ? baseColor : '' }}
                    onClick={() => handleSortFn(activeTaskColumn.header, activeTaskColumn.id, 'desc')}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* sort implementation */}
          <div className="flex items-center justify-between h-8 px-1 text-xs hover:bg-gray-200">
            <div className="flex items-center gap-1">
              <AiOutlineBgColors />
              <p>sort by color</p>
            </div>
            {!sortDropDown ? (
              <AiFillCaretRight className="w-3 h-3 font-bold" onClick={(e) => switchBtns(e, 'sortBtn')} />
            ) : (
              <AiFillCaretDown className="w-3 h-3 font-bold" onClick={(e) => switchBtns(e, 'sortBtn')} />
            )}
          </div>
        </div>
      </div>
    </Menu>
  );
}
