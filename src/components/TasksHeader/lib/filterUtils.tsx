import { useAppSelector } from '../../../app/hooks';
import { Task } from '../../../features/task/interface.tasks';

export const filterBySearchValue = (tasks: Task[]) => {
  const { searchValue } = useAppSelector((state) => state.task);

  const filteredBySearch = tasks.filter((task) => task.name.toLowerCase().includes(searchValue.toLowerCase()));

  return { filteredBySearch };
};

export const filterByAssignee = (tasks: Task[]) => {
  const { assigneeIds } = useAppSelector((state) => state.task);

  if (!assigneeIds.length) {
    return { filteredByAssignee: tasks };
  }

  const filteredByAssignee = tasks.filter((i) => i.assignees?.filter((j) => assigneeIds.includes(j.id)).length);

  return { filteredByAssignee };
};
