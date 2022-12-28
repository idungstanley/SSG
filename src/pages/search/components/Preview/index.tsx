import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FileIcon } from '../../../../common';
import { useGetSearchedItemDetails } from '../../../../features/search/searchService';
import {
  resetSelectedItem,
  setSearchQuery,
} from '../../../../features/search/searchSlice';
import { OutputDateTime, OutputFileSize } from '../../../../app/helpers';
import { Button } from '../../../../components';
import { useAppSelector } from '../../../../app/hooks';

function Preview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedItemId, selectedItemType, selectedItemPath } = useAppSelector(
    (state) => state.search
  );

  const isExplorerFile =
    selectedItemPath === 'Explorer' && selectedItemType === 'file';
  const isInboxFile = selectedItemPath === 'Inbox';

  const { data } = useGetSearchedItemDetails({
    type:
      selectedItemPath === 'Explorer' ? `${selectedItemType}s` : 'inbox-files',
    id: selectedItemId,
  });

  const item = isExplorerFile
    ? data?.data.file
    : isInboxFile
    ? data?.data.inbox_file
    : data?.data.folder;

  const name = isExplorerFile
    ? item?.display_name
    : isInboxFile
    ? item?.inbox_file_source.display_name
    : item?.name;
  const icon = isExplorerFile
    ? item?.file_format.extension
    : isInboxFile
    ? item?.inbox_file_source.file_format.extension
    : 'folder';

  const createdAt = item?.created_at;
  const updatedAt = item?.updated_at;
  const size = isInboxFile
    ? item?.inbox_file_source.size
    : isExplorerFile
    ? item?.size
    : null;

  const onShowInFolder = () => {
    const path = isInboxFile
      ? `/inbox/${item?.inbox_id}`
      : isExplorerFile
      ? `/explorer/${item?.folder_id || ''}`
      : `/explorer/${item?.parent_id || ''}`;

    navigate(path);
    dispatch(setSearchQuery(''));
  };

  return data ? (
    <aside className="fixed right-0 z-10 hidden w-1/3 h-full px-6 py-4 mt-2 overflow-y-scroll bg-white border-l border-gray-200 top-32 min-w-96 lg:block">
      <div className="pb-16 space-y-6">
        <svg
          onClick={() => dispatch(resetSelectedItem())}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-400 transition duration-300 cursor-pointer p hover:text-red-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <div>
          <div className="block w-full h-10 overflow-hidden rounded-md">
            <FileIcon extensionKey={icon} size={10} />
          </div>
          <div className="flex items-start justify-between mt-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                <span className="sr-only">Details for </span>
                {name}
              </h2>
              {size ? (
                <p className="text-sm font-medium text-gray-500">
                  {OutputFileSize(size)}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex">
          <Button
            buttonStyle="white"
            onClick={onShowInFolder}
            label="Show in folder"
            width="w-full"
            ringOnFocus
          />
        </div>

        <div>
          <h3 className="font-medium text-gray-900">Information</h3>
          <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
            <div className="flex justify-between py-3 text-sm font-medium">
              <dt className="text-gray-500">Last modified</dt>
              <dd className="text-gray-900">{OutputDateTime(createdAt)}</dd>
            </div>

            <div className="flex justify-between py-3 text-sm font-medium">
              <dt className="text-gray-500">Created</dt>
              <dd className="text-gray-900">{OutputDateTime(updatedAt)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </aside>
  ) : null;
}

export default Preview;
