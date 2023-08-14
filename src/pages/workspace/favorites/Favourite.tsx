import React, { useState } from 'react';
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

  const [favName, setFavName] = useState<string>(item.name);

  UseUpdateFavService({
    favId: showFavEditInput,
    name: favUpdateName,
    trigger: triggerFavUpdate
  });

  const handleLocation = () => {
    dispatch(
      setActiveItem({
        activeItemId: item.model_id,
        activeItemType: item.model_type,
        activeItemName: favName
      })
    );
    dispatch(setShowPilot(true));
    dispatch(setActiveTabId(4));
    navigate(`/${item.model_type}/${item.model_id}`);
  };

  const handleUpdate = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(setFavUpdateName(favName));
    dispatch(setTriggerFavUpdate(true));
  };

  return (
    <div className="hover:bg-gray-100 py-0.5 h-6 px-2 group">
      <div className="w-full flex justify-between  items-center  relative">
        <div className="flex">
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
                className="h-6 outline-none border-none focus:border-none focus:outline-none rounded"
                type="text"
                onChange={(e) => setFavName(e.target.value)}
                value={favName}
              />
            </form>
          ) : (
            <h4
              className="tracking-wider capitalize truncate cursor-pointer mx-1"
              style={{ fontSize: '10px' }}
              onClick={() => handleLocation()}
            >
              {item.name}
            </h4>
          )}
        </div>
        <div className="">
          <FavModal id={item.id} />
        </div>
      </div>
    </div>
  );
}

export default Favourite;
