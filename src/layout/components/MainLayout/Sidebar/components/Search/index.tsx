import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import CommandSearchModal from '../CommandSearchModal';

export default function Search() {
  const [commandSearchModal, setCommandSearchModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className="relative flex items-center w-full p-1 px-6 mt-2 mb-1 transition duration-300 rounded cursor-pointer group"
        onClick={() => setCommandSearchModal(true)}
      >
        <div
          className="absolute flex items-center justify-between w-auto w-full tracking-wider text-gray-400 grow left-7 hover:text-fuchsia-500"
          style={{ fontSize: '13px' }}
        >
          <div className="flex items-center justify-between">
            <CiSearch className="mr-2 text-lg" />
            <p>Search</p>
          </div>
          <p className="mr-14">Ctrl+k</p>
        </div>
        <input
          className="w-full h-8 pl-3 text-xs border-gray-400 rounded-2xl group-hover:border-fuchsia-500 group-hover:text-primary-400"
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
