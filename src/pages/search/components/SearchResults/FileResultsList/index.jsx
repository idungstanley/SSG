import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchEverything } from '../../../../../features/search/searchService';
import FileListItem from './FileListItem';

function FileResultsList() {
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const resultsType = useSelector((state) => state.search.resultsType);
  const searchFileContents = useSelector((state) => state.search.searchFileContents);

  const { data, status } = useSearchEverything(searchQuery, resultsType, searchFileContents);

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

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Size
                  </th>

                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {status === 'success' && data.data.files.map((file) => (
                  <FileListItem key={file.id} fileId={file.id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileResultsList;
