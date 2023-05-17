import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import AddColumnDropdown from '../../../dropdown/AddColumnDropdown';
import {
  getTaskColumns,
  setActiveTaskColumn,
  setCloseTaskListView,
  setSortArr,
  setSortArray
} from '../../../../../../features/task/taskSlice';
import '../../views/view.css';
import '../../taskData/task.css';
import { IoIosArrowDropdown } from 'react-icons/io';
import { columnsHead, listColumnProps } from '../ListColumns';
import { MdDragIndicator } from 'react-icons/md';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { useList } from '../../../../../../features/list/listService';
import CreateDropdownFieldModal from '../../../dropdown/CreateDropdownFieldModal';
import SortModal from '../../../../../../components/SortModal/SortModal';
import { AiOutlineClose } from 'react-icons/ai';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import SortDirectionCheck from './component/SortDirectionCheck';

const unique = (arr: listColumnProps[]) => [...new Set(arr)];
export type SortOption = {
  dir: 'asc' | 'desc';
  field: string;
};

export default function TaskListViews({
  taskLength,
  status,
  listId
}: {
  taskLength?: number;
  status?: string;
  listId?: string;
}) {
  const dispatch = useAppDispatch();
  const [dropDown, setdropDown] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const handleClickDd = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { baseColor } = useAppSelector((state) => state.account);
  const { taskColumns, hideTask, sortArr, sortAbleArr, closeTaskListView } = useAppSelector((state) => state.task);
  const [showDropdownFieldModal, setShowDropdownFieldModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [headerId, setheaderId] = useState<string>('');
  const [columns, setColumns] = useState([...columnsHead]);
  const sortAbles: string[] = ['Task', 'Start Date', 'End Date', 'Priority', 'Assignees'];

  const { data } = useList(listId);
  const [querySwitch, setQuerySwitch] = useState<boolean>(false);

  const handleSort = (header: string, id: string, order: 'asc' | 'desc') => {
    const headerTxt = header === 'Assignees' ? 'assignee' : header === 'Task' ? 'name' : header.toLowerCase();
    setheaderId(id);
    if (sortArr.includes(headerTxt)) return setShowSortModal(!showSortModal);
    dispatch(setSortArr([...sortArr, header]));
    dispatch(setSortArray([...sortAbleArr, { dir: order, field: headerTxt }]));
    setQuerySwitch(!querySwitch);
  };

  console.log(sortAbleArr);

  const handleRemoveFilter = (title: string): void => {
    const headerTxt = title === 'Assignees' ? 'assignee' : title === 'Task' ? 'name' : title.toLowerCase();
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

  useEffect(() => {
    if (!data) {
      return;
    }

    const customFieldNames = data.custom_fields.map((i) => ({ value: i.name, id: i.id, field: i.type, hidden: false }));

    const newColumns = unique([...columnsHead, ...customFieldNames]);
    dispatch(getTaskColumns(newColumns));
    setColumns(newColumns);
  }, [data]);

  const handleDropDown = () => {
    setdropDown((prev) => !prev);
  };

  return (
    <div className="z-10 flex justify-between w-full pt-5 bg-gray-100" style={{ backgroundColor: '#e1e4e5' }}>
      <div className="absolute left-0 right-0">
        <div className="sticky left-0 z-10 flex items-center bg-gray-200 opacity-95 w-60">
          <span className="p-px bg-gray-200 rounded-full hover:bg-gray-200">
            <IoIosArrowDropdown
              className={` text-gray-400 text-sm hover:text-gray-200  ${
                closeTaskListView === false ? 'rotateimg90' : null
              }`}
              aria-hidden="true"
              onClick={() => dispatch(setCloseTaskListView(!closeTaskListView))}
            />
          </span>
          <div className="relative flex items-center justify-center cursor-pointer">
            <div className="flex items-center ml-2 group">
              <span className="object-contain p-1 pr-2 text-xs text-black capitalize bg-gray-300 rounded-t-md whitespace-nowrap">
                {status ? status : 'To Do'}
              </span>
            </div>
            <span className="ml-3 mr-px text-xs font-bold text-gray-400 ">{taskLength}</span>
          </div>

          <div className="relative grid grid-flow-cols">
            {hideTask.length
              ? hideTask.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div
                        key={col.id}
                        className="relative flex items-center text-xs font-medium uppercase hover:bg-gray-200 hover:text-gray-50 group"
                        style={{ color: '#78828d', fontSize: '12px' }}
                      >
                        <span
                          className="font-bold truncate cursor-pointer hover:text-clip hover:w-10"
                          onClick={(e) => setOptions(e, col.id, col.value)}
                        >
                          {col.value}
                        </span>
                        {sortAbles.includes(col.value) && (
                          <>
                            {sortArr.length >= 1 && sortArr.includes(col.value) ? (
                              ''
                            ) : (
                              <div className="flex flex-col items-center justify-center w-6 h-6 p-1 -space-y-2 transition-opacity duration-500 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100">
                                <FaSortUp
                                  className="text-white cursor-pointer hover:text-fuchsia-400"
                                  onClick={() => handleSort(col.value, col.id, 'asc')}
                                />
                                <FaSortDown
                                  className="text-gray-200 cursor-pointer hover:text-fuchsia-400"
                                  onClick={() => handleSort(col.value, col.id, 'desc')}
                                />
                              </div>
                            )}
                            {sortArr.includes(col.value) && sortAbles.includes(col.value) && (
                              <SortDirectionCheck
                                bgColor={baseColor}
                                sortItemLength={sortArr.length}
                                sortIndex={sortArr.indexOf(col.value)}
                                sortValue={col.value}
                                sortDesc={dirCheck(col.value)?.dir === 'desc'}
                                handleRemoveSortFn={handleRemoveFilter}
                              />
                            )}
                          </>
                        )}
                        {showSortModal && headerId === col.id && (
                          <SortModal
                            handleClose={handleClose}
                            anchorEl={anchorEl}
                            headers={sortArr}
                            toggleModal={setShowSortModal}
                            handleSortFn={handleSort}
                          />
                        )}
                      </div>
                    )
                )
              : columns.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div
                        key={col.id}
                        className="relative flex items-center space-x-1 text-xs font-medium uppercase hover:bg-gray-200 hover:text-gray-50 group"
                        style={{ color: '#78828d', fontSize: '12px' }}
                      >
                        <span
                          className="font-bold truncate cursor-pointer hover:text-clip hover:w-10"
                          onClick={(e) => setOptions(e, col.id, col.value)}
                          // onClick={() => sortArr.length > 0 && setOptions(col.id)}
                        >
                          {col.value}
                        </span>
                        {sortAbles.includes(col.value) && (
                          <>
                            {sortArr.length >= 1 && sortArr.includes(col.value) ? (
                              ''
                            ) : (
                              <div className="flex flex-col items-center justify-center w-6 h-6 p-1 -space-y-2 transition-opacity duration-500 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100">
                                <FaSortUp
                                  className="text-white cursor-pointer hover:text-fuchsia-400"
                                  onClick={() => handleSort(col.value, col.id, 'asc')}
                                />
                                <FaSortDown
                                  className="text-white cursor-pointer hover:text-fuchsia-400"
                                  onClick={() => handleSort(col.value, col.id, 'desc')}
                                />
                              </div>
                            )}
                            {sortArr.includes(col.value) && sortAbles.includes(col.value) && (
                              <SortDirectionCheck
                                bgColor={baseColor}
                                sortItemLength={sortArr.length}
                                sortIndex={sortArr.indexOf(col.value)}
                                sortValue={col.value}
                                sortDesc={dirCheck(col.value)?.dir === 'desc'}
                                handleRemoveSortFn={handleRemoveFilter}
                              />
                            )}
                          </>
                        )}
                        {showSortModal && headerId === col.id && (
                          <SortModal
                            handleClose={handleClose}
                            anchorEl={anchorEl}
                            headers={sortArr}
                            toggleModal={setShowSortModal}
                            handleSortFn={handleSort}
                          />
                        )}
                      </div>
                    )
                )}
          </div>
        </div>

        <span
          className="absolute right-0 flex items-center h-5 p-1 text-xs font-semibold rounded-full bottom-5 group"
          style={{ color: '#78828d' }}
        >
          <FiPlusCircle className="w-4 h-4 font-black AddColumnDropdownButton" onClick={() => handleDropDown()} />
          <span className="z-50 text-sm">
            {dropDown && (
              <AddColumnDropdown
                setShowDropdownFieldModal={setShowDropdownFieldModal}
                setdropDown={setdropDown}
                title=""
                listItems={hideTask.length ? hideTask : taskColumns}
              />
            )}

            {listId ? (
              <CreateDropdownFieldModal
                listId={listId}
                show={showDropdownFieldModal}
                setShow={setShowDropdownFieldModal}
              />
            ) : null}
          </span>
        </span>
      </div>

      <div style={{ marginRight: 314 }} className="h-5"></div>

      <div className="right-0 block text-gray-700 border dynamic">
        {hideTask.length
          ? hideTask.map(
              (col) =>
                col.value !== 'Task' &&
                col.value !== 'Tags' &&
                !col.hidden && (
                  <div
                    key={col.id}
                    className="relative flex items-center space-x-1 text-xs font-medium uppercase hover:bg-gray-200 hover:text-gray-50 group"
                    style={{ color: '#78828d', fontSize: '12px' }}
                  >
                    <span className="text-sm text-gray-600 transition duration-200 opacity-0 cursor-move group-hover:opacity-100">
                      <MdDragIndicator />
                    </span>
                    <span
                      className="font-bold truncate cursor-pointer hover:text-clip hover:w-10"
                      onClick={(e) => sortArr.length > 0 && setOptions(e, col.id, col.value)}
                    >
                      {col.value}
                    </span>
                    {sortAbles.includes(col.value) && (
                      <>
                        {sortArr.length >= 1 && sortArr.includes(col.value) ? (
                          ''
                        ) : (
                          <div className="flex flex-col items-center justify-center w-6 h-6 p-1 -space-y-2 transition-opacity duration-500 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100">
                            <FaSortUp
                              className="text-white cursor-pointer hover:text-fuchsia-400"
                              onClick={() => handleSort(col.value, col.id, 'asc')}
                            />
                            <FaSortDown
                              className="text-white cursor-pointer hover:text-fuchsia-400"
                              onClick={() => handleSort(col.value, col.id, 'desc')}
                            />
                          </div>
                        )}
                        {sortArr.includes(col.value) && sortAbles.includes(col.value) && (
                          <SortDirectionCheck
                            bgColor={baseColor}
                            sortItemLength={sortArr.length}
                            sortIndex={sortArr.indexOf(col.value)}
                            sortValue={col.value}
                            sortDesc={dirCheck(col.value)?.dir === 'desc'}
                            handleRemoveSortFn={handleRemoveFilter}
                          />
                        )}
                      </>
                    )}
                    {showSortModal && sortArr.includes(col.value) && headerId === col.id && (
                      <SortModal
                        handleClose={handleClose}
                        anchorEl={anchorEl}
                        headers={sortArr}
                        toggleModal={setShowSortModal}
                        handleSortFn={handleSort}
                      />
                    )}
                  </div>
                )
            )
          : columns.map(
              (col) =>
                col.value !== 'Task' &&
                col.value !== 'Tags' &&
                !col.hidden && (
                  <div
                    key={col.id}
                    className="relative flex items-center justify-center w-24 space-x-1 text-xs font-medium uppercase hover:bg-gray-200 hover:text-gray-50 group"
                    style={{ color: '#78828d', fontSize: '12px' }}
                  >
                    <span className="text-sm text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100">
                      <MdDragIndicator />
                    </span>
                    <span
                      className="font-bold truncate cursor-pointer hover:text-clip hover:w-10"
                      onClick={(e) => sortArr.length > 0 && setOptions(e, col.id, col.value)}
                    >
                      {col.value}
                    </span>
                    {sortAbles.includes(col.value) && (
                      <>
                        {sortArr.length >= 1 && sortArr.includes(col.value) ? (
                          ''
                        ) : (
                          <div className="flex flex-col items-center justify-center w-6 h-6 p-1 -space-y-2 transition-opacity duration-500 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100">
                            <FaSortUp
                              className="text-white cursor-pointer hover:text-fuchsia-400"
                              onClick={() => handleSort(col.value, col.id, 'asc')}
                            />
                            <FaSortDown
                              className="text-white cursor-pointer hover:text-fuchsia-400"
                              onClick={() => handleSort(col.value, col.id, 'desc')}
                            />
                          </div>
                        )}
                        {sortArr.includes(col.value) && sortAbles.includes(col.value) && (
                          <SortDirectionCheck
                            bgColor={baseColor}
                            sortItemLength={sortArr.length}
                            sortIndex={sortArr.indexOf(col.value)}
                            sortValue={col.value}
                            sortDesc={dirCheck(col.value)?.dir === 'desc'}
                            handleRemoveSortFn={handleRemoveFilter}
                          />
                        )}
                      </>
                    )}
                    {showSortModal && sortArr.includes(col.value) && headerId === col.id && (
                      <SortModal
                        handleClose={handleClose}
                        anchorEl={anchorEl}
                        headers={sortArr}
                        toggleModal={setShowSortModal}
                        handleSortFn={handleSort}
                      />
                    )}
                  </div>
                )
            )}
      </div>
    </div>
  );
}
