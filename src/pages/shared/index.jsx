import React from 'react';
import { useSelector } from 'react-redux';
// import ExplorerTable from '../explorer/ExplorerPage/components/ExplorerTable';
// import useInfiniteScroll from 'react-infinite-scroll-hook';
import FilePreview from '../explorer/ExplorerPage/components/preview/FilePreview';
import FolderPreview from '../explorer/ExplorerPage/components/preview/FolderPreview';
import { Spinner } from '../../common';
import { useGetSharedFiles, useGetSharedFolders } from '../../features/shared/sharedService';

export default function SharedPage() {
  const { status: fileStatus, data: filesData } = useGetSharedFiles();
  const { status: folderStatus, data: foldersData } = useGetSharedFolders();

  // const [unpaginatedData, setUnpaginatedData] = useState([]);

  // const {
  //   status,
  //   data,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useGetInboxFiles({
  //   inboxId,
  // });

  // const [sentryRef] = useInfiniteScroll({
  //   loading: status === 'loading',
  //   hasNextPage,
  //   onLoadMore: fetchNextPage,
  //   disabled: false,
  //   rootMargin: '0px 0px 800px 0px',
  // });

  // useEffect(() => {
  //   if (status === 'success' && data) {
  //     setUnpaginatedData(data.pages.flatMap((page) => page.data.inbox_files));
  //   }
  //   return true;
  // }, [data]);
  console.log(fileStatus, folderStatus);

  const selectedItemType = useSelector((state) => state.shared.selectedItemType);
  const selectedItemId = useSelector((state) => state.shared.selectedItemId);

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex flex-row overflow-hidden h-full">
        <div className="flex-1 overflow-y-scroll">
          {fileStatus === 'success' && (filesData?.data?.files.length !== 0) && (
            <div className="overflow-x-none bg-gray-50 h-full align-middle inline-block min-w-full">
              <p>{filesData?.data?.files.length}</p>
            </div>
          )}
          {folderStatus === 'success' && (foldersData?.data?.folders.length !== 0) && (
            <div className="overflow-x-none bg-gray-50 h-full align-middle inline-block min-w-full">
              <p>{foldersData?.data?.folders.length}</p>
            </div>
          )}
          {((fileStatus === 'loading') || (folderStatus === 'loading')) && (
            <div className="mx-auto w-6 mt-10 justify-center">
              <Spinner size={22} color="#0F70B7" />
            </div>
          )}
          {/* <ExplorerTable tableTitle="Files" /> */}
        </div>

        {selectedItemType === 'file' && selectedItemId && <FilePreview />}
        {selectedItemType === 'folder' && selectedItemId && <FolderPreview />}
      </div>
    </div>
  );
}
