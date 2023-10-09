import { IHrHub } from '../features/hr/hubs.interfaces';
import { EntityType } from './EntityTypes/EntityType';

const generateHrViewsUrl = (id: string, item?: IHrHub, entityType?: string) => {
  let entityTypeAndId = '';

  if (!id) return;

  if (entityType === EntityType.hub) {
    entityTypeAndId = !(item as IHrHub).parent_id ? `hr/h/${id}` : `hr/sh/${id}`;
  }

  return entityTypeAndId as string;
};

export { generateHrViewsUrl };
