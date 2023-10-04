import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setActiveItem } from '../features/workspace/workspaceSlice';
import { EntityType } from './EntityTypes/EntityType';
import { generateViewsUrl } from './generateViewsUrl';
import { IFavorites, IHub, IList, IWallet } from '../features/hubs/hubs.interfaces';

// function for the list shape selection
export const handleEntityLocation = (id: string, name: string, item?: IList | IWallet | IHub | IFavorites) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  dispatch(
    setActiveItem({
      activeItemType: EntityType.list,
      activeItemId: id,
      activeItemName: name
    })
  );
  const viewsUrl = generateViewsUrl(id, item, EntityType.list) as string;
  navigate(viewsUrl, {
    replace: true
  });
};
