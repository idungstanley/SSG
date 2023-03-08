import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useAppSelector } from '../../../../../app/hooks';
import AddColumnDropdown from '../../dropdown/AddColumnDropdown';
import { useDispatch } from 'react-redux';
import { getTaskColumns, setCloseTaskListView } from '../../../../../features/task/taskSlice';
import './view.css';
import '../taskData/task.css';
import { IoIosArrowDropdown } from 'react-icons/io';
import { columnsHead } from './ListColumns';
import { MdDragIndicator } from 'react-icons/md';
import { FaSort } from 'react-icons/fa';

export default function TaskListViews({ taskLength }: { taskLength?: number }) {
  const dispatch = useDispatch();
  const [dropDown, setdropDown] = useState(false);
  const { closeTaskListView } = useAppSelector((state) => state.task);
  const { taskColumns, hideTask } = useAppSelector((state) => state.task);

  dispatch(getTaskColumns(columnsHead));

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
            <span className="bg-gray-200 hover:bg-gray-400 rounded-full p-px ">
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
                <span className="text-xs rounded-t-md text-black p-1 bg-gray-300 pr-2">OPEN</span>
              </div>
              <span className="text-xs text-gray-400 ml-3 mr-px font-bold">{taskLength}</span>
            </div>
          </div>
          <div className="relative w-6/12 flex     items-center ">
            {hideTask.length
              ? hideTask.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div
                        key={col.field}
                        className="flex  items-center uppercase  text-xs  font-medium hover:bg-gray-400 hover:text-gray-50 group"
                        style={{ color: '#78828d', fontSize: '11px' }}
                      >
                        {col.value}
                      </div>
                    )
                )
              : columnsHead.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div
                        key={col.field}
                        className="flex  items-center uppercase    text-xs  font-bold hover:bg-gray-200 hover:text-gray-50  group"
                        style={{ color: '#78828d', fontSize: '10px' }}
                      >
                        {col.value}
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
                      key={col.field}
                      className="flex justify-around hover:bg-clip-border items-center uppercase  text-xs mt-1 font-bold  hover:w-10 hover:bg-gray-300  hover:text-gray-50   border-gray-400  group"
                      style={{
                        color: '#78828d',
                        fontSize: '10px'
                      }}
                    >
                      <span className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-400 cursor-move   text-sm">
                        <MdDragIndicator />
                      </span>
                      <span className="truncate  font-bold hover:text-clip cursor-pointer  hover:w-10">
                        {col.value}
                      </span>
                      <span>
                        <FaSort className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 " />
                      </span>
                    </div>
                  )
              )
            : columnsHead.map(
                (col) =>
                  col.value !== 'Task' &&
                  col.value !== 'Tags' &&
                  !col.hidden && (
                    <div
                      key={col.field}
                      className="flex justify-around hover:bg-clip-border items-center uppercase  text-xs mt-1 font-bold  hover:w-10 hover:bg-gray-300  hover:text-gray-50   border-gray-400  group"
                      style={{
                        color: '#78828d',
                        fontSize: '10px'
                      }}
                    >
                      <span className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-400 cursor-move   text-sm">
                        <MdDragIndicator />
                      </span>
                      <span className="truncate  font-bold hover:text-clip cursor-pointer  hover:w-10">
                        {col.value}
                      </span>
                      <span>
                        <FaSort className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 " />
                      </span>
                    </div>
                  )
              )}
        </div>
        <span
          className=" flex absolute  right-5 mt-1  items-center h-5  text-xs  rounded-full p-1 font-semibold group"
          style={{ color: '#78828d' }}
        >
          <FiPlusCircle className=" font-black hover:bg-white" onClick={() => handleDropDown()} />
          <span className="text-sm z-50">
            {dropDown && <AddColumnDropdown title="" listItems={hideTask.length ? hideTask : taskColumns} />}
          </span>
        </span>
      </div>
    </div>
  );
}
