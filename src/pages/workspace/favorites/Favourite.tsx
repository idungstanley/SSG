import { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { UseUpdateFavService } from '../../../features/hubs/hubService';
import FavModal from './FavModal';
import { useAppDispatch } from '../../../app/hooks';
import { setActiveItem, setActiveTabId, setShowPilot } from '../../../features/workspace/workspaceSlice';
import { useNavigate } from 'react-router';
import { setFavUpdateName, setTriggerFavUpdate } from '../../../features/hubs/hubSlice';
import { AvatarWithInitials } from '../../../components';
import { MdFolder } from 'react-icons/md';
import { FiList } from 'react-icons/fi';
import { getInitials } from '../../../app/helpers';
import { EntityType } from '../../../utils/EntityTypes/EntityType';
import { generateViewsUrl } from '../../../utils/generateViewsUrl';
import { pilotTabs } from '../../../app/constants/pilotTabs';

interface nameType {
  item: {
    name: string;
    id: string;
    model_type: string;
    model_id: string;
  };
}

function Favourite({ item }: nameType) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { showFavEditInput, triggerFavUpdate, favUpdateName } = useAppSelector((state) => state.hub);
  const { activeView } = useAppSelector((state) => state.workspace);

  const [favName, setFavName] = useState<string>(item.name);

  UseUpdateFavService({
    favId: showFavEditInput,
    name: favUpdateName,
    trigger: triggerFavUpdate
  });

  const handleLocation = () => {
    const viewsUrl = generateViewsUrl(item.model_id, activeView?.id as string, item) as string;

    dispatch(
      setActiveItem({
        activeItemId: item.model_id,
        activeItemType: item.model_type,
        activeItemName: favName
      })
    );
    dispatch(setShowPilot(true));
    dispatch(setActiveTabId(pilotTabs.DETAILS));

    navigate(viewsUrl, {
      replace: true
    });
  };

  const handleUpdate = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(setFavUpdateName(favName));
    dispatch(setTriggerFavUpdate(true));
  };

  return (
    <div className="py-0.5 h-6 px-1 group">
      <div className="relative flex items-center justify-between w-full">
        <div className="flex items-center">
          {item.model_type === EntityType.hub && (
            <AvatarWithInitials
              initials={getInitials(item.name)}
              height="h-4"
              width="w-4"
              backgroundColour="blue"
              roundedStyle="rounded"
            />
          )}
          {item.model_type === EntityType.wallet && <MdFolder className="w-4 h-4" />}
          {item.model_type === EntityType.list && <FiList className="w-4 h-4" />}
          {showFavEditInput === item.id ? (
            <form
              onSubmit={(e) => {
                handleUpdate(e);
              }}
            >
              <input
                autoFocus
                style={{ fontSize: '10px' }}
                className="h-6 border-none rounded outline-none focus:border-none focus:outline-none"
                type="text"
                onChange={(e) => setFavName(e.target.value)}
                value={favName}
              />
            </form>
          ) : (
            <h4
              className="mx-1 tracking-wider capitalize truncate cursor-pointer hover:text-alsoit-purple-300"
              style={{ fontSize: '10px' }}
              onClick={() => handleLocation()}
            >
              {item.name}
            </h4>
          )}
        </div>
        <div className="flex items-center">
          <FavModal id={item.id} />
        </div>
      </div>
    </div>
  );
}

export default Favourite;
