import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { UseUpdateFavService } from '../../../features/hubs/hubService';
import FavModal from './FavModal';
import { useAppDispatch } from '../../../app/hooks';
import { setActiveItem, setActiveTabId, setShowPilot } from '../../../features/workspace/workspaceSlice';
import { useNavigate } from 'react-router';
import { setFavUpdateName, setTriggerFavUpdate } from '../../../features/hubs/hubSlice';

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
  const [favName, setFavName] = useState<string>(item.name);
  const { showFavEditInput, triggerFavUpdate, favUpdateName } = useAppSelector((state) => state.hub);

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
    navigate(`/hub/${item.model_id}`);
  };

  const handleUpdate = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(setFavUpdateName(favName));
    dispatch(setTriggerFavUpdate(true));
  };

  return (
    <div className="hover:bg-gray-100 py-0.5 h-6 flex">
      <div className="items-center w-full mx-2 flex justify-between  items-center  relative">
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
            className="tracking-wider capitalize truncate cursor-pointer"
            style={{ fontSize: '10px' }}
            onClick={() => handleLocation()}
          >
            {item.name}
          </h4>
        )}
        <FavModal id={item.id} />
      </div>
    </div>
  );
}

export default Favourite;
