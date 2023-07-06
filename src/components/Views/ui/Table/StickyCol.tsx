import { ReactNode, TdHTMLAttributes, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Task } from '../../../../features/task/interface.tasks';
import { cl } from '../../../../utils';
import { ACTIVE_COL_BG, DEFAULT_COL_BG } from '../../config';
import { UseUpdateTaskService, useAddTask } from '../../../../features/task/taskService';
import StatusDropdown from '../../../status/StatusDropdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import {
  setCurrentTaskId,
  setCurrentTaskStatusId,
  setShowTaskNavigation,
  setTaskIdForPilot
} from '../../../../features/task/taskSlice';
import { setActiveItem } from '../../../../features/workspace/workspaceSlice';
import { useSortable } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';
import { ImCancelCircle } from 'react-icons/im';
import CloseSubtask from '../../../../assets/icons/CloseSubtask';
import OpenSubtask from '../../../../assets/icons/OpenSubtask';
import { Capitalize } from '../../../../utils/NoCapWords/Capitalize';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  task: Task;
  children?: ReactNode;
  showSubTasks?: boolean;
  setShowSubTasks: (i: boolean) => void;
  paddingLeft?: number;
  task_status?: string;
  isListParent: boolean;
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
  isListParent,
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
  const { taskId, hubId, walletId, listId } = useParams();
  const COL_BG = taskId === task.id ? ACTIVE_COL_BG : DEFAULT_COL_BG;
  const [isChecked, setIsChecked] = useState(false);

  const { mutate: onAdd } = useAddTask(parentId);
  const {
    currTeamMemberId,
    showTaskNavigation,
    singleLineView,
    verticalGrid,
    taskUpperCase,
    verticalGridlinesTask,
    currentTaskId
  } = useAppSelector((state) => state.task);

  const onClickTask = () => {
    if (task.id !== '0') {
      hubId
        ? navigate(`/${currentWorkspaceId}/tasks/h/${hubId}/t/${task.id}`, { replace: true })
        : walletId
        ? navigate(`/${currentWorkspaceId}/tasks/w/${walletId}/t/${task.id}`, { replace: true })
        : navigate(`/${currentWorkspaceId}/tasks/l/${listId}/t/${task.id}`, { replace: true });
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
    }
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

  const { attributes, listeners, setNodeRef } = useSortable({
    id: task?.id as UniqueIdentifier
  });

  const [eitableContent, setEitableContent] = useState(false);
  const editTaskMutation = useMutation(UseUpdateTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
    }
  });

  const handleOnSave = async (
    e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    if (id !== '0') {
      handleEditTask(e as React.KeyboardEvent<HTMLDivElement>, id);
    } else {
      onClickSave();
    }
  };

  const onClickSave = () => {
    if (inputRef.current?.innerText) {
      const name = inputRef.current?.innerText;

      onAdd({
        name,
        isListParent: isListParent,
        id: parentId as string,
        assignees: [currTeamMemberId] as string[],
        task_status_id: task_status as string
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

  console.log('isChecked', isChecked);

  return (
    <>
      {task.id !== '0' && (
        <td
          className="sticky left-0 flex items-start justify-start text-sm font-medium text-start text-gray-900 cursor-pointer"
          {...props}
        >
          <div className="flex items-center h-full space-x-1 bg-purple-50">
            <input
              type="checkbox"
              checked={isChecked}
              id="checked-checkbox"
              className="w-2 h-2 rounded-full opacity-0 cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100"
              style={{ marginLeft: '-0.3px' }}
              onChange={(e) => {
                dispatch(setShowTaskNavigation(e.target.checked));
                setIsChecked(e.target.checked);
              }}
              onClick={() => {
                displayNav(task?.id as string);
              }}
            />
            <div ref={setNodeRef} {...attributes} {...listeners}>
              {dragElement}
            </div>
          </div>
          <div
            style={{ paddingLeft, minHeight: '42px', height: singleLineView ? '42px' : '' }}
            onClick={onClickTask}
            className={cl(
              COL_BG,
              `relative border-t ${currentTaskId == task.id && 'tdListV'} ${verticalGrid && 'border-r'} ${
                verticalGridlinesTask && 'border-r'
              } w-full py-4 flex items-center `
            )}
          >
            <button onClick={onToggleDisplayingSubTasks} className="pl-1">
              {showSubTasks ? (
                <div className={`${task.has_descendants ? 'w-3 h-3' : ' opacity-0 w-3 h-3 '}`}>
                  <CloseSubtask />
                </div>
              ) : (
                <div className={`${task.has_descendants ? 'w-3 h-3' : ' opacity-0 w-3 h-3 '}`}>
                  <OpenSubtask />
                </div>
              )}
            </button>
            <div onClick={() => dispatch(setCurrentTaskStatusId(task.id as string))}>
              <StatusDropdown TaskCurrentStatus={task.status} />
            </div>
            <div className="flex flex-col items-start justify-start space-y-1 pl-2">
              <p
                className="flex text-left"
                contentEditable={eitableContent && !singleLineView}
                onClick={() => setEitableContent(true)}
                ref={inputRef}
                onKeyDown={(e) => (e.key === 'Enter' ? handleEditTask(e, task.id) : null)}
              >
                {task.name.length > 50 && singleLineView ? (
                  <span className="whitespace-nowrap">
                    {taskUpperCase ? task.name.substring(0, 40).toUpperCase() : Capitalize(task.name).substring(0, 40)}
                    ...
                  </span>
                ) : (
                  <span>{taskUpperCase ? task.name.toUpperCase() : Capitalize(task.name)}</span>
                )}
              </p>

              {tags}
            </div>
            {children}
          </div>
        </td>
      )}

      {task.id === '0' && (
        <td
          className="sticky left-0 flex items-start justify-start text-sm font-medium text-start text-gray-900 cursor-pointer"
          {...props}
        >
          <div className="flex items-center h-full space-x-1 bg-purple-50 opacity-0">
            <input
              type="checkbox"
              className="w-2 h-2 rounded-full opacity-0 cursor-pointer focus:outline-1 focus:ring-transparent group-hover:opacity-100 focus:border-2 focus:opacity-100 "
              style={{ marginLeft: '-1px' }}
            />
            {dragElement}
          </div>

          <div
            style={{ paddingLeft }}
            className={cl(
              COL_BG,
              `relative border-t ${verticalGrid && 'border-r'} w-full h-10 py-4 p-4 flex items-center `
            )}
          >
            <div className="flex space-x-1 pl-4 pr-2 ">
              <button
                onClick={(e) => handleOnSave(e as React.MouseEvent<HTMLButtonElement, MouseEvent>, task.id)}
                className="p-0.5 text-white rounded-sm bg-lime-600"
              >
                Save
              </button>
              <ImCancelCircle onClick={onClose} className="h-6 w-6" />
            </div>
            <StatusDropdown TaskCurrentStatus={task.status} />
            <div className="flex flex-col items-start justify-start space-y-1 pl-2">
              <p
                className="flex text-left"
                contentEditable={true}
                ref={inputRef}
                onKeyDown={(e) => (e.key === 'Enter' ? handleOnSave(e, task.id) : null)}
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
