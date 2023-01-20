import React from 'react';
import { useParams } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import Toolbar from './components/Toolbar';
import { Breadcrumb } from '../../../components';
import CreateFolderSlideOver from './components/SlideOvers/CreateFolderSlideOver';
import {
  useGetExplorerFilesAndFolders,
  useGetFolder,
} from '../../../features/explorer/explorerService';
import RenameItemSlideOver from './components/SlideOvers/RenameFileSlideOver';
import ExplorerTable from './components/ListItems';
import UploadModal from '../../../components/UploadModal';
import { useAppSelector } from '../../../app/hooks';

export default function ExplorerPage() {
  const { folderId } = useParams();

  const { isSuccess } = useGetExplorerFilesAndFolders();
  const { data } = useGetFolder(folderId, isSuccess);

  const { showRenameFileSlideOver, showCreateFolderSlideOver } = useAppSelector(
    (state) => state.slideOver
  );

  return (
    <>
      <UploadModal />
      <div className="h-full flex flex-col w-full">
        <div className="w-full">
          <Toolbar />
        </div>

        {data ? (
          <Breadcrumb
            pages={
              data?.ancestors
                ? [
                    ...data.ancestors.map((ancestor) => ({
                      name: ancestor.name,
                      current: false,
                      href: `/explorer/${ancestor.id}`,
                    })),
                    ...[{ name: data.name, current: true, href: null }],
                  ]
                : [{ name: 'Home', current: true, href: null }]
            }
            rootIcon={
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
            }
            rootIconHref="/explorer"
          />
        ) : null}

        <div className="flex overflow-y-scroll relative overflow-x-none bg-white w-full overflow-hidden h-full">
          <ExplorerTable />
        </div>
      </div>

      {/* Slide Overs */}
      {showCreateFolderSlideOver ? <CreateFolderSlideOver /> : null}
      {showRenameFileSlideOver ? <RenameItemSlideOver /> : null}
    </>
  );
}
