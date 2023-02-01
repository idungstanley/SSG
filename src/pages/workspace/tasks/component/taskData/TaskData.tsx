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
  CalendarOutlined,
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
        <span key={newData.id} className="absolute ">
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
        <div
          onClick={() => handleAssigneeModal(task.id)}
          className="cursor-pointer ml-2"
        >
          {groupAssignee(task.assignees)}
        </div>
      );
    } else if (colfield === "assignees" && taskColField.length === 0) {
      return (
        <UserAddOutlined
          className=" ml-2 h-5 w-5 text-gray-400 text-xl cursor-pointer "
          aria-hidden="true"
          onClick={() => handleAssigneeModal(task.id)}
        />
      );
    } else if (colfield == "created_at") {
      return moment(taskColField).format("MM/DD");
    } else if (colfield === "name") {
      return (
        <div className="flex items-center relative">
          <div className="">
            <input
              type="checkbox"
              id="checked-checkbox"
              className="cursor-pointer top-0 absolute rounded-full focus:outline-1 focus:ring-transparent group-hover:opacity-100 opacity-0 focus:border-2 focus:opacity-100 -left-3 h-3 w-3"
              onClick={() => {
                displayNav(task.id);
              }}
            />
            <MdDragIndicator className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-400 cursor-move	 absolute left-0 " />
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
          <p>
            <RiCheckboxBlankFill
              className="pl-px text-gray-400 text-xs"
              aria-hidden="true"
            />
          </p>
          <p>{taskColField}</p>
          <div
            id="iconWrapper"
            className="flex items-start pt-1 space-x-1 ml-1 opacity-0  group-hover:opacity-100"
          >
            <PlusOutlined
              className="cursor-pointer flex-shrink-0 text-xs h-6 w-6 text-black"
              aria-hidden="true"
              onClick={() => handleCreateSubTask(task.id)}
            />
            <EditOutlined
              className="cursor-pointer flex-shrink-0 text-xs h-4 w-4 text-black"
              aria-hidden="true"
            />
          </div>
        </div>
      );
    } else if (colfield === "priority") {
      return (
        <span className="relative ml-12 pl-5 border-dotted border-gray-300 ">
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
      <div className="group bg-white mb-px w-full ml-4 flex items-center justify-between ">
        {columnsHead.map((col) => (
          <div key={task.id} className="font-medium w-4/12 text-xs ml-2">
            {renderData(task[col.field], col.field)}
          </div>
        ))}
      </div>

      {toggleAssignCurrentTaskId == task.id ? <AssignTask /> : null}
    </>
  );
}
