import React, { useRef, ReactNode, useState } from 'react';
import { MdDragIndicator } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import {
  getComfortableView,
  getComfortableViewWrap,
  getCompactView,
  getCompactViewWrap,
  setCurrentParentTaskId,
  setCurrentTaskId,
  setCurrentTaskStatusId,
  setShowTaskNavigation
} from '../../../../../../features/task/taskSlice';
import { renderDataProps } from '../DataRenderFunc';
import StatusDropdown from '../../../../../../components/status/StatusDropdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseUpdateTaskService } from '../../../../../../features/task/taskService';
import { PlusIcon } from '@heroicons/react/24/solid';
import TagModal from '../../../../../../components/tags/TagModal';
import { setCurrentTaskIdForTag } from '../../../../../../features/workspace/tags/tagSlice';
import ArrowRigt from '../../../../../../assets/branding/ArrowRigt.svg';
import ArrowDown from '../../../../../../assets/branding/ArrowRigt.svg';
import { useSortable } from '@dnd-kit/sortable';
import ToolTip from '../../../../../../components/Tooltip/Tooltip';
import { useParams } from 'react-router-dom';
import { cl } from '../../../../../../utils';

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
  const [contentEditable, setContentEditable] = useState(false);

  const handleTaskNameClick = () => {
    setContentEditable(true);
    dispatch(getComfortableView(false));
    dispatch(getCompactView(false));
    dispatch(getCompactViewWrap(false));
    dispatch(getComfortableViewWrap(true));
  };

  const handleEditTask = async (e: React.KeyboardEvent<HTMLDivElement>, id: string | undefined) => {
    e.preventDefault();
    await editTaskMutation.mutateAsync({
      name: inputRef.current?.innerText as string,
      task_id: id
    });
  };

  const handleCreateSubTask = (id: string) => {
    if (id === currentParentTaskId) {
      dispatch(setCurrentParentTaskId(null));
    } else {
      dispatch(setCurrentParentTaskId(id));
    }
  };

  type UniqueIdentifier = string | number;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task?.id as UniqueIdentifier
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    backgroundColor: isDragging ? '#f3f4f6' : undefined,
    zIndex: isDragging ? 1 : undefined
  };

  const { taskId } = useParams();

  const isActive = taskId === task?.id;
  const taskBg = isActive ? 'bg-primary-200' : 'bg-white';

  return (
    <div
      className={cl('sticky w-72 mr-4 pl-1 text-gray-900 opacity-95 left-0 flex items-center', taskBg)}
      style={style}
    >
      <div className="absolute flex items-center -left-6">
        <input
          type="checkbox"
          id="checked-checkbox"
          className="z-50 w-3 h-3 rounded-full opacity-0 cursor-pointer focus:outline-1 focus:ring-transparent group-hover:opacity-100 focus:border-2 focus:opacity-100"
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          onClick={() => {
            displayNav(task?.id as string);
          }}
        />

        {/* <MdDragIndicator className="left-0 text-lg text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100" /> */}
      </div>
      <div onClick={() => (handleGetSubTask ? handleGetSubTask(task?.id) : null)} className="items-center">
        {task?.id === getSubTaskId ? (
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
      <div className="flex items-center group">
        <p onClick={() => handleTaskStatus(task?.id as string)} className="relative pt-1 pr-1">
          {task ? <StatusDropdown TaskCurrentStatus={task.status} /> : null}
        </p>
        <div
          contentEditable={true}
          onClick={handleTaskNameClick}
          ref={inputRef}
          onKeyDown={(e) => (e.key === 'Enter' ? handleEditTask(e, task?.id) : null)}
          className={`${
            comfortableView && contentEditable
              ? 'text-sm cursor-text w-64 whitespace-nowrap truncate border-2 border-white border-opacity-0 hover:text-primary-600 p-2 '
              : comfortableView
              ? 'text-sm cursor-text w-64 whitespace-nowrap truncate border-2 border-gray-400 border-opacity-0 hover:text-primary-600 p-2'
              : comfortableViewWrap && contentEditable
              ? 'text-sm cursor-text break-all border-2 border-white border-opacity-0 hover:text-primary-600 p-2'
              : comfortableViewWrap
              ? 'text-sm cursor-text break-all border-2 border-white border-opacity-0 hover:text-primary-600 p-2'
              : CompactView && contentEditable
              ? 'text-xs cursor-text border-2 border-white border-opacity-0 hover:text-primary-600 p-2'
              : CompactView
              ? 'text-xs w-64 truncate cursor-text border-2 border-white border-opacity-0 hover:text-primary-600 p-2'
              : CompactViewWrap && contentEditable
              ? 'text-xs w-64 truncate text-justify break-all cursor-text border-2 border-white border-opacity-0 hover:border-gray-400 p-2'
              : CompactViewWrap
              ? 'text-xs text-justify break-all cursor-text border-2 border-white border-opacity-0 hover:text-primary-600 p-2'
              : null
          }`}
        >
          {/* <p>
            {(taskColField as string)?.length > 50 && comfortableView ? (
              <span>{(taskColField as string)?.substring(0, 40)}...</span>
            ) : (taskColField as string)?.length > 61 && CompactView ? (
              <span>{(taskColField as string)?.substring(0, 60)}...</span>
            ) : (
              (taskColField as ReactNode)
            )}
          </p> */}
          <p>{taskColField as ReactNode}</p>
        </div>
        <p id="iconWrapper" className="flex items-center ml-1 space-x-1 opacity-0 group-hover:opacity-100 ">
          {!ShowPlusIcon && (
            <ToolTip title="Add subtask">
              <span className="cursor-pointer bg-white  border rounded flex justify-center align-center p-0.5">
                <PlusIcon
                  className="w-3 text-gray-500 "
                  aria-hidden="true"
                  onClick={() => handleCreateSubTask(task?.id as string)}
                />
              </span>
            </ToolTip>
          )}
          {/* tag here */}
          <ToolTip title="Add Tag">
            <button onClick={() => dispatch(setCurrentTaskIdForTag(task?.id))}>
              <TagModal entity_type="task" />
            </button>
          </ToolTip>
        </p>
        {/* tags goes here */}
        {/* <div> {groupTags(task.tags)}</div>; */}
      </div>
    </div>
  );
}
