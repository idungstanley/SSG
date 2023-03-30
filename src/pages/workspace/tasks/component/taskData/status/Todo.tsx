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
      className="absolute top-0 flex flex-col justify-center w-20 h-full px-1 text-xs font-medium text-center text-white capitalize bg-gray-400"
      style={{ marginLeft: '-30px' }}
      onClick={() => handleTaskStatus(task?.id as string)}
    >
      <StatusNameDropdown TaskCurrentStatus={task?.status} statusName={taskColField as string} />
    </div>
  );
}
