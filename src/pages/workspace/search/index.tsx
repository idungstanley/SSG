import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import CommandSearchModal from '../../../layout/components/MainLayout/sidebar/components/CommandSearchModal';

export default function Search() {
  const [commandSearchModal, setCommandSearchModal] = useState(false);
  const { showSidebar } = useAppSelector((state) => state.workspace);

  return (
    <>
      <button
        type="button"
        className={`relative p-1.5 mb-1 transition duration-300 flex items-center w-full cursor-pointer group ${
          !showSidebar ? 'rounded-sm mb-2' : 'rounded-md'
        }`}
        onClick={() => setCommandSearchModal(true)}
      >
        <div
          className={`absolute flex items-center left-4 justify-between w-auto tracking-wider text-gray-400 hover:text-green-500 ${
            showSidebar ? 'right-0 top-3' : 'top-1'
          }`}
          style={{ fontSize: '9px' }}
        >
          <div className="flex items-center justify-between ">
            <p className={`${!showSidebar && 'hidden'}`}>Search</p>
          </div>
        </div>
        <input
          placeholder=""
          className={`w-full pl-8 border-gray-400 h-7 rounded-2xl group-hover:border-green-500 group-hover:text-primary-400  ${
            !showSidebar && 'hidden'
          }`}
          disabled
          type="text"
        />
      </button>

      <CommandSearchModal
        commandSearchVisible={commandSearchModal}
        onCloseCommandSearchModal={() => setCommandSearchModal(false)}
      />
    </>
  );
}
