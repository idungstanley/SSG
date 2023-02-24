import React, { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { UseUpdateFavService } from "../../../features/hubs/hubService";
import FavModal from "./FavModal";
import { useAppDispatch } from "../../../app/hooks";
import { setTriggerFavUpdate } from "../../../features/hubs/hubSlice";
import {
  setActiveItem,
  setActiveTabId,
  setShowPilot,
} from "../../../features/workspace/workspaceSlice";
import { useNavigate } from "react-router";

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
  const { showFavEditInput, triggerFavUpdate } = useAppSelector(
    (state) => state.hub
  );

  UseUpdateFavService({
    favId: showFavEditInput,
    name: favName,
    trigger: triggerFavUpdate,
  });

  const handleLocation = () => {
    dispatch(
      setActiveItem({
        activeItemId: item.model_id,
        activeItemType: item.model_type,
        activeItemName: item.name,
      })
    );
    dispatch(setShowPilot(true));
    dispatch(setActiveTabId(4));
    navigate(`/workspace/hub/${item.model_id}`);
  };

  return (
    <div className="hover:bg-gray-100 py-0.5 h-6 flex">
      <div className="items-center w-full mx-2 flex justify-between  items-center  relative">
        {showFavEditInput === item.id ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(setTriggerFavUpdate(true));
            }}
          >
            <input
              autoFocus
              style={{ fontSize: "10px" }}
              className="h-6 outline-none border-none focus:border-none focus:outline-none rounded"
              type="text"
              onChange={(e) => setFavName(e.target.value)}
              value={favName}
            />
          </form>
        ) : (
          <h4
            className="tracking-wider capitalize truncate cursor-pointer"
            style={{ fontSize: "10px" }}
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
