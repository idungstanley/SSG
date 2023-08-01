import { useState } from 'react';
import SubtasksIcon from '../../../../assets/icons/SubtasksIcon';
import { ITaskFullList, Tag, Task } from '../../../../features/task/interface.tasks';
import { DEFAULT_LEFT_PADDING } from '../../config';
import { Column } from '../../types/table';
import { Col } from './Col';
import { StickyCol } from './StickyCol';
import { SubTasks } from './SubTasks';
import { useDraggable } from '@dnd-kit/core';
import { ManageTagsDropdown } from '../../../Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';
import { AddSubTask } from '../AddTask/AddSubTask';
import TaskTag from '../../../Tag/ui/TaskTag';
import Effect from '../../../../assets/icons/Effect';
import Enhance from '../../../badges/Enhance';
import { setShowNewTaskField, setShowNewTaskId } from '../../../../features/task/taskSlice';
import ToolTip from '../../../Tooltip/Tooltip';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import Dradnddrop from '../../../../assets/icons/Dradnddrop';

interface RowProps {
  task: Task;
  columns: Column[];
  paddingLeft?: number;
  parentId?: string;
  isListParent: boolean;
  task_status?: string;
  handleClose?: VoidFunction;
}

export function Row({ task, columns, paddingLeft = 0, parentId, task_status, isListParent, handleClose }: RowProps) {
  const otherColumns = columns.slice(1);
  const [showSubTasks, setShowSubTasks] = useState(false);
  const { showNewTaskField, showNewTaskId } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();

  const newSubTask: ITaskFullList = {
    archived_at: null,
    assignees: undefined,
    avatar_path: '',
    created_at: '',
    custom_fields: [],
    deleted_at: null,
    descendants_count: 0,
    checklist_items_count: 0,
    checklist_done_items_count: 0,
    has_attachments: false,
    description: null,
    directory_items: [],
    end_date: null,
    group_assignees: [],
    has_descendants: false,
    id: '0',
    list: {
      id: '',
      name: '',
      parents: { hubs: [], wallets: [], lists: [] }
    },
    list_id: '',
    name: 'Add Subtask',
    parent_id: null,
    priority: 'low',
    start_date: null,
    status: {
      color: task.status.color,
      created_at: '',
      id: '',
      model_id: '',
      model_type: '',
      name: task.status.name,
      position: '',
      type: '',
      updated_at: ''
    },
    tags: [],
    updated_at: ''
  };

  const onShowAddSubtaskField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, taskId: string) => {
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
    dispatch(setShowNewTaskId(''));
    dispatch(setShowNewTaskField(false));
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      isTask: true
    }
  });

  // hide element if is currently grabbing
  const style = {
    opacity: transform ? 0 : 100
  };

  return (
    <>
      {/* current task */}

      <tr style={style} className="contents group dNFlex">
        <StickyCol
          showSubTasks={showSubTasks}
          setShowSubTasks={setShowSubTasks}
          style={{ zIndex: 1 }}
          isListParent={isListParent}
          task={task}
          parentId={parentId as string}
          task_status={task_status as string}
          onClose={handleClose as VoidFunction}
          paddingLeft={paddingLeft}
          tags={'tags' in task ? <TaskTag tags={task.tags} entity_id={task.id} entity_type="task" /> : null}
          dragElement={
            <div ref={setNodeRef} {...listeners} {...attributes}>
              <div className="text-lg text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100">
                <Dradnddrop />
              </div>
            </div>
          }
        >
          {/* actions */}
          <div className=" dNone flex space-x-1 mr-1 items-center justify-center">
            {/* effects */}
            <ToolTip tooltip="Apply Effects">
              <button className="p-1 border rounded-md " onClick={(e) => e.stopPropagation()}>
                <Effect className="h-3 w-3" />
              </button>
            </ToolTip>

            {/* tags */}
            {'tags' in task ? (
              <ToolTip tooltip="Tags">
                <ManageTagsDropdown entityId={task.id} tagsArr={task.tags as Tag[]} entityType="task" />
              </ToolTip>
            ) : null}

            {/* show create subtask field */}
            {task.descendants_count < 1 && (
              <ToolTip tooltip="Subtask">
                <button className="p-1 border rounded-md " onClick={(e) => onShowAddSubtaskField(e, task.id)}>
                  <SubtasksIcon className="h-3 w-3" />
                </button>
              </ToolTip>
            )}
            <ToolTip tooltip="Enhance View">
              <button className="p-1 pl-4  " onClick={(e) => e.stopPropagation()}>
                <Enhance className="h-3 w-3" />
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

      {showNewTaskField && showNewTaskId == task.id ? (
        <AddSubTask
          task={newSubTask}
          columns={columns}
          paddingLeft={0}
          isListParent={false}
          parentId={task.id}
          task_status={task.status.id}
          handleClose={onCloseAddTaskFIeld}
        />
      ) : null}

      {showSubTasks ? (
        <SubTasks paddingLeft={DEFAULT_LEFT_PADDING + paddingLeft} parentId={task.id} columns={columns} />
      ) : null}
    </>
  );
}
