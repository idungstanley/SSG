import React from 'react';
import { useSelector } from 'react-redux';
import { useGetSharedFilesAndFolders } from '../../features/shared/sharedService';
import { Spinner } from '../../common';
import SharedTable from './components/SharedTable';
import FilePreview from './components/FilePreview';
import FolderPreview from './components/FolderPreview';
import { EmptyStateSimple } from '../../components';

export default function SharedPage() {
  const {
    data, filesStatus, foldersStatus,
  } = useGetSharedFilesAndFolders();

  const selectedItemType = useSelector((state) => state.shared.selectedItemType);
  const selectedItemId = useSelector((state) => state.shared.selectedItemId);

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex flex-row overflow-hidden h-full">
        <div className="flex-1 overflow-y-scroll">
          {filesStatus === 'loading' || foldersStatus === 'loading' ? (
            <div className="mx-auto w-6 mt-10 justify-center">
              <Spinner size={22} color="#0F70B7" />
            </div>
          ) : filesStatus === 'error' || foldersStatus === 'error' ? <p>Error</p> : data.folders === 0 || data.files === 0 ? (
            <div className="flex flex-1 h-full bg-white">
              <div className="m-auto">
                <EmptyStateSimple
                  title="No shared files or folders"
                  description="Ask someone to share a folder or file with you"
                />
              </div>
            </div>
          ) : <SharedTable data={data} /> }
        </div>

        {selectedItemType === 'file' ? selectedItemId && <FilePreview /> : selectedItemId && <FolderPreview />}
      </div>
    </div>
  );
}
