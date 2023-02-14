import React, { useState } from 'react';
import CommandSearchModal from '../../../layout/components/MainLayout/Sidebar/components/CommandSearchModal';

export default function Search() {
  const [commandSearchModal, setCommandSearchModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className="relative p-1.5 mb-1 transition duration-300 flex items-center w-full cursor-pointer group rounded-md"
        onClick={() => setCommandSearchModal(true)}
      >
        <input
          placeholder="Enter search value"
          className="w-full text-xs pl-8 border-gray-400 h-7 rounded-2xl group-hover:border-green-500 group-hover:text-primary-400"
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
