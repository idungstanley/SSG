import { SearchIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import CommandSearchModal from '../sidebar/components/CommandSearchModal';

export default function Search() {
  const [commandSearchModal, setCommandSearchModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className="relative p-1.5 mb-2 transition duration-300 rounded-md cursor-pointer group"
        onClick={() => setCommandSearchModal(true)}
      >
        <div
          className="absolute right-0 flex items-center justify-between w-auto tracking-wider text-gray-400 left-4 top-3 hover:text-green-500"
          style={{ fontSize: '9px' }}
        >
          <div className="flex items-center justify-between ">
            <SearchIcon className="w-2.5 h-2.5 mr-1" aria-hidden="true" />
            <p>Search</p>
          </div>
          <p className="mr-5">Ctrl+k</p>
        </div>
        <input
          placeholder=""
          className="w-full pl-8 border-gray-400 rounded-2xl h-7 group-hover:border-green-500 group-hover:text-primary-400"
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
