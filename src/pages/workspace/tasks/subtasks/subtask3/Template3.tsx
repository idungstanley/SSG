import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentParentSubTaskId3,
  setCurrentParentTaskId,
  setCurrentTaskId,
  setShowTaskNavigation,
  setToggleAssignCurrentTaskId,
} from "../../../../../features/task/taskSlice";
import { useAppSelector } from "../../../../../app/hooks";
import { MdDragIndicator } from "react-icons/md";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { VscTriangleDown, VscTriangleRight } from "react-icons/vsc";
import {
  CalendarOutlined,
  EditOutlined,
  FlagOutlined,
  PlusOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { AvatarWithInitials } from "../../../../../components";
import AssignTask from "../../assignTask/AssignTask";
import { columnsHead } from "../../component/views/ListColumns";
import moment from "moment";

interface TemplateProps {
  task: any;
}

export default function Template3({ task }: TemplateProps) {
  const dispatch = useDispatch();

  const [showSubTask, setShowSubTask] = useState<string | null>(null);

  const { showTaskNavigation, toggleAssignCurrentTaskId, currentParentTaskId } =
    useAppSelector((state) => state.task);

  const displayNav = (id: string) => {
    dispatch(setShowTaskNavigation(!showTaskNavigation));
    dispatch(setCurrentTaskId(id));
  };

  const handleCreateSubTask = (id: string) => {
    if (id == currentParentTaskId) {
      dispatch(setCurrentParentTaskId(null));
    } else {
      dispatch(setCurrentParentTaskId(id));
    }
  };

  const handleAssigneeModal = (id: string) => {
    if (toggleAssignCurrentTaskId == id) {
      dispatch(setToggleAssignCurrentTaskId(null));
    } else {
      dispatch(setToggleAssignCurrentTaskId(id));
    }
  };

  const groupAssignee = (data) => {
    return data?.map((newData) => (
      <>
        <span key={newData.id} className="flex-1">
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

  const handleShowSubTask = (id: string) => {
    if (id == showSubTask) {
      setShowSubTask(null);
      dispatch(setCurrentParentSubTaskId3(null));
    } else {
      setShowSubTask(id);
      dispatch(setCurrentParentSubTaskId3(id));
    }
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
          className=" ml-2  text-gray-400 text-xl cursor-pointer "
          aria-hidden="true"
          onClick={() => handleAssigneeModal(task.id)}
        />
      );
    } else if (colfield == "created_at") {
      return (
        <span className="text-gray-400 text-sm font-medium">
          {moment(taskColField).format("MM/DD")}
        </span>
      );
    } else if (colfield === "name") {
      return (
        <div className="flex items-center relative">
          <div className=" flex items center">
            <input
              type="checkbox"
              id="checked-checkbox"
              className="cursor-pointer -mt-1 absolute rounded-full focus:outline-1 focus:ring-transparent group-hover:opacity-100 opacity-0 focus:border-2 focus:opacity-100 -left-8 h-3 w-3"
              onClick={() => {
                displayNav(task.id);
              }}
            />
            <MdDragIndicator className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-400 cursor-move -mt-1 text-sm	 absolute -left-5 " />
          </div>
          <div className="ml-16" onClick={() => handleShowSubTask(task.id)}>
            {task.id == showSubTask ? (
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
      <div className="flex justify-between group bg-white ml-4 mb-px w-12/12 py-1">
        <div className="  w-6/12 flex items-center justify-between ">
          {columnsHead.map(
            (col) =>
              col.value == "Task" && (
                <div
                  key={col.field}
                  className="flex bg-white items-center capitalize ml-2 text-xs py-px font-medium  group"
                >
                  {renderData(task[col.field], col.field)}
                </div>
              )
          )}
        </div>
        <div className="dynamic ">
          {columnsHead.map(
            (col) =>
              col.value !== "Task" && (
                <div
                  key={col.field}
                  className="flex items-center uppercase bg-white   text-gray-400 py-px pl-6 font-medium  group"
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
