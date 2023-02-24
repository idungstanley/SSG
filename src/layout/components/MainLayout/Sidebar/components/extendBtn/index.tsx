import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../../app/hooks';
import { setShowExtendedBar } from '../../../../../../features/workspace/workspaceSlice';

export default function ExtendBtn() {
    const dispatch = useDispatch();
    const { activePlaceId, showExtendedBar } = useAppSelector((state) => state.workspace);

  return (
      <span
          className={`absolute -right-2 top-4 z-30 bg-white rounded-full border-2 border-inherit ${
            activePlaceId ? 'block' : 'hidden'
          }`}
        >
          {!showExtendedBar && (
            <RiArrowRightSLine
              className="text-xs "
              onClick={() => dispatch(setShowExtendedBar(true))}
            />
          )}
        </span>
  );
}
