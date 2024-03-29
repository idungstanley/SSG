import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../../app/hooks';
import { setShowExtendedBar } from '../../../../../../features/workspace/workspaceSlice';
import { secondaryNavigation } from '../../ExpandedNav';

export default function OpenExtBtn() {
  const dispatch = useDispatch();
  const { activePlaceName, showExtendedBar } = useAppSelector((state) => state.workspace);
  // to find the clicked item in the extendedBar list
  const extendedAppName = secondaryNavigation.find((item) => item.name === activePlaceName);
  //if the clicked item is library, the extended bar should be prompted
  if (activePlaceName === 'Library' || activePlaceName === 'Favorites') {
    dispatch(setShowExtendedBar(true));
  }

  //so if clicked item is not in extended list, the extended bar should close
  if (extendedAppName === undefined) {
    dispatch(setShowExtendedBar(false));
  }

  return (
    <span
      className={`absolute cursor-pointer -right-2 top-4 z-20 bg-white rounded-full border-2 border-inherit ${
        extendedAppName ? 'block' : 'hidden'
      }`}
    >
      {!showExtendedBar && <RiArrowRightSLine className="text-xs" onClick={() => dispatch(setShowExtendedBar(true))} />}
    </span>
  );
}
