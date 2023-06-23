import React from 'react';
import StatusNameDropdown from '../../../../../../components/status/StatusNameDropdown';
import { setCurrentTaskStatusId } from '../../../../../../features/task/taskSlice';
import { useAppDispatch } from '../../../../../../app/hooks';
import { renderDataProps } from '../DataRenderFunc';
import { Status } from '../../../../../../features/task/interface.tasks';

export default function Completed({ taskColField, task }: renderDataProps) {
  const dispatch = useAppDispatch();

  const handleTaskStatus = (id: string) => {
    dispatch(setCurrentTaskStatusId(id));
  };

  return (
    <div
      className="capitalize text-xs font-medium bg-green-500 text-white px-1 w-full items-center text-center h-full top-0 flex flex-col justify-center"
      onClick={() => handleTaskStatus(task?.id as string)}
    >
      {task ? <StatusNameDropdown TaskCurrentStatus={task.status} statusName={taskColField as Status} /> : null}
    </div>
  );
}
