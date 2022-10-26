import React from 'react';
import { useSelector } from 'react-redux';
import { useGetSharedFilesAndFolders } from '../../features/shared/sharedService';
// import ExplorerTable from '../explorer/ExplorerPage/components/ExplorerTable';
// import useInfiniteScroll from 'react-infinite-scroll-hook';
import FilePreview from '../explorer/ExplorerPage/components/preview/FilePreview';
import FolderPreview from '../explorer/ExplorerPage/components/preview/FolderPreview';
import { Spinner } from '../../common';
import SharedTable from './components/SharedTable';

export default function SharedPage() {
  const { data } = useGetSharedFilesAndFolders();

  const selectedItemType = useSelector((state) => state.shared.selectedItemType);
  const selectedItemId = useSelector((state) => state.shared.selectedItemId);

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex flex-row overflow-hidden h-full">
        <div className="flex-1 overflow-y-scroll">
          {data.filesStatus === true && data.files.length === 0 ? (
          // <div className="overflow-x-none bg-gray-50 h-full align-middle inline-block min-w-full">
            <p className="text-red-700 font-bold text-center my-2">No found shared files</p>
          // </div>
          ) : <> </> }
          {data.foldersStatus === true && data.folders.length === 0 ? (
          // <div className="overflow-x-none bg-gray-50 h-full align-middle inline-block min-w-full">
            <p className="text-red-700 font-bold text-center my-2">No found shared folders</p>
          // </div>
          ) : <> </> }
          {/* {((fileStatus === 'loading') || (folderStatus === 'loading')) && (
            <div className="mx-auto w-6 mt-10 justify-center">
              <Spinner size={22} color="#0F70B7" />
            </div>
          )} */}
          {data.filesStatus && data.foldersStatus ? (
            <SharedTable data={data} tableTitle="Notes" />
          ) : (
            <div className="mx-auto w-6 mt-10 justify-center">
              <Spinner size={22} color="#0F70B7" />
            </div>
          )}
        </div>

        {selectedItemType === 'file' && selectedItemId && <FilePreview />}
        {selectedItemType === 'folder' && selectedItemId && <FolderPreview />}
      </div>
    </div>
  );
}
