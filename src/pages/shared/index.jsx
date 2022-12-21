import React from 'react';
import { useSelector } from 'react-redux';
import {
  useGetFile,
  useGetFolder,
  useGetSharedFilesAndFolders,
} from '../../features/shared/sharedService';
import { Spinner } from '../../common';
import SharedTable from './components/SharedTable';
import FilePreview from '../../components/FilePreview';
import FolderPreview from '../../components/FolderPreview';
import FullScreenMessage from '../../components/CenterMessage/FullScreenMessage';

export default function SharedPage() {
  const { data, filesStatus, foldersStatus } = useGetSharedFilesAndFolders();

  const selectedItemType = useSelector(
    (state) => state.shared.selectedItemType,
  );
  const { selectedItemId } = useSelector((state) => state.shared);
  const { data: file } = useGetFile(selectedItemId);
  const { data: folder } = useGetFolder(selectedItemId);

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex flex-row overflow-hidden h-full">
        <div className="flex-1 overflow-y-scroll">
          {filesStatus === 'loading' || foldersStatus === 'loading' ? (
            <div className="mx-auto w-6 mt-10 justify-center">
              <Spinner size={22} color="#0F70B7" />
            </div>
          ) : filesStatus === 'error' || foldersStatus === 'error' ? (
            <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." />
          ) : data && (data.folders.length === 0 || data.files.length === 0) ? (
            <div className="flex flex-1 h-full bg-white">
              <div className="m-auto">
                <FullScreenMessage
                  title="No shared files or folders"
                  description="Ask someone to share a folder or file with you"
                />
              </div>
            </div>
          ) : (
            <SharedTable data={data} />
          )}
        </div>

        {selectedItemType === 'file'
          ? selectedItemId && <FilePreview file={file} />
          : selectedItemId && <FolderPreview folder={folder} />}
      </div>
    </div>
  );
}
