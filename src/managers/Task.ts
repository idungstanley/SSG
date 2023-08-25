import { IStatus, ITaskFullList } from '../features/task/interface.tasks';

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

export const taskStatusUpdateManager = (
  taskId: string,
  listId: string,
  tasks: Record<string, ITaskFullList[]>,
  newStatus: IStatus
) => {
  if (listId) {
    const updatedTasks = { ...tasks };

    updatedTasks[listId] = updatedTasks[listId].map((task) => {
      if (taskId === task.id) {
        return {
          ...task,
          status: newStatus
        };
      }
      return task;
    });
    return updatedTasks;
  }

  return tasks;
};
