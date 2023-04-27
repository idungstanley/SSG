import { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import AddColumnDropdown from '../../../dropdown/AddColumnDropdown';
import { getTaskColumns, setCloseTaskListView, setSortArray } from '../../../../../../features/task/taskSlice';
import '../../views/view.css';
import '../../taskData/task.css';
import { IoIosArrowDropdown } from 'react-icons/io';
import { columnsHead, listColumnProps } from '../ListColumns';
import { MdDragIndicator } from 'react-icons/md';
import { FaSort } from 'react-icons/fa';
import { useList } from '../../../../../../features/list/listService';
import CreateDropdownFieldModal from '../../../dropdown/CreateDropdownFieldModal';
// import { GiCancel } from 'react-icons/gi';
import SortModal from '../../../../../../components/SortModal/SortModal';
import { AiOutlineClose } from 'react-icons/ai';
// import { useQueryClient } from '@tanstack/react-query';

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
  const { taskColumns, hideTask } = useAppSelector((state) => state.task);
  const [showDropdownFieldModal, setShowDropdownFieldModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [headerId, setheaderId] = useState<string>('');
  const [columns, setColumns] = useState([...columnsHead]);
  const sortAbles: string[] = ['Task', 'Start Date', 'End Date', 'Priority', 'Assignees'];
  const [sortAbleArr, setSortAbleArr] = useState<SortOption[]>([]);

  const { data } = useList(listId);
  const [sortArr, setSortArr] = useState<string[]>([]);
  const [querySwitch, setQuerySwitch] = useState<boolean>(false);

  const handleSort = (header: string, id: string) => {
    const headerTxt = header === 'Assignees' ? 'assignee' : header === 'Task' ? 'task' : header.toLowerCase();
    setheaderId(id);
    if (sortArr.includes(headerTxt)) return setShowSortModal(!showSortModal);
    setSortArr((prev) => [...prev, header]);
    setSortAbleArr((prev) => [...prev, { dir: 'asc', field: headerTxt }]);
    setQuerySwitch(!querySwitch);
  };

  const handleRemoveFilter = (title: string): void => {
    const headerTxt = title === 'Assignees' ? 'assignee' : title === 'Task' ? 'task' : title.toLowerCase();
    setSortArr((prev) => prev.filter((el) => el !== title));
    setSortAbleArr((prev) =>
      prev.filter((el) => {
        return el.field !== headerTxt;
      })
    );
  };

  const setOptions = (id: string) => {
    setheaderId(id);
    setShowSortModal(!showSortModal);
  };

  useEffect(() => {
    dispatch(setSortArray(sortAbleArr));
    setQuerySwitch(!querySwitch);
  }, [sortAbleArr]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const customFieldNames = data.custom_fields.map((i) => ({ value: i.name, id: i.id, field: i.type, hidden: false }));

    setColumns(() => {
      const newColumns = unique([...columnsHead, ...customFieldNames]);

      dispatch(getTaskColumns(newColumns));

      return newColumns;
    });
  }, [data]);

  const handleDropDown = () => {
    setdropDown((prev) => !prev);
  };

  return (
    <div className="oveflow-x-auto">
      <div
        className="flex overflow-x-auto items-center justify-between pt-5 bg-gray-100 z-20 w-12/12 "
        style={{ backgroundColor: '#e1e4e5' }}
      >
        <div className="flex">
          <div className=" flex items-center ">
            <span className="bg-gray-200 hover:bg-gray-200 rounded-full p-px ">
              <IoIosArrowDropdown
                className={` text-gray-400 text-sm hover:text-gray-200  ${
                  closeTaskListView === false ? 'rotateimg90' : null
                }`}
                aria-hidden="true"
                onClick={() => dispatch(setCloseTaskListView(!closeTaskListView))}
              />
            </span>
            <div className="flex items-center justify-center cursor-pointer relative">
              <div className="group flex items-center">
                <span className="text-xs rounded-t-md text-black p-1 bg-gray-300 pr-2 capitalize object-contain whitespace-nowrap">
                  {status ? status : 'To Do'}
                </span>
              </div>
              <span className="text-xs text-gray-400 ml-3 mr-px font-bold ">{taskLength}</span>
            </div>
          </div>
          <div className="relative w-6/12 flex items-center ">
            {hideTask.length
              ? hideTask.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div
                        key={col.id}
                        className="flex items-center uppercase text-xs font-medium hover:bg-gray-200 hover:text-gray-50 group relative cursor-pointer"
                        style={{ color: '#78828d', fontSize: '12px' }}
                      >
                        <span
                          className="truncate font-bold hover:text-clip cursor-pointer hover:w-10"
                          onClick={() => sortArr.length > 0 && setOptions(col.id)}
                        >
                          {col.value}
                        </span>
                        {sortAbles.includes(col.value) && (
                          <>
                            {sortArr.length > 1 && sortArr.includes(col.value) ? (
                              ''
                            ) : (
                              <FaSort
                                className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 "
                                onClick={() => handleSort(col.value, col.id)}
                              />
                            )}
                            {sortArr.includes(col.value) && sortAbles.includes(col.value) && (
                              <div className="sortClose-group rounded-md">
                                <div className="flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium bg-red-400 group relative cursor-pointer h-4 w-4 rounded-full">
                                  <span
                                    className="font-bold hover:text-clip cursor-pointer"
                                    style={{ fontSize: '8px' }}
                                  >
                                    {sortArr.indexOf(col.value) + 1}
                                  </span>
                                </div>
                                <AiOutlineClose
                                  onClick={() => handleRemoveFilter(col.value)}
                                  className="sortClose text-white font-bold h-3 w-3 m-1"
                                />
                              </div>
                            )}
                          </>
                        )}
                        {showSortModal && headerId === col.id && (
                          <SortModal
                            headers={sortArr}
                            toggleModal={setShowSortModal}
                            arr={{ sortAbleArr, setSortAbleArr }}
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
                        className="flex items-center space-x-1 uppercase  text-xs font-medium hover:bg-gray-200 hover:text-gray-50 group relative cursor-pointer"
                        style={{ color: '#78828d', fontSize: '12px' }}
                      >
                        <span
                          className="truncate font-bold hover:text-clip cursor-pointer hover:w-10"
                          onClick={() => sortArr.length > 0 && setOptions(col.id)}
                        >
                          {col.value}
                        </span>
                        {sortAbles.includes(col.value) && (
                          <>
                            {sortArr.length > 1 && sortArr.includes(col.value) ? (
                              ''
                            ) : (
                              <FaSort
                                className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 "
                                onClick={() => handleSort(col.value, col.id)}
                              />
                            )}
                            {sortArr.includes(col.value) && sortAbles.includes(col.value) && (
                              <div className="sortClose-group rounded-md">
                                <div className="flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium bg-red-400 group relative cursor-pointer h-4 w-4 rounded-full">
                                  <span
                                    className="font-bold hover:text-clip cursor-pointer"
                                    style={{ fontSize: '8px' }}
                                  >
                                    {sortArr.indexOf(col.value) + 1}
                                  </span>
                                </div>
                                <AiOutlineClose
                                  onClick={() => handleRemoveFilter(col.value)}
                                  className="sortClose text-white font-bold h-3 w-3 m-1"
                                />
                              </div>
                            )}
                          </>
                        )}
                        {showSortModal && headerId === col.id && (
                          <SortModal
                            headers={sortArr}
                            toggleModal={setShowSortModal}
                            arr={{ sortAbleArr, setSortAbleArr }}
                            handleSortFn={handleSort}
                          />
                        )}
                      </div>
                    )
                )}
          </div>
        </div>

        <div className="grid dynamic  justify-between mr-10">
          {hideTask.length
            ? hideTask.map(
                (col) =>
                  col.value !== 'Task' &&
                  col.value !== 'Tags' &&
                  !col.hidden && (
                    <div
                      key={col.id}
                      className="flex items-center space-x-1 uppercase  text-xs font-medium hover:bg-gray-200 hover:text-gray-50 group relative cursor-pointer"
                      style={{ color: '#78828d', fontSize: '12px' }}
                    >
                      <span className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-600 cursor-move   text-sm">
                        <MdDragIndicator />
                      </span>
                      <span
                        className="truncate font-bold hover:text-clip cursor-pointer  hover:w-10"
                        onClick={() => sortArr.length > 0 && setOptions(col.id)}
                      >
                        {col.value}
                      </span>
                      {sortAbles.includes(col.value) && (
                        <>
                          {sortArr.length > 1 && sortArr.includes(col.value) ? (
                            ''
                          ) : (
                            <FaSort
                              className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 "
                              onClick={() => handleSort(col.value, col.id)}
                            />
                          )}
                          {sortArr.includes(col.value) && sortAbles.includes(col.value) && (
                            <div className="sortClose-group rounded-md">
                              <div className="flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium bg-red-400 group relative cursor-pointer h-4 w-4 rounded-full">
                                <span className="font-bold hover:text-clip cursor-pointer" style={{ fontSize: '8px' }}>
                                  {sortArr.indexOf(col.value) + 1}
                                </span>
                              </div>
                              <AiOutlineClose
                                onClick={() => handleRemoveFilter(col.value)}
                                className="sortClose text-white font-bold h-3 w-3 m-1"
                              />
                            </div>
                          )}
                        </>
                      )}
                      {showSortModal && headerId === col.id && (
                        <SortModal
                          headers={sortArr}
                          toggleModal={setShowSortModal}
                          arr={{ sortAbleArr, setSortAbleArr }}
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
                      className="flex items-center space-x-1 uppercase  text-xs  font-medium hover:bg-gray-200 hover:text-gray-50 group relative cursor-pointer"
                      style={{ color: '#78828d', fontSize: '12px' }}
                    >
                      <span className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-400 cursor-move   text-sm">
                        <MdDragIndicator />
                      </span>
                      <span
                        className="truncate  font-bold hover:text-clip cursor-pointer  hover:w-10"
                        onClick={() => sortArr.length > 0 && setOptions(col.id)}
                      >
                        {col.value}
                      </span>
                      {sortAbles.includes(col.value) && (
                        <>
                          {sortArr.length > 1 && sortArr.includes(col.value) ? (
                            ''
                          ) : (
                            <FaSort
                              className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 "
                              onClick={() => handleSort(col.value, col.id)}
                            />
                          )}
                          {sortArr.includes(col.value) && sortAbles.includes(col.value) && (
                            <div className="sortClose-group rounded-md">
                              <div className="flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium bg-red-400 group relative cursor-pointer h-4 w-4 rounded-full">
                                <span className="font-bold hover:text-clip cursor-pointer" style={{ fontSize: '8px' }}>
                                  {sortArr.indexOf(col.value) + 1}
                                </span>
                              </div>
                              <AiOutlineClose
                                onClick={() => handleRemoveFilter(col.value)}
                                className="sortClose text-white font-bold h-3 w-3 m-1"
                              />
                            </div>
                          )}
                        </>
                      )}
                      {showSortModal && headerId === col.id && (
                        <SortModal
                          headers={sortArr}
                          toggleModal={setShowSortModal}
                          arr={{ sortAbleArr, setSortAbleArr }}
                          handleSortFn={handleSort}
                        />
                      )}
                    </div>
                  )
              )}
        </div>
        <span
          className=" flex absolute  right-5 mt-1  items-center h-5  text-xs  rounded-full p-1 font-semibold group"
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
    </div>
  );
}
