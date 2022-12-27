import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import { Spinner } from '../common';

interface SearchInputProps {
  value: string;
  placeholder: string;
  loading?: boolean;
  onChange: (value: string) => void;
}

function SearchInput({
  onChange,
  value,
  placeholder,
  loading = false,
}: SearchInputProps) {
  return (
    <div className="relative flex items-stretch flex-grow rounded-md shadow-sm focus-within:z-10">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {loading ? (
          <div className="-mt-2">
            <Spinner size={8} color="#9CA3AE" />
          </div>
        ) : (
          <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
        )}
      </div>
      <input
        id="search-input"
        name="search-input"
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {value ? (
        <button
          onClick={() => onChange('')}
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 transition duration-1000 ease-in-out hover:opacity-80"
        >
          <XIcon className="h-4 w-4 mt-0.4 text-gray-400" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}

export default SearchInput;
