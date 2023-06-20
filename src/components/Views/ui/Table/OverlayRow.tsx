import { MdDragIndicator } from 'react-icons/md';
import SubtasksIcon from '../../../../assets/icons/SubtasksIcon';
import { Tag, Task } from '../../../../features/task/interface.tasks';
import { tagItem } from '../../../../pages/workspace/tasks/component/taskData/DataRenderFunc';
import { ManageTagsDropdown } from '../../../Tag/ui/ManageTagsDropdown/ui/ManageTagsDropdown';
import TaskTag from '../../../Tag/ui/TaskTag';
import { generateGrid } from '../../lib';
import { Column } from '../../types/table';
import { Col } from './Col';
import { StickyCol } from './StickyCol';

interface OverlayRowProps {
  task: Task;
  columns: Column[];
}

export function OverlayRow({ task, columns }: OverlayRowProps) {
  const otherColumns = columns.slice(1);

  return (
    <div
      style={{ minWidth: 500, display: 'grid', gridTemplateColumns: generateGrid(columns.length) }}
      className="items-center bg-white h-10"
    >
      <StickyCol
        showSubTasks={false}
        setShowSubTasks={() => ({})}
        style={{ zIndex: 10 }}
        task={task}
        paddingLeft={0}
        tags={'tags' in task ? <TaskTag tags={task.tags as tagItem[]} entity_id={task.id} entity_type="task" /> : null}
        dragElement={
          <span>
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
        />
      ))}
    </div>
  );
}
