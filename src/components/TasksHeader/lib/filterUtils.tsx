import { useAppSelector } from '../../../app/hooks';
import { Task } from '../../../features/task/interface.tasks';
import { isString } from '../../../utils/typeGuards';

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

export const filterByValues = (tasks: Task[]) => {
  const { filters } = useAppSelector((state) => state.task);

  if (!filters.length) {
    return { filteredByValues: tasks };
  }

  const filteredByValues = tasks.filter((task) =>
    filters.every((filter) => {
      const value = task[filter.key];

      switch (filter.option) {
        case 'is set': {
          return !!value;
        }
        case 'is not set': {
          return !value;
        }
        case 'is': {
          return isString(value) ? filter.values.includes(value) : false;
        }
        case 'is not': {
          return isString(value) ? !filter.values.includes(value) : false;
        }
      }
    })
  );

  return { filteredByValues };
};
