import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import {
  setCurrentParentTaskId,
  setCurrentTaskId,
  setGetSubTaskId,
  setShowTaskNavigation,
  setTaskIdForPilot,
  setToggleAssignCurrentTaskId,
  setUpdateStatusModalId,
} from '../../../../../features/task/taskSlice';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import { MdDragIndicator } from 'react-icons/md';

import {
  EditOutlined,
  FlagOutlined,
  PlusOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '../../../../../app/hooks';
// import { useNavigate } from 'react-router-dom';
import AssignTask from '../../assignTask/AssignTask';
import { AvatarWithInitials } from '../../../../../components';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import './task.css';
interface TaskDataProps {
  task: any;
}
import { columnsHead } from '../views/ListColumns';
import moment from 'moment';
import StatusDropdown from '../../../../../components/status/component/StatusDropdown';

export default function TaskData({ task }: TaskDataProps) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const {
    showTaskNavigation,
    toggleAssignCurrentTaskId,
    currentParentTaskId,
    getSubTaskId,
    updateStatusModalId,
  } = useAppSelector((state) => state.task);
  // const [openTaskModal, setOpenTaskModal] = useState(false);

  const displayNav: any = (id: string) => {
    dispatch(setShowTaskNavigation(!showTaskNavigation));
    dispatch(setCurrentTaskId(id));
  };

  const handleTaskPilot = (id: string, name: string) => {
    dispatch(setTaskIdForPilot(id));
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: 'task',
        activeItemName: name,
      })
    );
    // dispatch(ilotTrigger)
  };
  const handleStatusUpdate = (id: string, name: string) => {
    dispatch(setTaskIdForPilot(id));
    dispatch(setUpdateStatusModalId(id));

    if (updateStatusModalId == id) {
      dispatch(setUpdateStatusModalId(null));
    }
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: 'task',
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

  const setStatusColor = (status: string) => {
    if (status == 'new' || status == 'todo') {
      return (
        <RiCheckboxBlankFill
          className="pl-px text-gray-400 text-xs"
          aria-hidden="true"
        />
      );
    } else if (status == 'in progress') {
      return (
        <RiCheckboxBlankFill
          className="pl-px text-purple-400 text-xs"
          aria-hidden="true"
        />
      );
    } else if (status == 'completed') {
      return (
        <RiCheckboxBlankFill
          className="pl-px text-green-400 text-xs"
          aria-hidden="true"
        />
      );
    } else if (status == 'archived') {
      return (
        <RiCheckboxBlankFill
          className="pl-px text-yellow-400 text-xs"
          aria-hidden="true"
        />
      );
    }
  };

  const renderData = (taskColField, colfield) => {
    if (colfield === 'assignees' && taskColField.length !== 0) {
      return (
        <div className="relative">
          <div
            onClick={() => handleAssigneeModal(task.id)}
            className="cursor-pointer flex ml-2"
          >
            {groupAssignee(task.assignees)}
          </div>
        </div>
      );
    } else if (colfield === 'assignees' && taskColField.length === 0) {
      return (
        <UserAddOutlined
          className=" ml-2  text-gray-400 text-xl cursor-pointer "
          aria-hidden="true"
          onClick={() => handleAssigneeModal(task.id)}
        />
      );
    } else if (colfield == 'created_at') {
      return (
        <span className="text-gray-400 pl-12 text-sm font-medium">
          {moment(taskColField).format('MM/DD')}
        </span>
      );
    } else if (colfield === 'name') {
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
          <p
            onClick={() => handleStatusUpdate(task.id, task.name)}
            className="relative"
          >
            {/* {setStatusColor(task?.status)} */}
            <StatusDropdown />
          </p>
          <p
            onClick={() => handleTaskPilot(task.id, task.name)}
            className="cursor-pointer"
          >
            {taskColField}
          </p>
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
    } else if (colfield === 'priority') {
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
      <div className="flex group bg-white ml-4 mb-px w-full">
        <div className="  w-5/12 flex items-center justify-between ">
          {columnsHead.map(
            (col) =>
              col.value == 'Task' && (
                <div
                  key={col.field}
                  className="flex bg-white items-center capitalize ml-2 text-xs py-px font-medium  group"
                >
                  {renderData(task[col.field], col.field)}
                </div>
              )
          )}
        </div>
        <div className="flex pl-20 ">
          {columnsHead.map(
            (col) =>
              col.value !== 'Task' && (
                <div
                  key={col.field}
                  className="flex items-center uppercase bg-white   text-gray-400 py-px  font-medium  group"
                >
                  {renderData(task[col.field], col.field)}
                </div>
              )
          )}
        </div>

        {toggleAssignCurrentTaskId == task.id ? <AssignTask /> : null}
        {/* {updateStatusModalId == task.id ? <StatusDropdown /> : null} */}
      </div>
    </>
  );
}
