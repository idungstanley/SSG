import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import '../taskData/task.css';
import PriorityDropdown from '../../../../../components/priority/PriorityDropdown';
import {
  setCurrentTaskId,
  setCurrentTaskPriorityId,
  setCurrentTaskStatusId,
  setShowTaskNavigation,
  setTaskIdForPilot,
} from '../../../../../features/task/taskSlice';
import moment from 'moment';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import StatusDropdown from '../../../../../components/status/StatusDropdown';
import { FiEdit2 } from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';
import { UserPlusIcon } from '@heroicons/react/24/outline';

function TaskTableView() {
  const { myTaskData, hideTask, taskColumns, showTaskNavigation } =
    useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const displayNav = (id: string) => {
    dispatch(setShowTaskNavigation(!showTaskNavigation));
    dispatch(setCurrentTaskId(id));
  };
  const handleTaskPilot = (id: string, name: string) => {
    dispatch(setTaskIdForPilot(id));
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: 'task',
        activeItemName: name,
      })
    );
  };

  const handleTaskStatus = (id: string) => {
    dispatch(setCurrentTaskStatusId(id));
  };

  const handleTaskPriority = (id: string) => {
    dispatch(setCurrentTaskPriorityId(id));
  };

  const renderData = (taskColField, colfield) => {
    if (colfield === 'assignees' && taskColField.length !== 0) {
      return (
        <>
          <div className="">
            <div className="cursor-pointer flex ">Assinee field</div>
          </div>
        </>
      );
    } else if (colfield === 'assignees' && taskColField.length === 0) {
      return (
        <>
          <UserPlusIcon
            className=" ml-2 text-gray-400 text-xl cursor-pointer "
            aria-hidden="true"
          />
        </>
      );
    } else if (colfield == 'created_at' || colfield == 'updated_at') {
      return (
        <span className="text-gray-400 text-sm font-medium">
          {moment(taskColField).format('MM/DD')}
        </span>
      );
    } else if (colfield == 'status') {
      if (taskColField == 'completed') {
        return <div>{taskColField}</div>;
      } else if (taskColField == 'in progress') {
        return <div>{taskColField}</div>;
      } else if (taskColField == 'archived') {
        return <div>{taskColField}</div>;
      } else if (taskColField == 'todo') {
        return <div>{taskColField}</div>;
      } else {
        return <div>Todo</div>;
      }
    } else if (colfield === 'name') {
      return (
        <div className="flex items-center relative ">
          <div className=" flex items-center">
            <input
              type="checkbox"
              id="checked-checkbox"
              className="cursor-pointer absolute rounded-full focus:outline-1 focus:ring-transparent group-hover:opacity-100 opacity-0 focus:border-2 focus:opacity-100 -left-8 h-3 w-3"
              onClick={() => {
                displayNav(taskColField.id);
              }}
            />
            <MdDragIndicator className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-400 cursor-move  text-sm	 absolute -left-5 " />
          </div>

          <div className="flex items-center">
            <p
              onClick={() => handleTaskStatus(taskColField.id)}
              className="relative pt-1 pr-1"
            >
              <StatusDropdown TaskCurrentStatus={taskColField?.status} />
            </p>
            <p
              onClick={() =>
                handleTaskPilot(taskColField.id, taskColField.name)
              }
              className="cursor-pointer "
            >
              {taskColField}
            </p>
            <div
              id="iconWrapper"
              className="flex items-center space-x-1 ml-1 opacity-0  group-hover:opacity-100"
            >
              <span className="cursor-pointer bg-white  border rounded flex justify-center align-center p-0.5">
                <FiEdit2 className="w-3  text-gray-500 " aria-hidden="true" />
              </span>
              {/* tag here */}
            </div>
            {/* tags goes here */}
            {/* <div> {groupTags(task.tags)}</div>; */}
          </div>
        </div>
      );
    } else if (colfield === 'priority') {
      return (
        <span
          className="relative  border-dotted border-gray-300 "
          onClick={() => handleTaskPriority(taskColField.id)}
        >
          <PriorityDropdown TaskCurrentPriority={taskColField?.priority} />
        </span>
      );
    } else return taskColField;
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-y-auto border rounded-lg h-min">
              <table className="min-w-full divide-y divide-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    {hideTask.length
                      ? hideTask.map(
                          (columns) =>
                            !columns.hidden && (
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase  border-x-2 "
                                key={columns.field}
                              >
                                {columns.value}
                              </th>
                            )
                        )
                      : taskColumns.map(
                          (columns) =>
                            !columns.hidden && (
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase  border-2 border-x-2"
                                key={columns.field}
                              >
                                {columns.value}
                              </th>
                            )
                        )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {myTaskData.map((task) => {
                    return (
                      <tr key={task.id}>
                        {taskColumns.map(
                          (col) =>
                            !col.hidden && (
                              <td
                                className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border-2 border-white"
                                key={col.field}
                              >
                                {renderData(task[col.field], col.field)}
                              </td>
                            )
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskTableView;
