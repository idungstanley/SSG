import { SearchIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import CommandSearchModal from '../sidebar/components/CommandSearchModal';

export default function Search() {
  const [commandSearchModal, setCommandSearchModal] = useState(false);

  return (
    <>
      <button type="button" className="group transition duration-300 relative p-3 cursor-pointer rounded-md shadow-sm" onClick={() => setCommandSearchModal(true)}>
        <SearchIcon className="h-4 w-5 absolute group-hover:text-primary-400 text-gray-400 top-6 left-5 z-10" aria-hidden="true" />
        <input
          placeholder="search"
          className="h-9 pl-8 w-full border-gray-400 rounded group-hover:border-primary-400 group-hover:text-primary-400"
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
