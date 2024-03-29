import { IHubDetails } from '../features/hubs/hubs.interfaces';
import { IListDetails } from '../features/list/list.interfaces';
import { ITaskFullList } from '../features/task/interface.tasks';
import { IWalletDetails } from '../features/wallet/wallet.interfaces';

export const generateLists = (
  tasks: ITaskFullList[],
  details?: IHubDetails | IWalletDetails | IListDetails
): Record<string, ITaskFullList[]> =>
  tasks.reduce((lists: Record<string, ITaskFullList[]>, task) => {
    const listId = task.list_id;

    if (!lists[listId]) {
      lists[listId] = [];
    }

    lists[listId].push({
      ...task,
      task_statuses: details?.task_statuses || [],
      custom_field_columns: details?.custom_field_columns || []
    });

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
            list: task.list,
            parentName: parentName ? parentName : task.name,
            list_id: task.list_id
          });
        });
      }
    });
  });
  return newSubtasksArr;
};

export const generateSubtasksList = (
  tasks: ITaskFullList[],
  details?: IHubDetails | IWalletDetails | IListDetails
): Record<string, ITaskFullList[]> =>
  tasks.reduce((lists: Record<string, ITaskFullList[]>, task) => {
    const parentId = task.parent_id as string;
    const childrenCount = tasks.filter((t) => t.parent_id === task.id).length;

    if (!lists[parentId]) {
      lists[parentId] = [];
    }

    lists[parentId].push({
      ...task,
      list: task.list
        ? task.list
        : {
            id: details?.id || '',
            name: details?.name || '',
            color: details?.color as unknown as string
          },
      descendants_count: childrenCount,
      task_statuses: details?.task_statuses || [],
      custom_field_columns: details?.custom_field_columns || []
    });

    return lists;
  }, {});
