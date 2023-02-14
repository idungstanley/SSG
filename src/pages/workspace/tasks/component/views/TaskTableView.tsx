import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import "../taskData/task.css";
import PriorityDropdown from "../../../../../components/priority/PriorityDropdown";
import { setTaskIdForPilot } from "../../../../../features/task/taskSlice";
import moment from "moment";
import { setActiveItem } from "../../../../../features/workspace/workspaceSlice";

function TaskTableView() {
  const { myTaskData, hideTask, taskColumns } = useAppSelector(
    (state) => state.task
  );
  const dispatch = useAppDispatch();

  const handleTaskPilot = (id: string, name: string) => {
    dispatch(setTaskIdForPilot(id));
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: "task",
        activeItemName: name,
      })
    );
  };

  const renderData = (taskColField, colfield) => {
    if (colfield === "assignees" && taskColField.length !== 0) {
      return (
        <>
          <div>
            <div>Assinee name</div>
          </div>
        </>
      );
    } else if (colfield === "assignees" && taskColField.length === 0) {
      return (
        <>
          <p>-</p>
        </>
      );
    } else if (colfield == "created_at" || colfield == "updated_at") {
      return (
        <span className="text-gray-400 text-sm font-medium">
          {moment(taskColField).format("MM/DD")}
        </span>
      );
    } else if (colfield == "status") {
      if (taskColField == "completed") {
        return <div>{taskColField}</div>;
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
        <div>
          <p
            onClick={() => handleTaskPilot(taskColField.id, taskColField.name)}
            className="cursor-pointer "
          >
            {taskColField}
          </p>
        </div>
      );
    } else if (colfield === "priority") {
      return (
        <td>
          <PriorityDropdown TaskCurrentPriority={taskColField?.priority} />
        </td>
      );
    } else return taskColField;
  };

  return (
    <>
      <div className="overflow-y-auto border rounded-lg h-min">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {hideTask.length
                ? hideTask.map(
                    (columns) =>
                      !columns.hidden && (
                        <th scope="col" className="" key={columns.field}>
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
          <tbody className="">
            {myTaskData.map((task) => {
              return (
                <tr key={task.id} className="bg-white hover:bg-gray-200">
                  {taskColumns.map(
                    (col) =>
                      !col.hidden && (
                        <td
                          className="px-6 py-2 text-sm font-medium text-gray-800 whitespace-nowrap border-2 border-white"
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
    </>
  );
}

export default TaskTableView;
