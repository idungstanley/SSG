import { IFavorites, IHub, IList, IWallet } from '../features/hubs/hubs.interfaces';
import { EntityType } from './EntityTypes/EntityType';
import { pages } from '../app/constants/pages';

const generateViewsUrl = (id: string, item?: IList | IWallet | IHub | IFavorites, entityType?: string) => {
  const initialActivePlaceId: string | null = (JSON.parse(localStorage.getItem('activePlaceIdLocale') as string) ||
    null) as string | null;
  const initialActiveViewId: string | null = (JSON.parse(localStorage.getItem('activeViewIdLocale') as string) ||
    null) as string | null;
  let entityTypeAndId = '';

  if (!id) return;

  if (entityType === EntityType.hub || (item as IFavorites).model_type === EntityType.hub) {
    if (initialActivePlaceId == pages.ALSO_HR) {
      entityTypeAndId = `hr/h/${id}`;
    } else {
      entityTypeAndId =
        !(item as IHub).parent_id || (item as IFavorites).model_type === EntityType.hub
          ? `tasks/h/${id}/v/${initialActiveViewId}`
          : `tasks/sh/${id}/v/${initialActiveViewId}`;
    }
  } else if ((item as IWallet).type === EntityType.wallet || (item as IFavorites).model_type === EntityType.wallet) {
    entityTypeAndId = `tasks/w/${id}/v/${initialActiveViewId}`;
  } else if ((item as IHub).type === EntityType.list || (item as IFavorites).model_type === EntityType.list) {
    entityTypeAndId = `tasks/l/${id}/v/${initialActiveViewId}`;
  }

  return entityTypeAndId as string;
};

export { generateViewsUrl };
