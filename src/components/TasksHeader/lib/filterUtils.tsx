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
  const filteredByAssignee: Task[] = [];
  for (const task of tasks) {
    if (!task.assignees.length && assigneeIds.includes('ns')) {
      filteredByAssignee.push(task);
    }
    if (task.assignees.length) {
      for (const assign of task.assignees) {
        if (assigneeIds.includes(assign.id)) {
          filteredByAssignee.push(task);
        }
      }
    }
  }
  return { filteredByAssignee };
};
