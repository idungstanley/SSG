import { IField } from '../features/list/list.interfaces';
import { ITaskFullList } from '../features/task/interface.tasks';

export const generateLists = (tasks: ITaskFullList[], fields?: IField[]): Record<string, ITaskFullList[]> =>
  tasks.reduce((lists: Record<string, ITaskFullList[]>, task) => {
    const listId = task.list_id;

    if (!lists[listId]) {
      lists[listId] = [];
    }

    lists[listId].push({ ...task, custom_field_columns: fields || [] });

    return lists;
  }, {});

export const generateSubtasksArray = (lists: Record<string, ITaskFullList[]>): ITaskFullList[] => {
  const newSubtasksArr: ITaskFullList[] = [];
  Object.keys(lists).forEach((listId) => {
    lists[listId].forEach((task) => {
      if (task?.descendants) {
        (task.descendants as ITaskFullList[]).forEach((sub) => {
          const parentName = newSubtasksArr.find((i) => i.id === sub.parent_id)?.name;
          newSubtasksArr.push({
            ...sub,
            parentName: parentName ? parentName : task.name,
            list_id: task.list_id
          });
        });
      }
    });
  });
  return newSubtasksArr;
};

export const generateSubtasksList = (tasks: ITaskFullList[], fields?: IField[]): Record<string, ITaskFullList[]> =>
  tasks.reduce((lists: Record<string, ITaskFullList[]>, task) => {
    const parentId = task.parent_id as string;
    const childrenCount = tasks.filter((t) => t.parent_id === task.id).length;

    if (!lists[parentId]) {
      lists[parentId] = [];
    }

    lists[parentId].push({
      ...task,
      descendants_count: childrenCount,
      custom_field_columns: fields || []
    });

    return lists;
  }, {});
