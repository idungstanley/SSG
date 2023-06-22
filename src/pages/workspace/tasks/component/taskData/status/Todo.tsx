import React from 'react';
import { useAppDispatch } from '../../../../../../app/hooks';
import { ImyTaskData, setCurrentTaskStatusId } from '../../../../../../features/task/taskSlice';
import StatusNameDropdown from '../../../../../../components/status/StatusNameDropdown';
import { Status } from '../../../../../../features/task/interface.tasks';

export default function Todo({ taskColField, task }: { task?: ImyTaskData; taskColField: Status }) {
  const dispatch = useAppDispatch();

  const handleTaskStatus = (id: string) => {
    dispatch(setCurrentTaskStatusId(id));
  };
  return (
    <div
      className="w-full flex flex-col items-center justify-center h-full text-xs font-medium text-center text-white capitalize bg-gray-400"
      onClick={() => handleTaskStatus(task?.id as string)}
    >
      {task ? <StatusNameDropdown TaskCurrentStatus={task.status} statusName={taskColField} /> : null}
    </div>
  );
}
