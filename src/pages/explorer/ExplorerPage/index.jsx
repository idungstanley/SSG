import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HomeIcon } from '@heroicons/react/outline';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import Toolbar from './components/Toolbar';
import { Breadcrumb, EmptyStateSimple } from '../../../components';
import { Spinner } from '../../../common';
import CreateFolderSlideOver from './components/SlideOvers/CreateFolderSlideOver';
import {
  useGetExplorerFilesAndFolders,
  useGetFolder,
} from '../../../features/explorer/explorerService';
import RenameItemSlideOver from './components/SlideOvers/RenameFileSlideOver';
import ExplorerTable from './components/ListItems';
import UploadModal from '../../../components/UploadModal';
import { setShowUploadModal } from '../../../features/general/uploadFile/uploadFileSlice';

export default function ExplorerPage() {
  const dispatch = useDispatch();
  const { folderId } = useParams();

  const { status, data } = useGetExplorerFilesAndFolders(folderId);

  const { data: currentFolder } = useGetFolder(folderId);

  const { showRenameFileSlideOver, showCreateFolderSlideOver } = useSelector(
    (state) => state.slideOver,
  );

  return (
    <>
      <UploadModal />
      <div className="h-full flex flex-col w-full">
        <div className="w-full">
          <Toolbar />
        </div>

        {/* Breadcrumb */}
        <Breadcrumb
          pages={
            currentFolder != null
              ? [
                ...currentFolder.ancestors.map((ancestor) => ({
                  name: ancestor.name,
                  current: false,
                  href: `/explorer/${ancestor.id}`,
                })),
                ...[{ name: currentFolder.name, current: true, href: null }],
              ]
              : [{ name: 'Home', current: true, href: null }]
          }
          rootIcon={
            <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
          }
          rootIconHref="/explorer"
        />

        <div className="flex flex-row overflow-hidden h-full">
          <div className="flex-1 overflow-y-scroll">
            {status === 'success'
              && (data?.data?.folders.length !== 0
                || data?.data?.files.length !== 0) && (
                <div className="relative overflow-x-none bg-gray-50 h-full align-middle inline-block min-w-full">
                  <ExplorerTable />
                </div>
            )}

            {status === 'success'
              && data?.data?.folders.length === 0
              && data?.data?.files.length === 0 && (
                <div className="flex flex-1 h-full bg-white">
                  <div className="m-auto">
                    <EmptyStateSimple
                      title="Empty folder"
                      description="Upload files to this folder"
                      ctaText="Upload"
                      ctaOnClick={() => dispatch(setShowUploadModal(true))}
                      showCta
                    />
                  </div>
                </div>
            )}

            {status === 'loading' && (
              <div className="mx-auto w-6 mt-10 justify-center">
                <Spinner size={22} color="#0F70B7" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide Overs */}
      {showCreateFolderSlideOver ? <CreateFolderSlideOver /> : null}
      {showRenameFileSlideOver ? <RenameItemSlideOver /> : null}
    </>
  );
}
