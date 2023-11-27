import { useAppSelector } from '../../../app/hooks';
import { ITeamMembersAndGroup } from '../../../features/settings/teamMembersAndGroups.interfaces';
import { IStatus, Task, TaskKey, TaskValue } from '../../../features/task/interface.tasks';

const stringifyValue = (value: unknown) => (typeof value === 'object' ? JSON.stringify(value) : String(value));

const UNASSIGNED = 'unassigned';
const TASKS = 'tasks';
export const sortTypesConsts = {
  STATUS: 'status',
  ASSIGNEES: 'assignees',
  PRIORITY: 'priority',
  NONE: 'none'
};
export const sortTasks = (key: TaskKey, tasks: Task[]) => {
  tasks.sort((a, b) => a?.status?.position - b?.status?.position);
  const sortedTasks: Record<string, Task[]> = {};
  tasks.forEach((task) => {
    if ('tags' in task && key !== 'none') {
      const values = key === 'status' ? (task[key] as IStatus)?.name : task[key];
      if (Array.isArray(values)) {
        if (values.length > 0) {
          values.forEach((value) => {
            const userName = (value as ITeamMembersAndGroup).user.name ?? (value as ITeamMembersAndGroup).name;

            const stringValue = stringifyValue(userName);

            if (sortedTasks[stringValue]) {
              sortedTasks[stringValue].push(task);
            } else {
              sortedTasks[stringValue] = [task];
            }
          });
        } else {
          if (sortedTasks[UNASSIGNED]) {
            sortedTasks[UNASSIGNED].push(task);
          } else {
            sortedTasks[UNASSIGNED] = [task];
          }
        }
      } else {
        const stringValue = stringifyValue(values);
        if (sortedTasks[stringValue]) {
          sortedTasks[stringValue].push(task);
        } else {
          sortedTasks[stringValue] = [task];
        }
      }
    }
    if (key === 'none') {
      if (sortedTasks[TASKS]) {
        sortedTasks[TASKS].push(task);
      } else {
        sortedTasks[TASKS] = [task];
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
        return label as string;
      }
    }
    default: {
      // priority, status
      return typeof label === 'string' ? label : DEFAULT;
    }
  }
};
