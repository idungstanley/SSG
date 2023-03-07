import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../../../app/hooks";
import {
  setActivePlaceName,
  setShowExtendedBar,
} from "../../../../../../features/workspace/workspaceSlice";

export default function CloseExtBtn() {
  const dispatch = useDispatch();
  const { showExtendedBar } = useAppSelector((state) => state.workspace);
  const handleCloseExt = () => {
    dispatch(setShowExtendedBar(false));
    dispatch(setActivePlaceName(null));
  };

  return (
    <span className="absolute z-50 bg-green-400 border-2 border-green-400 rounded-full cursor-pointer -right-2 top-2">
      {showExtendedBar && (
        <RiArrowLeftSLine
          className="text-sm text-white"
          onClick={() => handleCloseExt()}
        />
      )}
    </span>
  );
}
