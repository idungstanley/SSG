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
