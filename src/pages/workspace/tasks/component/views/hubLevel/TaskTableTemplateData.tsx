import React, { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import '../../taskData/task.css';
import PriorityDropdown from '../../../../../../components/priority/PriorityDropdown';
import {
  ICustomField,
  ImyTaskData,
  setCurrentTaskPriorityId,
  setCurrentTaskStatusId,
  setToggleAssignCurrentTaskId
} from '../../../../../../features/task/taskSlice';
import moment, { MomentInput } from 'moment';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import AssignTask from '../../../assignTask/AssignTask';
import { MdOutlineDragIndicator } from 'react-icons/md';
// import { TaskKeyof } from '../../../../../../features/task/interface.tasks';

export interface ITaskTemplateData {
  filteredTaskData: {
    [key: string]: {
      tasks: ImyTaskData[];
      key: string;
      groupListName: string;
      [key: string]: ImyTaskData[] | string;
    };
  };
}
[];

function TaskTableTemplateData({ filteredTaskData }: ITaskTemplateData) {
  const { hideTask, taskColumns, toggleAssignCurrentTaskId } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const handleAssigneeModal = (id: string | undefined) => {
    if (toggleAssignCurrentTaskId == id) {
      dispatch(setToggleAssignCurrentTaskId(null));
    } else {
      dispatch(setToggleAssignCurrentTaskId(id));
    }
  };

  const handleTaskPriority = (id: string | undefined | null) => {
    dispatch(setCurrentTaskPriorityId(id));
  };

  const groupAssignee = (
    data:
      | [
          {
            id: string;
            initials: string;
            color: string;
            name: string;
          }
        ]
      | undefined
  ) => {
    return data?.map((newData, index) => {
      return (
        <div key={newData.id}>
          <div>
            {data.length !== index + 1 ? <p key={index}>{newData.name},</p> : <p key={index}>{newData.name}</p>}
          </div>
        </div>
      );
    });
  };

  const handleTaskStatus = (id: string) => {
    dispatch(setCurrentTaskStatusId(id));
  };

  const renderData = (
    taskColField:
      | ImyTaskData
      | string
      | number
      | undefined
      | null
      | ICustomField[]
      | Array<{ id: string; initials: string; color: string; name: string }>,
    colfield: string,
    task?: ImyTaskData
  ) => {
    if (
      colfield === 'assignees' &&
      (
        taskColField as Array<{
          id: string;
          initials: string;
          color: string;
          name: string;
        }>
      ).length !== 0
    ) {
      const taskColFieldSetType = taskColField as [{ id: string; initials: string; color: string; name: string }];
      return (
        <>
          <div className="cursor-pointer flex " onClick={() => handleAssigneeModal(task?.id)}>
            <div className="flex flex-wrap break-normal  gap-3">{groupAssignee(taskColFieldSetType)}</div>
            <span className="absolute shadow-2xl  z-30 mt-6 ">
              {toggleAssignCurrentTaskId == task?.id ? <AssignTask /> : null}
            </span>
          </div>
        </>
      );
    } else if (
      colfield === 'assignees' &&
      (
        taskColField as Array<{
          id: string;
          initials: string;
          color: string;
        }>
      ).length === 0
    ) {
      return (
        <div className="cursor-pointer flex " onClick={() => handleAssigneeModal(task?.id)}>
          <p className="opacity-0">Not Assinged</p>
          <span className="absolute shadow-2xl  z-30 mt-6 ">
            {toggleAssignCurrentTaskId == task?.id ? <AssignTask /> : null}
          </span>
        </div>
      );
    } else if (colfield == 'created_at' || colfield == 'updated_at') {
      return (
        <span className="text-gray-400 text-sm font-medium">{moment(taskColField as MomentInput).format('MM/DD')}</span>
      );
    } else if (colfield == 'status') {
      if (taskColField == 'completed') {
        return (
          <p className="bg-green-500 rounded pl-2 min-w-fit" onClick={() => handleTaskStatus(task?.id as string)}>
            {taskColField}
          </p>
        );
      } else if (taskColField == 'in progress') {
        return (
          <div className="bg-purple-500 rounded pl-2" onClick={() => handleTaskStatus(task?.id as string)}>
            {taskColField}
          </div>
        );
      } else if (taskColField == 'archived') {
        return (
          <div className="bg-yellow-500 rounded pl-2" onClick={() => handleTaskStatus(task?.id as string)}>
            {taskColField}
          </div>
        );
      } else if (taskColField == 'todo') {
        return (
          <div className="bg-gray-400  rounded pl-2" onClick={() => handleTaskStatus(task?.id as string)}>
            {taskColField}
          </div>
        );
      } else {
        return (
          <div className="bg-gray-400 rounded pl-2" onClick={() => handleTaskStatus(task?.id as string)}>
            Todo
          </div>
        );
      }
    } else if (colfield === 'name') {
      return (
        <div className="flex items-center relative ">
          <div className="flex whitespace-normal w-11/12 justify-between items-center group">
            <p>{taskColField as ReactNode}</p>
            <p className="opacity-0 bg-gray-300 hover:bg-gray-400 group-hover:opacity-100 p-2 cursor-pointer">
              <BsArrowsAngleExpand />
            </p>
          </div>
        </div>
      );
    } else if (colfield === 'priority') {
      return (
        <span className="relative  border-dotted border-gray-300" onClick={() => handleTaskPriority(task?.id)}>
          <PriorityDropdown TaskCurrentPriority={task?.priority} />
        </span>
      );
    } else return taskColField;
  };

  return (
    <>
      <div className="overflow-y-auto border rounded-lg h-min" style={{ maxHeight: '87vh' }}>
        <table className="fixed_headers w-full divide-y divide-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th>#</th>
              {hideTask.length
                ? hideTask.map(
                    (columns) =>
                      !columns.hidden && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border-x-2 border-gray-300 whitespace-nowrap"
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
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase  border-2 border-x-2 border-gray-300 whitespace-nowrap"
                          key={columns.field}
                        >
                          {columns.value}
                        </th>
                      )
                  )}
            </tr>
          </thead>
          {Object.keys(filteredTaskData).map((value) => (
            <tbody className="divide-y divide-gray-50" key={filteredTaskData[value]?.key}>
              {filteredTaskData[value]?.tasks?.map((task: ImyTaskData, index: number) => {
                return (
                  <tr key={task.id} className=" bg-gray-50 hover:bg-purple-100 group">
                    <td className="px-2 py-1 text-sm font-medium text-gray-800 whitespace-nowrap border-2 border-gray-300">
                      <div className="flex">
                        <span className="opacity-0 group-hover:opacity-100">
                          <MdOutlineDragIndicator />
                        </span>
                        <span className="group-hover:opacity-0">{index + 1}</span>
                        <input type="checkbox" className="opacity-0 group-hover:opacity-100" />
                      </div>
                    </td>
                    {taskColumns.map(
                      (col) =>
                        !col.hidden && (
                          <td
                            className="text-sm font-medium text-gray-800 whitespace-nowrap border-2 border-gray-300"
                            key={col.id}
                          >
                            {/* {task && (renderData(task[col.field], col.field, task) as ReactNode)} */}
                          </td>
                        )
                    )}
                  </tr>
                );
              })}
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}

export default TaskTableTemplateData;
