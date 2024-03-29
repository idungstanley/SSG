import { useState, useMemo, useRef, useEffect } from 'react';
import SubtasksIcon from '../../../../assets/icons/SubtasksIcon';
import { ITaskFullList, Tag, Task } from '../../../../features/task/interface.tasks';
import { DEFAULT_LEFT_PADDING } from '../../config';
import { Col } from './Col';
import { StickyCol } from './StickyCol';
import { SubTasks } from './SubTasks';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { ManageTagsDropdown } from '../../../Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';
import { AddSubTask } from '../AddTask/AddSubTask';
import TaskTag from '../../../Tag/ui/TaskTag';
import Effect from '../../../../assets/icons/Effect';
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
import { findExpandedLevels } from '../../../../pages/workspace/lists/components/renderlist/listDetails/listSubtask/ListSubtasks';
import NewSubTaskTemplate from './newTaskTemplate/NewSubTaskTemplate';
import Badges from '../../../badges';
import TaskSettingsDropDown from './TaskSettingsDropdown';

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
  selectedRow: boolean;
  selectionArr?: ITaskFullList[];
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
  isBlockedShowChildren,
  selectedRow,
  selectionArr
}: RowProps) {
  const dispatch = useAppDispatch();

  const {
    showNewTaskField,
    showNewTaskId,
    toggleAllSubtask,
    toggleAllSubtaskSplit,
    splitSubTaskLevels,
    subtasks,
    rootTaskIds,
    saveSettingOnline,
    keyBoardSelectedIndex
  } = useAppSelector((state) => state.task);

  const [showSubTasks, setShowSubTasks] = useState(false);
  const [isCopied, setIsCopied] = useState<number>(0);
  const [eitableContent, setEitableContent] = useState(false);

  const rowRef = useRef<HTMLTableRowElement | null>(null);

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
    pointerEvents: transform ? 'none' : '',
    height:
      saveSettingOnline?.singleLineView && !saveSettingOnline?.CompactView
        ? '42px'
        : saveSettingOnline?.CompactView && saveSettingOnline?.singleLineView
        ? '25px'
        : '',
    maxHeight: 'max-content'
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

  const toggleRootTasks = (rootTaskIds as string[])?.includes(task.id);

  useEffect(() => {
    const selectedTaskRow = rowRef.current?.querySelector(
      `tr[data-select="${selectionArr && keyBoardSelectedIndex && selectionArr[keyBoardSelectedIndex]?.id}"]`
    );

    if (selectedTaskRow) {
      requestAnimationFrame(() => {
        selectedTaskRow.scrollIntoView({ behavior: 'smooth', block: 'end' });
      });
    }
  }, [keyBoardSelectedIndex, selectionArr]);

  return (
    <>
      {/* current task */}
      <tr
        ref={rowRef}
        data-select={task.id}
        className="relative contents group dNFlex"
        // onMouseEnter={() => {
        //   dispatch(setAssignOnHoverTask(task));
        //   dispatch(setAssignOnHoverListId(task.parent_id ?? task.list_id));
        // }}
        // onMouseLeave={() => {
        //   dispatch(setAssignOnHoverTask(''));
        // }}
      >
        <StickyCol
          eitableContent={eitableContent}
          setEitableContent={setEitableContent}
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
          selectedRow={selectedRow}
        >
          {/* actions */}
          <ToolTip title={isCopied === 0 ? 'Copy Task Name' : 'Copied'}>
            <button
              className={`relative mr-0.5 h-full opacity-0 group-hover:opacity-100 ${
                saveSettingOnline?.CompactView ? 'bottom-1' : 'bottom-2'
              }`}
              onClick={handleCopyTexts}
            >
              <Copy />
            </button>
          </ToolTip>
          <div className="flex items-center justify-center mr-1 space-x-1">
            {level < MAX_SUBTASKS_LEVEL ? (
              <Badges setShowSubtasks={setShowSubTasks} showSubtasks={showSubTasks} task={task} />
            ) : null}
            {/* Copy */}
            {/* effects */}
            <ToolTip title="Apply Effects">
              <button
                className="p-1 hover:bg-white border rounded-md opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: 'orange' }}
                onClick={(e) => e.stopPropagation()}
              >
                <Effect className={saveSettingOnline?.CompactView ? 'w-2 h-2' : 'w-3 h-3'} />
              </button>
            </ToolTip>
            {/* tags */}
            {'tags' in task ? (
              <ToolTip title="Tags">
                <div
                  className="hover:bg-white rounded-md opacity-0 group-hover:opacity-100"
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
                  className="p-1 hover:bg-white border rounded-md opacity-0 group-hover:opacity-100"
                  onClick={(e) => onShowAddSubtaskField(e, task.id)}
                >
                  <SubtasksIcon className={saveSettingOnline?.CompactView ? 'w-2 h-2' : 'w-3 h-3'} />
                </button>
              </ToolTip>
            )}
            <TaskSettingsDropDown setEitableContent={setEitableContent} task={task} />
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
            selectedRow={selectedRow}
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
