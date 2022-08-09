import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { performSearch } from '../../features/search/searchSlice';
import SearchResults from '../components/SearchResults';
import Preview from '../components/Preview';
import Toolbar from '../components/Header/Toolbar';
import FilterResults from '../components/Header/FilterResults';

export default function SearchScreen() {
  const dispatch = useDispatch();

  const selectedItemId = useSelector((state) => state.search.selectedItemId);
  const selectedItemType = useSelector((state) => state.search.selectedItemType);

  const searchQuery = useSelector((state) => state.search.search_query);
  const resultsType = useSelector((state) => state.search.results_type);
  const searchFileContents = useSelector((state) => state.search.search_file_contents);

  useEffect(async () => {
    dispatch(performSearch({
      query: searchQuery,
      resultsType,
      contentSearch: searchFileContents,
    }));
  }, [searchQuery, resultsType, searchFileContents]);

  return (
    <div className="h-full flex flex-col w-full">
      <Toolbar />
      <FilterResults />

      <div className="flex flex-row overflow-hidden bg-gray-50 h-full">

        <div className="flex-1 overflow-y-scroll bg-gray-50">
          <SearchResults />
        </div>

        {/* Details sidebar (separate files and folders) */}
        {selectedItemId !== null && selectedItemType !== null && (
          <Preview />
        )}

      </div>
    </div>
  );
}
