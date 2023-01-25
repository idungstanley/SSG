import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setCurrentParentTaskId,
  setCurrentTaskId,
  setGetSubTaskId,
  setShowTaskNavigation,
  setToggleAssignCurrentTaskId,
} from '../../../../../features/task/taskSlice';
import { MdDragIndicator } from 'react-icons/md';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import {
  CalendarOutlined,
  EditOutlined,
  FlagOutlined,
  PlusOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '../../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import AssignTask from '../../assignTask/AssignTask';
import { AvatarWithInitials } from '../../../../../components';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import './task.css';
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

  const handleTaskModal = (id: string) => {
    setOpenTaskModal(true);
    navigate(`/workspace/t/${id}`);
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
    <div className="group relative bg-white mb-px bordar hover:bg-gray-100 flex items-center ml-6 pl-3 field">
      <div onClick={() => handleGetSubTask(task.id)}>
        {task.id == getSubTaskId ? (
          <span className="flex flex-col">
            <VscTriangleDown
              className="flex-shrink-0 h-3 ml-1"
              aria-hidden="true"
              color="rgba(72, 67, 67, 0.64)"
            />
          </span>
        ) : (
          <VscTriangleRight
            className="flex-shrink-0 h-3"
            aria-hidden="true"
            color="rgba(72, 67, 67, 0.64)"
          />
        )}
      </div>
      <span className="flex items-center absolute -left-32">
        <input
          type="checkbox"
          id="checked-checkbox"
          className="handlecheck opacity-0 transition duration-200 group-hover:opacity-100 cursor-pointer focus:outline-1 focus:ring-transparent rounded-full  focus:border-2 focus:opacity-100"
          onClick={() => {
            displayNav(task.id);
          }}
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
            onClick={() => handleCreateSubTask(task.id)}
          />
          <EditOutlined
            className="cursor-pointer flex-shrink-0 text-xs h-4 w-4 text-black"
            aria-hidden="true"
          />
        </div>
      </div>
      {/* icons */}

      <div className="relative ">
        <span
          className="absolute rounded-full text-end	 text-xs "
          style={{ left: '-20px' }}
        >
          {/* assignees here */}

          {task.assignees.length == 0 ? (
            <UserAddOutlined
              className="	 h-5 w-5 pr-10 text-gray-400 text-xl cursor-pointer "
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
        <span className=" border-dotted border-gray-300 pl-10 ml-5">
          <CalendarOutlined
            className=" h-5 w-7 text-gray-400"
            aria-hidden="true"
          />
        </span>
        <span className=" border-dotted border-gray-300 ml-8">
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
