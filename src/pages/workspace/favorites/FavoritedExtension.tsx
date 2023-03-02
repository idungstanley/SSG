import React from "react";
import { ImBackward2 } from "react-icons/im";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  setActivePlaceId,
  setActivePlaceName,
  setShowExtendedBar,
} from "../../../features/workspace/workspaceSlice";
import { secondaryNavigation } from "../../../layout/components/MainLayout/extendedNavigation/ExpandedNav";

function FavoritedExtension({ name }: { name: string }) {
  const dispatch = useAppDispatch();
  const activePlaceInfo = secondaryNavigation.filter((elem) => {
    return (
      elem.name?.toLowerCase() === activePlaceNameForNavigation?.toLowerCase()
    );
  });
  const {
    activePlaceName,
    activePlaceIdForNavigation,
    activePlaceNameForNavigation,
  } = useAppSelector((state) => state.workspace);
  const handleBack = () => {
    dispatch(setShowExtendedBar(false));
    dispatch(setActivePlaceName(null));
    dispatch(setActivePlaceId(activePlaceIdForNavigation));
    dispatch(setActivePlaceName(activePlaceNameForNavigation));
  };
  return (
    <div className="w-11/12">
      {activePlaceNameForNavigation !== null ? (
        <div className="flex justify-between w-full">
          <span className="flex items-center content-center self-center">
            {activePlaceInfo[0].icon ? (
              activePlaceInfo[0].icon
            ) : (
              <img
                src={activePlaceInfo[0].source}
                alt="Hub Icon"
                className="h-4 mr-4"
              />
            )}
            <span
              className={` font-semibold leading-3 uppercase truncate tracking-wider ${
                activePlaceName === name && "text-black font-bold"
              }`}
              style={{ fontSize: "11px" }}
            >
              {activePlaceInfo[0].name}
            </span>
          </span>
          <ImBackward2 onClick={handleBack} />
        </div>
      ) : (
        <h1>Favorites</h1>
      )}
    </div>
  );
}

export default FavoritedExtension;
