import React from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { cl } from '../../../../../../utils';
import NewColumn from '../../Components/NewColumn';

export default function AddProperty() {
  return (
    <div className="text-gray-500 bg-gray-100 rounded-md">
      <div className="flex h-8">
        <div className="flex items-center uppercase">
          <div
            className="flex items-center justify-between gap-1 p-2 uppercase rounded-tl-lg rounded-br-lg bg-alsoit-gray-75 grow"
            style={{ width: '135px' }}
          >
            <span className="w-4 h-4">
              <IoIosAddCircleOutline className={cl('text-base text-white cursor-pointer')} />
            </span>
            <p className="justify-center text-xs bg-['#b2b2b2'] text-white truncate">ADD PROPERTY</p>
          </div>
        </div>
      </div>
      <div className="p-2 pb-4 pl-4">
        <NewColumn />
      </div>
    </div>
  );
}
