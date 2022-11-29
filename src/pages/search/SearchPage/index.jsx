import React from 'react';
import { useSelector } from 'react-redux';
import SearchResults from '../components/SearchResults';
import Preview from '../components/Preview';
import Toolbar from '../components/header/Toolbar';
import FilterResults from '../components/header/FilterResults';
import { useSearchEverything } from '../../../features/search/searchService';
import { EmptyStateSimple } from '../../../components';

export default function SearchPage() {
  const selectedItemId = useSelector((state) => state.search.selectedItemId);
  const selectedItemType = useSelector((state) => state.search.selectedItemType);

  const searchQuery = useSelector((state) => state.search.searchQuery);
  const resultsType = useSelector((state) => state.search.resultsType);
  const searchFileContents = useSelector((state) => state.search.searchFileContents);

  const { data, status } = useSearchEverything(searchQuery, resultsType, searchFileContents);
  console.log(data);

  return (
    <div className="h-full flex flex-col w-full">
      <Toolbar />
      <FilterResults />

      <div className="flex flex-row overflow-hidden bg-gray-50 h-full">

        <div className="flex-1 overflow-y-scroll bg-gray-50">
          {searchQuery.length < 2 && (
            <div className="flex flex-1 h-full bg-white">
              <div className="m-auto">
                <EmptyStateSimple
                  title="Enter a search query"
                  description="Enter at least 2 characters to start searching"
                />
              </div>
            </div>
          )}

          {((status === 'success' && resultsType === 'files' && data.data.files.length === 0 && searchQuery.length >= 2) || (status === 'success' && resultsType === 'folders' && data.data.folders.length === 0 && searchQuery.length >= 2)) && (
            <div className="flex flex-1 h-full bg-white">
              <div className="m-auto">
                <EmptyStateSimple
                  title="No search results"
                  description="We couldn't find any matching results"
                />
              </div>
            </div>
          )}

          {((status === 'success' && resultsType === 'files' && data.data.files.length !== 0 && searchQuery.length >= 2) || (status === 'success' && resultsType === 'folders' && data.data.folders.length !== 0 && searchQuery.length >= 2)) && (
            <SearchResults />
          )}
        </div>

        {/* Details sidebar (separate files and folders) */}
        {selectedItemId !== null && selectedItemType !== null && (
          <Preview />
        )}
      </div>
    </div>
  );
}
