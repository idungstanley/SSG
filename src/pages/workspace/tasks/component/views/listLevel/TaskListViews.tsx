import { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import AddColumnDropdown from '../../../dropdown/AddColumnDropdown';
import {
  getTaskColumns,
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
import { RiArrowDownFill, RiArrowUpSFill } from 'react-icons/ri';

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
  const { closeTaskListView } = useAppSelector((state) => state.task);
  const { taskColumns, hideTask, sortArr, sortAbleArr } = useAppSelector((state) => state.task);
  const [showDropdownFieldModal, setShowDropdownFieldModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [headerId, setheaderId] = useState<string>('');
  const [columns, setColumns] = useState([...columnsHead]);
  const sortAbles: string[] = ['Task', 'Start Date', 'End Date', 'Priority', 'Assignees'];

  const { data } = useList(listId);
  const [querySwitch, setQuerySwitch] = useState<boolean>(false);

  const handleSort = (header: string, id: string) => {
    const headerTxt = header === 'Assignees' ? 'assignee' : header === 'Task' ? 'task' : header.toLowerCase();
    setheaderId(id);
    if (sortArr.includes(headerTxt)) return setShowSortModal(!showSortModal);
    dispatch(setSortArr([...sortArr, header]));
    dispatch(setSortArray([...sortAbleArr, { dir: 'desc', field: headerTxt }]));
    setQuerySwitch(!querySwitch);
  };

  const handleRemoveFilter = (title: string): void => {
    const headerTxt = title === 'Assignees' ? 'assignee' : title === 'Task' ? 'task' : title.toLowerCase();
    dispatch(setSortArr(sortArr.filter((el) => el !== title)));
    dispatch(setSortArray(sortAbleArr.filter((el) => el.field !== headerTxt)));
  };

  const setOptions = (id: string) => {
    setheaderId(id);
    setShowSortModal(!showSortModal);
  };

  const dirCheck = (col: string): boolean => sortAbleArr.some((el) => el.field === col && el.dir === 'desc');

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
                        className="relative flex items-center text-xs font-medium uppercase cursor-pointer hover:bg-gray-200 hover:text-gray-50 group"
                        style={{ color: '#78828d', fontSize: '12px' }}
                      >
                        <span
                          className="font-bold whitespace-nowrap cursor-pointer hover:text-clip hover:w-10"
                          onClick={() => setOptions(col.id)}
                        >
                          {col.value}
                        </span>
                        {sortAbles.includes(col.value) && (
                          <>
                            {sortArr.length >= 1 && sortArr.includes(col.value) ? (
                              ''
                            ) : (
                              <div
                                className="flex flex-col items-center justify-center w-6 h-6 p-1 -space-y-3 transition-opacity duration-500 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100"
                                onClick={() => handleSort(col.value, col.id)}
                              >
                                <FaSortUp className="text-white" />
                                <FaSortDown className="text-gray-200" />
                              </div>
                            )}
                            {sortArr.includes(col.value) && sortAbles.includes(col.value) && (
                              <div className="sortClose-group rounded-xl">
                                <div
                                  className={
                                    sortArr.length > 1
                                      ? 'flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium bg-red-400 group relative cursor-pointer px-2 rounded-full'
                                      : 'flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium bg-red-400 group relative cursor-pointer p-1 rounded-full'
                                  }
                                >
                                  {sortArr.length === 1 ? (
                                    <RiArrowUpSFill className="w-3 h-3" />
                                  ) : (
                                    <span className="flex items-center justify-center" style={{ fontSize: '8px' }}>
                                      {sortArr.indexOf(col.value) + 1}
                                      {dirCheck(col.value) ? (
                                        <RiArrowDownFill className="w-3 h-3" />
                                      ) : (
                                        <RiArrowUpSFill className="w-3 h-3" />
                                      )}
                                    </span>
                                  )}
                                </div>
                                <AiOutlineClose
                                  onClick={() => handleRemoveFilter(col.value)}
                                  className="w-3 h-3 m-1 font-bold text-white transition-opacity duration-500 opacity-100 sortClose"
                                />
                              </div>
                            )}
                          </>
                        )}
                        {showSortModal && headerId === col.id && (
                          <SortModal headers={sortArr} toggleModal={setShowSortModal} handleSortFn={handleSort} />
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
                        className="relative flex items-center space-x-1 text-xs font-medium uppercase cursor-pointer hover:bg-gray-200 hover:text-gray-50 group"
                        style={{ color: '#78828d', fontSize: '12px' }}
                      >
                        <span
                          className="font-bold whitespace-nowrap cursor-pointer hover:text-clip hover:w-10"
                          onClick={() => setOptions(col.id)}
                          // onClick={() => sortArr.length > 0 && setOptions(col.id)}
                        >
                          {col.value}
                        </span>
                        {sortAbles.includes(col.value) && (
                          <>
                            {sortArr.length >= 1 && sortArr.includes(col.value) ? (
                              ''
                            ) : (
                              <div
                                className="flex flex-col items-center justify-center w-6 h-6 p-1 -space-y-3 transition-opacity duration-500 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100"
                                onClick={() => handleSort(col.value, col.id)}
                              >
                                <FaSortUp className="text-white" />
                                <FaSortDown className="text-gray-200" />
                              </div>
                            )}
                            {sortArr.includes(col.value) && sortAbles.includes(col.value) && (
                              <div className="sortClose-group rounded-xl">
                                <div
                                  className={
                                    sortArr.length > 1
                                      ? 'flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium bg-red-400 group relative cursor-pointer px-2 rounded-full'
                                      : 'flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium bg-red-400 group relative cursor-pointer p-1 rounded-full'
                                  }
                                >
                                  {sortArr.length === 1 ? (
                                    <RiArrowUpSFill className="w-3 h-3" />
                                  ) : (
                                    <span className="flex items-center justify-center" style={{ fontSize: '8px' }}>
                                      {sortArr.indexOf(col.value) + 1}{' '}
                                      {dirCheck(col.value) ? (
                                        <RiArrowDownFill className="w-3 h-3" />
                                      ) : (
                                        <RiArrowUpSFill className="w-3 h-3" />
                                      )}
                                    </span>
                                  )}
                                </div>
                                <AiOutlineClose
                                  onClick={() => handleRemoveFilter(col.value)}
                                  className="w-3 h-3 m-1 font-bold text-white transition-opacity duration-500 opacity-100 sortClose"
                                />
                              </div>
                            )}
                          </>
                        )}
                        {showSortModal && headerId === col.id && (
                          <SortModal headers={sortArr} toggleModal={setShowSortModal} handleSortFn={handleSort} />
                        )}
                      </div>
                    )
                )}
          </div>
        </div>

        <span
          className="flex absolute right-0 bottom-5 items-center h-5 text-xs rounded-full p-1 font-semibold group"
          style={{ color: '#78828d' }}
        >
          <FiPlusCircle className="AddColumnDropdownButton font-black h-4 w-4" onClick={() => handleDropDown()} />
          <span className="text-sm z-50">
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
                    className="relative flex items-center space-x-1 text-xs font-medium uppercase cursor-pointer hover:bg-gray-200 hover:text-gray-50 group"
                    style={{ color: '#78828d', fontSize: '12px' }}
                  >
                    <span className="text-sm text-gray-600 transition duration-200 opacity-0 cursor-move group-hover:opacity-100">
                      <MdDragIndicator />
                    </span>
                    <span
                      className="font-bold whitespace-nowrap cursor-pointer hover:text-clip hover:w-10"
                      onClick={() => sortArr.length > 0 && setOptions(col.id)}
                    >
                      {col.value}
                    </span>
                    {sortAbles.includes(col.value) && (
                      <>
                        {sortArr.length >= 1 && sortArr.includes(col.value) ? (
                          ''
                        ) : (
                          <div
                            className="flex flex-col items-center justify-center w-6 h-6 p-1 -space-y-3 transition-opacity duration-500 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100"
                            onClick={() => handleSort(col.value, col.id)}
                          >
                            <FaSortUp className="text-white" />
                            <FaSortDown className="text-gray-200" />
                          </div>
                        )}
                        {sortArr.includes(col.value) && sortAbles.includes(col.value) && (
                          <div className="sortClose-group rounded-xl">
                            <div
                              className={
                                sortArr.length > 1
                                  ? 'flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium bg-red-400 group relative cursor-pointer px-2 rounded-full'
                                  : 'flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium bg-red-400 group relative cursor-pointer p-1 rounded-full'
                              }
                            >
                              {sortArr.length === 1 ? (
                                <RiArrowUpSFill className="w-3 h-3" />
                              ) : (
                                <span className="flex items-center justify-center" style={{ fontSize: '8px' }}>
                                  {sortArr.indexOf(col.value) + 1}{' '}
                                  {dirCheck(col.value) ? (
                                    <RiArrowDownFill className="w-3 h-3" />
                                  ) : (
                                    <RiArrowUpSFill className="w-3 h-3" />
                                  )}
                                </span>
                              )}
                            </div>
                            <AiOutlineClose
                              onClick={() => handleRemoveFilter(col.value)}
                              className="w-3 h-3 m-1 font-bold text-white transition-opacity duration-500 opacity-100 sortClose"
                            />
                          </div>
                        )}
                      </>
                    )}
                    {showSortModal && sortArr.includes(col.value) && headerId === col.id && (
                      <SortModal headers={sortArr} toggleModal={setShowSortModal} handleSortFn={handleSort} />
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
                    className="relative flex items-center justify-center w-24 space-x-1 text-xs font-medium uppercase cursor-pointer hover:bg-gray-200 hover:text-gray-50 group"
                    style={{ color: '#78828d', fontSize: '12px' }}
                  >
                    <span className="text-sm text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100">
                      <MdDragIndicator />
                    </span>
                    <span
                      className="font-bold whitespace-nowrap cursor-pointer hover:text-clip hover:w-10"
                      onClick={() => sortArr.length > 0 && setOptions(col.id)}
                    >
                      {col.value}
                    </span>
                    {sortAbles.includes(col.value) && (
                      <>
                        {sortArr.length >= 1 && sortArr.includes(col.value) ? (
                          ''
                        ) : (
                          <div
                            className="flex flex-col items-center justify-center w-6 h-6 p-1 -space-y-3 transition-opacity duration-500 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100"
                            onClick={() => handleSort(col.value, col.id)}
                          >
                            <FaSortUp className="text-white" />
                            <FaSortDown className="text-gray-200" />
                          </div>
                        )}
                        {sortArr.includes(col.value) && sortAbles.includes(col.value) && (
                          <div className="sortClose-group rounded-xl">
                            <div
                              className={
                                sortArr.length > 1
                                  ? 'flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium bg-red-400 group relative cursor-pointer px-2 rounded-full'
                                  : 'flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium bg-red-400 group relative cursor-pointer p-1 rounded-full'
                              }
                            >
                              {sortArr.length === 1 ? (
                                <RiArrowUpSFill className="w-3 h-3" />
                              ) : (
                                <span className="flex items-center justify-center" style={{ fontSize: '8px' }}>
                                  {sortArr.indexOf(col.value) + 1}{' '}
                                  {dirCheck(col.value) ? (
                                    <RiArrowDownFill className="w-3 h-3" />
                                  ) : (
                                    <RiArrowUpSFill className="w-3 h-3" />
                                  )}
                                </span>
                              )}
                            </div>
                            <AiOutlineClose
                              onClick={() => handleRemoveFilter(col.value)}
                              className="w-3 h-3 m-1 font-bold text-white sortClose"
                            />
                          </div>
                        )}
                      </>
                    )}
                    {showSortModal && sortArr.includes(col.value) && headerId === col.id && (
                      <SortModal headers={sortArr} toggleModal={setShowSortModal} handleSortFn={handleSort} />
                    )}
                  </div>
                )
            )}
      </div>
    </div>
  );
}
