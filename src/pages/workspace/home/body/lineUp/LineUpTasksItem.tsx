import React from 'react';
import { Task } from '../../../../../features/task/interface.tasks';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Drag from '../../../../../assets/icons/Drag';
import StatusDropdown from '../../../../../components/status/StatusDropdown';

export default function LineUpTasksItem({
  task,
  handleRemoveLineUpTask
}: {
  task: Task;
  handleRemoveLineUpTask: (task: Task) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id
  });

  const style = {
    minWidth: '253px',
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div key={task.id} style={style} className="p-1 px-2 pt-2 rounded-sm bg-alsoit-gray-50">
      <div className="flex justify-between p-1 pl-4 space-x-4 bg-white rounded-sm shadow-md group ">
        <div className="flex items-center space-x-4">
          <div
            className=" text-xl text-gray-500 opacity-0 cursor-move left-1.5 group-hover:opacity-100"
            ref={setNodeRef}
            {...attributes}
            {...listeners}
          >
            <Drag />
          </div>
          <div className="pointer-events-none">
            <StatusDropdown taskCurrentStatus={task.status} taskStatuses={task.task_statuses} />
          </div>
          <h1 className="mb-1 truncate" style={{ maxWidth: '150px' }}>
            {task.name}
          </h1>
        </div>
        <p
          className="pr-2 opacity-0 cursor-pointer group-hover:opacity-100"
          onClick={() => handleRemoveLineUpTask(task)}
        >
          x
        </p>
      </div>
    </div>
  );
}
