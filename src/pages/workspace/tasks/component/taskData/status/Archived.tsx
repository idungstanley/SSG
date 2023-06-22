import React from 'react';
import { renderDataProps } from '../DataRenderFunc';
import { useAppDispatch } from '../../../../../../app/hooks';
import { setCurrentTaskStatusId } from '../../../../../../features/task/taskSlice';
import StatusNameDropdown from '../../../../../../components/status/StatusNameDropdown';

export default function Archived({ taskColField, task }: renderDataProps) {
  const dispatch = useAppDispatch();

  const handleTaskStatus = (id: string) => {
    dispatch(setCurrentTaskStatusId(id));
  };
  return (
    <div
      className="flex flex-col w-full items-center justify-center h-full px-1 text-xs font-medium text-center text-white capitalize bg-yellow-500"
      onClick={() => handleTaskStatus(task?.id as string)}
    >
      {task ? <StatusNameDropdown TaskCurrentStatus={task.status} statusName={taskColField as string} /> : null}
    </div>
  );
}
