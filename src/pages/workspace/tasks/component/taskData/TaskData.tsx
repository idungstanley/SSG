import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentTaskId,
  setShowTaskNavigation,
  setToggleAssignCurrentTaskId,
} from "../../../../../features/task/taskSlice";
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

interface TaskDataProps {
  task: any;
}

export default function TaskData({ task }: TaskDataProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showTaskNavigation, toggleAssignCurrentTaskId } = useAppSelector(
    (state) => state.task
  );
  const [openTaskModal, setOpenTaskModal] = useState(false);

  const displayNav = (id: string) => {
    dispatch(setShowTaskNavigation(!showTaskNavigation));
    dispatch(setCurrentTaskId(id));
  };

  const handleTaskModal = (id: string) => {
    setOpenTaskModal(true);
    navigate(`/workspace/t/${id}`);
  };

  // const handleSubTask = (id: string) => {
  //   setParentTaskId(id);
  //   setSubTaskOne(!subTaskOne);
  //   if (subTaskOne === id) {
  //     return setSubTaskOne(false);
  //   }
  //   setSubTaskOne(id);
  // };

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

  return (
    <div className="group relative bg-white border border-gray-100 hover:bg-gray-100  flex  items-center ml-6 pl-3">
      <span className="flex items-center absolute  " style={{ left: "-30px" }}>
        <input
          type="checkbox"
          id="checked-checkbox"
          className={`opacity-0 transition duration-200 group-hover:opacity-100 cursor-pointer focus:outline-1 focus:ring-transparent rounded-full  focus:border-2 focus:opacity-100`}
          onClick={() => displayNav(task.id)}
        />

        <MdDragIndicator className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-400 cursor-move	  " />
      </span>

      <RiCheckboxBlankFill
        className=" text-gray-400 text-xs"
        aria-hidden="true"
      />
      <div className="flex items-center w-6/12 group">
        {/* data and input */}
        <div onClick={() => handleTaskModal(task.id)}>
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
            // onClick={() => handleSubTask(task.id)}
          />
          <EditOutlined
            className="cursor-pointer flex-shrink-0 text-xs h-4 w-4 text-black"
            aria-hidden="true"
          />
        </div>
      </div>
      {/* icons */}

      <div className="flex  space-x-10">
        <span className="relative rounded-full text-xs text-center">
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
              className="cursor-pointer"
            >
              {groupAssignee(task.assignees)}
            </div>
          )}
        </span>
        <span className="border-dotted border-gray-300 pl-3 ml-5">
          <CalendarOutlined
            className="h-5 w-7 text-gray-400"
            aria-hidden="true"
          />
        </span>
        <span className="border-dotted border-gray-300 ml-5">
          <FlagOutlined
            className="h-5 w-7  text-gray-400 ml-8"
            aria-hidden="true"
          />
        </span>
        {toggleAssignCurrentTaskId == task.id ? <AssignTask /> : null}
      </div>
    </div>
  );
}
