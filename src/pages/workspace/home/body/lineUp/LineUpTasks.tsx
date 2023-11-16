import React from 'react';
import StatusDropdown from '../../../../../components/status/StatusDropdown';
import { Task } from '../../../../../features/task/interface.tasks';

interface ILineUpTasks {
  lineUp: Task[];
  handleRemoveLineUpTask: (task: Task) => void;
}

export default function LineUpTasks({ lineUp, handleRemoveLineUpTask }: ILineUpTasks) {
  return lineUp.map((task) => (
    <div key={task.id} className="bg-alsoit-gray-50 rounded-sm p-1 pt-2 px-2" style={{ minWidth: '253px' }}>
      <div className="group flex justify-between space-x-4 shadow-md bg-white p-1 pl-4 rounded-sm ">
        <div className="flex items-center space-x-4">
          <div className="pointer-events-none">
            <StatusDropdown task={task} taskCurrentStatus={task.status} taskStatuses={task.task_statuses} />
          </div>
          <h1 className="mb-1 truncate" style={{ maxWidth: '150px' }}>
            {task.name}
          </h1>
        </div>
        <p
          className="opacity-0 group-hover:opacity-100 pr-2 cursor-pointer"
          onClick={() => handleRemoveLineUpTask(task)}
        >
          x
        </p>
      </div>
    </div>
  ));
}
