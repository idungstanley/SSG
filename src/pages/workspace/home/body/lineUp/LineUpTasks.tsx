import React from 'react';
import StatusDropdown from '../../../../../components/status/StatusDropdown';
import { Task } from '../../../../../features/task/interface.tasks';

interface ILineUpTasks {
  lineUp: Task[];
  handleRemoveLineUpTask: (task: Task) => void;
}

export default function LineUpTasks({ lineUp, handleRemoveLineUpTask }: ILineUpTasks) {
  return lineUp.map((task) => (
    <div key={task.id} className="p-1 px-2 pt-2 rounded-sm bg-alsoit-gray-50" style={{ minWidth: '253px' }}>
      <div className="flex justify-between p-1 pl-4 space-x-4 bg-white rounded-sm shadow-md group ">
        <div className="flex items-center space-x-4">
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
  ));
}
