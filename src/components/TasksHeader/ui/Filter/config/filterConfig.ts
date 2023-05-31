import { Filter } from '../types/filters';

export const filterConfig: Filter = {
  status: { options: ['is', 'is not'], values: ['todo', 'in progress', 'completed', 'archived'] },
  priority: { options: ['is', 'is not', 'is set', 'is not set'], values: ['low', 'normal', 'hight', 'urgent'] }
};
