import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentParentTaskId,
  setCurrentTaskId,
  setCurrentTaskPriorityId,
  setCurrentTaskStatusId,
  setGetSubTaskId,
  setShowTaskNavigation,
  setTaskIdForPilot,
  setToggleAssignCurrentTaskId,
} from "../../../../../features/task/taskSlice";
import { setActiveItem } from "../../../../../features/workspace/workspaceSlice";
import { MdDragIndicator } from "react-icons/md";

import { EditOutlined, PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../../../app/hooks";
// import { useNavigate } from 'react-router-dom';
import AssignTask from "../../assignTask/AssignTask";
import { AvatarWithInitials } from "../../../../../components";
import { VscTriangleDown, VscTriangleRight } from "react-icons/vsc";
import "./task.css";
interface TaskDataProps {
  task: any;
}
import { columnsHead } from "../views/ListColumns";
import moment from "moment";
import StatusDropdown from "../../../../../components/status/StatusDropdown";
import PriorityDropdown from "../../../../../components/priority/PriorityDropdown";

export default function TaskData({ task }: TaskDataProps) {
  const dispatch = useDispatch();
  const { myTaskData } = useAppSelector((state) => state.task);
  const {
    showTaskNavigation,
    toggleAssignCurrentTaskId,
    currentParentTaskId,
    getSubTaskId,
    taskColumns,
    hideTask,
  } = useAppSelector((state) => state.task);

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
        <span key={newData.id}>
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
          className="  text-gray-400 text-xl cursor-pointer "
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
        <div className="flex items-center relative ">
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
            <p onClick={() => handleTaskStatus(task.id)} className="relative">
              <StatusDropdown TaskCurrentStatus={task?.status} />
            </p>
            <p
              onClick={() => handleTaskPilot(task.id, task.name)}
              className="cursor-pointer "
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
        <span
          className="relative  border-dotted border-gray-300 "
          onClick={() => handleTaskPriority(task.id)}
        >
          <PriorityDropdown TaskCurrentPriority={task?.priority} />
        </span>
      );
    } else return taskColField;
  };

  // const groupTaskByStatus = (arr, keyToReGroupBy) => {
  //   return arr.reduce(function (reGroup, x) {
  //     (reGroup[x[keyToReGroupBy]] = reGroup[x[keyToReGroupBy]] || []).push(x);
  //     return reGroup;
  //   }, {});
  // };
  // console.log(task?.status);

  // console.log(groupTaskByStatus(myTaskData, 'in progress'));

  return (
    <div className="relative ">
      <div className="flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative">
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
        <div className=" dynamic mr-10 ">
          {hideTask.length
            ? hideTask.map(
                (col) =>
                  col.value !== "Task" &&
                  !col.hidden && (
                    <div
                      key={col.field}
                      className=" items-center uppercase    text-gray-400 py-px   font-medium  group"
                      style={{ width: "50px", marginLeft: "35%" }}
                    >
                      {renderData(task[col.field], col.field)}
                    </div>
                  )
              )
            : taskColumns.map(
                (col) =>
                  col.value !== "Task" &&
                  !col.hidden && (
                    <div
                      key={col.field}
                      className=" relative items-center uppercase    text-gray-400 py-px   font-medium text-ellipsis	overflow-hidden	  group"
                      style={{ width: "50px", marginLeft: "35%" }}
                    >
                      {renderData(task[col.field], col.field)}
                    </div>
                  )
              )}
        </div>
      </div>
      <span className="absolute z-30 shadow-2xl left-0 z-30 right-0 ">
        {toggleAssignCurrentTaskId == task.id ? <AssignTask /> : null}
      </span>
    </div>
  );
}
