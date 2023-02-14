import React, { ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import moment, { MomentInput } from "moment";
import {
  ImyTaskData,
  setCurrentParentSubTaskId2,
  setCurrentParentTaskId,
  setCurrentTaskId,
  setCurrentTaskPriorityId,
  setCurrentTaskStatusId,
  setShowTaskNavigation,
  setToggleAssignCurrentTaskId,
} from '../../../../../features/task/taskSlice';
import { useAppSelector } from '../../../../../app/hooks';
import { MdDragIndicator } from 'react-icons/md';
import ArrowRigt from '../../../../../../src/assets/branding/ArrowRigt.svg';
import ArrowDown from '../../../../../../src/assets/branding/ArrowDown.svg';
import { FiEdit2 } from 'react-icons/fi';
import { AvatarWithInitials } from '../../../../../components';
import StatusDropdown from '../../../../../components/status/StatusDropdown';
import PriorityDropdown from '../../../../../components/priority/PriorityDropdown';
import { PlusIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { tagItem } from "../../../pilot/components/details/properties/subDetailsIndex/PropertyDetails";

interface TemplateProps {
  task: ImyTaskData;
}
export default function Template2({ task }: TemplateProps) {
  const dispatch = useDispatch();

  const [showSubTask, setShowSubTask] = useState<string | null>(null);

  const {
    showTaskNavigation,
    toggleAssignCurrentTaskId,
    currentParentTaskId,
    taskColumns,
    hideTask,
  } = useAppSelector((state) => state.task);

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

  const groupAssignee = (
    data: [{ id: string; initials: string; colour: string }] | undefined
  ) => {
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
      dispatch(setCurrentParentSubTaskId2(null));
    } else {
      setShowSubTask(id);
      dispatch(setCurrentParentSubTaskId2(id));
    }
  };

  const handleTaskPriority = (id: string) => {
    dispatch(setCurrentTaskPriorityId(id));
  };

  const handleTaskStatus = (id: string) => {
    dispatch(setCurrentTaskStatusId(id));
  };

  const groupTags = (arr: tagItem[] | [tagItem[]]) => {
    return arr.map((item) => {
      return Array.isArray(item) ? (
        <div>{groupTags(item)}</div>
      ) : (
        <div>{item.name}</div>
      );
    });
  };

  const renderData = (taskColField: [] | string, colfield: string) => {
    if (colfield === 'assignees' && taskColField.length !== 0) {
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
        <UserPlusIcon
          className=" pl-3  text-gray-400 text-xl cursor-pointer "
          aria-hidden="true"
          onClick={() => handleAssigneeModal(task.id)}
        />
      );
    } else if (colfield === 'tags') {
      return <div> {groupTags(taskColField)}</div>;
    } else if (colfield == 'created_at' || colfield == 'updated_at') {
      return (
        <span className="text-gray-400 text-sm font-medium">
          {moment(taskColField as MomentInput).format("MM/DD")}
        </span>
      );
    } else if (colfield == 'status') {
      if (taskColField == 'completed') {
        return (
          <div
            className="capitalize text-xs font-medium bg-green-500 text-white py-2.5 px-1 w-20 absolute text-center"
            style={{ marginTop: '-4px', marginLeft: '-30px' }}
          >
            {taskColField}
          </div>
        );
      } else if (taskColField == 'in progress') {
        return (
          <div
            className="capitalize text-xs font-medium bg-purple-500 text-white py-2.5 mb-5 px-1 w-20 absolute text-center"
            style={{ marginTop: '-4px', marginLeft: '-30px' }}
          >
            {taskColField}
          </div>
        );
      } else if (taskColField == 'archived') {
        return (
          <div
            className="capitalize text-center text-xs font-medium bg-yellow-500 text-white py-2.5 px-1  w-20 absolute"
            style={{ marginTop: '-4px', marginLeft: '-30px' }}
          >
            {taskColField}
          </div>
        );
      } else if (taskColField == 'todo') {
        return (
          <div
            className="capitalize text-center text-xs font-medium bg-gray-400 w-20 text-white py-2.5 px-1 absolute "
            style={{ marginTop: '-4px', marginLeft: '-30px' }}
          >
            {taskColField}
          </div>
        );
      } else {
        return (
          <div
            className="capitalize text-center text-xs font-medium bg-gray-400 w-20 text-white py-2.5 px-1 absolute "
            style={{ marginTop: '-4px', marginLeft: '-30px' }}
          >
            TODO
          </div>
        );
      }
    } else if (colfield === 'name') {
      return (
        <div className="flex items-center relative">
          <div className=" flex items center">
            <input
              type="checkbox"
              id="checked-checkbox"
              className="cursor-pointer absolute rounded-full focus:outline-1 focus:ring-transparent group-hover:opacity-100 opacity-0 focus:border-2 focus:opacity-100 -left-8 h-3 w-3"
              onClick={() => {
                displayNav(task.id);
              }}
            />
            <MdDragIndicator className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-400 cursor-move -mt-1 text-sm	 absolute -left-5 " />
          </div>
          <div className="ml-10" onClick={() => handleShowSubTask(task.id)}>
            {task.id == showSubTask ? (
              <span>
                <img
                  src={ArrowDown}
                  style={{ width: '6px', marginRight: '2px' }}
                  className="flex-shrink-0 h-2"
                  aria-hidden="true"
                  color="rgba(72, 67, 67, 0.64)"
                />
              </span>
            ) : (
              <span>
                <img
                  src={ArrowRigt}
                  style={{ width: '5px', marginRight: '2px' }}
                  className="flex-shrink-0 h-2"
                  color="rgba(72, 67, 67, 0.64)"
                />
              </span>
            )}
          </div>
          <p
            onClick={() => handleTaskStatus(task.id)}
            className="relative pt-1 pr-1"
          >
            <StatusDropdown TaskCurrentStatus={task?.status} />
          </p>
          <p>{taskColField as ReactNode}</p>
          <div
            id="iconWrapper"
            className="flex items-center space-x-1 ml-1 opacity-0  group-hover:opacity-100"
          >
            <FiEdit2
              className="cursor-pointer  text-xs h-6 w-6 text-black bg-white p-1 border-2 rounded-sm"
              aria-hidden="true"
            />
            <PlusIcon
              className="cursor-pointer text-xs h-4 w-6 pb-5  text-black bg-white p-1  border-2 rounded-sm"
              aria-hidden="true"
              onClick={() => handleCreateSubTask(task.id)}
            />
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

  return (
    <div className="relative ">
      <div className="flex justify-between group bg-white ml-4 mb-px hover:bg-gray-100 w-12/12 items-center py-1 relative">
        <div className=" flex w-6/12  items-center ">
          {hideTask.length
            ? hideTask.map(
                (col) =>
                  col.value == 'Task' &&
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
                  col.value == 'Task' &&
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
                  col.value !== 'Task' &&
                  !col.hidden && (
                    <div
                      key={col.field}
                      className=" items-center uppercase    text-gray-400 py-px   font-medium  group"
                      style={{ width: '50px' }}
                    >
                      {renderData(task[col.field], col.field)}
                    </div>
                  )
              )
            : taskColumns.map(
                (col) =>
                  col.value !== 'Task' &&
                  !col.hidden && (
                    <div
                      key={col.field}
                      className=" items-center uppercase    text-gray-400 py-px   font-medium  group"
                      style={{ width: '50px' }}
                    >
                      {renderData(task[col.field], col.field)}
                    </div>
                  )
              )}
        </div>
      </div>
    </div>
  );
}
