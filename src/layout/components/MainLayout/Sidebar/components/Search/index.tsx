import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import CommandSearchModal from '../CommandSearchModal';

export default function Search() {
  const [commandSearchModal, setCommandSearchModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className="relative flex items-center w-full p-1 mb-1 transition duration-300 rounded-md cursor-pointer group"
        onClick={() => setCommandSearchModal(true)}
      >
        <div
          className="absolute flex items-center justify-between w-auto w-full tracking-wider text-gray-400 grow left-4 hover:text-green-500"
          style={{ fontSize: "10px" }}
        >
          <div className="flex items-center justify-between">
            <CiSearch/>
            <p>Search</p>
          </div>
          <p className="mr-8">Ctrl+k</p>
        </div>
        <input
          className="w-full pl-3 text-xs border-gray-400 h-7 rounded-2xl group-hover:border-green-500 group-hover:text-primary-400"
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
