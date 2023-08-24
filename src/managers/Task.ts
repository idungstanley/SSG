import { ITaskFullList } from '../features/task/interface.tasks';

export const taskPriorityUpdateManager = (
  taskIds: string[],
  listIds: string[],
  tasks: Record<string, ITaskFullList[]>,
  newPriority: string
) => {
  if (listIds.length) {
    const updatedTasks = { ...tasks };

    for (let i = 0; i < listIds.length; i++) {
      updatedTasks[listIds[i]] = updatedTasks[listIds[i]].map((task) => {
        if (taskIds.includes(task.id)) {
          return {
            ...task,
            priority: newPriority
          };
        }
        return task;
      });
    }
    return updatedTasks;
  }

  return tasks;
};
