import React from 'react';
import { useDispatch } from 'react-redux';
import { LightBulbIcon } from '@heroicons/react/24/outline';
import FolderSearchResultItem from './FolderSearchResultItem';
import SelectedFolderItem from './SelectedFolderItem';
import {
  useGetInboxFile,
  useSearchFoldersForFiling,
} from '../../../../../../../features/inbox/inboxService';
import {
  setSearchFoldersQuery,
  addFolderForFiling,
  removeFolderForFiling,
} from '../../../../../../../features/inbox/inboxSlice';
import {
  SearchInput,
  StackListWithHeader,
  Badge,
} from '../../../../../../../components';
import { useAppSelector } from '../../../../../../../app/hooks';

function AddFolders() {
  const dispatch = useDispatch();

  const { searchFoldersQuery, selectedInboxFileId, folderIdsForFiling } =
    useAppSelector((state) => state.inbox);

  const { data: inboxFile } = useGetInboxFile(selectedInboxFileId);
  const { data: folderSearchData, status: folderSearchStatus } =
    useSearchFoldersForFiling(searchFoldersQuery);

  const updateFolderSearchQuery = (query: string) => {
    dispatch(
      setSearchFoldersQuery({
        query,
      })
    );
  };

  const handleAddFolder = (folderId: string) => {
    dispatch(addFolderForFiling(folderId));
  };

  const handleRemoveFolder = (folderId: string) => {
    dispatch(removeFolderForFiling(folderId));
  };

  return inboxFile ? (
    <div className="w-full mx-auto h-full">
      <div className="flex flex-col w-full h-full">
        {/* <FileHeader /> */}
        <div className="p-6 pb-0 pt-4 h-full flex flex-col">
          <div className="mb-5">
            <div className="flex justify-between">
              <div className="text-left">
                <h2 className="text-lg font-medium text-gray-900">
                  Where would you like to save this file?
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Search your folders, or use our smart suggestions.
                </p>
              </div>

              <div>
                {inboxFile.status === 'pending' && (
                  <Badge
                    value="Pending filing"
                    textColour="text-black"
                    backgroundColour="bg-gray-100"
                    textSize="text-sm"
                    fontWeight="font-medium"
                    paddingHorizontal="px-4"
                    paddingVertical="py-1"
                  />
                )}

                {inboxFile.status === 'filed' && (
                  <Badge
                    value="Filed"
                    textColour="text-green-800"
                    backgroundColour="bg-green-100"
                    textSize="text-sm"
                    fontWeight="font-medium"
                    paddingHorizontal="px-4"
                    paddingVertical="py-1"
                  />
                )}
              </div>
            </div>

            <div className="mt-5 mb-5 flex">
              <SearchInput
                onChange={(value) => updateFolderSearchQuery(value)}
                value={searchFoldersQuery}
                placeholder="Search all folders..."
                loading={folderSearchStatus === 'loading'}
              />
            </div>

            {folderIdsForFiling.length !== 0 && (
              <div className="mb-3">
                <div className="mt-3">
                  {folderIdsForFiling.map((folderId) => (
                    <SelectedFolderItem
                      key={folderId}
                      folderId={folderId}
                      handleRemoveFolder={handleRemoveFolder}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {searchFoldersQuery != null && folderSearchStatus !== 'loading' && (
            <div className="overflow-hidden flex-1 h-full pb-6">
              <StackListWithHeader
                title={<span>Folders</span>}
                items={
                  folderSearchStatus === 'success' ? (
                    folderSearchData.data.folders.map((folder) => (
                      <FolderSearchResultItem
                        key={folder.id}
                        folderId={folder.id}
                        handleAddFolder={handleAddFolder}
                        handleRemoveFolder={handleRemoveFolder}
                      />
                    ))
                  ) : (
                    <></>
                  )
                }
              />
            </div>
          )}

          {searchFoldersQuery == null && (
            <div className="overflow-hidden flex-1 h-full pb-6">
              <StackListWithHeader
                title={
                  <div className="flex">
                    SMART FOLDER SUGGESTIONS
                    <LightBulbIcon
                      className="h-5 w-5 ml-1 -mt-0.5 text-yellow-400"
                      aria-hidden="true"
                    />
                  </div>
                }
                items={<span>Test</span>}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default AddFolders;
