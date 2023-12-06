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
  setTaskIdForPilot,
  setDuplicateTaskObj,
  setSelectedIndexListId,
  setF2State,
  setTaskInputValue,
  setTaskRootIds,
  setRootTaskIds
} from '../../../../features/task/taskSlice';
import { setActiveItem } from '../../../../features/workspace/workspaceSlice';
import CloseSubtask from '../../../../assets/icons/CloseSubtask';
import OpenSubtask from '../../../../assets/icons/OpenSubtask';
import { Capitalize } from '../../../../utils/NoCapWords/Capitalize';
import RoundedCheckbox from '../../../Checkbox/RoundedCheckbox';
import ToolTip from '../../../Tooltip/Tooltip';
import DetailsOnHover from '../../../Dropdown/DetailsOnHover/DetailsOnHover';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import SubtasksIcon from '../../../../assets/icons/SubtasksIcon';
// import SaveIcon from '../../../../assets/icons/SaveIcon';
// import Close from '../../../../assets/icons/Close';
import toast from 'react-hot-toast';
import Toast from '../../../../common/Toast';
import { LIMITS } from '../../../../app/config/dimensions';
import AddTaskOnStatus from '../AddTask/AddTaskOnStatus';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  task: Task;
  children?: ReactNode;
  taskIndex?: number;
  showSubTasks?: boolean;
  setShowSubTasks: (i: boolean) => void;
  paddingLeft?: number;
  taskStatusId?: string;
  isListParent: boolean;
  tags: ReactNode;
  dragElement?: ReactNode;
  parentId?: string;
  onClose?: VoidFunction;
  isOver?: boolean;
  isBlockedShowChildren?: boolean;
  toggleRootTasks?: boolean;
  droppableElement?: ReactNode;
  styles?: { opacity: number };
  level?: number;
  selectedRow: boolean;
}

export function StickyCol({
  showSubTasks,
  setShowSubTasks,
  children,
  tags,
  taskIndex,
  parentId,
  isListParent,
  taskStatusId,
  onClose,
  task,
  paddingLeft = 0,
  dragElement,
  isBlockedShowChildren,
  toggleRootTasks,
  droppableElement,
  isOver,
  styles,
  level,
  selectedRow,
  ...props
}: ColProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { taskId, hubId, walletId, listId } = useParams();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { dragOverItemId, draggableItemId } = useAppSelector((state) => state.list);
  const { activeView, activeItemId } = useAppSelector((state) => state.workspace);
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
    saveSettingOnline,
    duplicateTaskObj,
    separateSubtasksMode,
    newTaskPriority,
    f2State,
    taskRootIds,
    assignOnHoverTask
  } = useAppSelector((state) => state.task);

  const [isChecked, setIsChecked] = useState(false);
  const [eitableContent, setEitableContent] = useState(false);
  const [selectedIndexArray, setSelectedIndexArray] = useState<number[]>([]);

  const COL_BG = taskId === task.id ? ACTIVE_COL_BG : selectedRow ? 'bg-alsoit-purple-50' : DEFAULT_COL_BG;

  const { mutate: onAdd } = useAddTask(task);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (task.id === activeItemId) {
      dispatch(setTaskInputValue(task.name));
    }
  }, [taskId, task.id, activeItemId]);

  const onClickTask = () => {
    if (task.id !== '0') {
      hubId
        ? navigate(`/${currentWorkspaceId}/tasks/h/${hubId}/t/${task.id}/v/${activeView?.id}`, { replace: true })
        : walletId
        ? navigate(`/${currentWorkspaceId}/tasks/w/${walletId}/t/${task.id}/v/${activeView?.id}`, { replace: true })
        : navigate(`/${currentWorkspaceId}/tasks/l/${listId || task.list_id}/t/${task.id}/v/${activeView?.id}`, {
            replace: true
          });
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

  const onToggleDisplayingSubTasks = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowSubTasks(!showSubTasks);
    dispatch(setRootTaskIds(undefined));
    if (!task.parent_id) {
      dispatch(setTaskRootIds({ ...taskRootIds, [task.id]: [task.id] }));
    }
    // else {
    //   const updateTaskRootIds = { ...taskRootIds };

    //   for (const key of task?.root_task_ids as string[]) {
    //     if (updateTaskRootIds[key]) {
    //       const taskRootIdsArray = [...(task.root_task_ids as string[]), task.id];
    //       updateTaskRootIds[key] = taskRootIdsArray;
    //     }
    //   }
    //   dispatch(setTaskRootIds(updateTaskRootIds));
    // }
  };

  const editTaskMutation = useMutation(UseUpdateTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
      setEitableContent(false);
    }
  });

  const handleOnSave = async (
    e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    if (id !== '0') {
      handleEditTask(e as React.KeyboardEvent<HTMLDivElement>, id);
    } else {
      onClose && onClose();
      onClickSave();
    }
  };

  const inputContent = inputRef.current?.innerText;
  const noTaskNameErrorTitle = 'Empty task name';
  const noTaskNameErrorbody = 'Please type a task name';

  const title = 'Limit Exceeded';
  const body = 'The name must not be greater than 2000 characters.';
  useEffect(() => {
    if (inputContent && inputContent?.length > LIMITS.NAME_INPUT_LIMITS) {
      toast.custom((t) => <Toast type="error" title={title} body={body} toastId={t.id} />);
    }
  }, [inputContent]);

  const onClickSave = () => {
    if (!inputRef.current?.innerText.length)
      return toast.custom((t) => (
        <Toast type="error" title={noTaskNameErrorTitle} body={noTaskNameErrorbody} toastId={t.id} />
      ));

    if (inputRef.current?.innerText && inputRef.current?.innerText.length <= LIMITS.NAME_INPUT_LIMITS) {
      const name = inputRef.current?.innerText;

      onAdd({
        name,
        isListParent,
        id: parentId !== '' ? (parentId as string) : (listId as string),
        assignees: [currTeamMemberId] as string[],
        newTaskPriority,
        task_status_id: taskStatusId as string
      });
    } else {
      toast.custom((t) => <Toast type="error" title={title} body={body} toastId={t.id} />);
    }
  };

  const handleEditTask = async (e: React.KeyboardEvent<HTMLDivElement>, id: string) => {
    if (inputRef.current?.innerText && inputRef.current?.innerText.length <= LIMITS.NAME_INPUT_LIMITS) {
      e.preventDefault();
      await editTaskMutation.mutateAsync({
        name: inputRef.current?.innerText as string,
        task_id: id
      });
    }
  };

  useEffect(() => {
    const { current } = inputRef;
    current?.focus();

    dispatch(setF2State(false));
  }, [eitableContent]);

  useEffect(() => {
    if (f2State && (assignOnHoverTask as Task).id === task.id) {
      setEitableContent(true);
    }
  }, [f2State]);

  const handleSetEditable = () => {
    setEitableContent(true);
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
    dispatch(setDuplicateTaskObj({ ...duplicateTaskObj, task_name: task.name, task_id: task.id, fullTask: task }));
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
    dispatch(setSelectedIndexListId(task.list_id));

    const isChecked = e.target.checked;
    dispatch(setShowTaskNavigation(isChecked));
    if (isChecked) {
      // Add the task ID to the selectedTasksArray array if it's not already present
      if (!selectedTasksArray.includes(task.id)) {
        const updatedTaskIds = [...selectedTasksArray, task.id];
        dispatch(setSelectedTasksArray(updatedTaskIds));
      }
      dispatch(setSelectedListIds([...selectedListIds, task.parent_id || task.list_id]));
    } else {
      // Remove the task ID from the selectedTasksArray array
      const updatedTaskIds = selectedTasksArray.filter((id: string) => id !== task.id);
      dispatch(setSelectedTasksArray(updatedTaskIds));
      dispatch(setSelectedListIds(selectedListIds.filter((item) => item !== task.list_id)));
    }
    setIsChecked(isChecked);
  };

  const handleDroppable = () => {
    if (task.parent_id === draggableItemId && level) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      {task.id !== '0' && (
        <td
          className="sticky left-0 z-10 flex items-center justify-start text-sm font-medium text-gray-900 cursor-pointer text-start"
          style={{ ...styles, zIndex: '1' }}
          {...props}
        >
          {handleDroppable() && droppableElement}
          <div
            className="flex items-center h-full ml-1 space-x-1"
            style={{
              padding: '15px 0',
              paddingLeft: 0,
              height:
                saveSettingOnline?.singleLineView && !saveSettingOnline?.CompactView
                  ? '42px'
                  : saveSettingOnline?.CompactView && saveSettingOnline?.singleLineView
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
            <div className="pr-2">{dragElement}</div>
          </div>
          <div
            style={{
              paddingLeft,
              height:
                saveSettingOnline?.singleLineView && !saveSettingOnline?.CompactView
                  ? '42px'
                  : saveSettingOnline?.CompactView && saveSettingOnline?.singleLineView
                  ? '25px'
                  : '',
              maxWidth: saveSettingOnline?.singleLineView ? 'calc(100% - 40px)' : '100%'
            }}
            onClick={onClickTask}
            onDoubleClick={() => handleSetEditable()}
            className={cl(
              COL_BG,
              `${isChecked && 'tdListV'} ${verticalGrid && 'border-r'} ${
                verticalGridlinesTask && 'border-r'
              } relative w-full h-full flex items-center`,
              isOver && draggableItemId !== dragOverItemId && !dragToBecomeSubTask
                ? 'border-b-2 border-alsoit-purple-300'
                : dragToBecomeSubTask && isOver && draggableItemId !== dragOverItemId
                ? 'mb-0'
                : 'border-t relative'
            )}
          >
            {dragToBecomeSubTask && isOver && draggableItemId !== dragOverItemId && (
              <span
                className={cl(
                  dragToBecomeSubTask && isOver && draggableItemId !== dragOverItemId
                    ? 'absolute content-start z-50 flex items-center left-12 w-full bottom-0'
                    : ''
                )}
              >
                <span className="border-solid z-50 border-alsoit-purple-300 border-l-[8px] border-y-transparent border-y-[4px] border-r-0 m-0" />
                <span className={cl('h-0.5 bg-alsoit-purple-300 w-full ml-auto')}></span>
              </span>
            )}
            {isBlockedShowChildren ? (
              <div className="w-4" />
            ) : (
              <button onClick={onToggleDisplayingSubTasks} className="pl-1">
                {showSubTasks || toggleAllSubtask || toggleRootTasks ? (
                  <div className={`${task.descendants_count > 0 ? 'w-3 h-3' : 'opacity-0 w-3 h-3'}`}>
                    <CloseSubtask />
                  </div>
                ) : (
                  <div className={`${task.descendants_count > 0 ? 'w-3 h-3' : 'opacity-0 w-3 h-3'}`}>
                    <OpenSubtask />
                  </div>
                )}
              </button>
            )}
            <div onClick={() => dispatch(setCurrentTaskStatusId(task.id as string))}>
              <StatusDropdown taskCurrentStatus={task.status} taskStatuses={task.task_statuses} />
            </div>
            {separateSubtasksMode && task?.parentName && !paddingLeft ? (
              <ToolTip title={task.parentName}>
                <button className="pl-3">
                  <SubtasksIcon className="w-4 h-4" />
                </button>
              </ToolTip>
            ) : null}
            <div
              className="flex flex-col items-start justify-start flex-grow pl-2 space-y-1"
              style={{ maxWidth: '100%', overflow: 'hidden' }}
            >
              <div
                className={`w-full flex items-center text-left ${saveSettingOnline?.singleLineView ? 'truncate' : ''}`}
                onKeyDown={(e) => (e.key === 'Enter' && eitableContent ? handleEditTask(e, task.id) : null)}
              >
                <div
                  className={`font-semibold alsoit-gray-300 ${
                    saveSettingOnline?.CompactView ? 'text-alsoit-text-md' : 'text-alsoit-text-lg'
                  } ${saveSettingOnline?.singleLineView ? 'truncate' : ''}`}
                  contentEditable={eitableContent}
                  suppressContentEditableWarning={true}
                  ref={inputRef}
                >
                  {saveSettingOnline?.singleLineView ? (
                    <div>
                      {!eitableContent ? (
                        <DetailsOnHover
                          hoverElement={
                            <div
                              className={`${task.name.length > 20 ? 'truncate' : ''} font-semibold alsoit-gray-300 ${
                                saveSettingOnline?.CompactView ? 'trantext-alsoit-text-md' : 'text-alsoit-text-lg'
                              }`}
                              style={{ maxWidth: '90%', whiteSpace: 'nowrap' }}
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
                    <div style={{ wordBreak: 'break-word', overflow: 'hidden' }}>
                      {taskUpperCase ? task.name.toUpperCase() : Capitalize(task.name)}
                    </div>
                  )}
                </div>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`${
                    task.name.length > 20 ? 'absolute right-0' : ''
                  } ${COL_BG} h-5/6 flex items-center justify-between pl-2 min-h-fit`}
                >
                  {children}
                </div>
              </div>
              {tags}
            </div>
          </div>
        </td>
      )}

      {task.id === '0' && (
        <AddTaskOnStatus
          task={task}
          selectedRow={selectedRow}
          inputRef={inputRef}
          onClose={onClose}
          handleOnSave={handleOnSave}
        />
      )}
    </>
  );
}
