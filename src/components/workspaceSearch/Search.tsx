import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';

interface SearchProps {
  placeholder: string;
}

function Search({ placeholder }: SearchProps) {
  return (
    <div className="relative bg-gray-500 flex items-stretch flex-grow rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="search"
        // onChange={(e) => handleChange(e.target.value)}
        // value={value}
        name="search-input"
        id="search-input"
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-10 pr-10 sm:text-sm border-gray-300"
        placeholder={placeholder}
      />
      <button
        // onClick={() => handleChange('')}
        type="button"
        className="hover:opacity-80 absolute inset-y-0 right-0 pr-3 flex items-center transition duration-1000 ease-in-out"
      >
        <XIcon className="h-4 w-4 mt-0.4 text-gray-400" aria-hidden="true" />
      </button>
    </div>
  );
}

export default Search;
