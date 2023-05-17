import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsPlusLg } from 'react-icons/bs';
import { IoMdCloseCircle } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setIsExtSearchActive, setShowModal } from '../../../../../features/workspace/workspaceSlice';
import FavoritedExtension from '../../../../../pages/workspace/favorites/FavoritedExtension';

export interface ItemProps {
  id?: number;
  icon?: JSX.Element;
  source?: string;
  name?: string;
  place?: JSX.Element;
  link?: string;
}

export default function ExtendedItem({ name, icon, source }: ItemProps) {
  const dispatch = useAppDispatch();
  const { isExtSearchActive, activePlaceName } = useAppSelector((state) => state.workspace);

  return (
    <section
      className={`relative top-0 flex items-center text-gray-600 border-b cursor-pointer border-gray ${
        !isExtSearchActive && 'px-2'
      }`}
      style={{ height: '50px' }}
    >
      {name !== 'Favorites' && (
        <div className={`${isExtSearchActive ? 'hidden' : 'flex'} items-center justify-between w-full`}>
          <div className="flex items-center content-center self-center">
            {icon ? icon : <img src={source} alt={name} className="h-4 mr-4" />}
            <span
              className={` font-semibold leading-3 uppercase truncate tracking-wider ${
                activePlaceName === name && 'text-black font-bold'
              }`}
              style={{ fontSize: '11px' }}
            >
              {name}
            </span>
          </div>
          <div className="flex items-center mr-1 space-x-2 text-black flex-end">
            <BsPlusLg className="w-2.5 h-2.5" aria-hidden="true" onClick={() => dispatch(setShowModal(true))} />
            <BiSearch
              className="w-2.5 mr-1 h-4"
              aria-hidden="true"
              onClick={() => dispatch(setIsExtSearchActive('TOGGLE'))}
            />
          </div>
        </div>
      )}

      {name === 'Favorites' && (
        <div className="w-11/12">
          <FavoritedExtension name={name} />
        </div>
      )}

      <div className={`w-full ${isExtSearchActive ? 'flex' : 'hidden'} relative`}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Filter List, Hubs, & Wal..."
          className="w-full h-8 pl-5 text-sm bg-gray-200 border-transparent border-none hover:bg-gray-100 focus:border-transparent focus:ring-0"
        />
        <IoMdCloseCircle
          className="absolute w-6 h-4 text-red-500 right-3 top-2"
          onClick={() => dispatch(setIsExtSearchActive('TOGGLE'))}
        />
      </div>
    </section>
  );
}
