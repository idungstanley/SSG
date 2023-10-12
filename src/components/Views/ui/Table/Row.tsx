import { useState, useMemo } from 'react';
import SubtasksIcon from '../../../../assets/icons/SubtasksIcon';
import { Tag, Task } from '../../../../features/task/interface.tasks';
import { DEFAULT_LEFT_PADDING } from '../../config';
import { Col } from './Col';
import { StickyCol } from './StickyCol';
import { SubTasks } from './SubTasks';
import { useDraggable } from '@dnd-kit/core';
import { ManageTagsDropdown } from '../../../Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';
import { AddSubTask } from '../AddTask/AddSubTask';
import TaskTag from '../../../Tag/ui/TaskTag';
import Effect from '../../../../assets/icons/Effect';
import Enhance from '../../../badges/Enhance';
import {
  THREE_SUBTASKS_LEVELS,
  TWO_SUBTASKS_LEVELS,
  setDefaultSubtaskId,
  setShowNewTaskField,
  setShowNewTaskId
} from '../../../../features/task/taskSlice';
import ToolTip from '../../../Tooltip/Tooltip';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import Dradnddrop from '../../../../assets/icons/Dradnddrop';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import Copy from '../../../../assets/icons/Copy';
import {
  EXPAND_ALL_THREE,
  EXPAND_ALL_TWO
} from '../../../../pages/workspace/lists/components/renderlist/listDetails/listSubtask/ListSubtasks';
import NewSubTaskTemplate from './newTaskTemplate/NewSubTaskTemplate';
import Badges from '../../../badges';

export const MAX_SUBTASKS_LEVEL = 10;

interface RowProps {
  task: Task;
  taskIndex?: number;
  listId: string;
  columns: listColumnProps[];
  paddingLeft?: number;
  parentId?: string;
  isListParent: boolean;
  taskStatusId?: string;
  handleClose?: VoidFunction;
  isSplitSubtask?: boolean;
  level: number;
  isShowAllChildren?: boolean;
}

export function Row({
  task,
  columns,
  listId,
  taskIndex,
  paddingLeft = 0,
  parentId,
  taskStatusId,
  isListParent,
  handleClose,
  isSplitSubtask,
  level,
  isShowAllChildren
}: RowProps) {
  const dispatch = useAppDispatch();

  const { showNewTaskField, showNewTaskId, toggleAllSubtask, toggleAllSubtaskSplit, splitSubTaskLevels, subtasks } =
    useAppSelector((state) => state.task);

  const [showSubTasks, setShowSubTasks] = useState(false);
  const [isCopied, setIsCopied] = useState<number>(0);

  const otherColumns = columns.slice(1);
  const newSubTask = NewSubTaskTemplate();

  const onShowAddSubtaskField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, taskId: string) => {
    dispatch(setDefaultSubtaskId(task.list_id));
    e.stopPropagation();
    if (showNewTaskField) {
      dispatch(setShowNewTaskId(''));
      dispatch(setShowNewTaskField(false));
    } else {
      dispatch(setShowNewTaskId(taskId));
      dispatch(setShowNewTaskField(true));
    }
  };

  const onCloseAddTaskFIeld = () => {
    handleClose && handleClose();
    dispatch(setShowNewTaskId(''));
    dispatch(setShowNewTaskField(false));
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      isTask: true,
      movingTask: task
    }
  });

  const handleCopyTexts = async () => {
    await navigator.clipboard.writeText(task.name);
    setIsCopied(1);
    setTimeout(() => {
      setIsCopied(0);
    }, 1000);
  };

  // hide element if is currently grabbing
  const style = {
    opacity: transform ? 0 : 100
  };

  const showChildren = useMemo(() => {
    const isOnToggleTwo = toggleAllSubtaskSplit.includes(EXPAND_ALL_TWO);
    const isOnToggleThree = toggleAllSubtaskSplit.includes(EXPAND_ALL_THREE);
    if (showSubTasks) {
      return true;
    } else if (toggleAllSubtask && subtasks[task.id]) {
      return true;
    } else if (isOnToggleTwo && splitSubTaskLevels.includes(TWO_SUBTASKS_LEVELS) && level === 1) {
      return true;
    } else if (isOnToggleThree && splitSubTaskLevels.includes(THREE_SUBTASKS_LEVELS) && level === 2) {
      return true;
    }
    return false;
  }, [showSubTasks, subtasks, toggleAllSubtask, toggleAllSubtaskSplit, splitSubTaskLevels]);

  const showAllChildren = useMemo(() => {
    const isOnToggleTwo = toggleAllSubtaskSplit.includes(EXPAND_ALL_TWO);
    const isOnToggleThree = toggleAllSubtaskSplit.includes(EXPAND_ALL_THREE);
    if (isOnToggleTwo && splitSubTaskLevels.includes(TWO_SUBTASKS_LEVELS) && level === 1) {
      return true;
    } else if (isOnToggleThree && splitSubTaskLevels.includes(THREE_SUBTASKS_LEVELS) && level === 2) {
      return true;
    }
    return false;
  }, [toggleAllSubtaskSplit, splitSubTaskLevels]);

  return (
    <>
      {/* current task */}

      <tr style={style} className="relative contents group dNFlex">
        <StickyCol
          showSubTasks={showSubTasks}
          setShowSubTasks={setShowSubTasks}
          style={{ zIndex: 1 }}
          isListParent={isListParent}
          task={task}
          taskIndex={taskIndex}
          parentId={parentId as string}
          taskStatusId={taskStatusId as string}
          onClose={handleClose as VoidFunction}
          paddingLeft={paddingLeft}
          tags={'tags' in task ? <TaskTag tags={task.tags} entity_id={task.id} entity_type="task" /> : null}
          isLastSubtaskLevel={level >= MAX_SUBTASKS_LEVEL}
          dragElement={
            <div ref={setNodeRef} {...listeners} {...attributes}>
              <div className="text-lg text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100">
                <Dradnddrop />
              </div>
            </div>
          }
        >
          {/* actions */}
          <div className="flex items-center justify-center mr-1 space-x-1">
            {level < MAX_SUBTASKS_LEVEL ? <Badges task={task} /> : null}
            {/* Copy */}
            <ToolTip title={isCopied === 0 ? 'Copy Task Name' : 'Copied'}>
              <button
                className="p-1 bg-white border rounded-md opacity-0 group-hover:opacity-100"
                onClick={handleCopyTexts}
              >
                <Copy />
              </button>
            </ToolTip>
            {/* effects */}
            <ToolTip title="Apply Effects">
              <button
                className="p-1 bg-white border rounded-md opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: 'orange' }}
                onClick={(e) => e.stopPropagation()}
              >
                <Effect className="w-3 h-3" />
              </button>
            </ToolTip>

            {/* tags */}
            {'tags' in task ? (
              <ToolTip title="Tags">
                <button
                  className="bg-white border rounded-md opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.preventDefault()}
                >
                  <ManageTagsDropdown entityId={task.id} tagsArr={task.tags as Tag[]} entityType="task" />
                </button>
              </ToolTip>
            ) : null}

            {/* show create subtask field */}
            {task.descendants_count < 1 && (
              <ToolTip title="Subtask">
                <button
                  className="p-1 bg-white border rounded-md opacity-0 group-hover:opacity-100"
                  onClick={(e) => onShowAddSubtaskField(e, task.id)}
                >
                  <SubtasksIcon className="w-3 h-3" />
                </button>
              </ToolTip>
            )}
            <ToolTip title="Enhance View">
              <button
                className="p-1 pl-4 bg-white rounded-md opacity-0 group-hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <Enhance className="w-3 h-3" style={{ color: 'orange' }} />
              </button>
            </ToolTip>
          </div>
        </StickyCol>

        {otherColumns.map((col) => (
          <Col
            fieldId={col.id}
            field={col.field}
            task={task}
            value={task[col.field as keyof Task]}
            key={col.id}
            style={{ zIndex: 0 }}
          />
        ))}
      </tr>

      {showNewTaskField && showNewTaskId === task.id ? (
        <AddSubTask
          task={newSubTask}
          columns={columns}
          paddingLeft={DEFAULT_LEFT_PADDING + paddingLeft}
          isListParent={false}
          listId={listId}
          parentId={isSplitSubtask ? (task.parent_id as string) : task.id}
          taskStatusId={task.status.id}
          handleClose={onCloseAddTaskFIeld}
        />
      ) : null}

      {showChildren || isShowAllChildren ? (
        <SubTasks
          paddingLeft={DEFAULT_LEFT_PADDING + paddingLeft}
          listId={listId}
          parentTask={task}
          columns={columns}
          isSplitSubtask={isSplitSubtask}
          isShowAllChildren={isShowAllChildren || showAllChildren}
          level={level + 1}
        />
      ) : null}
    </>
  );
}
