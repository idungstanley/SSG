import React, { ReactNode } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import "../taskData/task.css";
import PriorityDropdown from "../../../../../components/priority/PriorityDropdown";
import { ImyTaskData } from "../../../../../features/task/taskSlice";
import moment from "moment";
// import { setActiveItem } from "../../../../../features/workspace/workspaceSlice";
import { UserPlusIcon } from "@heroicons/react/24/outline";

function TaskTableView() {
  const { myTaskData, hideTask, taskColumns } = useAppSelector(
    (state) => state.task
  );
  // const dispatch = useAppDispatch();

  // const displayNav = (id: string) => {
  //   dispatch(setShowTaskNavigation(!setShowTaskNavigation));
  //   dispatch(setCurrentTaskId(id));
  // };
  // const handleTaskPilot = (id: string, name: string) => {
  //   dispatch(setTaskIdForPilot(id));
  //   dispatch(
  //     setActiveItem({
  //       activeItemId: id,
  //       activeItemType: "task",
  //       activeItemName: name,
  //     })
  //   );
  // };

  // const handleTaskStatus = (id: string) => {
  //   dispatch(setCurrentTaskStatusId(id));
  // };

  // const handleTaskPriority = (id: string) => {
  //   dispatch(setCurrentTaskPriorityId(id));
  // };

  const renderData = (taskColField, colfield) => {
    if (colfield === "assignees" && taskColField.length !== 0) {
      return (
        <div className="relative">
          <div>Assignee Name</div>
        </div>
      );
    } else if (colfield === "assignees" && taskColField.length === 0) {
      return (
        <>
          <UserPlusIcon
            className=" ml-2 text-gray-400 text-xl cursor-pointer "
            aria-hidden="true"
          />
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
                                {
                                  renderData(
                                    task[col.field],
                                    col.field
                                  ) as ReactNode
                                }
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
