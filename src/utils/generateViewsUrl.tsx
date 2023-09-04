import { IFavorites, IHub, IList, IWallet } from '../features/hubs/hubs.interfaces';
import { EntityType } from './EntityTypes/EntityType';

const generateViewsUrl = (id: string, item?: IList | IWallet | IHub | IFavorites, entityType?: string) => {
  let entityTypeAndId = '';

  if (!id) return;

  if (entityType === EntityType.hub || (item as IFavorites).model_type === EntityType.hub) {
    entityTypeAndId =
      !(item as IHub).parent_id || (item as IFavorites).model_type === EntityType.hub
        ? `tasks/h/${id}`
        : `tasks/sh/${id}`;
  } else if ((item as IWallet).type === EntityType.wallet || (item as IFavorites).model_type === EntityType.wallet) {
    entityTypeAndId = `tasks/w/${id}`;
  } else if ((item as IHub).type === EntityType.list || (item as IFavorites).model_type === EntityType.list) {
    entityTypeAndId = `tasks/l/${id}`;
  }

  return entityTypeAndId as string;
};

export { generateViewsUrl };
