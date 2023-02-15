import React, { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import "../taskData/task.css";
import PriorityDropdown from "../../../../../components/priority/PriorityDropdown";
import {
  ImyTaskData,
  setCurrentTaskPriorityId,
} from "../../../../../features/task/taskSlice";
import moment, { MomentInput } from "moment";
import { tagItem } from "../../../pilot/components/details/properties/subDetailsIndex/PropertyDetails";
import { BsArrowsAngleExpand } from "react-icons/bs";

function TaskTableView() {
  const { myTaskData, hideTask, taskColumns } = useAppSelector(
    (state) => state.task
  );
  const dispatch = useAppDispatch();

  // const displayNav = (id: string) => {
  //   dispatch(setShowTaskNavigation(!showTaskNavigation));
  //   dispatch(setCurrentTaskId(id));
  // };

  const handleTaskPriority = (id: string | undefined | null) => {
    dispatch(setCurrentTaskPriorityId(id));
  };

  const renderData = (
    taskColField:
      | ImyTaskData
      | string
      | ImyTaskData
      | number
      | undefined
      | tagItem[]
      | null
      | Array<{ id: string; initials: string; colour: string }>,
    colfield: string
  ) => {
    if (
      colfield === "assignees" &&
      (
        taskColField as Array<{
          id: string;
          initials: string;
          colour: string;
        }>
      ).length !== 0
    ) {
      return (
        <div className="relative">
          <div>Assignee Name</div>
        </div>
      );
    } else if (
      colfield === "assignees" &&
      (
        taskColField as Array<{
          id: string;
          initials: string;
          colour: string;
        }>
      ).length === 0
    ) {
      return <p>-</p>;
    } else if (colfield == "created_at" || colfield == "updated_at") {
      return (
        <span className="text-gray-400 text-sm font-medium">
          {moment(taskColField as MomentInput).format("MM/DD")}
        </span>
      );
    } else if (colfield == "status") {
      if (taskColField == "completed") {
        return <div className="bg-green-500">{taskColField}</div>;
      } else if (taskColField == "in progress") {
        return <div>{taskColField}</div>;
      } else if (taskColField == "archived") {
        return <div>{taskColField}</div>;
      } else if (taskColField == "todo") {
        return <div>{taskColField}</div>;
      } else {
        return <div>Todo</div>;
      }
    } else if (colfield === "name") {
      return (
        <div className="flex items-center relative ">
          <div className="flex w-11/12 justify-between items-center group">
            <p>{taskColField as ReactNode}</p>
            <p className="group-hover:bg-gray-300 p-2 cursor-pointer">
              <BsArrowsAngleExpand />
            </p>
          </div>
        </div>
      );
    } else if (colfield === "priority") {
      return (
        <span
          className="relative  border-dotted border-gray-300"
          onClick={() => handleTaskPriority((taskColField as ImyTaskData)?.id)}
        >
          <PriorityDropdown
            TaskCurrentPriority={(taskColField as ImyTaskData)?.priority}
          />
        </span>
      );
    } else return taskColField;
  };

  return (
    <>
      <div className="overflow-y-auto border rounded-lg h-min">
        <table className="fixed_headers w-full divide-y divide-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th>
                <input type="checkbox" className="opacity-0" />
              </th>
              <th>#</th>
              {hideTask.length
                ? hideTask.map(
                    (columns) =>
                      !columns.hidden && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase  border-x-2 border-gray-300"
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
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase  border-2 border-x-2 border-gray-300"
                          key={columns.field}
                        >
                          {columns.value}
                        </th>
                      )
                  )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {myTaskData.map((task, index) => {
              return (
                <tr
                  key={task.id}
                  className=" bg-gray-50 hover:bg-purple-100 group"
                >
                  <td className=" td-resize px-2 py-1 text-sm font-medium text-gray-800 whitespace-nowrap border-2 border-gray-300">
                    <input
                      type="checkbox"
                      className="opacity-0 group-hover:opacity-100"
                    />
                  </td>
                  <td className="px-2 py-1 text-sm font-medium text-gray-800 whitespace-nowrap border-2 border-gray-300">
                    {index + 1}
                  </td>
                  {taskColumns.map(
                    (col) =>
                      !col.hidden && (
                        <td
                          className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border-2 border-gray-300"
                          key={col.field}
                        >
                          {renderData(task[col.field], col.field) as ReactNode}
                        </td>
                      )
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TaskTableView;
