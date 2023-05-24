import React from 'react';
import { useAppDispatch } from '../../../../../../app/hooks';
import { setCurrentTaskStatusId } from '../../../../../../features/task/taskSlice';
import StatusNameDropdown from '../../../../../../components/status/StatusNameDropdown';
import { renderDataProps } from '../DataRenderFunc';

export default function Todo({ taskColField, task }: renderDataProps) {
  const dispatch = useAppDispatch();

  const handleTaskStatus = (id: string) => {
    dispatch(setCurrentTaskStatusId(id));
  };
  return (
    <div
      className="w-full flex flex-col items-center justify-center h-full text-xs font-medium text-center text-white capitalize bg-gray-400"
      onClick={() => handleTaskStatus(task?.id as string)}
    >
      <StatusNameDropdown TaskCurrentStatus={task?.status} statusName={taskColField as string} />
    </div>
  );
}
