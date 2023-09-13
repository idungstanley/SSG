import { IField } from '../features/list/list.interfaces';
import { ITaskFullList } from '../features/task/interface.tasks';

export const addNewSubtaskManager = (
  subtasks: Record<string, ITaskFullList[]>,
  taskFromData: ITaskFullList,
  custom_field_columns: IField[]
): Record<string, ITaskFullList[]> => {
  const parentId = taskFromData.parent_id;
  if (parentId) {
    let updatedTasks = { ...subtasks };
    const newTask = {
      ...taskFromData,
      custom_field_columns,
      descendants_count: 0
    };

    if (updatedTasks[parentId]) {
      updatedTasks[parentId] = [...updatedTasks[parentId], newTask];
    } else {
      updatedTasks = {
        ...updatedTasks,
        [parentId]: [newTask]
      };
    }

    // update the number of children a parent has
    Object.keys(updatedTasks).forEach((key) => {
      updatedTasks[key] = updatedTasks[key].map((task) => {
        if (task.id === parentId) {
          return {
            ...task,
            descendants_count: updatedTasks[parentId].length
          };
        }
        return task;
      });
    });

    return updatedTasks;
  }

  return subtasks;
};
