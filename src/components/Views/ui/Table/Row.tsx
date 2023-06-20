import { useState } from 'react';
import SubtasksIcon from '../../../../assets/icons/SubtasksIcon';
import { Tag, Task } from '../../../../features/task/interface.tasks';
import { DEFAULT_LEFT_PADDING } from '../../config';
import { Column } from '../../types/table';
import { AddTask } from '../AddTask/AddTask';
import { Col } from './Col';
import { StickyCol } from './StickyCol';
import { SubTasks } from './SubTasks';
import { useDraggable } from '@dnd-kit/core';
import { MdDragIndicator } from 'react-icons/md';
import { ManageTagsDropdown } from '../../../Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';
import TaskTag from '../../../Tag/ui/TaskTag';
import { tagItem } from '../../../../pages/workspace/tasks/component/taskData/DataRenderFunc';

interface RowProps {
  task: Task;
  columns: Column[];
  paddingLeft?: number;
}

export function Row({ task, columns, paddingLeft = 0 }: RowProps) {
  const [showNewTaskField, setShowNewTaskField] = useState(false);
  const otherColumns = columns.slice(1);

  const [showSubTasks, setShowSubTasks] = useState(false);

  const onShowAddSubtaskField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowNewTaskField(true);
  };

  const onCloseAddTaskFIeld = () => {
    setShowNewTaskField(false);
    setShowSubTasks(true);
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id
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
          style={{ zIndex: 3 }}
          task={task}
          paddingLeft={paddingLeft}
          tags={
            'tags' in task ? <TaskTag tags={task.tags as tagItem[]} entity_id={task.id} entity_type="task" /> : null
          }
          dragElement={
            <span ref={setNodeRef} {...listeners} {...attributes}>
              <MdDragIndicator
                className="text-lg text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100"
                style={{ marginLeft: '-2px', marginRight: '-2.5px' }}
              />
            </span>
          }
        >
          {/* actions */}
          <div className="absolute opacity-0 group-hover:opacity-100 top-0 bottom-0 right-0 flex space-x-1 items-center justify-center">
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
            style={{ zIndex: 2 }}
          />
        ))}
      </tr>

      {showNewTaskField ? (
        <AddTask
          columns={otherColumns}
          paddingLeft={DEFAULT_LEFT_PADDING + paddingLeft}
          parentId={task.id}
          onClose={onCloseAddTaskFIeld}
        />
      ) : null}

      {showSubTasks ? (
        <SubTasks paddingLeft={DEFAULT_LEFT_PADDING + paddingLeft} parentId={task.id} columns={columns} />
      ) : null}
    </>
  );
}
