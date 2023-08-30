import { ITeamMembersAndGroup } from '../features/settings/teamMembersAndGroups.interfaces';
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
export const taskDateUpdateManager = (
  taskId: string,
  listId: string,
  tasks: Record<string, ITaskFullList[]>,
  dateType: string,
  newDate: string
) => {
  if (listId) {
    const updatedTasks = { ...tasks };

    updatedTasks[listId] = updatedTasks[listId].map((task) => {
      if (taskId === task.id) {
        if (dateType == 'start_date') {
          return {
            ...task,
            start_date: newDate
          };
        }
      }
      return task;
    });
    return updatedTasks;
  }

  return tasks;
};

export const taskAssignessUpdateManager = (
  taskId: string,
  listId: string,
  tasks: Record<string, ITaskFullList[]>,
  userData: ITeamMembersAndGroup,
  assign: boolean
) => {
  if (listId) {
    const updatedTasks = { ...tasks };

    updatedTasks[listId] = updatedTasks[listId].map((task) => {
      if (taskId === task.id) {
        const updatedAssignees = assign
          ? [...task.assignees, userData]
          : task.assignees.filter((item) => item.id !== userData.id);
        return {
          ...task,
          assignees: task.assignees.length
            ? (updatedAssignees as ITeamMembersAndGroup[])
            : ([userData] as ITeamMembersAndGroup[])
        };
      }
      return task;
    });
    return updatedTasks;
  }

  return tasks;
};
