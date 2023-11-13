import { useState, useMemo } from 'react';
import SubtasksIcon from '../../../../assets/icons/SubtasksIcon';
import { Tag, Task } from '../../../../features/task/interface.tasks';
import { DEFAULT_LEFT_PADDING } from '../../config';
import { Col } from './Col';
import { StickyCol } from './StickyCol';
import { SubTasks } from './SubTasks';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { ManageTagsDropdown } from '../../../Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';
import { AddSubTask } from '../AddTask/AddSubTask';
import TaskTag from '../../../Tag/ui/TaskTag';
import Effect from '../../../../assets/icons/Effect';
import Enhance from '../../../badges/Enhance';
import {
  THREE_SUBTASKS_LEVELS,
  TWO_SUBTASKS_LEVELS,
  setAssignOnHoverListId,
  setAssignOnHoverTask,
  setDefaultSubtaskId,
  setShowNewTaskField,
  setShowNewTaskId
} from '../../../../features/task/taskSlice';
import ToolTip from '../../../Tooltip/Tooltip';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import Dradnddrop from '../../../../assets/icons/Dradnddrop';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import Copy from '../../../../assets/icons/Copy';
import { findExpandedLevels } from '../../../../pages/workspace/lists/components/renderlist/listDetails/listSubtask/ListSubtasks';
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
  isBlockedShowChildren?: boolean;
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
  isBlockedShowChildren
}: RowProps) {
  const dispatch = useAppDispatch();

  const {
    showNewTaskField,
    showNewTaskId,
    toggleAllSubtask,
    toggleAllSubtaskSplit,
    splitSubTaskLevels,
    subtasks,
    rootTaskIds
  } = useAppSelector((state) => state.task);

  const [showSubTasks, setShowSubTasks] = useState(false);
  const [isCopied, setIsCopied] = useState<number>(0);

  const otherColumns = columns.slice(1);
  const newSubTask = NewSubTaskTemplate(task);

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

  const { isOver, setNodeRef: droppabbleRef } = useDroppable({
    id: task.id,
    data: {
      isOverTask: true
      // overTask: task
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
    opacity: transform ? 0.3 : 100,
    zIndex: 1,
    pointerEvents: transform ? 'none' : ''
  };

  const showChildren = useMemo(() => {
    const findAllExpandedLevels = findExpandedLevels(toggleAllSubtaskSplit);
    const isLevelActive = Number(findAllExpandedLevels) >= level;
    if (showSubTasks) {
      return true;
    } else if (toggleAllSubtask && subtasks[task.id]) {
      return true;
    } else if (
      isLevelActive &&
      splitSubTaskLevels.includes(TWO_SUBTASKS_LEVELS) &&
      !splitSubTaskLevels.includes(THREE_SUBTASKS_LEVELS) &&
      level >= 1
    ) {
      return true;
    } else if (isLevelActive && splitSubTaskLevels.includes(THREE_SUBTASKS_LEVELS) && level >= 2) {
      return true;
    } else if ((rootTaskIds as string[])?.includes(task.id)) {
      return true;
    }
    return false;
  }, [showSubTasks, subtasks, toggleAllSubtask, toggleAllSubtaskSplit, splitSubTaskLevels, rootTaskIds]);

  const [hoverOn, setHoverOn] = useState(false);
  const toggleRootTasks = (rootTaskIds as string[])?.includes(task.id);

  return (
    <>
      {/* current task */}
      <tr
        className="relative contents group dNFlex"
        onMouseEnter={() => {
          dispatch(setAssignOnHoverTask(task));
          dispatch(setAssignOnHoverListId(task.parent_id ?? task.list_id));
          setHoverOn(true);
        }}
        onMouseLeave={() => {
          dispatch(setAssignOnHoverTask(''));
          setHoverOn(false);
        }}
      >
        <StickyCol
          hoverOn={hoverOn}
          setHoverOn={setHoverOn}
          showSubTasks={showChildren}
          setShowSubTasks={setShowSubTasks}
          toggleRootTasks={toggleRootTasks}
          isListParent={isListParent}
          task={task}
          isOver={isOver}
          styles={style}
          taskIndex={taskIndex}
          parentId={parentId as string}
          taskStatusId={taskStatusId as string}
          onClose={handleClose as VoidFunction}
          paddingLeft={paddingLeft}
          level={level + 1}
          tags={
            'tags' in task ? (
              <div className="flex gap-3">
                {task.tags.map((tag) => (
                  <TaskTag key={tag.id} tag={tag} entity_id={task.id} entity_type="task" />
                ))}
              </div>
            ) : null
          }
          isBlockedShowChildren={isBlockedShowChildren}
          dragElement={
            <div ref={setNodeRef} {...listeners} {...attributes}>
              <div className="text-lg text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100">
                <Dradnddrop />
              </div>
            </div>
          }
          droppableElement={
            <div
              ref={droppabbleRef}
              className="absolute h-full"
              style={{ left: '30px', background: 'transparent', height: '100%', width: '100%', zIndex: -1 }}
            />
          }
        >
          {/* actions */}
          <div className="flex items-center justify-center mr-1 space-x-1">
            {level < MAX_SUBTASKS_LEVEL ? <Badges task={task} /> : null}
            {/* Copy */}
            <ToolTip title={isCopied === 0 ? 'Copy Task Name' : 'Copied'}>
              <button
                className={`p-1 bg-white border rounded-md ${hoverOn ? 'opacity-100' : 'opacity-0'}`}
                onClick={handleCopyTexts}
              >
                <Copy />
              </button>
            </ToolTip>
            {/* effects */}
            <ToolTip title="Apply Effects">
              <button
                className={`p-1 bg-white border rounded-md ${hoverOn ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundColor: 'orange' }}
                onClick={(e) => e.stopPropagation()}
              >
                <Effect className="w-3 h-3" />
              </button>
            </ToolTip>

            {/* tags */}
            {'tags' in task ? (
              <ToolTip title="Tags">
                <div
                  className={`bg-white border rounded-md ${hoverOn ? 'opacity-100' : 'opacity-0'}`}
                  onClick={(e) => e.preventDefault()}
                >
                  <ManageTagsDropdown entityId={task.id} tagsArr={task.tags as Tag[]} entityType="task" />
                </div>
              </ToolTip>
            ) : null}

            {/* show create subtask field */}
            {task.descendants_count < 1 && level < MAX_SUBTASKS_LEVEL && (
              <ToolTip title="Subtask">
                <button
                  className={`p-1 bg-white border rounded-md ${hoverOn ? 'opacity-100' : 'opacity-0'}`}
                  onClick={(e) => onShowAddSubtaskField(e, task.id)}
                >
                  <SubtasksIcon className="w-3 h-3" />
                </button>
              </ToolTip>
            )}
            <ToolTip title="Enhance View">
              <button
                className={`p-1 pl-4 bg-white rounded-md ${hoverOn ? 'opacity-100' : 'opacity-0'}`}
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
            styles={style}
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

      {showChildren ? (
        <SubTasks
          paddingLeft={DEFAULT_LEFT_PADDING + paddingLeft}
          listId={listId}
          parentTask={task}
          columns={columns}
          isSplitSubtask={isSplitSubtask}
          level={level + 1}
        />
      ) : null}
    </>
  );
}
