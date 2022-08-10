import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetSearchEverythingFolder } from '../../../../../features/search/searchService';
import { OutputDateTime } from '../../../../../app/helpers';
import { FileIcon } from '../../../../../common';
import { Button } from '../../../../../components';

function FolderPreview() {
  const navigate = useNavigate();

  const selectedItemId = useSelector((state) => state.search.selectedItemId);
  const { data: folder } = useGetSearchEverythingFolder(selectedItemId);

  const onShowInFolder = async () => {
    navigate(folder.parent_id == null ? '/explorer' : `/explorer/${folder.parent_id}`);
  };

  return folder ? (
    <aside className="hidden min-w-96 w-2/5 bg-white p-6 border-l border-gray-200 lg:block overflow-y-scroll">
      <div className="pb-16 space-y-6">
        <div>
          <div className="block w-24 h-10 overflow-hidden">
            <FileIcon extensionKey="folder" size={10} />
          </div>
          <div className="mt-4 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                <span className="sr-only">Details for </span>
                {folder.name}
              </h2>
              <p className="text-sm font-medium text-gray-500">Folder</p>
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

            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">Last modified</dt>
              <dd className="text-gray-900">{ OutputDateTime(folder.updated_at) }</dd>
            </div>

            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-gray-500">Created</dt>
              <dd className="text-gray-900">{ OutputDateTime(folder.created_at) }</dd>
            </div>

          </dl>
        </div>
      </div>
    </aside>
  ) : null;
}

export default FolderPreview;
