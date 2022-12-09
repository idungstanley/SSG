import React from 'react';
import { useSelector } from 'react-redux';
import SearchResults from '../components/SearchResults';
import Preview from '../components/Preview';
import Toolbar from '../components/header/Toolbar';
import FilterResults from '../components/header/FilterResults';
import {
  useSearch,
  useSearchEverything,
} from '../../../features/search/searchService';
import FullScreenMessage from '../../shared/components/FullScreenMessage';
import { useDebounce } from '../../../hooks';
import { Spinner } from '../../../common';

export default function SearchPage() {
  const {
    selectedItemId,
    selectedItemType,
    searchQuery,
    resultsType,
    searchFileContents,
  } = useSelector((state) => state.search);

  const debouncedValue = useDebounce(searchQuery, 300);

  useSearchEverything(
    searchQuery,
    resultsType,
    searchFileContents,
    debouncedValue === searchQuery,
  );

  const {
    files, folders, inbox, explorerStatus, inboxStatus,
  } = useSearch(
    searchQuery,
    searchFileContents,
    debouncedValue === searchQuery,
  );

  console.log(files, folders, inbox);

  return (
    <div className="h-full flex flex-col w-full">
      <Toolbar />
      <FilterResults />

      <div className="flex flex-row overflow-hidden bg-gray-50 h-full">
        <div className="flex-1 overflow-y-scroll bg-gray-50">
          {searchQuery.length < 3 ? (
            <FullScreenMessage
              title="Enter a search query"
              description="Enter at least 2 characters to start searching"
            />

          // checking error and loading
          ) : explorerStatus === 'error' || inboxStatus === 'error' ? (
            <FullScreenMessage
              title="Oops, an error occurred :("
              description="Please try again later."
            />
          ) : explorerStatus === 'loading' || inboxStatus === 'loading' ? (
            <div className="mx-auto w-6 mt-10 justify-center">
              <Spinner size={22} color="#0F70B7" />
            </div>

          // main data
          ) : explorerStatus === 'success' && inboxStatus === 'success' ? (
            searchQuery.length < 2 ? (
              <FullScreenMessage
                title="Enter a search query"
                description="Enter at least 2 characters to start searching"
              />
            ) : (
              <SearchResults />
            )
          ) : null}
        </div>

        {/* Details sidebar (separate files and folders) */}
        {selectedItemId !== null && selectedItemType !== null && <Preview />}
      </div>
    </div>
  );
}
