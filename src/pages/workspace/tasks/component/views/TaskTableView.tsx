import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { BiExport } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { MdDragIndicator, MdOutlineCancelScheduleSend } from "react-icons/md";
import { FcParallelTasks } from "react-icons/fc";
import { AiOutlineFilter } from "react-icons/ai";
import { FaSort } from "react-icons/fa";
import "../taskData/task.css";
import { AvatarWithInitials } from "../../../../../components";
// import {
//   ImyTaskData,
//   setCurrentTaskId,
//   setShowTaskNavigation,
// } from '../../../../../features/task/taskSlice';
import { groupAssigneeProps } from "../../subtasks/subtask1/Template";
import PriorityDropdown from "../../../../../components/priority/PriorityDropdown";
import {
  setCurrentTaskId,
  setCurrentTaskPriorityId,
  setCurrentTaskStatusId,
  setShowTaskNavigation,
  setTaskIdForPilot,
  setToggleAssignCurrentTaskId,
  triggerUnassignTag,
} from "../../../../../features/task/taskSlice";
import AssignTask from "../../assignTask/AssignTask";
import { PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import ToolTip from "../../../../../components/Tooltip";
import EditTagModal from "../../../../../components/tags/EditTagModal";
import { IoCloseSharp } from "react-icons/io5";
import moment from "moment";
import { setActiveItem } from "../../../../../features/workspace/workspaceSlice";
import StatusDropdown from "../../../../../components/status/StatusDropdown";
import { FiEdit2 } from "react-icons/fi";
import TagModal from "../../../../../components/tags/TagModal";

function TaskTableView() {
  const defaultMaterialTheme = createTheme();
  const {
    myTaskData,
    hideTask,
    taskColumns,
    toggleAssignCurrentTaskId,
    showTaskNavigation,
  } = useAppSelector((state) => state.task);
  // const { showTaskNavigation } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();

  const editable = myTaskData.map((o) => ({ ...o }));

  interface tableIcons {
    Export: () => JSX.Element;
    Search: () => null;
    Filter: () => JSX.Element;
    ViewColumn: () => JSX.Element;
    Clear: () => JSX.Element;
    SortArrow: () => JSX.Element;
    DetailPanel: () => JSX.Element;
    FirstPage: () => null;
    LastPage: () => null;
    NextPage: () => null;
    PreviousPage: () => null;
    ResetSearch: () => JSX.Element;
  }

  interface ListItem {
    id?: string;
    name?: string;
    description?: string | null;
    list_id?: string;
    parent_id?: string | null;
    priority?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    assignees?: string[];
    group_assignees?: string[];
    updated_at?: string;
    created_at?: string;
    archived_at?: string | null;
    deleted_at?: string | null;
    directory_items?: string[];

    title?: string;
    field?: string;
    emptyValue?: () => JSX.Element;
    hidden?: boolean | undefined;
    render?: ((newData: groupAssigneeProps) => void) | null;
  }

  interface singleColumnProps {
    title: string;
    field: string;
    emptyValue: () => JSX.Element;
    hidden: boolean | undefined;
    render: ((newData: groupAssigneeProps) => void) | null;
  }
  interface dataProps {
    assignees: groupAssigneeProps[];
  }

  const groupAssignee = (data: groupAssigneeProps[]) => {
    return data?.map((newData) => (
      <>
        <span key={newData.id} className="flex-1 stack2">
          <AvatarWithInitials
            initials={newData.initials}
            backgroundColour={newData.colour}
            height="h-5"
            width="w-5"
          />
        </span>
      </>
    ));
  };

  const icons: tableIcons = {
    Export: () => <BiExport />,
    Search: () => null,
    Filter: () => <AiOutlineFilter />,
    ViewColumn: () => <BiHide />,
    Clear: () => <AiOutlineFilter />,
    SortArrow: () => <FaSort />,
    DetailPanel: () => <FcParallelTasks />,
    FirstPage: () => null,
    LastPage: () => null,
    NextPage: () => null,
    PreviousPage: () => null,
    ResetSearch: () => <MdOutlineCancelScheduleSend />,
  };

  const columnHead: string[][] = [];
  const singleObj: any = editable[0];
  singleObj && columnHead.push(Object.keys(singleObj));

  const dynamicColum: ListItem[] = [];

  // const displayNav = (id: string) => {
  //   dispatch(setShowTaskNavigation(!showTaskNavigation));
  //   dispatch(setCurrentTaskId(id));
  // };

  columnHead[0]?.map((column) => {
    const singleColumn = {
      title:
        column.split("_").join(" ").toUpperCase() == "NAME"
          ? "TASKS"
          : column.split("_").join(" ").toUpperCase(),
      field: column,
      emptyValue: () => <p>-</p>,
      render:
        column == "assignees" ? (newData) => renderData(column, newData) : null,
    };
    dynamicColum.push(singleColumn);
  });

  const handleAssigneeModal = (id: string) => {
    if (toggleAssignCurrentTaskId == id) {
      dispatch(setToggleAssignCurrentTaskId(null));
    } else {
      dispatch(setToggleAssignCurrentTaskId(id));
    }
  };
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
  //   const groupTags = (arr) => {
  //      return arr.map((item) => {
  //        return Array.isArray(item) ? (
  //          <div>{groupTags(item)}</div>
  //        ) : (
  //          <>
  //            <div
  //              className={`flex items-center space-x-1 text-white p-0.5 text-center m-0.5 rounded-r-md ${
  //                item.name.length > 10 ? "object-contain" : "w-20"
  //              }`}
  //              style={{ backgroundColor: `${item.color}` }}
  //            >
  //              <div className="flex items-center">
  //                <p> {item.name}</p>
  //                {renameTagId == item.id && (
  //                  <form>
  //                    <input
  //                      type="text"
  //                      placeholder="tagedit name"
  //                      className="text-gray-400 h-7 object-contain"
  //                    />
  //                  </form>
  //                )}
  //              </div>
  //              <ToolTip tooltip="edit tag">
  //                <button>
  //                  <EditTagModal tagId={item.id} taskId={task.id} />
  //                </button>
  //              </ToolTip>

  //              <ToolTip tooltip="unassign tag">
  //                <button
  //                  onClick={() =>
  //                    dispatch(
  //                      triggerUnassignTag({
  //                        unAssignTadId: item.id,
  //                        currentTaskIdForTag: task.id,
  //                      })
  //                    )
  //                  }
  //                >
  //                  <IoCloseSharp />
  //                </button>
  //              </ToolTip>
  //              {showTagColorDialogueBox && <ColorsModal />}
  //            </div>
  //            {/* <span>{arr.length}</span> */}
  //          </>
  //        );
  //      });
  //    };

  const renderData = (taskColField, colfield) => {
    if (colfield === "assignees" && taskColField.length !== 0) {
      return (
        <>
          <div className="">
            <div
              onClick={() => handleAssigneeModal(taskColField.id)}
              className="cursor-pointer flex "
            >
              {groupAssignee(taskColField.assignees)}
            </div>
          </div>
          <span className="absolute shadow-2xl  z-30  ">
            {toggleAssignCurrentTaskId == taskColField.id ? (
              <AssignTask />
            ) : null}
          </span>
        </>
      );
    } else if (colfield === "assignees" && taskColField.length === 0) {
      return (
        <>
          <UserAddOutlined
            className=" ml-2 text-gray-400 text-xl cursor-pointer "
            aria-hidden="true"
            onClick={() => handleAssigneeModal(taskColField.id)}
          />
          <span className="absolute shadow-2xl  z-30  ">
            {toggleAssignCurrentTaskId == taskColField.id ? (
              <AssignTask />
            ) : null}
          </span>
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
        return (
          <div
            className="capitalize text-xs font-medium bg-green-500 text-white py-2.5 px-1 w-20 absolute text-center "
            style={{ marginTop: "-4px", marginLeft: "-30px" }}
          >
            {taskColField}
          </div>
        );
      } else if (taskColField == "in progress") {
        return (
          <div
            className="capitalize text-xs font-medium bg-purple-500 text-white py-2.5 mb-5 px-1 w-20 absolute text-center "
            style={{ marginTop: "-4px", marginLeft: "-30px" }}
          >
            {taskColField}
          </div>
        );
      } else if (taskColField == "archived") {
        return (
          <div
            className="capitalize text-center text-xs font-medium bg-yellow-500 text-white py-2.5 px-1  w-20 absolute "
            style={{ marginTop: "-4px", marginLeft: "-30px" }}
          >
            {taskColField}
          </div>
        );
      } else if (taskColField == "todo") {
        return (
          <div
            className="capitalize text-center text-xs font-medium bg-gray-400 w-20 text-white py-2.5 px-1 absolute "
            style={{ marginTop: "-4px", marginLeft: "-30px" }}
          >
            {taskColField}
          </div>
        );
      } else {
        return (
          <div
            className="capitalize text-center text-xs font-medium bg-gray-400 w-20 text-white py-2.5 px-1 absolute "
            style={{ marginTop: "-4px", marginLeft: "-30px" }}
          >
            Todo
          </div>
        );
      }
    } else if (colfield === "name") {
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
    } else if (colfield === "priority") {
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
            <div className="overflow-y-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    {hideTask.length
                      ? hideTask.map(
                          (columns) =>
                            !columns.hidden && (
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
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
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
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
                                className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"
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
