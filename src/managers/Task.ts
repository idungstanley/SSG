import { IField } from '../features/list/list.interfaces';
import { ITeamMembersAndGroup } from '../features/settings/teamMembersAndGroups.interfaces';
import { IStatus, ITaskFullList } from '../features/task/interface.tasks';

export const addNewTaskManager = (
  tasks: Record<string, ITaskFullList[]>,
  taskFromData: ITaskFullList,
  custom_field_columns: IField[]
): Record<string, ITaskFullList[]> => {
  const listId = taskFromData.list_id;
  if (listId) {
    const updatedTasks = { ...tasks };
    const newTask = {
      ...taskFromData,
      custom_field_columns,
      descendants_count: 0
    };

    updatedTasks[listId] = [...updatedTasks[listId], newTask];

    return updatedTasks;
  }

  return tasks;
};

export const updateTaskSubtasksCountManager = (
  parentId: string,
  tasks: Record<string, ITaskFullList[]>,
  count: number
) => {
  if (parentId) {
    const updatedTasks = { ...tasks };

    Object.keys(updatedTasks).forEach((key) => {
      updatedTasks[key] = updatedTasks[key].map((task) => {
        if (task.id === parentId) {
          return {
            ...task,
            descendants_count: count
          };
        }
        return task;
      });
    });
    return updatedTasks;
  }
  return tasks;
};

export const taskPriorityUpdateManager = (
  taskIds: string[],
  listIds: string[],
  tasks: Record<string, ITaskFullList[]>,
  subtasks: Record<string, ITaskFullList[]>,
  newPriority: string
) => {
  if (listIds.length) {
    const updatedTasks = { ...tasks };
    const updatedSubtasks = { ...subtasks };
    const uniqListIds = [...new Set(listIds)];

    uniqListIds.forEach((id) => {
      if (updatedTasks[id]) {
        updatedTasks[id] = updatedTasks[id].map((task) => {
          if (taskIds.includes(task.id)) {
            return {
              ...task,
              priority: newPriority
            };
          }
          return task;
        });
      }

      if (updatedSubtasks[id]) {
        updatedSubtasks[id] = updatedSubtasks[id].map((task) => {
          if (taskIds.includes(task.id)) {
            return {
              ...task,
              priority: newPriority
            };
          }
          return task;
        });
      }
    });
    return { updatedTasks, updatedSubtasks };
  }
  return { tasks, subtasks };
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
  listIds: string[],
  tasks: Record<string, ITaskFullList[]>,
  dateType: string,
  newDate: string
) => {
  if (listIds.length) {
    const updatedTasks = { ...tasks };
    for (let i = 0; i < listIds.length; i++) {
      updatedTasks[listIds[i]] = updatedTasks[listIds[i]].map((task) => {
        if (taskId === task.id) {
          if (dateType === 'start_date') {
            return {
              ...task,
              start_date: newDate
            };
          }
        }
        return task;
      });
    }
    return updatedTasks;
  }
  return tasks;
};

export const taskAssignessUpdateManager = (
  taskIds: string[],
  listIds: string[],
  tasks: Record<string, ITaskFullList[]>,
  subtasks: Record<string, ITaskFullList[]>,
  userData: ITeamMembersAndGroup,
  assign: boolean
) => {
  if (listIds.length) {
    const updatedTasks = { ...tasks };
    const updatedSubtasks = { ...subtasks };
    const uniqListIds = [...new Set(listIds)];

    uniqListIds.forEach((id) => {
      if (updatedTasks[id]) {
        updatedTasks[id] = updatedTasks[id].map((task) => {
          if (taskIds.includes(task.id)) {
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
      }

      if (updatedSubtasks[id]) {
        updatedSubtasks[id] = updatedSubtasks[id].map((task) => {
          if (taskIds.includes(task.id)) {
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
      }
    });
    return { updatedTasks, updatedSubtasks };
  }

  return tasks;
};

export const updateCustomFieldsManager = (
  tasks: Record<string, ITaskFullList[]>,
  customFieldData: IField,
  taskId?: string
) => {
  const updatedTasks = { ...tasks };

  if (taskId) {
    updatedTasks[taskId] = updatedTasks[taskId].map((task) => {
      return {
        ...task,
        custom_field_columns: [customFieldData, ...task.custom_field_columns]
      };
    });
  } else {
    Object.keys(updatedTasks).map((listId) => {
      updatedTasks[listId] = updatedTasks[listId].map((task) => {
        return {
          ...task,
          custom_field_columns: [customFieldData, ...task.custom_field_columns]
        };
      });
    });
  }

  return updatedTasks;
};

export const taskMoveManager = (
  draggableTask: ITaskFullList,
  dragOverTask: ITaskFullList,
  tasks: Record<string, ITaskFullList[]>,
  subtasks: Record<string, ITaskFullList[]>
) => {
  const updatedTasks = { ...tasks };
  const updatedSubtasks = { ...subtasks };

  // remove task from old place logic
  if (draggableTask.parent_id) {
    // search in subtasks
    const filteredArray = updatedSubtasks[draggableTask.parent_id].filter((task) => {
      task.id !== draggableTask.id;
    });
    if (filteredArray.length) {
      // if array is not empty update key
      updatedSubtasks[draggableTask.parent_id] = filteredArray;
    } else {
      // if array is empty remove key
      delete updatedSubtasks[draggableTask.parent_id];
    }
  } else {
    // search in tasks
    const filteredArray: ITaskFullList[] = [];
    updatedTasks[draggableTask.list_id].forEach((task) => {
      if (task.id !== draggableTask.id) {
        filteredArray.push(task);
      }
    });
    if (filteredArray.length) {
      // if array is not empty update key
      updatedTasks[draggableTask.list_id] = filteredArray;
    } else {
      // if array is empty remove key
      delete updatedTasks[draggableTask.list_id];
    }
  }

  // add task on new place logic
  if (updatedSubtasks[dragOverTask.id]) {
    // if key was in store add new
    updatedSubtasks[dragOverTask.id] = [
      ...updatedSubtasks[dragOverTask.id],
      {
        ...draggableTask,
        parent_id: dragOverTask.id,
        list_id: dragOverTask.list_id
      }
    ];
  } else {
    // else create a new one
    updatedSubtasks[dragOverTask.id] = [
      {
        ...draggableTask,
        parent_id: dragOverTask.id,
        list_id: dragOverTask.list_id
      }
    ];
  }

  return {
    updatedTasks,
    updatedSubtasks
  };
};
