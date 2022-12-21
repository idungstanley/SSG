import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeIcon } from '@heroicons/react/outline';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import Toolbar from './components/Toolbar';
import { Breadcrumb } from '../../../components';
import CreateFolderSlideOver from './components/SlideOvers/CreateFolderSlideOver';
import {
  useGetFolder,
} from '../../../features/explorer/explorerService';
import RenameItemSlideOver from './components/SlideOvers/RenameFileSlideOver';
import ExplorerTable from './components/ListItems';
import UploadModal from '../../../components/UploadModal';

export default function ExplorerPage() {
  const { folderId } = useParams();

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

        <div className="flex-1 overflow-y-scroll relative overflow-x-none bg-white align-middle min-w-full overflow-hidden h-full">
          <ExplorerTable />
        </div>
      </div>

      {/* Slide Overs */}
      {showCreateFolderSlideOver ? <CreateFolderSlideOver /> : null}
      {showRenameFileSlideOver ? <RenameItemSlideOver /> : null}
    </>
  );
}
