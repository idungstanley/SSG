import { useState } from 'react';
import SubtasksIcon from '../../../../assets/icons/SubtasksIcon';
import { Tag, Task } from '../../../../features/task/interface.tasks';
import { DEFAULT_LEFT_PADDING } from '../../config';
import { Col } from '../Table/Col';
import { StickyCol } from '../Table/StickyCol';
import { SubTasks } from '../Table/SubTasks';
import { useDraggable } from '@dnd-kit/core';
import { MdDragIndicator } from 'react-icons/md';
import { ManageTagsDropdown } from '../../../Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';
import { Tags } from '../../../Tag';
import { useAppSelector } from '../../../../app/hooks';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';

interface RowProps {
  task: Task;
  columns: listColumnProps[];
  listId: string;
  paddingLeft?: number;
  parentId?: string;
  isListParent: boolean;
  taskStatusId?: string;
  handleClose?: () => void | void;
}

export function AddSubTask({
  task,
  columns,
  listId,
  paddingLeft,
  parentId,
  taskStatusId,
  isListParent,
  handleClose
}: RowProps) {
  const { subtaskDefaultStatusId } = useAppSelector((state) => state.task);

  const [showSubTasks, setShowSubTasks] = useState(false);

  const [hoverOn, setHoverOn] = useState(false);

  const otherColumns = columns.slice(1);

  const onShowAddSubtaskField = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    // setShowNewTaskField(true);
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
          hoverOn={hoverOn}
          setHoverOn={setHoverOn}
          showSubTasks={showSubTasks}
          setShowSubTasks={setShowSubTasks}
          style={{ zIndex: 3 }}
          task={task}
          isListParent={isListParent}
          parentId={parentId as string}
          taskStatusId={(subtaskDefaultStatusId as string) || taskStatusId}
          onClose={handleClose}
          paddingLeft={paddingLeft}
          tags={'tags' in task ? <Tags tags={task.tags} taskId={task.id} /> : null}
          dragElement={
            <span ref={setNodeRef} {...listeners} {...attributes}>
              <MdDragIndicator
                className="text-lg text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100"
                style={{ marginLeft: '-6px', marginRight: '-2.5px' }}
              />
            </span>
          }
          selectedRow={false}
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
            selectedRow={false}
          />
        ))}
      </tr>

      {showSubTasks ? (
        <SubTasks listId={listId} paddingLeft={DEFAULT_LEFT_PADDING} parentTask={task} columns={columns} level={0} />
      ) : null}
    </>
  );
}
