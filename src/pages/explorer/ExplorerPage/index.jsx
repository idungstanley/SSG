import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { HomeIcon } from '@heroicons/react/outline';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { useUppy, DashboardModal } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import Toolbar from './components/Toolbar';
import { Breadcrumb, EmptyStateSimple } from '../../../components';
import { Spinner } from '../../../common';
import CreateFolderSlideOver from './components/SlideOvers/CreateFolderSlideOver';
import { setShowUploadModal } from '../../../features/explorer/explorerSlice';
import {
  useGetExplorerFilesAndFolders,
  useGetFile,
  useGetFolder,
} from '../../../features/explorer/explorerService';
import FilePreview from '../../../components/FilePreview';
import FolderPreview from '../../../components/FolderPreview';
import RenameItemSlideOver from './components/SlideOvers/RenameFileSlideOver';
import ExplorerTable from './components/ListItems';

export default function ExplorerPage() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { folderId } = useParams();

  const { status, data } = useGetExplorerFilesAndFolders(folderId);

  const { data: currentFolder } = useGetFolder(folderId);

  const { showRenameFileSlideOver, showCreateFolderSlideOver } = useSelector(
    (state) => state.slideOver,
  );

  const { selectedItemId, showUploadModal, selectedItemType } = useSelector(
    (state) => state.explorer,
  );

  const uploadFilesUrl = `${process.env.REACT_APP_API_BASE_URL}/api/af/files`;

  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const currentWorkspaceId = JSON.parse(
    localStorage.getItem('currentWorkspaceId'),
  );

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    current_workspace_id: currentWorkspaceId,
  };

  const uppy = useUppy(() => new Uppy({
    debug: true,
    autoProceed: true,
    meta: {},
  }).use(XHRUpload, {
    endpoint: null,
    bundle: false,
    headers,
  }));

  const { xhrUpload } = uppy.getState();

  useEffect(() => {
    uppy.setState({
      xhrUpload: {
        ...xhrUpload,
        endpoint:
          folderId == null ? uploadFilesUrl : `${uploadFilesUrl}/${folderId}`,
      },
    });
  }, [folderId]);

  uppy.on('upload-success', (file, response) => {
    const httpStatus = response.status;
    const httpBody = response.body;

    if (httpStatus === 200) {
      if (httpBody.success === true) {
        queryClient.invalidateQueries([
          'explorer_files_and_folders',
          httpBody.data.uploaded_to_folder_id == null
            ? 'root-folder'
            : httpBody.data.uploaded_to_folder_id,
        ]);
      }
    }
  });

  const { data: file } = useGetFile(selectedItemId);
  const { data: folder } = useGetFolder(selectedItemId);

  return (
    <>
      <DashboardModal
        uppy={uppy}
        closeModalOnClickOutside
        proudlyDisplayPoweredByUppy={false}
        open={showUploadModal}
        onRequestClose={() => dispatch(setShowUploadModal(false))}
        showRemoveButtonAfterComplete={false}
      />
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
                <div className="overflow-x-none bg-gray-50 h-full align-middle inline-block min-w-full">
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

          {selectedItemType === 'file' && selectedItemId && (
            <FilePreview file={file} />
          )}
          {selectedItemType === 'folder' && selectedItemId && (
            <FolderPreview folder={folder} />
          )}
        </div>
      </div>

      {/* Slide Overs */}
      {showCreateFolderSlideOver ? <CreateFolderSlideOver /> : null}
      {showRenameFileSlideOver ? <RenameItemSlideOver /> : null}
    </>
  );
}
