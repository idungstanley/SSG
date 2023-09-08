import React from 'react';
import Favourite from './Favourite';
import { useGetFavourites } from '../../../features/hubs/hubService';
import { Spinner } from '../../../common';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cl } from '../../../utils';
import { AiFillStar } from 'react-icons/ai';
import PinnedIcon from '../../../assets/icons/PinnedIcon';
import { setIsFavoritePinned } from '../../../features/workspace/workspaceSlice';
import { useQueryClient } from '@tanstack/react-query';

function Favorites() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { showSidebar } = useAppSelector((state) => state.account);
  const { data: FavData, status } = useGetFavourites();

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
      <div className="relative flex items-center justify-between w-full h-8 py-2 border-b">
        <div className="flex items-center gap-2 ml-2">
          <div className="flex items-center">
            <span className="flex items-center justify-between w-full h-6 mx-1">
              <AiFillStar />
            </span>
            <span className="block w-full mx-1 text-xs font-semibold tracking-wider uppercase cursor-pointer leading-2">
              FAVORITES
            </span>
          </div>
          <div className={cl('flex', !showSidebar && 'overflow-x-hidden w-12')}>
            {FavData?.data.favorites.map((fav: { name: string; id: string; model_type: string; model_id: string }) => {
              return <Favourite key={fav.id} item={fav} />;
            })}
          </div>
        </div>
        <span className="flex items-center mr-4 cursor-pointer" onClick={() => handleUnpinned()}>
          <PinnedIcon />
        </span>
      </div>
    </>
  );
}

export default Favorites;
