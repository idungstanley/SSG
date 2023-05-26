import { useAppSelector } from '../../../app/hooks';
import { Task } from '../../../features/task/interface.tasks';

export const filterBySearchValue = (tasks: Task[]) => {
  const { searchValue } = useAppSelector((state) => state.task);

  const filteredTasks = tasks.filter((task) => task.name.toLowerCase().includes(searchValue.toLowerCase()));

  return { filteredTasks };
};
