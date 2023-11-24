import { IFavorites, IHub, IHubDetails, IList, IWallet } from '../features/hubs/hubs.interfaces';
import { EntityType } from './EntityTypes/EntityType';
import { pages } from '../app/constants/pages';

const generateViewsUrl = (
  id: string,
  viewId: string,
  item?: IList | IWallet | IHub | IFavorites | IHubDetails | undefined,
  entityType?: string
) => {
  const initialActivePlaceId: string | null = (JSON.parse(localStorage.getItem('activePlaceIdLocale') as string) ||
    null) as string | null;
  let entityTypeAndId = '';

  if (!id) return;

  if (entityType === EntityType.hub || (item as IFavorites).model_type === EntityType.hub) {
    if (initialActivePlaceId == pages.ALSO_HR) {
      entityTypeAndId = `hr/h/${id}`;
    } else {
      entityTypeAndId = `tasks/h/${id}/v/${viewId}`;
    }
  } else if (
    entityType === EntityType.wallet ||
    (item as IWallet).type === EntityType.wallet ||
    (item as IFavorites).model_type === EntityType.wallet
  ) {
    entityTypeAndId = `tasks/w/${id}/v/${viewId}`;
  } else if (
    entityType === EntityType.list ||
    (item as IHub).type === EntityType.list ||
    (item as IFavorites).model_type === EntityType.list
  ) {
    entityTypeAndId = `tasks/l/${id}/v/${viewId}`;
  }

  return entityTypeAndId as string;
};

export { generateViewsUrl };
