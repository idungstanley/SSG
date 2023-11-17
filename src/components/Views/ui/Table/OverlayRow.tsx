import { useState } from 'react';
import SubtasksIcon from '../../../../assets/icons/SubtasksIcon';
import { Tag, Task } from '../../../../features/task/interface.tasks';
import { ManageTagsDropdown } from '../../../Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';
import TaskTag from '../../../Tag/ui/TaskTag';
import { generateGrid } from '../../lib';
import { Col } from './Col';
import { StickyCol } from './StickyCol';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import Dradnddrop from '../../../../assets/icons/Dradnddrop';

interface OverlayRowProps {
  task: Task;
  columns: listColumnProps[];
}

export function OverlayRow({ task, columns }: OverlayRowProps) {
  const otherColumns = columns.slice(1);
  const [hoverOn, setHoverOn] = useState(false);

  return (
    <div style={{ minWidth: 500, display: 'grid', gridTemplateColumns: generateGrid(columns.length) }}>
      <StickyCol
        hoverOn={hoverOn}
        setHoverOn={setHoverOn}
        showSubTasks={false}
        setShowSubTasks={() => ({})}
        style={{ zIndex: 10 }}
        task={task}
        isListParent={false}
        paddingLeft={0}
        tags={
          'tags' in task ? (
            <div className="flex gap-3">
              {task.tags.map((tag) => (
                <TaskTag key={tag.id} tag={tag} entity_id={task.id} entity_type="task" />
              ))}
            </div>
          ) : null
        }
        dragElement={
          <span>
            <div className="text-lg text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100">
              <Dradnddrop />
            </div>
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
          <button className="p-1 border rounded-lg text-gray-400">
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
    </div>
  );
}
