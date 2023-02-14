import React, { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import "../taskData/task.css";
import PriorityDropdown from "../../../../../components/priority/PriorityDropdown";
import {
  setCurrentTaskId,
  setCurrentTaskPriorityId,
  setCurrentTaskStatusId,
  setShowTaskNavigation,
  setTaskIdForPilot,
} from "../../../../../features/task/taskSlice";
import moment, { MomentInput } from "moment";
import { setActiveItem } from "../../../../../features/workspace/workspaceSlice";
import StatusDropdown from "../../../../../components/status/StatusDropdown";
import { FiEdit2 } from "react-icons/fi";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { MdDragIndicator } from "react-icons/md";
import { tagItem } from "../../../pilot/components/details/properties/subDetailsIndex/PropertyDetails";

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
        activeItemType: "task",
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

  const renderData = (
    taskColField:
      | string
      | number
      | undefined
      | tagItem[]
      | null
      | Array<{ id: string; initials: string; colour: string }>,
    colfield: string
  ) => {
    if (colfield === "assignees") {
      const TCF = taskColField as Array<{
        id: string;
        initials: string;
        colour: string;
      }>;

      return TCF.length !== 0 ? (
        <div className="relative">
          <div>Assignees Name</div>
        </div>
      ) : null;
    } else if (colfield === "assignees") {
      const TCF = taskColField as Array<{
        id: string;
        initials: string;
        colour: string;
      }>;

      return TCF.length === 0 ? <p>-</p> : null;
    } else if (colfield == "created_at" || colfield == "updated_at") {
      return (
        <span className="text-gray-400 text-sm font-medium">
          {moment(taskColField as MomentInput).format("MM/DD")}
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
        <div className="flex items-center relative ">
          <div className="flex items-center">
            <p>{taskColField as ReactNode}</p>

            {/* tags goes here */}
            {/* <div> {groupTags(task.tags)}</div>; */}
          </div>
        </div>
      );
    } else if (colfield === "priority") {
      return (
        <span
          className="relative  border-dotted border-gray-300 "
          onClick={() => handleTaskPriority(taskColField?.id as string)}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskTableView;
