import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import AddColumnDropdown from '../../../dropdown/AddColumnDropdown';
import { getTaskColumns, setCloseTaskListView } from '../../../../../../features/task/taskSlice';
import '../../views/view.css';
import '../../taskData/task.css';
import { IoIosArrowDropdown } from 'react-icons/io';
import { columnsHead, listColumnProps } from '../ListColumns';
import { useList } from '../../../../../../features/list/listService';
import CreateDropdownFieldModal from '../../../dropdown/CreateDropdownFieldModal';
import TaskListPropertyHead from './component/TaskListPropertyHead';

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
  const { taskColumns, hideTask, closeTaskListView } = useAppSelector((state) => state.task);
  const [showDropdownFieldModal, setShowDropdownFieldModal] = useState(false);
  const [columns, setColumns] = useState([...columnsHead]);

  const { data } = useList(listId);

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
            <div className="flex items-center mx-2 group">
              <span className="object-contain p-1 pr-2 text-xs text-black capitalize bg-gray-300 rounded-t-md whitespace-nowrap">
                {status ? status : 'To Do'}
              </span>
            </div>
          </div>

          <div className="relative grid grid-flow-cols">
            {hideTask.length
              ? hideTask.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <TaskListPropertyHead taskLength={taskLength} key={col.id} value={col.value} id={col.id} />
                    )
                )
              : columns.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <TaskListPropertyHead taskLength={taskLength} key={col.id} value={col.value} id={col.id} />
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
              <div onBlur={() => handleDropDown()} tabIndex={0}>
                <AddColumnDropdown
                  setShowDropdownFieldModal={setShowDropdownFieldModal}
                  setdropDown={setdropDown}
                  title=""
                  listItems={hideTask.length ? hideTask : taskColumns}
                />
              </div>
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
                !col.hidden && <TaskListPropertyHead key={col.id} value={col.value} id={col.id} />
            )
          : columns.map(
              (col) =>
                col.value !== 'Task' &&
                col.value !== 'Tags' &&
                !col.hidden && <TaskListPropertyHead key={col.id} value={col.value} id={col.id} />
            )}
      </div>
    </div>
  );
}
