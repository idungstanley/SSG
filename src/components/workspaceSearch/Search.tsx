import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';

interface Iprops {
  placeholder: string
}

function Search({ placeholder}: Iprops) {
  return (
    <div className="relative flex items-stretch flex-grow bg-gray-500 rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="search"
        // onChange={(e) => handleChange(e.target.value)}
        // value={value}
        name="search-input"
        id="search-input"
        className="block w-full pl-10 pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
      />
      <button
        // onClick={() => handleChange('')}
        type="button"
        className="absolute inset-y-0 right-0 flex items-center pr-3 transition duration-1000 ease-in-out hover:opacity-80"
      >
        <XIcon className="h-4 w-4 mt-0.4 text-gray-400" aria-hidden="true" />
      </button>
    </div>
  );
}

export default Search;
