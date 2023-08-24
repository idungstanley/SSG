import React from 'react';
import PriorityDropdown from '../../../../../../components/priority/PriorityDropdown';
import { setCurrentTaskPriorityId, setSelectedListId } from '../../../../../../features/task/taskSlice';
import { useAppDispatch } from '../../../../../../app/hooks';
import { renderDataProps } from '../DataRenderFunc';

export default function TaskPriority({ task }: renderDataProps) {
  const dispatch = useAppDispatch();

  const handleTaskPriority = (id: string | undefined, listId: string) => {
    dispatch(setCurrentTaskPriorityId(id));
    dispatch(setSelectedListId(listId));
  };

  return (
    <div
      className="relative mt-2 border-gray-300 border-dotted "
      onClick={() => handleTaskPriority(task?.id as string, task?.list_id as string)}
    >
      <PriorityDropdown taskCurrentPriority={task?.priority} />
    </div>
  );
}
