import { IList } from '../features/hubs/hubs.interfaces';
import { IField, IFieldValue, ITask_statuses } from '../features/list/list.interfaces';
import { ITeamMembersAndGroup } from '../features/settings/teamMembersAndGroups.interfaces';
import { IStatus, ITaskFullList } from '../features/task/interface.tasks';
import { ICustomField } from '../features/task/taskSlice';
import { Hub } from '../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { findCurrentList, updateListTasksCountManager } from './List';

export const addNewTaskManager = (
  tasks: Record<string, ITaskFullList[]>,
  taskFromData: ITaskFullList,
  custom_field_columns: IField[],
  task_statuses: ITask_statuses[]
): Record<string, ITaskFullList[]> => {
  const listId = taskFromData.list_id;
  if (listId) {
    const updatedTasks = { ...tasks };
    const newTask = {
      ...taskFromData,
      custom_field_columns,
      task_statuses,
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
  if (parentId && count >= 0) {
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
          return {
            ...task,
            [dateType]: newDate
          };
        }
        return task;
      });
    }
    return updatedTasks;
  }
  return tasks;
};

export const deleteTaskManager = (taskIds: string[], listIds: string[], tasks: Record<string, ITaskFullList[]>) => {
  if (listIds.length) {
    const updatedTasks: Record<string, ITaskFullList[]> = { ...tasks };
    for (let i = 0; i < listIds.length; i++) {
      if (taskIds.length) updatedTasks[listIds[i]] = tasks[listIds[i]]?.filter((task) => !taskIds.includes(task.id));
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

export const createCustomFieldColumnManager = (
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

export const updateCustomFieldColumnManager = (
  tasks: Record<string, ITaskFullList[]>,
  subtasks: Record<string, ITaskFullList[]>,
  customFieldColumnData: IField,
  parentId: string
) => {
  const updatedTasks = { ...tasks };
  const updatedSubtasks = { ...subtasks };

  if (updatedTasks[parentId]) {
    updatedTasks[parentId] = updatedTasks[parentId].map((task) => {
      const filteredCustomFieldColumns = task.custom_field_columns?.filter(
        (field) => field.id !== customFieldColumnData.id
      ) as IField[];
      return {
        ...task,
        custom_field_columns: [...filteredCustomFieldColumns, customFieldColumnData]
      };
    });
  }

  if (updatedSubtasks[parentId]) {
    updatedSubtasks[parentId] = updatedSubtasks[parentId].map((task) => {
      const filteredCustomFieldColumns = task.custom_field_columns?.filter(
        (field) => field.id !== customFieldColumnData.id
      ) as IField[];
      return {
        ...task,
        custom_field_columns: [...filteredCustomFieldColumns, customFieldColumnData]
      };
    });
  }

  return { updatedTasks, updatedSubtasks };
};

export const updateCustomFieldManager = (
  tasks: Record<string, ITaskFullList[]>,
  subtasks: Record<string, ITaskFullList[]>,
  customFieldData: { id: string; values: IFieldValue[] },
  taskId: string
) => {
  const updatedTasks = { ...tasks };
  const updatedSubtasks = { ...subtasks };

  Object.keys(updatedTasks).map((listId) => {
    updatedTasks[listId] = updatedTasks[listId].map((task) => {
      if (taskId === task.id) {
        const filteredCustomFields = task.custom_fields?.filter(
          (field) => field.id !== customFieldData.id
        ) as ICustomField[];
        return {
          ...task,
          custom_fields: [...filteredCustomFields, customFieldData]
        };
      }
      return task;
    });
  });

  Object.keys(updatedSubtasks).map((listId) => {
    updatedSubtasks[listId] = updatedSubtasks[listId].map((task) => {
      if (task.id === taskId) {
        const filteredCustomFields = task.custom_fields?.filter(
          (field) => field.id !== customFieldData.id
        ) as ICustomField[];
        return {
          ...task,
          custom_fields: [...filteredCustomFields, customFieldData]
        };
      }
      return task;
    });
  });

  return { updatedTasks, updatedSubtasks };
};

const removeTaskFromOldPlace = (
  draggableTask: ITaskFullList,
  newTasks: Record<string, ITaskFullList[]>,
  newSubtasks: Record<string, ITaskFullList[]>,
  hub: Hub[]
) => {
  let newTree = [...hub];

  if (draggableTask.parent_id) {
    // search in subtasks
    const filteredArray: ITaskFullList[] = [];
    newSubtasks[draggableTask.parent_id].forEach((task) => {
      if (task.id !== draggableTask.id) {
        filteredArray.push(task);
      }
    });
    if (filteredArray.length) {
      // if array is not empty update key
      newSubtasks[draggableTask.parent_id] = filteredArray;
    } else {
      // if array is empty remove key
      delete newSubtasks[draggableTask.parent_id];
    }
    // update count of subtasks for parent
    Object.keys(newSubtasks).forEach((id) => {
      newSubtasks[id] = newSubtasks[id].map((sub) => {
        if (sub.id === draggableTask.parent_id) {
          return {
            ...sub,
            descendants_count: sub.descendants_count - 1
          };
        }
        return sub;
      });
    });
    newTasks[draggableTask.list_id] = newTasks[draggableTask.list_id].map((task) => {
      if (task.id === draggableTask.parent_id) {
        return {
          ...task,
          descendants_count: task.descendants_count - 1
        };
      }
      return task;
    });
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
    // update count of tasks for parent list
    const listId = draggableTask.list_id;
    newTree = updateListTasksCountManager(listId as string, hub, newTasks[listId as string]?.length);
  }
  return { newTasks, newSubtasks, newTree };
};

export const taskMoveToSubtaskManager = (
  draggableTask: ITaskFullList,
  dragOverTask: ITaskFullList,
  tasks: Record<string, ITaskFullList[]>,
  subtasks: Record<string, ITaskFullList[]>,
  hub: Hub[]
) => {
  let updatedTasks = { ...tasks };
  let updatedSubtasks = { ...subtasks };
  let updatedTree = [...hub];

  // remove task from old place
  const { newTasks, newSubtasks, newTree } = removeTaskFromOldPlace(
    draggableTask,
    updatedTasks,
    updatedSubtasks,
    updatedTree
  );
  updatedTasks = newTasks;
  updatedSubtasks = newSubtasks;
  updatedTree = newTree;

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
  // update count of subtasks for parent
  Object.keys(newSubtasks).forEach((id) => {
    newSubtasks[id] = newSubtasks[id].map((sub) => {
      if (sub.id === dragOverTask.id) {
        return {
          ...sub,
          descendants_count: sub.descendants_count + 1
        };
      }
      return sub;
    });
  });
  updatedTasks[dragOverTask.list_id] = updatedTasks[dragOverTask.list_id].map((task) => {
    if (task.id === dragOverTask.id) {
      return {
        ...task,
        descendants_count: task.descendants_count + 1
      };
    }
    return task;
  });

  return {
    updatedTasks,
    updatedSubtasks,
    updatedTree
  };
};

export const taskMoveToListManager = (
  draggableTask: ITaskFullList,
  dragOverList: IList,
  tasks: Record<string, ITaskFullList[]>,
  subtasks: Record<string, ITaskFullList[]>,
  hub: Hub[]
) => {
  let updatedTasks = { ...tasks };
  let updatedSubtasks = { ...subtasks };
  let updatedTree = [...hub];

  // remove task from old place
  const { newTasks, newSubtasks, newTree } = removeTaskFromOldPlace(
    draggableTask,
    updatedTasks,
    updatedSubtasks,
    updatedTree
  );
  updatedTasks = newTasks;
  updatedSubtasks = newSubtasks;
  updatedTree = newTree;

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
  const listId = dragOverList.id;
  const currentList = findCurrentList(listId, updatedTree);
  updatedTree = updateListTasksCountManager(listId as string, updatedTree, currentList.tasks_count + 1);

  return {
    updatedTasks,
    updatedSubtasks,
    updatedTree
  };
};
