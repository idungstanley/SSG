import React, { useRef, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setSearchQuery } from '../../../../../features/search/searchSlice';
import { useSearch } from '../../../../../features/search/searchService';
import { Spinner } from '../../../../../common';

export default function SearchInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchQuery = useSelector((state) => state.search.searchQuery);

  const { explorerStatus, inboxStatus } = useSearch();

  const queryInput = useRef(null);

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
        queryInput.current.focus();
      }
    }
  }, [queryInput]);

  return (
    <div className="flex-1 flex justify-center lg:justify-end">
      <div className="w-full px-2 lg:px-6">
        <div className="relative text-indigo-200 focus-within:text-gray-400">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            {(explorerStatus === 'loading' || inboxStatus === 'loading') && searchQuery.length >= 2 ? (
              <div className="-mt-2">
                <Spinner size={16} color="#9CA3AE" />
              </div>
            ) : (
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            )}
          </div>
          <input
            id="search"
            name="search"
            className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white ring-0 focus:ring-0 focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm"
            placeholder="Search everything..."
            type="search"
            onChange={(e) => onQueryChange(e.target.value)}
            value={searchQuery}
            ref={queryInput}
            onFocus={onFocus}
          />
        </div>
      </div>
    </div>
  );
}
