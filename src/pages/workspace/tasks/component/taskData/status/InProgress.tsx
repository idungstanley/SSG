import React from 'react';
import StatusNameDropdown from '../../../../../../components/status/StatusNameDropdown';
import { renderDataProps } from '../DataRenderFunc';
import { useAppDispatch } from '../../../../../../app/hooks';
import { setCurrentTaskStatusId } from '../../../../../../features/task/taskSlice';
import { Status } from '../../../../../../features/task/interface.tasks';

export default function InProgress({ taskColField, task }: renderDataProps) {
  const dispatch = useAppDispatch();

  const handleTaskStatus = (id: string) => {
    dispatch(setCurrentTaskStatusId(id));
  };
  return (
    <div
      className="w-full items-center top-0 flex flex-col justify-center h-full px-1 text-xs font-medium text-center text-white capitalize bg-purple-500"
      onClick={() => handleTaskStatus(task?.id as string)}
    >
      {task ? (
        <StatusNameDropdown
          TaskCurrentStatus={task.status}
          statusName={taskColField as Status}
          parentId={task.list_id}
        />
      ) : null}
    </div>
  );
}
