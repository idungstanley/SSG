import { IList } from '../features/hubs/hubs.interfaces';
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

const removeTaskFromOldPlace = (
  draggableTask: ITaskFullList,
  newTasks: Record<string, ITaskFullList[]>,
  newSubtasks: Record<string, ITaskFullList[]>
) => {
  if (draggableTask.parent_id) {
    // search in subtasks
    const filteredArray = newSubtasks[draggableTask.parent_id].filter((task) => {
      task.id !== draggableTask.id;
    });
    if (filteredArray.length) {
      // if array is not empty update key
      newSubtasks[draggableTask.parent_id] = filteredArray;
    } else {
      // if array is empty remove key
      delete newSubtasks[draggableTask.parent_id];
    }
  } else {
    // search in tasks
    const filteredArray: ITaskFullList[] = [];
    newTasks[draggableTask.list_id].forEach((task) => {
      if (task.id !== draggableTask.id) {
        filteredArray.push(task);
      }
    });
    if (filteredArray.length) {
      // if array is not empty update key
      newTasks[draggableTask.list_id] = filteredArray;
    } else {
      // if array is empty remove key
      delete newTasks[draggableTask.list_id];
    }
  }
  return { newTasks, newSubtasks };
};

export const taskMoveToSubtaskManager = (
  draggableTask: ITaskFullList,
  dragOverTask: ITaskFullList,
  tasks: Record<string, ITaskFullList[]>,
  subtasks: Record<string, ITaskFullList[]>
) => {
  let updatedTasks = { ...tasks };
  let updatedSubtasks = { ...subtasks };

  // remove task from old place
  const { newTasks, newSubtasks } = removeTaskFromOldPlace(draggableTask, updatedTasks, updatedSubtasks);
  updatedTasks = newTasks;
  updatedSubtasks = newSubtasks;

  // add subtask to new task
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

export const taskMoveToListManager = (
  draggableTask: ITaskFullList,
  dragOverList: IList,
  tasks: Record<string, ITaskFullList[]>,
  subtasks: Record<string, ITaskFullList[]>
) => {
  let updatedTasks = { ...tasks };
  let updatedSubtasks = { ...subtasks };

  // remove task from old place
  const { newTasks, newSubtasks } = removeTaskFromOldPlace(draggableTask, updatedTasks, updatedSubtasks);
  updatedTasks = newTasks;
  updatedSubtasks = newSubtasks;

  // add task to new list
  if (updatedTasks[dragOverList.id]) {
    // if key was in store add new
    updatedTasks[dragOverList.id] = [
      ...updatedTasks[dragOverList.id],
      {
        ...draggableTask,
        parent_id: null,
        list_id: dragOverList.id
      }
    ];
  } else {
    // else create a new one
    updatedTasks[dragOverList.id] = [
      {
        ...draggableTask,
        parent_id: null,
        list_id: dragOverList.id
      }
    ];
  }

  return {
    updatedTasks,
    updatedSubtasks
  };
};
