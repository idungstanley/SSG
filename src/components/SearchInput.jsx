import React from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import { Spinner } from '../common';

function SearchInput({
  onChange, value, placeholder, loading,
}) {
  return (
    <div className="relative flex items-stretch flex-grow focus-within:z-10 rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {loading ? (
          <div className="-mt-2">
            <Spinner size={16} color="#9CA3AE" />
          </div>
        ) : (
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        )}
      </div>
      <input
        id="search-input"
        name="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md pl-10 pr-10 sm:text-sm border-gray-300"
      />
      {value ? (
        <button
          onClick={() => onChange('')}
          type="button"
          className="hover:opacity-80 absolute inset-y-0 right-0 pr-3 flex items-center transition duration-1000 ease-in-out"
        >
          <XIcon className="h-4 w-4 mt-0.4 text-gray-400" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}

SearchInput.defaultProps = {
  loading: false,
};

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default SearchInput;
