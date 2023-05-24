import { ITaskFullList } from '../../../features/task/interface.tasks';

// const generateLists = (tasks: ITaskFullList[]): Record<string, ITaskFullList[]> => {
//   const lists: Record<string, ITaskFullList[]> = {};

//   tasks.forEach((task) => {
//     const listId = task.list_id;

//     if (listId in lists) {
//       lists[listId] = [...lists[listId], task];
//     } else {
//       lists[listId] = [task];
//     }
//   });

//   return lists;
// };

export const generateLists = (tasks: ITaskFullList[]): Record<string, ITaskFullList[]> =>
  tasks.reduce((lists: Record<string, ITaskFullList[]>, task) => {
    const listId = task.list_id;

    if (!lists[listId]) {
      lists[listId] = [];
    }

    lists[listId].push(task);

    return lists;
  }, {});
