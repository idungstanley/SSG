import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { useUppy, DashboardModal } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { useQueryClient } from '@tanstack/react-query';
import { setShowUploadModal } from '../features/general/uploadFile/uploadFileSlice';

const accessToken = JSON.parse(localStorage.getItem('accessToken'));
const currentWorkspaceId = JSON.parse(
  localStorage.getItem('currentWorkspaceId'),
);

const headers = {
  Authorization: `Bearer ${accessToken}`,
  current_workspace_id: currentWorkspaceId,
};

export default function UploadModal() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { showUploadModal } = useSelector((state) => state.upload);
  const { inboxId, folderId } = useParams();
  const { currentItemId } = useSelector((state) => state.workspace);

  const isExplorerPath = !!folderId;

  const dataId = isExplorerPath ? folderId : inboxId || currentItemId;

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

  uppy.on('upload-success', (file, response) => {
    const httpStatus = response.status;
    const httpBody = response.body;

    if (httpStatus === 200) {
      if (httpBody.success === true) {
        if (isExplorerPath) {
          queryClient.invalidateQueries([
            'explorer_files_and_folders',
            httpBody.data.uploaded_to_folder_id == null
              ? 'root-folder'
              : httpBody.data.uploaded_to_folder_id,
          ]);
        } else {
          queryClient.invalidateQueries([
            'inbox_files',
            inboxId,
            { isArchived: 0 },
          ]);
          queryClient.invalidateQueries(['inboxes']);
          queryClient.invalidateQueries(['inbox_files', inboxId]);
        }
      }
    }
  });

  useEffect(() => {
    // dispatch(
    //   setCurrentInbox({
    //     inboxId,
    //   })
    // );
    const uploadUrl = `${process.env.REACT_APP_API_BASE_URL}/api/af/${
      isExplorerPath ? 'files' : 'inboxes'
    }`;
    const endpoint = isExplorerPath
      ? folderId == null
        ? uploadUrl
        : `${uploadUrl}/${folderId}`
      : `${uploadUrl}/${inboxId}/upload-file`;

    uppy.setState({
      xhrUpload: {
        ...xhrUpload,
        endpoint,
      },
    });
  }, [dataId]);

  return (
    <DashboardModal
      uppy={uppy}
      closeModalOnClickOutside
      proudlyDisplayPoweredByUppy={false}
      open={showUploadModal}
      onRequestClose={() => dispatch(setShowUploadModal(false))}
      showRemoveButtonAfterComplete={false}
    />
  );
}
