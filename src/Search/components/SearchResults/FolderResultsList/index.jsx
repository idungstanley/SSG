import React from 'react';
import { useSelector } from 'react-redux';
import {
  searchFoldersSelectors,
} from '../../../../features/search/searchSlice';
import FolderListItem from './FolderListItem';

function FolderResultsList() {
  const folders = useSelector(searchFoldersSelectors.selectAll);

  return (
    <div className="overflow-x-none bg-white h-full">
      <div className="overflow-x-none">
        <div className="align-middle inline-block min-w-full">
          <div className="">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 select-none">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Path
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created at
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {folders.map((folder) => (
                  <FolderListItem folder={folder} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FolderResultsList;
