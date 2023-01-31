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

  // const handleTaskModal = (id: string) => {
  //   setOpenTaskModal(true);
  //   navigate(`/workspace/t/${id}`);
  // };

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
      <>
        <span key={newData.id} className="stack">
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

  return (
    <div className="group flex items-center justify-between">
      {" "}
      <span className="flex relative items-center ">
        <input
          type="checkbox"
          id="checked-checkbox"
          className="opacity-0 transition duration-200 group-hover:opacity-100 cursor-pointer focus:outline-1 focus:ring-transparent rounded-full  focus:border-2 focus:opacity-100 absolute -left-3 h-3 w-3 "
          onClick={() => {
            displayNav(task.id);
          }}
        />
        <MdDragIndicator className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-400 cursor-move	 absolute left-0 " />
      </span>
      <div className="w-full bg-white mb-px bordar hover:bg-slate-900 flex justify-between items-center ml-4">
        <div className="flex   text-gray-400 md:text-black lg:text-black items-center">
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

          <div className="flex items-center group">
            <RiCheckboxBlankFill
              className="pl-px text-gray-400 text-xs"
              aria-hidden="true"
            />
            {/* data and input */}
            <div onClick={() => handleTaskPilot(task.id, task.name)}>
              <p className="capitalize text-xs font-medium leading-8 pl-2 cursor-pointer">
                {task.name}
              </p>
            </div>

            {/* iconstask */}
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
        </div>
        {/* icons */}

        <div className=" w-6/12">
          <span className="relative rounded-full text-center	text-xs ">
            {/* assignees here */}

            {task.assignees.length == 0 ? (
              <UserAddOutlined
                className="	ml-2 h-5 w-5 text-gray-400 text-xl cursor-pointer "
                aria-hidden="true"
                onClick={() => handleAssigneeModal(task.id)}
              />
            ) : (
              <div
                onClick={() => handleAssigneeModal(task.id)}
                className="cursor-pointer"
              >
                {groupAssignee(task.assignees)}
              </div>
            )}
          </span>
          <span className=" border-dotted border-gray-300 ml-12 pl-1 ">
            <CalendarOutlined
              className=" h-5 w-7 text-gray-400"
              aria-hidden="true"
            />
          </span>
          <span className=" ml-12 pl-5 border-dotted border-gray-300 ">
            <FlagOutlined
              className="h-5 w-7  text-gray-400 "
              aria-hidden="true"
            />
          </span>
          {toggleAssignCurrentTaskId == task.id ? <AssignTask /> : null}
        </div>
      </div>
    </div>
  );
}
