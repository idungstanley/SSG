import { useEffect, useRef, useState } from 'react';
import SubtasksIcon from '../../../../assets/icons/SubtasksIcon';
import { ITaskFullList, Tag, Task } from '../../../../features/task/interface.tasks';
import { DEFAULT_LEFT_PADDING } from '../../config';
import { Column } from '../../types/table';
import { Col } from './Col';
import { StickyCol } from './StickyCol';
import { SubTasks } from './SubTasks';
import { useDraggable } from '@dnd-kit/core';
import { MdDragIndicator } from 'react-icons/md';
import { ManageTagsDropdown } from '../../../Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';
import { AddSubTask } from '../AddTask/AddSubTask';
import TaskTag from '../../../Tag/ui/TaskTag';
import dradnddrop from '../../../../assets/icons/dradnddrop.svg';
import { useAppSelector } from '../../../../app/hooks';
import Effect from '../../../../assets/icons/Effect';

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
  const [showNewTaskField, setShowNewTaskField] = useState(false);
  const otherColumns = columns.slice(1);
  const [showSubTasks, setShowSubTasks] = useState(false);

  // const selectedRef = useRef<HTMLTableRowElement>(null);
  // useEffect(() => {
  //   // Scroll to the selected item when the component mounts
  //   if (selectedRef.current) {
  //     selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  //   }
  // }, []);

  const newSubTask: ITaskFullList = {
    archived_at: null,
    assignees: undefined,
    avatar_path: '',
    created_at: '',
    custom_fields: [],
    deleted_at: null,
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

  const onShowAddSubtaskField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowNewTaskField(!showNewTaskField);
  };

  const onCloseAddTaskFIeld = () => {
    setShowNewTaskField(false);
    // setShowSubTasks(true);
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

      <tr style={style} className="contents group">
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
            <span ref={setNodeRef} {...listeners} {...attributes}>
              <img
                src={dradnddrop}
                alt="drabable"
                className="text-lg text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100"
              />
            </span>
          }
        >
          {/* actions */}
          <div className="absolute opacity-0 group-hover:opacity-100 top-0 bottom-0 right-0 flex space-x-1 mr-1 items-center justify-center">
            {/* effects */}
            <button className="p-1 border rounded-lg text-gray-400" onClick={(e) => e.stopPropagation()}>
              <Effect />
            </button>

            {/* tags */}
            {'tags' in task ? (
              <ManageTagsDropdown entityId={task.id} tagsArr={task.tags as Tag[]} entityType="task" />
            ) : null}

            {/* show create subtask field */}
            <button className="p-1 border rounded-lg text-gray-400" onClick={onShowAddSubtaskField}>
              <SubtasksIcon className="h-4 w-4" />
            </button>
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

      {showNewTaskField ? (
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
