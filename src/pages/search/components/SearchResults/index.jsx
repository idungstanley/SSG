import React from 'react';
import { useSelector } from 'react-redux';
import FileResultsList from './FileResultsList';
import FolderResultsList from './FolderResultsList';

function SearchResults() {
  const resultsType = useSelector((state) => state.search.resultsType);

  if (resultsType === 'files') {
    return (
      <FileResultsList />
    );
  }
  if (resultsType === 'folders') {
    return (
      <FolderResultsList />
    );
  }

  return null;
}

export default SearchResults;
