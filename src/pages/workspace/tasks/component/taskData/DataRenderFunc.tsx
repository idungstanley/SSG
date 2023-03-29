import moment, { MomentInput } from 'moment';
import React, { ReactNode, useState, useRef } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { MdDragIndicator } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import ColorsModal from '../../../../../components/tags/ColorsModal';
import EditTagModal from '../../../../../components/tags/EditTagModal';
import ToolTip from '../../../../../components/Tooltip';
import {
  ImyTaskData,
  setCurrentParentTaskId,
  setCurrentTaskId,
  setCurrentTaskPriorityId,
  setCurrentTaskStatusId,
  setShowTaskNavigation,
  setTaskIdForPilot
} from '../../../../../features/task/taskSlice';
import ArrowRigt from '../../../../../../src/assets/branding/ArrowRigt.svg';
import ArrowDown from '../../../../../../src/assets/branding/ArrowDown.svg';
import StatusDropdown from '../../../../../components/status/StatusDropdown';
import TagModal from '../../../../../components/tags/TagModal';
import PriorityDropdown from '../../../../../components/priority/PriorityDropdown';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setCurrentTaskIdForTag } from '../../../../../features/workspace/tags/tagSlice';
import { UseUnAssignTagService, UseUpdateTagService } from '../../../../../features/workspace/tags/tagService';
import { UseUpdateTaskService } from '../../../../../features/task/taskService';
import StatusNameDropdown from '../../../../../components/status/StatusNameDropdown';
// import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import Assignee from '../../assignTask/Assignee';
import { setShowPilotSideOver } from '../../../../../features/general/slideOver/slideOverSlice';

export interface tagItem {
  id: string;
  name: string;
  color: string;
}

interface renderDataProps {
  taskColField:
    | string
    | number
    | undefined
    | tagItem[]
    | null
    | Array<{ id: string; initials: string; colour: string }>;
  colfield: string;
  task: ImyTaskData | undefined;
  getSubTaskId: string | null | undefined;
  handleGetSubTask?: (id: string | undefined) => void;
  ShowPlusIcon?: null | boolean;
}

export default function DataRenderFunc({
  taskColField,
  colfield,
  task,
  getSubTaskId,
  handleGetSubTask,
  ShowPlusIcon
}: renderDataProps) {
  const {
    showTaskNavigation,
    // toggleAssignCurrentTaskId,
    currentParentTaskId,
    comfortableView,
    comfortableViewWrap,
    CompactView,
    CompactViewWrap
  } = useAppSelector((state) => state.task);
  const [tagState, setTagState] = useState<string>('');
  const { showTagColorDialogueBox, renameTagId, currentTaskIdForTag } = useAppSelector((state) => state.tag);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [updateTask, setUpdateTask] = useState<string | undefined>('');

  const unAssignTagMutation = useMutation(UseUnAssignTagService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  const editTagNameMutation = useMutation(UseUpdateTagService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
  const editTaskMutation = useMutation(UseUpdateTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });

  const handleEditTask = async (id: string | undefined) => {
    await editTaskMutation.mutateAsync({
      name: inputRef.current?.innerText as string,
      task_id: id
    });
  };

  const handleEditTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagState(e.target.value);
  };

  const handleEditTagSubmit = async (e: React.FormEvent<HTMLFormElement>, currentTagId: string) => {
    e.preventDefault();
    await editTagNameMutation.mutateAsync({
      name: tagState,
      tag_id: currentTagId
    });
  };

  const groupTags = (arr: tagItem[]) => {
    return (
      <div key={arr.length} className="flex items-center -mr-5 drop-shadow-xl">
        {arr.map((item: tagItem) => {
          return (
            <div key={item.id} className="">
              {Array.isArray(item) ? (
                <div className="">{groupTags(item)}</div>
              ) : (
                <>
                  {renameTagId == item.id && currentTaskIdForTag == task?.id ? (
                    <form onSubmit={(e) => handleEditTagSubmit(e, item.id)}>
                      <input
                        type="text"
                        value={tagState}
                        onChange={(e) => handleEditTagChange(e)}
                        name="tag"
                        className="w-full h-10 text-gray-400"
                      />
                    </form>
                  ) : (
                    <div
                      className="flex items-center text-white p-0.5 h-4 text-center space-x-1 mr-1.5"
                      style={{
                        backgroundColor: `${item.color}`,
                        clipPath: 'polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 15% 50%, 0% 0%)'
                      }}
                    >
                      <div className="flex items-center font-bold truncate">
                        <p className="pl-4" style={{ fontSize: '7px' }}>
                          {item.name.length > 10 ? item.name.slice(0, 5) : item.name}
                        </p>
                      </div>
                      <ToolTip tooltip="edit tag">
                        <button className="mt-1">
                          <EditTagModal taskId={task?.id} tagId={item?.id} />
                        </button>
                      </ToolTip>

                      <ToolTip tooltip="unassign tag">
                        <button
                          className="pr-2 font-bold text-gray-300"
                          style={{ fontSize: '9px' }}
                          onClick={() =>
                            unAssignTagMutation.mutateAsync({
                              tagId: item.id,
                              currentTaskIdForTag: task?.id
                            })
                          }
                        >
                          <IoCloseSharp />
                        </button>
                      </ToolTip>
                      {showTagColorDialogueBox && <ColorsModal />}
                    </div>
                  )}

                  {/* <span>{arr.length}</span> */}
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const displayNav = (id: string) => {
    dispatch(setShowTaskNavigation(!showTaskNavigation));
    dispatch(setCurrentTaskId(id));
  };

  const handleTaskStatus = (id: string) => {
    dispatch(setCurrentTaskStatusId(id));
  };

  const handleTaskPilot = (id: string, name: string) => {
    dispatch(
      setShowPilotSideOver({
        id: id,
        type: 'task',
        show: true,
        title: name
      })
    );
    dispatch(setTaskIdForPilot(id));

    dispatch(
      setShowPilotSideOver({
        id: id,
        type: 'task',
        show: true,
        title: name
      })
    );
    dispatch(setTaskIdForPilot(id));
  };

  const handleCreateSubTask = (id: string) => {
    if (id == currentParentTaskId) {
      dispatch(setCurrentParentTaskId(null));
    } else {
      dispatch(setCurrentParentTaskId(id));
    }
  };

  const handleTaskPriority = (id: string | undefined) => {
    dispatch(setCurrentTaskPriorityId(id));
  };

  if (colfield === 'assignees') {
    return (
      <>
        <div>
          <Assignee task={task} itemId={task?.id} option="task" />
        </div>
      </>
    );
  } else if (colfield === 'tags') {
    return (
      <>
        <div> {groupTags(taskColField as tagItem[])}</div>
      </>
    );
  } else if (colfield == 'created_at' || colfield == 'updated_at') {
    return (
      <>
        <span className="text-sm font-medium text-gray-400">{moment(taskColField as MomentInput).format('MM/DD')}</span>
      </>
    );
  } else if (colfield == 'status') {
    if (taskColField == 'completed') {
      return (
        <>
          <div
            className="capitalize text-xs font-medium bg-green-500 text-white py-2.5 px-1 w-20 absolute text-center h-full top-0 flex flex-col justify-center"
            style={{ marginLeft: '-30px' }}
            onClick={() => handleTaskStatus(task?.id as string)}
          >
            <StatusNameDropdown TaskCurrentStatus={task?.status} statusName={taskColField} />
          </div>
        </>
      );
    } else if (taskColField == 'in progress') {
      return (
        <>
          <div
            className="absolute top-0 flex flex-col justify-center w-20 h-full px-1 text-xs font-medium text-center text-white capitalize bg-purple-500"
            style={{ marginLeft: '-30px' }}
            onClick={() => handleTaskStatus(task?.id as string)}
          >
            <StatusNameDropdown TaskCurrentStatus={task?.status} statusName={taskColField} />
          </div>
        </>
      );
    } else if (taskColField == 'archived') {
      return (
        <>
          <div
            className="absolute top-0 flex flex-col justify-center w-20 h-full px-1 text-xs font-medium text-center text-white capitalize bg-yellow-500"
            style={{ marginLeft: '-30px' }}
            onClick={() => handleTaskStatus(task?.id as string)}
          >
            <StatusNameDropdown TaskCurrentStatus={task?.status} statusName={taskColField} />
          </div>
        </>
      );
    } else if (taskColField == 'todo') {
      return (
        <>
          <div
            className="absolute top-0 flex flex-col justify-center w-20 h-full px-1 text-xs font-medium text-center text-white capitalize bg-gray-400"
            style={{ marginLeft: '-30px' }}
            onClick={() => handleTaskStatus(task?.id as string)}
          >
            <StatusNameDropdown TaskCurrentStatus={task?.status} statusName={taskColField} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className="capitalize text-center text-xs font-medium bg-gray-400 w-20 text-white py-2.5 px-1 absolute h-full top-0 flex flex-col justify-center"
            style={{ marginLeft: '-30px' }}
            onClick={() => handleTaskStatus(task?.id as string)}
          >
            <StatusNameDropdown TaskCurrentStatus={task?.status} statusName="Todo" />
          </div>
        </>
      );
    }
  } else if (colfield === 'name') {
    return (
      <>
        <div className="relative flex items-center ">
          <div className="flex items-center ">
            <input
              type="checkbox"
              id="checked-checkbox"
              className="absolute w-3 h-3 rounded-full opacity-0 cursor-pointer focus:outline-1 focus:ring-transparent group-hover:opacity-100 focus:border-2 focus:opacity-100 -left-8"
              onClick={() => {
                displayNav(task?.id as string);
              }}
            />
            <MdDragIndicator className="absolute text-sm text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100 -left-5 " />
          </div>
          <div onClick={() => (handleGetSubTask ? handleGetSubTask(task?.id) : null)} className="items-center">
            {task?.id == getSubTaskId ? (
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
          <div className="flex group items-center">
            <p onClick={() => handleTaskStatus(task?.id as string)} className="relative pt-1 pr-1">
              <StatusDropdown TaskCurrentStatus={task?.status} />
            </p>
            <div
              contentEditable="true"
              ref={inputRef}
              onKeyDown={(e) => (e.key === 'Enter' ? handleEditTask(task?.id) : null)}
              className={`${
                comfortableView
                  ? 'text-sm whitespace-nowrap s'
                  : comfortableViewWrap
                  ? 'text-sm'
                  : CompactView
                  ? 'text-xs whitespace-nowrap'
                  : CompactViewWrap
                  ? 'text-xs text-justify'
                  : null
              }`}
            >
              <p onClick={() => handleTaskPilot(task?.id as string, task?.name as string)}>
                {(taskColField as string)?.length > 50 && comfortableView ? (
                  <span>{(taskColField as string)?.substring(0, 40)}...</span>
                ) : (taskColField as string)?.length > 61 && CompactView ? (
                  <span>{(taskColField as string)?.substring(0, 60)}...</span>
                ) : (
                  (taskColField as ReactNode)
                )}
              </p>
            </div>
            <p id="iconWrapper" className="flex items-center ml-1 space-x-1 opacity-0 group-hover:opacity-100 ">
              {!ShowPlusIcon && (
                <span className="cursor-pointer bg-white  border rounded flex justify-center align-center p-0.5">
                  <PlusIcon
                    className="w-3 text-gray-500 "
                    aria-hidden="true"
                    onClick={() => handleCreateSubTask(task?.id as string)}
                  />
                </span>
              )}
              {/* tag here */}
              <button onClick={() => dispatch(setCurrentTaskIdForTag(task?.id))}>
                <TagModal />
              </button>
            </p>
            {/* tags goes here */}
            {/* <div> {groupTags(task.tags)}</div>; */}
          </div>
        </div>
      </>
    );
  } else if (colfield === 'priority') {
    return (
      <>
        <span
          className="relative border-gray-300 border-dotted "
          onClick={() => handleTaskPriority(task?.id as string)}
        >
          <PriorityDropdown TaskCurrentPriority={task?.priority} />
        </span>
      </>
    );
  } else return <>{taskColField}</>;
}
