import React, { useRef, ReactNode } from 'react';
import { MdDragIndicator } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import {
  setCurrentParentTaskId,
  setCurrentTaskId,
  setCurrentTaskStatusId,
  setShowTaskNavigation,
  setTaskIdForPilot
} from '../../../../../../features/task/taskSlice';
import { renderDataProps } from '../DataRenderFunc';
import StatusDropdown from '../../../../../../components/status/StatusDropdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseUpdateTaskService } from '../../../../../../features/task/taskService';
import { setShowPilotSideOver } from '../../../../../../features/general/slideOver/slideOverSlice';
import { setActiveItem } from '../../../../../../features/workspace/workspaceSlice';
import { PlusIcon } from '@heroicons/react/24/solid';
import TagModal from '../../../../../../components/tags/TagModal';
import { setCurrentTaskIdForTag } from '../../../../../../features/workspace/tags/tagSlice';
import ArrowRigt from '../../../../../../assets/branding/ArrowRigt.svg';
import ArrowDown from '../../../../../../assets/branding/ArrowRigt.svg';

export default function TaskName({
  taskColField,
  task,
  handleGetSubTask,
  getSubTaskId,
  ShowPlusIcon
}: renderDataProps) {
  const {
    showTaskNavigation,
    comfortableView,
    comfortableViewWrap,
    CompactView,
    CompactViewWrap,
    currentParentTaskId
  } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();
  const handleTaskStatus = (id: string) => {
    dispatch(setCurrentTaskStatusId(id));
  };
  const displayNav = (id: string) => {
    dispatch(setShowTaskNavigation(!showTaskNavigation));
    dispatch(setCurrentTaskId(id));
  };
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const editTaskMutation = useMutation(UseUpdateTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
    }
  });
  const handleEditTask = async (id: string | undefined) => {
    await editTaskMutation.mutateAsync({
      name: inputRef.current?.innerText as string,
      task_id: id
    });
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
      setActiveItem({
        activeItemId: id,
        activeItemType: 'task',
        activeItemName: name
      })
    );
  };

  const handleCreateSubTask = (id: string) => {
    if (id == currentParentTaskId) {
      dispatch(setCurrentParentTaskId(null));
    } else {
      dispatch(setCurrentParentTaskId(id));
    }
  };

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
}