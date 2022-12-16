import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { useUppy, DashboardModal } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { useQueryClient } from '@tanstack/react-query';
import {
  setCurrentInbox,
  setShowUploadModal,
} from '../features/inbox/inboxSlice';

export default function UploadModal() {
  const dispatch = useDispatch();
  const { inboxId: inboxIdParams } = useParams();
  const { currentItemId } = useSelector((state) => state.workspace);
  const inboxId = inboxIdParams || currentItemId;

  const showUploadModal = useSelector((state) => state.inbox.showUploadModal);

  const queryClient = useQueryClient();

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

  uppy.on('upload-success', (file, response) => {
    const httpStatus = response.status;
    const httpBody = response.body;

    // console.log(httpBody);

    if (httpStatus === 200) {
      if (httpBody.success === true) {
        queryClient.invalidateQueries([
          'inbox_files',
          inboxId,
          { isArchived: 0 },
        ]);
        queryClient.invalidateQueries(['inboxes']);
        queryClient.invalidateQueries(['inbox_files', inboxId]);
      }
    }
  });

  useEffect(() => {
    // Set selected inbox to the current one (and reset anything that is needed)
    dispatch(
      setCurrentInbox({
        inboxId,
      }),
    );

    uppy.setState({
      xhrUpload: {
        ...xhrUpload,
        endpoint: `${process.env.REACT_APP_API_BASE_URL}/api/af/inboxes/${inboxId}/upload-file`,
      },
    });
  }, [inboxId]);

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
