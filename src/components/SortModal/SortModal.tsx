import React, { Fragment, useEffect, useRef, useState } from 'react';
import { AiOutlineBgColors } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Menu from '@mui/material/Menu';
import Input from '../input/Input';
import { BiHide, BiSearch } from 'react-icons/bi';
import { BsSortAlphaDown, BsSortAlphaUp } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp, IoIosColorFilter } from 'react-icons/io';
import SortDirectionCheck from '../../pages/workspace/tasks/component/views/listLevel/component/SortDirectionCheck';
import {
  SortOption,
  setEditCustomProperty,
  setEntityForCustom,
  setSortArr,
  setSortArray
} from '../../features/task/taskSlice';
import { RiFilter2Line } from 'react-icons/ri';
import { MdEditNote, MdOutlineDeleteForever, MdOutlineFilter1 } from 'react-icons/md';
import { HiOutlineDuplicate, HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { TbAlignJustified } from 'react-icons/tb';
import { setActiveTabId } from '../../features/workspace/workspaceSlice';
import { pilotTabs } from '../../app/constants/pilotTabs';
import { IField } from '../../features/list/list.interfaces';
import { displayPrompt, setVisibility } from '../../features/general/prompt/promptSlice';

type SortModalProps = {
  anchorEl: HTMLElement | null;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSortFn: (header: string, id: string, order: 'asc' | 'desc') => void;
  setAnchorEl?: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleClose: () => void;
  handleRemoveColumn?: () => void;
};

type filterSwitch = {
  title: string;
  toggle: boolean;
};

interface dropdownTypes {
  label: string;
  icon: JSX.Element;
  showArrow: boolean;
  isHide: boolean;
  handleClick?: () => void;
}

export default function SortModal({
  anchorEl,
  toggleModal,
  setAnchorEl,
  handleClose,
  handleSortFn,
  handleRemoveColumn
}: SortModalProps) {
  const { sortAbleArr, activeTaskColumn, sortArr } = useAppSelector((state) => state.task);
  const DropDownOptions: dropdownTypes[] = [
    {
      label: 'filter by color',
      icon: <IoIosColorFilter />,
      showArrow: true,
      isHide: false
    },
    {
      label: 'filter by condition',
      icon: <RiFilter2Line />,
      showArrow: true,
      isHide: false
    },
    {
      label: 'filter by values',
      icon: <MdOutlineFilter1 />,
      showArrow: true,
      isHide: false
    },
    {
      label: 'Move Columns',
      icon: <HiOutlineSwitchHorizontal />,
      showArrow: true,
      isHide: false
    },
    {
      label: 'Ajust Alignment',
      icon: <TbAlignJustified />,
      showArrow: true,
      isHide: false
    },
    {
      label: 'Edit Fields',
      icon: <MdEditNote />,
      showArrow: false,
      isHide: false,
      handleClick: () => {
        if (!activeTaskColumn.defaulField) {
          dispatch(setEditCustomProperty(activeTaskColumn as IField));
          dispatch(setActiveTabId(pilotTabs.TEMPLATES));
          dispatch(setEntityForCustom({ id: undefined, type: undefined }));
          handleClose();
        }
      }
    },
    {
      label: 'Duplicate',
      icon: <HiOutlineDuplicate />,
      showArrow: false,
      isHide: false
    },
    {
      label: 'Hide Columns',
      icon: <BiHide />,
      showArrow: false,
      isHide: false
    },
    {
      label: 'Remove From List',
      icon: <MdOutlineDeleteForever className="text-red-500" />,
      showArrow: false,
      isHide: activeTaskColumn.defaulField,
      handleClick: () => {
        if (!activeTaskColumn.defaulField) {
          dispatch(
            displayPrompt(
              `Delete "${activeTaskColumn.value}" column`,
              `Would you like delete this "${activeTaskColumn.value}" column?`,
              [
                {
                  label: 'Delete Column',
                  style: 'danger',
                  callback: () => {
                    handleRemoveColumn && handleRemoveColumn();
                    dispatch(setVisibility(false));
                  }
                },
                {
                  label: 'Cancel',
                  style: 'plain',
                  callback: () => {
                    dispatch(setVisibility(false));
                  }
                }
              ]
            )
          );
          handleClose();
        }
      }
    }
  ];
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { baseColor } = useAppSelector((state) => state.account);
  const [sortDropDown, setSortDropDown] = useState<boolean>(false);
  const [sortItems, getSortItems] = useState<SortOption[]>([]);
  const [isSortCheckerDrRemoved, setSortDrChecker] = useState<boolean>(false);
  const [filterDropDown, setFilterDropDown] = useState<filterSwitch[]>([
    { title: 'color', toggle: false },
    { title: 'condition', toggle: false },
    { title: 'value', toggle: false }
  ]);
  const header = activeTaskColumn.value;
  const headerTxt =
    header === 'Assignees'
      ? 'assignee'
      : header === 'Task'
      ? 'name'
      : header === 'Created at'
      ? 'created_at'
      : header === 'Updated at'
      ? 'updated_at'
      : header?.toLowerCase();
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

  const handleRemoveFilter = (title?: string) => {
    const headerTxt = title === 'Assignees' ? 'assignee' : title === 'Task' ? 'name' : title?.toLowerCase();
    setSortDrChecker(true);
    setAnchorEl?.(null);
    dispatch(setSortArray(sortAbleArr.filter((el) => el.field !== headerTxt)));
    dispatch(setSortArr(sortArr.filter((el) => el !== title)));
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
          height: '350px',
          overflowY: 'auto',
          width: '250px',
          padding: '0px 8px 8px 8px'
        }
      }}
    >
      <div key="sortModal" className="flex flex-col" style={{ zIndex: '9999' }}>
        <div className="sticky top-0 z-50 pt-2 bg-white">
          <Input
            name="SearchInput"
            placeholder="Search 'field name' Column"
            onChange={() => ({})}
            trailingIcon={<BiSearch />}
          />
        </div>
        <div className="z-40 flex flex-col justify-start mt-2 space-y-1 overflow-y-visible capitalize">
          <div className="flex items-center justify-between h-8 px-1 hover:bg-gray-200 group alt-task">
            <div className="flex items-center gap-1 ">
              {getOrder?.dir === 'desc' ? (
                <>
                  <BsSortAlphaUp />
                  <p>Sort Z - A</p>
                </>
              ) : (
                <>
                  <BsSortAlphaDown />
                  <p>Sort A - Z</p>
                </>
              )}
            </div>
            <div className="flex items-center justify-between">
              <SortDirectionCheck
                bgColor={baseColor}
                sortItemLength={sortItems.length}
                sortIndex={sortItems.findIndex((item) => item.field === getOrder?.field)}
                sortValue={getOrder?.field}
                sortDesc={getOrder?.dir === 'desc'}
                handleRemoveSortFn={handleRemoveFilter}
                sortCriteria="dir"
              />
              <div className="flex items-center">
                <div className="flex flex-col items-center justify-center">
                  <IoIosArrowUp
                    className="text-gray-600"
                    style={{ color: getOrder?.dir === 'asc' ? baseColor : '' }}
                    onClick={() => handleSortFn(activeTaskColumn.value, activeTaskColumn.id, 'asc')}
                  />
                  <IoIosArrowDown
                    className="text-gray-600"
                    style={{ color: getOrder?.dir === 'desc' ? baseColor : '' }}
                    onClick={() => handleSortFn(activeTaskColumn.value, activeTaskColumn.id, 'desc')}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* sort implementation */}
          <div className="flex items-center justify-between h-8 px-1 hover:bg-gray-200">
            <div className="flex items-center gap-1">
              <AiOutlineBgColors />
              <p>sort by color</p>
            </div>
            {!sortDropDown ? (
              <IoIosArrowForward className="font-bold text-gray-600" onClick={(e) => switchBtns(e, 'sortBtn')} />
            ) : (
              <IoIosArrowDown className="font-bold text-gray-600" onClick={(e) => switchBtns(e, 'sortBtn')} />
            )}
          </div>
          <hr />
          {/* filter implementation */}
          {/* <div className="flex flex-col space-y-1 capitalize p"> */}
          <>
            {DropDownOptions.map((item, index) => (
              <Fragment key={index}>
                {!item.isHide ? (
                  <div onClick={item.handleClick}>
                    <div className="flex items-center justify-between h-8 px-1 hover:bg-gray-200 cursor-pointer">
                      <div className="flex items-center gap-1">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.showArrow && (
                        <>
                          {!filterDropDown[0].toggle ? (
                            <IoIosArrowForward
                              className="font-bold text-gray-600"
                              onClick={(e) => switchBtns(e, 'color')}
                            />
                          ) : (
                            <IoIosArrowDown
                              className="font-bold text-gray-600"
                              onClick={(e) => switchBtns(e, 'color')}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ) : null}
              </Fragment>
            ))}
          </>
        </div>
      </div>
    </Menu>
  );
}
