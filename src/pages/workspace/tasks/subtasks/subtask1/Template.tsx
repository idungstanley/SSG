import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentParentSubTaskId,
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
import "../create/subtask.css";

interface TemplateProps {
  task: any;
}

export default function Template({ task }: TemplateProps) {
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
        <span key={newData.id} className="flex-1 stack">
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
      dispatch(setCurrentParentSubTaskId(null));
    } else {
      setShowSubTask(id);
      dispatch(setCurrentParentSubTaskId(id));
    }
  };

  return (
    <div
      className="group relative bg-white border border-gray-100 hover:bg-slate-700	  flex  items-center ml-4 "
      key={task.id}
    >
      <span className="flex items-center absolute" style={{ left: "-30px" }}>
        <input
          type="checkbox"
          id="checked-checkbox"
          className={`opacity-0 transition duration-200 group-hover:opacity-100 cursor-pointer focus:outline-1 focus:ring-transparent rounded-full  focus:border-2  h-3 w-3  text-xs focus:opacity-100`}
          onClick={() => displayNav(task.id)}
        />

        <MdDragIndicator className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-400 cursor-move	  " />
      </span>
      <div className="ml-5" onClick={() => handleShowSubTask(task.id)}>
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
      <RiCheckboxBlankFill
        className="pl-1 text-gray-400 text-xs "
        aria-hidden="true"
      />
      <div className="flex items-center w-6/12 group">
        {/* data and input */}
        {/* <div onClick={() => handleTaskModal(task.id)}> */}
        <div>
          {/* {i == 0 && <h1>Tasks</h1>} */}

          <p className="capitalize text-xs font-semibold leading-8 pl-5	">
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
      {/* icons */}

      <div className="flex relative  space-x-10">
        <span
          className="absolute rounded-full text-xs text-center"
          style={{ left: "-40px" }}
        >
          {/* assignees here */}

          {task.assignees.length == 0 ? (
            <UserAddOutlined
              className=" h-5 w-5 text-gray-400 text-xl cursor-pointer "
              aria-hidden="true"
              onClick={() => handleAssigneeModal(task.id)}
            />
          ) : (
            <div
              onClick={() => handleAssigneeModal(task.id)}
              className="cursor-pointer absolute -ml-1 mt-1"
            >
              {groupAssignee(task.assignees)}
            </div>
          )}
        </span>
        <span
          className=" absolute border-dotted border-gray-300 "
          style={{ left: "-8px" }}
        >
          <CalendarOutlined
            className="h-5 w-7 text-gray-400"
            aria-hidden="true"
          />
        </span>
        <span className="border-dotted border-gray-300 ">
          <FlagOutlined
            className="h-5 w-7 ml-12 pl-11 text-gray-400 "
            aria-hidden="true"
          />
        </span>
        {toggleAssignCurrentTaskId == task.id ? <AssignTask /> : null}
      </div>
    </div>
  );
}
