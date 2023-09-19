import { ReactNode, TdHTMLAttributes, useEffect, useRef, useState } from 'react';
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
  setCurrentTaskStatusId,
  setSelectedIndex,
  setSelectedListIds,
  setSelectedIndexStatus,
  setSelectedTasksArray,
  setShowTaskNavigation,
  setTaskIdForPilot
} from '../../../../features/task/taskSlice';
import { setActiveItem } from '../../../../features/workspace/workspaceSlice';
import { UniqueIdentifier, useDraggable, useDroppable } from '@dnd-kit/core';
import { ImCancelCircle, ImCheckmark2 } from 'react-icons/im';
import CloseSubtask from '../../../../assets/icons/CloseSubtask';
import OpenSubtask from '../../../../assets/icons/OpenSubtask';
import { Capitalize } from '../../../../utils/NoCapWords/Capitalize';
import RoundedCheckbox from '../../../Checkbox/RoundedCheckbox';
import ToolTip from '../../../Tooltip/Tooltip';
import Badges from '../../../badges';
import DetailsOnHover from '../../../Dropdown/DetailsOnHover/DetailsOnHover';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  task: Task;
  children?: ReactNode;
  taskIndex?: number;
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
  isSplitSubtask?: boolean;
  isLastSubtaskLevel: boolean;
}

export function StickyCol({
  showSubTasks,
  setShowSubTasks,
  children,
  tags,
  taskIndex,
  parentId,
  isListParent,
  task_status,
  onClose,
  task,
  paddingLeft = 0,
  dragElement,
  isSplitSubtask,
  isLastSubtaskLevel,
  ...props
}: ColProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { taskId, hubId, subhubId, walletId, listId } = useParams();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { dragOverItemId, draggableItemId } = useAppSelector((state) => state.list);
  const {
    currTeamMemberId,
    verticalGrid,
    taskUpperCase,
    selectedTasksArray,
    verticalGridlinesTask,
    selectedIndex,
    toggleAllSubtask,
    selectedListIds,
    dragToBecomeSubTask,
    saveSettingOnline
  } = useAppSelector((state) => state.task);

  const [isChecked, setIsChecked] = useState(false);
  const [eitableContent, setEitableContent] = useState(false);
  const [selectedIndexArray, setSelectedIndexArray] = useState<number[]>([]);

  const COL_BG = taskId === task.id ? ACTIVE_COL_BG : DEFAULT_COL_BG;

  const { mutate: onAdd } = useAddTask();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClickTask = () => {
    if (task.id !== '0') {
      hubId
        ? navigate(`/${currentWorkspaceId}/tasks/h/${hubId}/t/${task.id}`, { replace: true })
        : subhubId
        ? navigate(`/${currentWorkspaceId}/tasks/sh/${subhubId}/t/${task.id}`, { replace: true })
        : walletId
        ? navigate(`/${currentWorkspaceId}/tasks/w/${walletId}/t/${task.id}`, { replace: true })
        : navigate(`/${currentWorkspaceId}/tasks/l/${listId}/t/${task.id}`, { replace: true });
      dispatch(
        setShowPilotSideOver({
          id: task.id,
          type: EntityType.task,
          show: true,
          title: task.name
        })
      );
      dispatch(setTaskIdForPilot(task.id));
      dispatch(
        setActiveItem({
          activeItemId: task.id,
          activeItemType: EntityType.task,
          activeItemName: task.name
        })
      );
    }
  };

  useEffect(() => {
    const { current } = inputRef;
    current?.focus();
  }, [eitableContent]);

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

  // listen on shift + arrow down key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === 'ArrowDown') {
        if (selectedIndex === null) return;
        if (!selectedIndexArray.includes(taskIndex as number)) {
          setSelectedIndexArray((prev) => {
            const updatedArray = [...prev, taskIndex as number];
            const newIndex = (selectedIndex as number) + 1;
            dispatch(setSelectedIndex(newIndex));
            return updatedArray;
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, selectedIndexArray]);

  useEffect(() => {
    if (!selectedTasksArray.length) {
      setSelectedIndexArray([]);
      dispatch(setSelectedIndex(null));
    }
    const isSelected = selectedTasksArray.includes(task.id);

    if (isSelected) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [selectedTasksArray, task.id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const indexInArray = selectedIndexArray.indexOf(taskIndex as number);
    if (!selectedIndexArray.includes(taskIndex as number)) {
      setSelectedIndexArray((prev) => {
        const updatedArray = [...prev, taskIndex as number];
        dispatch(setSelectedIndex(taskIndex as number));
        return updatedArray;
      });
    } else {
      // If taskIndex is already in selectedIndexArray, remove it
      const updatedArray = [...selectedIndexArray];
      updatedArray.splice(indexInArray, 1);
      setSelectedIndexArray(updatedArray);
    }
    dispatch(setSelectedIndexStatus(task.status.name));
    const isChecked = e.target.checked;
    dispatch(setShowTaskNavigation(isChecked));
    if (isChecked) {
      // Add the task ID to the selectedTasksArray array if it's not already present
      if (!selectedTasksArray.includes(task.id)) {
        const updatedTaskIds = [...selectedTasksArray, task.id];
        dispatch(setSelectedTasksArray(updatedTaskIds));
      }
      dispatch(setSelectedListIds([...selectedListIds, task.list_id]));
    } else {
      // Remove the task ID from the selectedTasksArray array
      const updatedTaskIds = selectedTasksArray.filter((id: string) => id !== task.id);
      dispatch(setSelectedTasksArray(updatedTaskIds));
      dispatch(setSelectedListIds(selectedListIds.filter((item) => item !== task.list_id)));
    }
    setIsChecked(isChecked);
  };

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task?.id as UniqueIdentifier,
    data: {
      isTask: true,
      movingTask: task
    }
  });

  const { isOver, setNodeRef: droppabbleRef } = useDroppable({
    id: task.id,
    data: {
      isOverTask: true,
      overTask: task
    }
  });

  return (
    <div className="sticky left-0 z-10">
      {task.id !== '0' && (
        <td
          className="flex items-center justify-start text-sm font-medium text-gray-900 cursor-pointer text-start"
          {...props}
        >
          <div
            className={`flex items-center h-full space-x-1 ${isSplitSubtask && 'bg-white/90'}`}
            style={{
              height:
                saveSettingOnline?.singleLineView && !saveSettingOnline?.CompactView
                  ? '42px'
                  : saveSettingOnline?.CompactView && saveSettingOnline?.singleLineView
                  ? '25px'
                  : !saveSettingOnline?.singleLineView && saveSettingOnline?.CompactView && task.name.length < 30
                  ? '25px'
                  : ''
            }}
          >
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
            style={{
              paddingLeft,
              height:
                saveSettingOnline?.singleLineView && !saveSettingOnline?.CompactView
                  ? '42px'
                  : saveSettingOnline?.CompactView && saveSettingOnline?.singleLineView
                  ? '25px'
                  : !saveSettingOnline?.singleLineView && saveSettingOnline?.CompactView && task.name.length < 30
                  ? '25px'
                  : ''
            }}
            onClick={onClickTask}
            onDoubleClick={() => setEitableContent(true)}
            className={cl(
              COL_BG,
              ` ${isChecked && 'tdListV'} ${verticalGrid && 'border-r'} ${
                verticalGridlinesTask && 'border-r'
              } w-full py-4 flex items-center`,
              isOver && draggableItemId !== dragOverItemId && !dragToBecomeSubTask
                ? 'border-b-2 border-alsoit-purple-300'
                : dragToBecomeSubTask && isOver && draggableItemId !== dragOverItemId
                ? 'mb-2'
                : 'border-t relative'
            )}
          >
            {dragToBecomeSubTask && isOver && draggableItemId !== dragOverItemId && (
              <span
                className={cl(
                  dragToBecomeSubTask && isOver && draggableItemId !== dragOverItemId
                    ? 'absolute content-start z-50 flex items-center left-20 w-full right-0 bottom-1 gap-0'
                    : ''
                )}
              >
                <span className="border-solid z-50 border-alsoit-purple-300 border-l-[8px] border-y-transparent border-y-[4px] border-r-0 m-0" />
                <span className={cl('h-0.5 bg-alsoit-purple-300 w-full m-0')}></span>
              </span>
            )}
            <button onClick={onToggleDisplayingSubTasks} className="pl-1">
              {showSubTasks || toggleAllSubtask ? (
                <div className={`${task.descendants_count > 0 ? 'w-3 h-3' : ' opacity-0 w-3 h-3 '}`}>
                  <CloseSubtask />
                </div>
              ) : (
                <div className={`${task.descendants_count > 0 ? 'w-3 h-3' : ' opacity-0 w-3 h-3'}`}>
                  <OpenSubtask />
                </div>
              )}
            </button>
            <div onClick={() => dispatch(setCurrentTaskStatusId(task.id as string))}>
              <StatusDropdown TaskCurrentStatus={task.status} />
            </div>
            <div className="flex flex-col flex-grow items-start justify-start pl-2 space-y-1">
              <div
                className="flex w-full mt-1 items-center text-left"
                onKeyDown={(e) => (e.key === 'Enter' ? handleEditTask(e, task.id) : null)}
                ref={droppabbleRef}
              >
                <div
                  className={`font-semibold alsoit-gray-300 ${
                    saveSettingOnline?.CompactView ? 'text-alsoit-text-md' : 'text-alsoit-text-lg'
                  }`}
                >
                  {saveSettingOnline?.singleLineView ? (
                    <div contentEditable={eitableContent} suppressContentEditableWarning={true} ref={inputRef}>
                      {!eitableContent ? (
                        <DetailsOnHover
                          hoverElement={
                            <div
                              className={`font-semibold alsoit-gray-300 ${
                                saveSettingOnline?.CompactView ? 'text-alsoit-text-md' : 'text-alsoit-text-lg'
                              }`}
                              style={{
                                maxWidth: '200px',
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
                      ) : (
                        <div
                          style={{
                            maxWidth: '200px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {taskUpperCase ? task.name.toUpperCase() : Capitalize(task.name)}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>{taskUpperCase ? task.name.toUpperCase() : Capitalize(task.name)}</div>
                  )}
                </div>
                {/* non default badges here */}
                <div onClick={(e) => e.stopPropagation()} className="pl-3 flex flex-grow items-center justify-between">
                  {!isLastSubtaskLevel ? <Badges task={task} /> : null}
                  {/*  default badges here */}
                  {children}
                </div>
              </div>
              {tags}
            </div>
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
            <div className="pr-2">{dragElement}</div>
          </div>
          <div
            style={{ paddingLeft }}
            className={cl(
              COL_BG,
              `relative border-t ${verticalGrid && 'border-r'} w-full h-16  py-4 p-4 flex items-center`
            )}
          >
            <div className="absolute flex ml-2 space-x-1 -mt-10 bottom-0 right-0">
              <ToolTip title="Cancel">
                <div className="border rounded-md p-1" style={{ borderColor: '#FFE7E7' }}>
                  <ImCancelCircle onClick={onClose} />
                </div>
              </ToolTip>
              <ToolTip title="Save">
              <div className="border rounded-md p-1" style={{ borderColor: '#FFE7E7' }}>
              <ImCheckmark2 onClick={(e) => handleOnSave(e as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>, task.id)}></ImCheckmark2>
              </div>
              </ToolTip>
            </div>
            <div className="ml-4 pt-2">
              <StatusDropdown TaskCurrentStatus={task.status} />
            </div>
            <div className="flex flex-col pt-2 items-start justify-start pl-2 space-y-1">
              <p
                className="flex text-left empty:before:content-[attr(placeholder)]"
                contentEditable={true}
                placeholder="Add New Task"
                ref={inputRef}
                onKeyDown={(e) => (e.key === 'Enter' ? handleOnSave(e, task.id) : null)}
              ></p>
            </div>
          </div>
        </td>
      )}
    </div>
  );
}
