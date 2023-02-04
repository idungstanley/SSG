import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentParentTaskId,
  setCurrentTaskId,
  setGetSubTaskId,
  setShowTaskNavigation,
  setTaskIdForPilot,
  setToggleAssignCurrentTaskId,
} from "../../../../../features/task/taskSlice";
import { setActiveItem } from "../../../../../features/workspace/workspaceSlice";
import { MdDragIndicator } from "react-icons/md";
import { RiCheckboxBlankFill } from "react-icons/ri";
import {
  EditOutlined,
  FlagOutlined,
  PlusOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../../../../app/hooks";
import { useNavigate } from "react-router-dom";
import AssignTask from "../../assignTask/AssignTask";
import { AvatarWithInitials } from "../../../../../components";
import { VscTriangleDown, VscTriangleRight } from "react-icons/vsc";
import "./task.css";
interface TaskDataProps {
  task: any;
}
import { columnsHead } from "../views/ListColumns";
import moment from "moment";

export default function TaskData({ task }: TaskDataProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    showTaskNavigation,
    toggleAssignCurrentTaskId,
    currentParentTaskId,
    getSubTaskId,
    taskColumns,
    hideTask,
  } = useAppSelector((state) => state.task);
  const [openTaskModal, setOpenTaskModal] = useState(false);

  const displayNav: any = (id: string) => {
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
    // dispatch(ilotTrigger)
  };

  const handleAssigneeModal = (id: string) => {
    if (toggleAssignCurrentTaskId == id) {
      dispatch(setToggleAssignCurrentTaskId(null));
    } else {
      dispatch(setToggleAssignCurrentTaskId(id));
    }
  };

  const handleGetSubTask = (id: string) => {
    if (id == getSubTaskId) {
      dispatch(setGetSubTaskId(null));
    } else {
      dispatch(setGetSubTaskId(id));
    }
  };

  const handleCreateSubTask = (id: string) => {
    if (id == currentParentTaskId) {
      dispatch(setCurrentParentTaskId(null));
    } else {
      dispatch(setCurrentParentTaskId(id));
    }
  };

  const groupAssignee = (data) => {
    return data?.map((newData) => (
      <div key={newData.id} className="relative">
        <span key={newData.id} className="">
          <AvatarWithInitials
            initials={newData.initials}
            backgroundColour={newData.colour}
            height="h-5"
            width="w-5"
          />
        </span>
      </div>
    ));
  };

  const renderData = (taskColField, colfield) => {
    if (colfield === "assignees" && taskColField.length !== 0) {
      return (
        <div className="relative">
          <div
            onClick={() => handleAssigneeModal(task.id)}
            className="cursor-pointer flex "
          >
            {groupAssignee(task.assignees)}
          </div>
        </div>
      );
    } else if (colfield === "assignees" && taskColField.length === 0) {
      return (
        <UserAddOutlined
          className=" pl-3 text-gray-400 text-xl cursor-pointer "
          aria-hidden="true"
          onClick={() => handleAssigneeModal(task.id)}
        />
      );
    } else if (colfield == "created_at" || colfield == "updated_at") {
      return (
        <span className="text-gray-400 text-sm font-medium">
          {moment(taskColField).format("MM/DD")}
        </span>
      );
    } else if (colfield === "name") {
      return (
        <div className="flex items-center relative">
          <div className=" flex items-center">
            <input
              type="checkbox"
              id="checked-checkbox"
              className="cursor-pointer absolute rounded-full focus:outline-1 focus:ring-transparent group-hover:opacity-100 opacity-0 focus:border-2 focus:opacity-100 -left-8 h-3 w-3"
              onClick={() => {
                displayNav(task.id);
              }}
            />
            <MdDragIndicator className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-400 cursor-move  text-sm	 absolute -left-5 " />
          </div>
          <div onClick={() => handleGetSubTask(task.id)} className="">
            {task.id == getSubTaskId ? (
              <span className="flex flex-col">
                <VscTriangleDown color="rgba(72, 67, 67, 0.64)" />
              </span>
            ) : (
              <VscTriangleRight
                className="flex-shrink-0 h-3"
                aria-hidden="true"
                color="rgba(72, 67, 67, 0.64)"
              />
            )}
          </div>
          <div className="flex items-center">
            <p>
              <RiCheckboxBlankFill
                className="pl-px text-gray-400 text-xs"
                aria-hidden="true"
              />
            </p>
            <p
              onClick={() => handleTaskPilot(task.id, task.name)}
              className="cursor-pointer"
            >
              {taskColField}
            </p>
            <div
              id="iconWrapper"
              className="flex items-center space-x-1 ml-1 opacity-0  group-hover:opacity-100"
            >
              <PlusOutlined
                className="cursor-pointer  pt-1 text-xs h-6 w-6 text-black"
                aria-hidden="true"
                onClick={() => handleCreateSubTask(task.id)}
              />
              <EditOutlined
                className="cursor-pointer  text-xs h-4 w-4 text-black"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      );
    } else if (colfield === "priority") {
      return (
        <span className="relative border-dotted border-gray-300 ">
          <FlagOutlined
            className="h-5 w-7  text-gray-400 "
            aria-hidden="true"
          />
        </span>
      );
    } else return taskColField;
  };

  return (
    <>
      <div className="flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1">
        <div className=" flex w-6/12  items-center ">
          {hideTask.length
            ? hideTask.map(
                (col) =>
                  col.value == "Task" &&
                  !col.hidden && (
                    <div
                      key={col.field}
                      className="flex items-center capitalize ml-2 text-xs font-medium  group"
                    >
                      {renderData(task[col.field], col.field)}
                    </div>
                  )
              )
            : taskColumns.map(
                (col) =>
                  col.value == "Task" &&
                  !col.hidden && (
                    <div
                      key={col.field}
                      className="flex items-center capitalize ml-2 text-xs font-medium  group"
                    >
                      {renderData(task[col.field], col.field)}
                    </div>
                  )
              )}
        </div>
        <div className=" dynamic ">
          {hideTask.length
            ? hideTask.map(
                (col) =>
                  col.value !== "Task" &&
                  !col.hidden && (
                    <div
                      key={col.field}
                      className=" items-center uppercase    text-gray-400 py-px   font-medium  group"
                      style={{ width: "50px", marginLeft: "25%" }}
                    >
                      {renderData(task[col.field], col.field)}
                    </div>
                  )
              )
            : columnsHead.map(
                (col) =>
                  col.value !== "Task" &&
                  !col.hidden && (
                    <div
                      key={col.field}
                      className=" items-center uppercase    text-gray-400 py-px   font-medium  group"
                      style={{ width: "50px", marginLeft: "25%" }}
                    >
                      {renderData(task[col.field], col.field)}
                    </div>
                  )
              )}
        </div>

        {toggleAssignCurrentTaskId == task.id ? <AssignTask /> : null}
      </div>
    </>
  );
}
