import { ReactNode, TdHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Task } from '../../../../features/task/interface.tasks';
import { cl } from '../../../../utils';
import { DEFAULT_COL_BG } from '../../config';
import { UseUpdateTaskService, useAddTask } from '../../../../features/task/taskService';
import StatusDropdown from '../../../status/StatusDropdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import {
  setCurrentTaskStatusId,
  setSelectedTasksArray,
  setShowTaskNavigation,
  setTaskIdForPilot
} from '../../../../features/task/taskSlice';
import { setActiveItem } from '../../../../features/workspace/workspaceSlice';
import { UniqueIdentifier, useDraggable, useDroppable } from '@dnd-kit/core';
import { ImCancelCircle } from 'react-icons/im';
import CloseSubtask from '../../../../assets/icons/CloseSubtask';
import OpenSubtask from '../../../../assets/icons/OpenSubtask';
import { Capitalize } from '../../../../utils/NoCapWords/Capitalize';
import RoundedCheckbox from '../../../Checkbox/RoundedCheckbox';
import ToolTip from '../../../Tooltip/Tooltip';
import Badges from '../../../badges';
import DetailsOnHover from '../../../Dropdown/DetailsOnHover/DetailsOnHover';

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
  isOver?: boolean;
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
  const ACTIVE_TASK = taskId === task.id ? 'tdListV' : DEFAULT_COL_BG;
  const [isChecked, setIsChecked] = useState(false);
  const { mutate: onAdd } = useAddTask(parentId);
  const { currTeamMemberId, singleLineView, verticalGrid, taskUpperCase, selectedTasksArray, verticalGridlinesTask } =
    useAppSelector((state) => state.task);

  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task?.id as UniqueIdentifier,
    data: {
      isTask: true
    }
  });
  const [eitableContent, setEitableContent] = useState(false);

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

  useEffect(() => {
    const { current } = inputRef;
    current?.focus();
    selectText(current);
  }, [eitableContent]);

  const selectText = (element: Node | null) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element as Node);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const onToggleDisplayingSubTasks = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowSubTasks(!showSubTasks);
  };

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
      onClose && onClose();
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

  useEffect(() => {
    const isSelected = selectedTasksArray.includes(task.id);
    isSelected ? setIsChecked(true) : setIsChecked(false);
  }, [selectedTasksArray]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    dispatch(setShowTaskNavigation(isChecked));
    if (isChecked) {
      // Add the task ID to the selectedTasksArray array if it's not already present
      if (!selectedTasksArray.includes(task.id)) {
        const updatedTaskIds = [...selectedTasksArray, task.id];
        dispatch(setSelectedTasksArray(updatedTaskIds));
      }
    } else {
      // Remove the task ID from the selectedTasksArray array
      const updatedTaskIds = selectedTasksArray.filter((id: string) => id !== task.id);
      dispatch(setSelectedTasksArray(updatedTaskIds));
    }
    setIsChecked(isChecked);
  };

  const { isOver, setNodeRef: droppabbleRef } = useDroppable({
    id: task.id,
    data: {
      isOverTask: true
    }
  });

  return (
    <div ref={droppabbleRef}>
      {task.id !== '0' && (
        <td
          className="sticky left-0 flex items-center justify-start text-sm font-medium text-gray-900 cursor-pointer text-start"
          {...props}
        >
          <div className="flex items-center h-full space-x-1 ">
            <RoundedCheckbox
              onChange={onChange}
              isChecked={isChecked}
              styles={`w-4 h-4 rounded-full ${
                selectedTasksArray.length > 0 ? 'opacity-100' : 'opacity-0'
              } cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300`}
            />
            <div ref={setNodeRef} {...attributes} {...listeners} className="pr-2">
              {dragElement}
            </div>
          </div>
          <div
            style={{ paddingLeft, minHeight: '42px', height: singleLineView ? '42px' : '' }}
            onClick={onClickTask}
            onDoubleClick={() => setEitableContent(true)}
            className={cl(
              ACTIVE_TASK,
              `relative border-t ${isChecked && 'tdListV'} ${verticalGrid && 'border-r'} ${
                verticalGridlinesTask && 'border-r'
              } w-full py-4 flex items-center `,
              isOver ? 'border-y-2 border-alsoit-purple-300' : ''
            )}
          >
            <button onClick={onToggleDisplayingSubTasks} className="pl-1">
              {showSubTasks ? (
                <div className={`${task.descendants_count > 0 ? 'w-3 h-3' : ' opacity-0 w-3 h-3 '}`}>
                  <CloseSubtask />
                </div>
              ) : (
                <div className={`${task.descendants_count > 0 ? 'w-3 h-3' : ' opacity-0 w-3 h-3 '}`}>
                  <OpenSubtask />
                </div>
              )}
            </button>
            <div onClick={() => dispatch(setCurrentTaskStatusId(task.id as string))}>
              <StatusDropdown TaskCurrentStatus={task.status} />
            </div>
            <div className="flex flex-col items-start justify-start pl-2 space-y-1">
              <div
                className="relative flex items-center text-left"
                contentEditable={eitableContent}
                ref={inputRef}
                onKeyDown={(e) => (e.key === 'Enter' ? handleEditTask(e, task.id) : null)}
                suppressContentEditableWarning={true}
              >
                <div className="font-semibold alsoit-gray-300">
                  {task.name.length > 50 && singleLineView ? (
                    <div>
                      {/* <InteractiveTooltip content={<p>{task.name}</p>} top="-top-28"> */}
                      {!eitableContent ? (
                        <>
                          <DetailsOnHover
                            hoverElement={
                              <div
                                className=""
                                style={{
                                  maxWidth: '300px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {taskUpperCase ? task.name.toUpperCase() : Capitalize(task.name)}
                              </div>
                            }
                            content={<div>{taskUpperCase ? task.name.toUpperCase() : Capitalize(task.name)}</div>}
                            additionalStyles={{ backgroundColor: 'black', color: 'white' }}
                          />
                        </>
                      ) : (
                        <div
                          className=""
                          style={{
                            maxWidth: '300px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {taskUpperCase ? task.name.toUpperCase() : Capitalize(task.name)}
                        </div>
                      )}
                      {/* </InteractiveTooltip> */}
                    </div>
                  ) : (
                    <span>{taskUpperCase ? task.name.toUpperCase() : Capitalize(task.name)}</span>
                  )}
                </div>

                {/* non default badges here */}
                <div onClick={(e) => e.stopPropagation()} className="pl-3">
                  <Badges task={task} />
                </div>
              </div>

              {tags}
            </div>
            {children}
          </div>
        </td>
      )}

      {task.id === '0' && (
        <td
          className="sticky left-0 flex items-start justify-start text-sm font-medium text-gray-900 cursor-pointer text-start"
          {...props}
        >
          <div className="flex items-center h-full space-x-1 opacity-0">
            <RoundedCheckbox
              onChange={onChange}
              isChecked={isChecked}
              styles={`w-4 h-4 rounded-full ${
                selectedTasksArray.length > 0 ? 'opacity-100' : 'opacity-0'
              } cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100`}
            />
            <div ref={setNodeRef} {...attributes} {...listeners} className="pr-2">
              {dragElement}
            </div>
          </div>

          <div
            style={{ paddingLeft }}
            className={cl(
              ACTIVE_TASK,
              `relative border-t ${verticalGrid && 'border-r'} w-full h-10 py-4 p-4 flex items-center `
            )}
          >
            <div className="absolute flex ml-1 space-x-1 -mt-7">
              <ToolTip tooltip="Cancel">
                <ImCancelCircle onClick={onClose} className="w-3 h-3" />
              </ToolTip>
              <button
                onClick={(e) => handleOnSave(e as React.MouseEvent<HTMLButtonElement, MouseEvent>, task.id)}
                className="p-0.5 text-white text-sm w-10 h-3 rounded-sm bg-lime-600 flex items-center"
              >
                Save
              </button>
            </div>
            <div className="ml-4">
              <StatusDropdown TaskCurrentStatus={task.status} />
            </div>
            <div className="flex flex-col items-start justify-start pl-2 space-y-1">
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
    </div>
  );
}
