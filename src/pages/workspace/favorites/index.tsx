import React from 'react';
import Favourite from './Favourite';
import { useGetFavourites } from '../../../features/hubs/hubService';
import { Spinner } from '../../../common';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { cl } from '../../../utils';
import { AiFillStar } from 'react-icons/ai';
import PinnedIcon from '../../../assets/icons/PinnedIcon';
import { setIsFavoritePinned } from '../../../features/workspace/workspaceSlice';

function Favorites() {
  const dispatch = useAppDispatch();

  const { showSidebar } = useAppSelector((state) => state.account);

  const { data: FavData, status } = useGetFavourites();

  if (status === 'loading') {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full py-2 items-center relative justify-between h-8 border-b">
        <div className="flex items-center gap-2 ml-2">
          <div className="flex items-center">
            <span className="flex justify-between items-center w-full h-6 mx-1">
              <AiFillStar />
            </span>
            <span className="block font-semibold text-xs w-full cursor-pointer uppercase leading-2 tracking-wider mx-1">
              FAVORITES
            </span>
          </div>
          <div className={cl('flex', !showSidebar && 'overflow-x-hidden w-12')}>
            {FavData?.data.favorites.map((fav: { name: string; id: string; model_type: string; model_id: string }) => {
              return <Favourite key={fav.id} item={fav} />;
            })}
          </div>
        </div>
        <span className="flex items-center mr-4 cursor-pointer" onClick={() => dispatch(setIsFavoritePinned(false))}>
          <PinnedIcon />
        </span>
      </div>
    </>
  );
}

export default Favorites;
