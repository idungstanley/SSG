import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import RoundedArrowUpDown from '../../../../../pages/workspace/tasks/component/views/listLevel/component/RoundedArrowUpDown';
import SortDirectionCheck from '../../../../../pages/workspace/tasks/component/views/listLevel/component/SortDirectionCheck';
import { parseLabel } from '../../../../TasksHeader/lib';
import {
  SortOption,
  setActiveTaskColumn,
  setEditCustomProperty,
  setEntityForCustom,
  setSelectedTasksArray,
  setSortArr,
  setSortArray
} from '../../../../../features/task/taskSlice';
import SortModal from '../../../../SortModal/SortModal';
import { CiEdit, CiSettings } from 'react-icons/ci';
import { BsThreeDots } from 'react-icons/bs';
import { FiPlusCircle } from 'react-icons/fi';
import { PencilIcon } from '@heroicons/react/24/outline';
import PlusIcon from '../../../../../assets/icons/PlusIcon';
import { TbAlignJustified } from 'react-icons/tb';
import { MdEditNote, MdOutlineDragIndicator } from 'react-icons/md';
import { BiHide } from 'react-icons/bi';
import {
  setActiveSubHubManagerTabId,
  setActiveTabId,
  setIsManageStatus
} from '../../../../../features/workspace/workspaceSlice';
import AlsoitMenuDropdown from '../../../../DropDowns';
import { setStatusTaskListDetails } from '../../../../../features/list/listSlice';
import { useParams } from 'react-router-dom';
import { Task } from '../../../../../features/task/interface.tasks';
import CollapseIcon from '../../collapseIcon/CollapseIcon';
import '../../../../../styles/task.css';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';
import { ExtendedListColumnProps } from '../../../../../pages/workspace/tasks/component/views/ListColumns';
import RoundedCheckbox from '../../../../Checkbox/RoundedCheckbox';
import { pilotTabs } from '../../../../../app/constants/pilotTabs';
import { useDeleteCustomField } from '../../../../../features/list/listService';
import { generateSortField } from '../../../../../utils/TaskHeader/GenerateSortField';

interface HeadProps {
  columns: ExtendedListColumnProps[];
  tableHeight: string | number;
  label: string;
  collapseTasks: boolean;
  headerStatusColor?: string;
  taskLength: number;
  listId: string | undefined;
  listName?: string;
  groupedTask?: Task[];
  isSplitSubtask?: boolean;
  parentId?: string;
  onToggleCollapseTasks: VoidFunction;
}

export function Head({
  columns,
  tableHeight,
  taskLength,
  collapseTasks,
  headerStatusColor,
  label,
  listId,
  listName,
  groupedTask,
  isSplitSubtask,
  parentId,
  onToggleCollapseTasks
}: HeadProps) {
  const dispatch = useAppDispatch();
  const { listId: list_id, hubId, walletId } = useParams();

  const {
    sortArr,
    sortAbleArr,
    selectedTasksArray,
    selectedIndex,
    selectedIndexStatus,
    selectedIndexListId,
    activeTaskColumn,
    subtasks
  } = useAppSelector((state) => state.task);
  const { baseColor } = useAppSelector((state) => state.account);
  const { isManageStatus } = useAppSelector((state) => state.workspace);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [headerId, setHeaderId] = useState<string>('');
  const [showStatusDropdown, setShowStatusDropdown] = useState<null | SVGElement>(null);
  const [showSortModal, setShowSortModal] = useState<boolean>(false);

  const scrollToRef = useRef(null);

  const parsedLabel = parseLabel(label);

  const { mutate: onDelete } = useDeleteCustomField(activeTaskColumn.id, listId as string);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    setShowStatusDropdown(event.currentTarget);
  };

  const handleCloseStatusDropdown = () => {
    setShowStatusDropdown(null);
  };

  useEffect(() => {
    if (selectedIndex !== null) {
      const updatedTaskIds: string[] = [...selectedTasksArray];
      groupedTask?.map((task, index) => {
        if (selectedIndex === index && selectedIndexStatus === task.status.name && listId == selectedIndexListId) {
          const taskIndex = updatedTaskIds.indexOf(task.id);
          if (taskIndex === -1) {
            updatedTaskIds.push(task.id);
            dispatch(setSelectedTasksArray(updatedTaskIds));
          }
        }
      });
    }
  }, [selectedIndex]);

  const allChecked = groupedTask?.every((value) => selectedTasksArray.includes(value.id));

  const handleCheckedGroupTasks = () => {
    const updatedTaskIds: string[] = [...selectedTasksArray];
    if (allChecked) {
      groupedTask?.forEach((task) => {
        const taskIndex = updatedTaskIds.indexOf(task.id);
        updatedTaskIds.splice(taskIndex, 1);
      });
    } else {
      groupedTask?.forEach((task) => {
        const taskIndex = updatedTaskIds.indexOf(task.id);
        if (taskIndex === -1) {
          console.log(subtasks);
          updatedTaskIds.push(task.id);
        }
      });
    }
    dispatch(setSelectedTasksArray(updatedTaskIds));
  };

  const handleSort = (header: string, id: string | undefined, order: 'asc' | 'desc', isDefault?: boolean) => {
    setHeaderId(id as string);
    const existingSortItem = sortAbleArr.findIndex((el) => el.field === generateSortField(isDefault as boolean, id));
    if (existingSortItem !== -1) {
      const updatedSortArray = sortAbleArr.map((el) =>
        el.field === generateSortField(isDefault as boolean, id) ? { ...el, dir: order } : el
      );
      dispatch(setSortArray(updatedSortArray));
    } else {
      dispatch(setSortArr([...sortArr, header as string]));
      dispatch(setSortArray([...sortAbleArr, { dir: order, field: generateSortField(isDefault as boolean, id) }]));
    }
  };

  const handleRemoveFilter = (title?: string, criteria?: string, isDefault?: boolean, id?: string): void => {
    dispatch(setSortArr(sortArr.filter((el) => el !== title)));
    dispatch(setSortArray(sortAbleArr.filter((el) => el.field !== generateSortField(isDefault as boolean, id))));
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

  const setOptions = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, item: ExtendedListColumnProps) => {
    dispatch(setActiveTaskColumn(item));
    setHeaderId(item.id);
    setShowSortModal(!showSortModal);
    setAnchorEl(event.currentTarget);
  };

  const dirCheck = (col: string, isDefault: boolean, id?: string): SortOption | undefined => {
    return sortAbleArr.find((el) => el.field === generateSortField(isDefault, id));
  };

  const statusDropdownOptions = [
    { label: 'Rename', icon: <PencilIcon className="w-4 h-4" aria-hidden="true" />, handleClick: () => ({}) },
    { label: 'New status', icon: <PlusIcon active />, handleClick: () => ({}) },
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
        dispatch(setActiveTabId(pilotTabs.ENTITY_MANAGER));
        setShowStatusDropdown(null);
        dispatch(setActiveSubHubManagerTabId('status_management'));
        dispatch(setStatusTaskListDetails({ listId, listName }));
      }
    }
  ];

  const handleAddCustomProperty = () => {
    let id = '';
    let type = '';
    if (isSplitSubtask && parentId) {
      id = parentId;
      type = EntityType.task;
    } else {
      id = hubId || walletId || list_id || '';
      type = hubId ? EntityType.hub : walletId ? EntityType.wallet : EntityType.list;
    }
    dispatch(setEntityForCustom({ id, type }));
    dispatch(setEditCustomProperty(undefined));
    dispatch(setActiveTabId(pilotTabs.TEMPLATES));
  };

  const handleRemoveColumn = () => {
    if (activeTaskColumn.id) {
      const type = hubId ? EntityType.hub : walletId ? EntityType.wallet : EntityType.list;
      onDelete({
        columnId: activeTaskColumn.id,
        listId: listId as string,
        type
      });
    }
  };

  return columns.length > 0 ? (
    <>
      <thead className="contents">
        <tr className="relative contents group">
          {/* first sticky col */}
          <th style={{ zIndex: 2 }} className="sticky left-0 flex items-center -mb-2 font-extrabold">
            <div className="flex items-center "></div>
            <div className="flex items-center w-full py-2 truncate dBlock group opacity-90 ml-0.5">
              <div>
                <RoundedCheckbox
                  onChange={handleCheckedGroupTasks}
                  isChecked={allChecked as boolean}
                  styles={`w-4 h-4 rounded-full ${
                    selectedTasksArray.length > 0 ? 'opacity-100' : 'opacity-0'
                  } cursor-pointer focus:outline-1 focus:ring-transparent focus:border-2 focus:opacity-100 top-3.5 text-alsoit-purple-300 absolute left-1 group-hover:opacity-100`}
                />
              </div>
              <div
                className="py-0.5 relative px-2 rounded-tr-md -mb-1 flex items-center space-x-1 text-white dFlex "
                style={{
                  backgroundColor: headerStatusColor,
                  marginLeft: '38px',
                  height: '25px',
                  gap: '5px'
                }}
              >
                <div>
                  <div className="flex items-center">
                    <div className="pr-1.5 -ml-1.5">
                      <CollapseIcon
                        color={headerStatusColor}
                        active={collapseTasks}
                        onToggle={onToggleCollapseTasks}
                        hoverBg="white"
                      />
                    </div>
                    <span ref={scrollToRef} style={{ fontSize: '11px', WebkitTextStroke: '0.5px', fontWeight: 500 }}>
                      {parsedLabel.toUpperCase()}
                    </span>
                    <div className="items-center pl-2 space-x-1 viewSettings" onClick={(e) => e.stopPropagation()}>
                      <CiEdit className="w-4 h-4 pr-1 border-r cursor-pointer" style={{ color: 'orange' }} />
                      <BsThreeDots className="w-4 h-4 cursor-pointer" onClick={(e) => handleClick(e)} />
                    </div>
                  </div>
                </div>
                <AlsoitMenuDropdown
                  handleClose={handleCloseStatusDropdown}
                  anchorEl={showStatusDropdown as HTMLDivElement | null}
                >
                  <div className="flex flex-col p-2 px-2 space-y-2">
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
                </AlsoitMenuDropdown>
              </div>
              <div
                className="flex items-center hover:bg-gray-200 p-0.5 rounded-xs space-x-1  border-t-2 border-l-2 border-r-2 border-transparent hover:border-r-gray-600 text-alsoit-gray-200 font-semibold"
                style={{ fontSize: '11px', WebkitTextStroke: '0.5px' }}
              >
                <span onClick={(e) => setOptions(e, columns[0])} className="cursor-pointer">
                  <span className="mr-1.5">{taskLength}</span>
                  {!collapseTasks ? columns[0].value.toUpperCase() : null}
                </span>
                <>
                  {sortArr.length >= 1 && sortArr.includes(columns[0].value) ? (
                    ''
                  ) : (
                    <RoundedArrowUpDown
                      value={columns[0].value}
                      id={columns[0].id}
                      isDefault={columns[0].defaulField}
                      handleSort={handleSort}
                    />
                  )}
                  {sortArr.includes(columns[0].value) && (
                    <SortDirectionCheck
                      bgColor={baseColor}
                      sortItemLength={sortArr.length}
                      sortIndex={sortArr.indexOf(columns[0].value)}
                      sortValue={columns[0].value}
                      sortDesc={dirCheck(columns[0].value, columns[0].defaulField, columns[0].id)?.dir === 'desc'}
                      handleRemoveSortFn={handleRemoveFilter}
                      propertyHeaderTxt={generateSortField(columns[0].defaulField, columns[0].id)}
                      isDefault={columns[0].defaulField}
                      handleOrder={handleOrder}
                      id={columns[0].id}
                    />
                  )}
                </>
              </div>
            </div>
            <FiPlusCircle
              className="w-4 h-4 mr-2 font-black AddColumnDropdownButton"
              onClick={handleAddCustomProperty}
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
            ? columns.slice(1).map((item) => (
                <th key={item.id} className="relative w-full py-2 -mb-1.5 font-extrabold opacity-90">
                  <div
                    className="text-alsoit-gray-200 font-semibold flex dBlock items-center justify-center w-full h-full my-auto cursor-pointer group hover:bg-gray-200 p-0.5 rounded-xs space-x-1 border-l-2 border-r-2 border-t-2 border-transparent hover:border-r-gray-500 "
                    style={{ fontSize: '11px', WebkitTextStroke: '0.5px', lineHeight: '13.2px' }}
                  >
                    <span className="dNone">
                      <MdOutlineDragIndicator className="h4 w4" />
                    </span>
                    <span style={{ color: item.color ? item.color : '' }} onClick={(e) => setOptions(e, item)}>
                      {item.value.toUpperCase()}
                    </span>
                    {/* {sortAbles.includes(item.value) && ( */}
                    <span className="ml-0.5">
                      {sortArr.length >= 1 && sortArr.includes(item.value) ? (
                        ''
                      ) : (
                        <RoundedArrowUpDown
                          value={item.value}
                          id={item.id}
                          handleSort={handleSort}
                          isDefault={item.defaulField}
                        />
                      )}
                      {sortArr.includes(item.value) && (
                        <SortDirectionCheck
                          bgColor={baseColor}
                          isDefault={item.defaulField}
                          sortItemLength={sortArr.length}
                          sortIndex={sortArr.indexOf(item.value)}
                          sortValue={item.value}
                          sortDesc={dirCheck(item.value, item.defaulField, item.id)?.dir === 'desc'}
                          handleRemoveSortFn={handleRemoveFilter}
                          propertyHeaderTxt={generateSortField(item.defaulField, item.id)}
                          id={item.id}
                          handleOrder={handleOrder}
                        />
                      )}
                    </span>
                  </div>
                  <div className="absolute top-0 right-0 block pl-1 idle" style={{ height: tableHeight }}>
                    <div className="w-0.5 mx-auto bg-gray-100" style={{ height: '75px' }} />
                  </div>
                  {headerId === item.id && (
                    <SortModal
                      handleClose={handleClose}
                      anchorEl={anchorEl}
                      toggleModal={setShowSortModal}
                      handleSortFn={handleSort}
                      setAnchorEl={setAnchorEl}
                      handleRemoveColumn={handleRemoveColumn}
                    />
                  )}
                </th>
              ))
            : null}
        </tr>
      </thead>
    </>
  ) : null;
}
