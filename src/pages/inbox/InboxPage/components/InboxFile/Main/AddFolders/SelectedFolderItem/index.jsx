import React from 'react';
import PropTypes from 'prop-types';

import { useGetSearchFoldersForFilingResult } from '../../../../../../../../features/inbox/inboxService';

function SelectedFolderItem({ folderId, handleRemoveFolder }) {
  const folder = useGetSearchFoldersForFilingResult(folderId);

  return folder ? (
    <span
      title={folder.full_path}
      key={folder.id}
      className="cursor-pointer inline-flex rounded-full items-center py-1 mr-1 pr-3.5 pl-1.5 mb-1.5 text-sm font-medium bg-indigo-100 text-indigo-700 select-none"
    >
      <button
        type="button"
        onClick={() => handleRemoveFolder(folder.id)}
        className="flex-shrink-0 mr-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
      >
        <span className="sr-only">Remove</span>
        <svg
          className="h-2 w-2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 8 8"
        >
          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
      {folder.name}
    </span>
  ) : null;
}

SelectedFolderItem.propTypes = {
  folderId: PropTypes.string.isRequired,
  handleRemoveFolder: PropTypes.func.isRequired,
};

export default SelectedFolderItem;
