import React from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/solid';
import { FileIcon, PathBadge } from '../../../../../../../../common';

function AlsoSavedIn() {
  const file = null;
  const selectedItemFullDetails = null;

  return file && selectedItemFullDetails ? (
    <div>
      <ul className="mt-2 border-gray-200 divide-y divide-gray-200">
        {selectedItemFullDetails.also_saved_in_files.map((alsoSavedInFile) => (
          <li key={alsoSavedInFile.id} className="py-3 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <FileIcon iconName={alsoSavedInFile.file_format.icon_name} size={8} />
              </div>
              <div className="flex-1 min-w-0">
                <PathBadge folder={alsoSavedInFile.folder} />
                <p className="text-xs text-gray-500 mt-1 truncate">{`Saved as "${alsoSavedInFile.display_name}"`}</p>
              </div>
            </div>
            <button
              type="button"
              className="ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View
              <span className="sr-only">
                {' '}
                <span className="px-2 inline-flex mr-1 text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800">
                  {alsoSavedInFile.display_name}
                </span>
              </span>
            </button>
          </li>
        ))}
        <li className="py-2 flex justify-between items-center">
          <button
            type="button"
            className="group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
              <DocumentDuplicateIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
              Copy
              {` ${file.display_name} `}
              to another folder
            </span>
          </button>
        </li>
      </ul>
    </div>
  ) : null;
}

export default AlsoSavedIn;
