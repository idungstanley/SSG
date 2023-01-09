import React, { useEffect, useRef } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import { setSearchQuery } from '../../../../../features/search/searchSlice';
import SavedSearches from './components';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';

export default function SearchInput() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { searchQuery } = useAppSelector((state) => state.search);

  const queryInput = useRef<HTMLInputElement>(null);

  const onQueryChange = (query) => {
    dispatch(setSearchQuery(query));

    if (location.pathname !== '/search') {
      navigate('/search');
    }
  };

  const onFocus = () => {
    if (location.pathname !== '/search') {
      navigate('/search');
    }
  };

  useEffect(() => {
    if (location.pathname === '/search') {
      if (queryInput !== null) {
        queryInput.current?.focus();
      }
    }
  }, []);

  const handleReset = () => {
    dispatch(setSearchQuery(''));
    queryInput.current?.focus();
  };

  return (
    <div className="flex-1 flex justify-center lg:justify-end">
      <div className="w-full px-2 lg:px-6">
        <div className="relative text-indigo-200 focus-within:text-gray-400 flex items-center">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            name="search"
            placeholder="Search everything..."
            className="block w-full bg-gray-700 rounded-md py-2 pl-10 pr-3 text-sm text-gray-300 placeholder-gray-400 focus:outline-none ring-0 focus:ring-0 sm:text-sm"
            onChange={(e) => onQueryChange(e.target.value)}
            value={searchQuery}
            ref={queryInput}
            onFocus={onFocus}
          />

          {searchQuery.length ? (
            <XIcon
              onClick={handleReset}
              className="h-5 w-5 text-gray-400 absolute right-9 cursor-pointer"
              aria-hidden="true"
            />
          ) : null}

          <SavedSearches />
        </div>
      </div>
    </div>
  );
}
