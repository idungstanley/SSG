import { ReactNode, TdHTMLAttributes, useRef, useState } from 'react';
import { RxTriangleDown, RxTriangleRight } from 'react-icons/rx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { IStatus, Task } from '../../../../features/task/interface.tasks';
import { cl } from '../../../../utils';
import { ACTIVE_COL_BG, DEFAULT_COL_BG } from '../../config';
import { UseUpdateTaskService, useAddTask } from '../../../../features/task/taskService';
import StatusDropdown from '../../../status/StatusDropdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { setCurrentTaskId, setShowTaskNavigation, setTaskIdForPilot } from '../../../../features/task/taskSlice';
import { setActiveItem } from '../../../../features/workspace/workspaceSlice';
import { useSortable } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';
import { MdDragIndicator } from 'react-icons/md';
import { ITask_statuses } from '../../../../features/list/list.interfaces';
import { UseGetListDetails } from '../../../../features/list/listService';
import { ImCancelCircle } from 'react-icons/im';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  task: Task;
  children?: ReactNode;
  showSubTasks?: boolean;
  setShowSubTasks: (i: boolean) => void;
  paddingLeft?: number;
  task_status?: string;
  tags: ReactNode;
  dragElement?: ReactNode;
  parentId?: string;
  onClose?: VoidFunction;
}

export function StickyCol({
  showSubTasks,
  setShowSubTasks,
  children,
  tags,
  parentId,
  task_status,
  onClose,
  task,
  paddingLeft = 0,
  dragElement,
  ...props
}: ColProps) {
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { taskId, hubId } = useParams();
  const COL_BG = taskId === task.id ? ACTIVE_COL_BG : DEFAULT_COL_BG;

  const { mutate: onAdd } = useAddTask(parentId);
  const { currTeamMemberId, statusId } = useAppSelector((state) => state.task);
  const { showTaskNavigation } = useAppSelector((state) => state.task);
  const { data: list } = UseGetListDetails({ activeItemId: parentId, activeItemType: 'list' });

  list?.data.list.task_statuses.map((statusObj: ITask_statuses) => {
    if (statusObj?.name == task_status) {
      // console.log('task_statusId', statusObj);
    }
  });

  const onClickTask = () => {
    navigate(`/${currentWorkspaceId}/tasks/h/${hubId}/t/${task.id}`, { replace: true });
    dispatch(
      setShowPilotSideOver({
        id: task.id,
        type: 'task',
        show: true,
        title: task.name
      })
    );
    dispatch(setTaskIdForPilot(task.id));
    dispatch(
      setActiveItem({
        activeItemId: task.id,
        activeItemType: 'task',
        activeItemName: task.name
      })
    );
  };

  const onToggleDisplayingSubTasks = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowSubTasks(!showSubTasks);
  };
  const displayNav = (id: string) => {
    dispatch(setShowTaskNavigation(!showTaskNavigation));
    dispatch(setCurrentTaskId(id));
  };

  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task?.id as UniqueIdentifier
  });

  const editTaskMutation = useMutation(UseUpdateTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
    }
  });

  const handleOnSave = async (
    e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    if (id !== null) {
      handleEditTask(e as React.KeyboardEvent<HTMLDivElement>, id);
    } else {
      onClickSave();
      onClose && onClose();
    }
  };

  const onClickSave = () => {
    if (inputRef.current?.innerText) {
      const name = inputRef.current?.innerText;

      onAdd({
        name,
        isListParent: true,
        id: parentId as string,
        assignees: [currTeamMemberId] as string[],
        task_status_id: statusId as string
      });
    }
  };

  const handleEditTask = async (e: React.KeyboardEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    await editTaskMutation.mutateAsync({
      name: inputRef.current?.innerText as string,
      task_id: id
    });
  };

  return (
    <>
      {task.id !== null && (
        <td
          className="sticky left-0 flex items-start justify-start text-sm font-medium text-start text-gray-900 cursor-pointer"
          onClick={onClickTask}
          {...props}
        >
          <div className="flex items-center h-full space-x-1 bg-purple-50">
            <input
              type="checkbox"
              id="checked-checkbox"
              className="w-2 h-2 rounded-full opacity-0 cursor-pointer focus:outline-1 focus:ring-transparent group-hover:opacity-100 focus:border-2 focus:opacity-100 "
              style={{ marginLeft: '-0.5px' }}
              ref={setNodeRef}
              {...attributes}
              {...listeners}
              onClick={() => {
                displayNav(task?.id as string);
              }}
            />
            {dragElement}
          </div>

          <div style={{ paddingLeft }} className={cl(COL_BG, 'relative border-t w-full h-10 py-4 flex items-center ')}>
            <button onClick={onToggleDisplayingSubTasks} className="">
              {showSubTasks ? (
                <RxTriangleDown
                  className={`${task.has_descendants ? 'w-4 h-4 text-gray-400' : ' opacity-0 w-4 h-4 text-gray-400'}`}
                />
              ) : (
                <RxTriangleRight
                  className={`${task.has_descendants ? 'w-4 h-4 text-gray-400' : ' opacity-0 w-4 h-4 text-gray-400'}`}
                />
              )}
            </button>
            <StatusDropdown TaskCurrentStatus={task.status} />
            <div className="flex flex-col items-start justify-start space-y-1 pl-2">
              <p
                className="flex text-left"
                contentEditable={true}
                ref={inputRef}
                onKeyDown={(e) => (e.key === 'Enter' ? handleEditTask(e, task.id) : null)}
              >
                {task.name}
              </p>

              {tags}
            </div>
            {children}
          </div>
        </td>
      )}

      {task.id == null && (
        <td
          className="sticky left-0 flex items-start justify-start text-sm font-medium text-start text-gray-900 cursor-pointer"
          onClick={onClickTask}
          {...props}
        >
          <div className="flex items-center h-full space-x-1 bg-purple-50 opacity-0">
            <input
              type="checkbox"
              id="checked-checkbox"
              className="w-2 h-2 rounded-full opacity-0 cursor-pointer focus:outline-1 focus:ring-transparent group-hover:opacity-100 focus:border-2 focus:opacity-100 "
              style={{ marginLeft: '-1px' }}
              ref={setNodeRef}
              {...attributes}
              {...listeners}
              onClick={() => {
                displayNav(task?.id as string);
              }}
            />

            {dragElement}
          </div>

          <div
            style={{ paddingLeft }}
            className={cl(COL_BG, 'relative border-t w-full h-10 py-4 p-4 flex items-center ')}
          >
            <div className="flex space-x-1 pl-4 pr-2 ">
              <button
                onClick={(e) => handleOnSave(e as React.MouseEvent<HTMLButtonElement, MouseEvent>, task.id)}
                className="p-0.5 text-white rounded-sm bg-lime-600"
              >
                Save
              </button>
              <ImCancelCircle onClick={onClose} className="h-8 w-8" />
              {/* <button onClick={onClose} className="p-0.5 text-white rounded-sm bg-red-600">
                Cancel
              </button> */}
            </div>

            <StatusDropdown TaskCurrentStatus={task.status} />
            <div className="flex flex-col items-start justify-start space-y-1 pl-2">
              <p
                className="flex text-left"
                contentEditable={true}
                ref={inputRef}
                onKeyDown={(e) => (e.key === 'Enter' ? handleEditTask(e, task.id) : null)}
              >
                {task.name}
              </p>
            </div>
          </div>
        </td>
      )}
    </>
  );
}
