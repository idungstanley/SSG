import { ITaskFullList } from '../features/task/interface.tasks';

export const generateLists = (tasks: ITaskFullList[]): Record<string, ITaskFullList[]> =>
  tasks.reduce((lists: Record<string, ITaskFullList[]>, task) => {
    const listId = task.list_id;

    if (!lists[listId]) {
      lists[listId] = [];
    }

    lists[listId].push(task);

    return lists;
  }, {});