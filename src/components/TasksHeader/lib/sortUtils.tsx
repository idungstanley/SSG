import { useAppSelector } from '../../../app/hooks';
import { Task, TaskKey, TaskValue } from '../../../features/task/interface.tasks';

const stringifyValue = (value: unknown) => (typeof value === 'object' ? JSON.stringify(value) : String(value));

export const sortTasks = (key: TaskKey, tasks: Task[]) => {
  const sortedTasks: Record<string, Task[]> = {};

  tasks.forEach((task) => {
    if ('tags' in task) {
      const values = task[key];

      if (Array.isArray(values)) {
        values.forEach((value) => {
          const stringValue = stringifyValue(value);

          if (sortedTasks[stringValue]) {
            sortedTasks[stringValue].push(task);
          } else {
            sortedTasks[stringValue] = [task];
          }
        });
      } else {
        const stringValue = stringifyValue(values);

        if (sortedTasks[stringValue]) {
          sortedTasks[stringValue].push(task);
        } else {
          sortedTasks[stringValue] = [task];
        }
      }
    }
  });

  return { sortedTasks };
};

const DEFAULT = 'none';

export const parseLabel = (value: string): string => {
  let label: TaskValue = DEFAULT;

  try {
    const parsed = JSON.parse(value);
    label = parsed;
  } catch {
    label = value;
  }

  if (!label) {
    return DEFAULT;
  }

  const { sortType } = useAppSelector((state) => state.task);

  switch (sortType) {
    case 'assignees': {
      if (typeof label === 'object' && 'name' in label) {
        return label.name as TaskKey;
      } else {
        return DEFAULT;
      }
    }
    default: {
      // priority, status
      return typeof label === 'string' ? label : DEFAULT;
    }
  }
};
