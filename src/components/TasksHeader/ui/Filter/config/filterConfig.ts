import { Filter } from '../types/filters';

export const filterConfig: Filter = {
  status: { options: ['is', 'is not'], values: ['completed', 'not completed'] },
  priority: { options: ['is', 'is not'], values: ['important', 'not important'] }
};
