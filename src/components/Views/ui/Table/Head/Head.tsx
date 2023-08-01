import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import RoundedArrowUpDown from '../../../../../pages/workspace/tasks/component/views/listLevel/component/RoundedArrowUpDown';
import SortDirectionCheck from '../../../../../pages/workspace/tasks/component/views/listLevel/component/SortDirectionCheck';
import { parseLabel } from '../../../../TasksHeader/lib';
import { Column } from '../../../types/table';
import { Chevron } from '../../Chevron';
import {
  setActiveTaskColumn,
  setListIdForCustom,
  setSortArr,
  setSortArray
} from '../../../../../features/task/taskSlice';
import SortModal from '../../../../SortModal/SortModal';
import statusbox from '../../../../../assets/icons/statusbox.svg';
import { CiEdit, CiSettings } from 'react-icons/ci';
import { BsThreeDots } from 'react-icons/bs';
import { FiPlusCircle } from 'react-icons/fi';
import { ModalDropdown } from '../../../../Modal/ModalDropdown';
import { PencilIcon } from '@heroicons/react/24/outline';
import PlusIcon from '../../../../../assets/icons/PlusIcon';
import { TbAlignJustified } from 'react-icons/tb';
import { MdEditNote } from 'react-icons/md';
import { BiHide } from 'react-icons/bi';
import { setIsManageStatus } from '../../../../../features/workspace/workspaceSlice';

interface HeadProps {
  columns: Column[];
  tableHeight: string | number;
  mouseDown: (i: number) => void;
  label: string;
  collapseTasks: boolean;
  headerStatusColor?: string;
  taskLength: number;
  onToggleCollapseTasks: VoidFunction;
  listId: string | undefined;
}

export type SortOption = {
  dir: 'asc' | 'desc';
  field: string;
};

export function Head({
  columns,
  tableHeight,
  taskLength,
  collapseTasks,
  headerStatusColor,
  onToggleCollapseTasks,
  mouseDown,
  label,
  listId
}: HeadProps) {
  const parsedLabel = parseLabel(label);
  const dispatch = useAppDispatch();
  const scrollToRef = useRef(null);
  const sortAbles: string[] = ['Task', 'Updated at', 'Created at', 'Status', 'Priority', 'Assignees'];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [headerId, setheaderId] = useState<string>('');
  const [showStatusDropdown, setShowStatusDropdown] = useState<boolean>(false);
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const { sortArr, sortAbleArr } = useAppSelector((state) => state.task);
  const { baseColor } = useAppSelector((state) => state.account);
  const { isManageStatus } = useAppSelector((state) => state.workspace);

  const headerTxt = (title: string) =>
    title === 'Assignees'
      ? 'assignee'
      : title === 'Task'
      ? 'name'
      : title === 'Created at'
      ? 'created_at'
      : title === 'Updated at'
      ? 'updated_at'
      : title?.toLowerCase();

  const handleSort = (header: string, id: string | undefined, order: 'asc' | 'desc') => {
    setheaderId(id as string);
    const existingSortItem = sortAbleArr.findIndex((el) => el.field === headerTxt(header));
    if (existingSortItem !== -1) {
      const updatedSortArray = sortAbleArr.map((el) => (el.field === headerTxt(header) ? { ...el, dir: order } : el));
      dispatch(setSortArray(updatedSortArray));
    } else {
      dispatch(setSortArr([...sortArr, header as string]));
      dispatch(setSortArray([...sortAbleArr, { dir: order, field: headerTxt(header) }]));
    }
  };
  const handleRemoveFilter = (title?: string): void => {
    dispatch(setSortArr(sortArr.filter((el) => el !== title)));
    dispatch(setSortArray(sortAbleArr.filter((el) => el.field !== headerTxt(title as string))));
  };
  const handleOrder = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, propertyHeaderTxt?: string) => {
    e.stopPropagation();
    const existingSortItem = sortAbleArr?.findIndex((el) => el.field === propertyHeaderTxt);
    const existingSortDir = sortAbleArr?.find((el) => el.field === propertyHeaderTxt);
    if (existingSortItem !== -1 && existingSortDir?.dir === 'asc') {
      const updatedSortArray = sortAbleArr?.map((el) => (el.field === propertyHeaderTxt ? { ...el, dir: 'desc' } : el));
      dispatch(setSortArray(updatedSortArray as SortOption[]));
    } else {
      const updatedSortArray = sortAbleArr?.map((el) => (el.field === propertyHeaderTxt ? { ...el, dir: 'asc' } : el));
      dispatch(setSortArray(updatedSortArray as SortOption[]));
    }
  };

  const setOptions = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string, header: string) => {
    dispatch(setActiveTaskColumn({ id: id, header: header }));
    setheaderId(id);
    setShowSortModal(!showSortModal);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseManageStatus = () => {
    dispatch(setIsManageStatus);
  };

  const dirCheck = (col: string): SortOption | undefined => {
    return sortAbleArr.find((el) => el.field === headerTxt(col));
  };

  const statusDropdownOptions = [
    { label: 'Rename', icon: <PencilIcon className="w-4 h-4" aria-hidden="true" />, handleClick: () => ({}) },
    { label: 'New status', icon: <PlusIcon />, handleClick: () => ({}) },
    { label: 'Select all', icon: <TbAlignJustified />, handleClick: () => ({}) },
    { label: 'Collapse group', icon: <MdEditNote />, handleClick: () => ({}) },
    { label: 'Collapse all groups', icon: <MdEditNote />, handleClick: () => ({}) },
    {
      label: 'Hide status',
      icon: <BiHide />,
      handleClick: () => {
        dispatch(setIsManageStatus(!isManageStatus));
      }
    },
    {
      label: 'Manage statuses',
      icon: <CiSettings />,
      handleClick: () => {
        dispatch(setIsManageStatus(!isManageStatus));
        setShowStatusDropdown(false);
      }
    }
  ];

  return columns.length > 0 ? (
    <thead className="contents">
      <tr className="contents ">
        {/* first sticky col */}
        <th style={{ zIndex: 2 }} className="sticky left-0 flex items-center -mb-2 font-extrabold" ref={columns[0].ref}>
          <div className="flex items-center " style={{ width: '38px' }}></div>
          <div className="flex items-center w-full gap-3 py-2 truncate dBlock group opacity-90">
            <div
              className="py-0.5 relative px-2 rounded-tr-md -mb-1 flex items-center space-x-1 text-white dFlex "
              style={{ backgroundColor: headerStatusColor }}
            >
              <div>
                <div className=" items-center ml-0.5 space-x-1 viewSettings" onClick={(e) => e.stopPropagation()}>
                  <img src={statusbox} alt="" />
                  <CiEdit />
                  <BsThreeDots className="cursor-pointer" onClick={() => setShowStatusDropdown((prev) => !prev)} />
                </div>
                <div className="flex">
                  <p>
                    <Chevron
                      color={headerStatusColor}
                      active={collapseTasks}
                      onToggle={onToggleCollapseTasks}
                      hoverBg="white"
                    />
                  </p>
                  <span ref={scrollToRef} className="pb-1" style={{ fontSize: '11px', WebkitTextStroke: '0.5px' }}>
                    {parsedLabel}
                  </span>
                </div>
              </div>

              <ModalDropdown
                showModal={showStatusDropdown}
                setShowModal={setShowStatusDropdown}
                position="left-96 top-56"
              >
                <div className="flex flex-col p-1 space-y-2">
                  <p className="text-alsoit-gray-75">Group Options</p>
                  <div className="flex flex-col space-y-2">
                    {statusDropdownOptions.map((item, index) => (
                      <div
                        className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-alsoit-gray-50"
                        key={index}
                        onClick={item.handleClick}
                      >
                        <p>{item.icon}</p>
                        <p>{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ModalDropdown>
            </div>
            <div
              className="flex items-center hover:bg-gray-200 p-0.5 rounded-md space-x-1  border-t-2 border-l-2 border-r-2 border-transparent hover:border-gray-600 text-alsoit-gray-200 font-semibold"
              style={{ fontSize: '11px', WebkitTextStroke: '0.5px' }}
            >
              <span onClick={(e) => setOptions(e, columns[0].id, columns[0].value)} className="cursor-pointer">
                <span className="mr-1.5">{taskLength}</span>
                {!collapseTasks ? columns[0].value.toUpperCase() : null}
              </span>
              {sortAbles.includes(columns[0].value) && (
                <>
                  {sortArr.length >= 1 && sortArr.includes(columns[0].value) ? (
                    ''
                  ) : (
                    <RoundedArrowUpDown value={columns[0].value} id={columns[0].id} handleSort={handleSort} />
                  )}
                  {sortArr.includes(columns[0].value) && sortAbles.includes(columns[0].value) && (
                    <SortDirectionCheck
                      bgColor={baseColor}
                      sortItemLength={sortArr.length}
                      sortIndex={sortArr.indexOf(columns[0].value)}
                      sortValue={columns[0].value}
                      sortDesc={dirCheck(columns[0].value)?.dir === 'desc'}
                      handleRemoveSortFn={handleRemoveFilter}
                      propertyHeaderTxt={headerTxt(columns[0].value)}
                      handleOrder={handleOrder}
                    />
                  )}
                </>
              )}
            </div>
          </div>
          <FiPlusCircle
            className="w-4 h-4 font-black AddColumnDropdownButton mr-2"
            onClick={() => dispatch(setListIdForCustom(listId))}
          />
          {headerId === columns[0].id && (
            <SortModal
              handleClose={handleClose}
              anchorEl={anchorEl}
              toggleModal={setShowSortModal}
              handleSortFn={handleSort}
              setAnchorEl={setAnchorEl}
            />
          )}
        </th>
        {!collapseTasks
          ? columns.slice(1).map(({ ref, value, id }, index) => (
              <th key={id} className="relative w-full py-2 -mb-1 font-extrabold opacity-90 " ref={ref}>
                <div
                  className={`text-alsoit-gray-200 font-semibold flex dBlock items-center justify-center w-full h-full my-auto cursor-pointer group  ${
                    sortAbles.includes(value)
                      ? 'hover:bg-gray-200 p-0.5 rounded-md space-x-1 border-l-2 border-r-2 border-t-2 border-transparent hover:border-gray-500'
                      : ''
                  }`}
                  style={{ fontSize: '11px', WebkitTextStroke: '0.5px' }}
                >
                  <span onClick={(e) => setOptions(e, id, value)}>{value.toUpperCase()}</span>
                  {sortAbles.includes(value) && (
                    <span className="ml-0.5">
                      {sortArr.length >= 1 && sortArr.includes(value) ? (
                        ''
                      ) : (
                        <RoundedArrowUpDown value={value} id={id} handleSort={handleSort} />
                      )}
                      {sortArr.includes(value) && sortAbles.includes(value) && (
                        <SortDirectionCheck
                          bgColor={baseColor}
                          sortItemLength={sortArr.length}
                          sortIndex={sortArr.indexOf(value)}
                          sortValue={value}
                          sortDesc={dirCheck(value)?.dir === 'desc'}
                          handleRemoveSortFn={handleRemoveFilter}
                          propertyHeaderTxt={headerTxt(value)}
                          handleOrder={handleOrder}
                        />
                      )}
                    </span>
                  )}
                </div>
                <div
                  className="absolute top-0 block w-2 cursor-move -right-3 idle"
                  style={{ height: tableHeight }}
                  onMouseDown={() => mouseDown(index + 1)}
                >
                  <div className="w-0.5 mx-auto h-full bg-gray-100" />
                </div>
                {headerId === id && sortAbles.includes(value) && (
                  <SortModal
                    handleClose={handleClose}
                    anchorEl={anchorEl}
                    toggleModal={setShowSortModal}
                    handleSortFn={handleSort}
                    setAnchorEl={setAnchorEl}
                  />
                )}
              </th>
            ))
          : null}
      </tr>
    </thead>
  ) : null;
}
