import { Filter } from '../types/filters';

export const filterConfig: Filter = {
  status: { options: ['is', 'not is'], values: ['completed', 'not completed'] },
  priority: { options: ['is', 'not is'], values: ['important', 'not important'] },
  assignees: { options: ['is', 'not is'], values: ['important', 'not important'] }
};
