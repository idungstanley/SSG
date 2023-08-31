import { useEffect, useState } from 'react';
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
import { IField } from '../../../../features/list/list.interfaces';

interface RowProps {
  task: Task;
  taskIndex?: number;
  columns: Column[];
  paddingLeft?: number;
  parentId?: string;
  isListParent: boolean;
  task_status?: string;
  handleClose?: VoidFunction;
  customFields?: IField[];
  isSplitSubtask?: boolean;
}

export function Row({
  task,
  columns,
  taskIndex,
  paddingLeft = 0,
  parentId,
  task_status,
  isListParent,
  handleClose,
  customFields,
  isSplitSubtask
}: RowProps) {
  const dispatch = useAppDispatch();

  const { showNewTaskField, showNewTaskId, toggleAllSubtask, splitSubTask } = useAppSelector((state) => state.task);

  const [showSubTasks, setShowSubTasks] = useState(toggleAllSubtask);

  useEffect(() => {
    setShowSubTasks(toggleAllSubtask);
  }, [toggleAllSubtask]);

  const otherColumns = columns.slice(1);

  const newSubTask: ITaskFullList = {
    archived_at: null,
    assignees: [],
    avatar_path: '',
    created_at: '',
    custom_fields: [],
    custom_field_columns: [],
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
      color: '#AEADAE',
      created_at: '',
      id: '',
      model_id: '',
      model_type: '',
      name: 'Todo',
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

      <tr style={style} className="contents relative group dNFlex">
        <StickyCol
          showSubTasks={showSubTasks}
          setShowSubTasks={setShowSubTasks}
          style={{ zIndex: 1, marginLeft: isSplitSubtask ? '-36px' : 0 }}
          isListParent={isListParent}
          task={task}
          taskIndex={taskIndex}
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
          <div className="opacity-0 absolute right-0 group-hover:opacity-100 flex items-center justify-center mr-1 space-x-1">
            {/* effects */}
            <ToolTip title="Apply Effects">
              <button className="p-1 border rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
                <Effect className="w-3 h-3" />
              </button>
            </ToolTip>

            {/* tags */}
            {'tags' in task ? (
              <ToolTip title="Tags">
                <ManageTagsDropdown entityId={task.id} tagsArr={task.tags as Tag[]} entityType="task" />
              </ToolTip>
            ) : null}

            {/* show create subtask field */}
            {task.descendants_count < 1 && (
              <ToolTip title="Subtask">
                <button className="p-1 border rounded-md bg-white" onClick={(e) => onShowAddSubtaskField(e, task.id)}>
                  <SubtasksIcon className="w-3 h-3" />
                </button>
              </ToolTip>
            )}
            <ToolTip title="Enhance View">
              <button className="p-1 pl-4 rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
                <Enhance className="w-3 h-3" />
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
            customFields={customFields}
          />
        ))}
      </tr>

      {showNewTaskField && showNewTaskId === task.id ? (
        <AddSubTask
          task={newSubTask}
          columns={columns}
          paddingLeft={splitSubTask ? 0 : DEFAULT_LEFT_PADDING + paddingLeft}
          isListParent={false}
          parentId={splitSubTask ? (task.parent_id as string) : task.id}
          task_status={task.status.id}
          handleClose={onCloseAddTaskFIeld}
        />
      ) : null}

      {showSubTasks && !splitSubTask ? (
        <SubTasks paddingLeft={DEFAULT_LEFT_PADDING + paddingLeft} parentId={task.id} columns={columns} />
      ) : null}
    </>
  );
}
