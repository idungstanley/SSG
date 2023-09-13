import React, { useState } from 'react';
import Favourite from './Favourite';
import { useGetFavourites } from '../../../features/hubs/hubService';
import { Spinner } from '../../../common';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cl } from '../../../utils';
import { AiFillStar } from 'react-icons/ai';
import PinnedIcon from '../../../assets/icons/PinnedIcon';
import { setIsFavoritePinned } from '../../../features/workspace/workspaceSlice';
import { useQueryClient } from '@tanstack/react-query';
import { TbSquareRoundedArrowDownFilled, TbSquareRoundedArrowUpFilled } from 'react-icons/tb';

function Favorites() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { showSidebar } = useAppSelector((state) => state.account);
  const { data: FavData, status } = useGetFavourites();

  const [collapseFav, setCollapseFav] = useState<boolean>(false);

  const handleUnpinned = () => {
    dispatch(setIsFavoritePinned(false));
    queryClient.invalidateQueries(['user-settings']);
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {collapseFav ? (
        <div className="relative z-10 bg-gray-200 mb-4">
          <span className="top-0 absolute border-gray-200 bg-gray-200 right-32 border left-8 rounded-b-lg h-1"></span>
          <span
            className="absolute bg-gray-200 left-8 rounded cursor-pointer flex items-center p-0.5 -top-0.5 w-8 justify-center border border-gray-200"
            onClick={() => setCollapseFav(false)}
          >
            <TbSquareRoundedArrowDownFilled className="text-primary-500 animate-bounce" />
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full h-1 w-1 bg-primary-400 opacity-75"></span>
          </span>
        </div>
      ) : (
        <div className="relative flex  items-center justify-between h-6 py-2 border-b transition delay-700 duration-300 ease-in-out">
          <span
            className="absolute left-8 bg-white rounded cursor-pointer flex items-center p-1 -top-0.5 w-8 h-5 justify-center border border-gray-300"
            onClick={() => setCollapseFav(true)}
          >
            <TbSquareRoundedArrowUpFilled className="text-primary-500 animate-bounce" />
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full h-1 w-1 bg-primary-400 opacity-75"></span>
          </span>
          <div className="flex items-center bg-gray-200 w-full justify-between">
            <div className="flex items-center gap-2 ml-20">
              <div className="flex items-center">
                <span className="flex items-center justify-between w-full h-6 mx-1">
                  <AiFillStar />
                </span>
                <span className="block w-full mx-1 text-xs font-semibold tracking-wider uppercase cursor-pointer leading-2">
                  FAVORITES
                </span>
              </div>
              <div className={cl('flex', !showSidebar && 'overflow-x-hidden w-12')}>
                {FavData?.data.favorites.map(
                  (fav: { name: string; id: string; model_type: string; model_id: string }) => {
                    return <Favourite key={fav.id} item={fav} />;
                  }
                )}
              </div>
            </div>

            <span className="flex items-center mr-4 cursor-pointer" onClick={() => handleUnpinned()}>
              <PinnedIcon />
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Favorites;
