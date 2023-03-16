import { useDispatch } from 'react-redux';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { useUppy, DashboardModal } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { InvalidateQueryFilters, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '../../app/hooks';
import { setShowUploadModal } from '../../features/general/uploadFile/uploadFileSlice';

interface UploadFileModalProps {
  invalidateQuery: InvalidateQueryFilters<unknown>;
  endpoint: string;
}

export default function UploadFileModal({ invalidateQuery, endpoint }: UploadFileModalProps) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { currentWorkspaceId, accessToken } = useAppSelector((state) => state.auth);
  const { showUploadModal } = useAppSelector((state) => state.upload);

  const uppy = useUppy(() =>
    new Uppy({
      debug: true,
      autoProceed: true,
      meta: {}
    }).use(XHRUpload, {
      endpoint: `${process.env.REACT_APP_API_BASE_URL}/api/${endpoint}`,
      bundle: false,
      headers: currentWorkspaceId
        ? {
            Authorization: `Bearer ${accessToken}`,
            current_workspace_id: currentWorkspaceId
          }
        : undefined
    })
  );

  uppy.on('upload-success', (_file, response) => {
    const { status } = response;
    const { success } = response.body as { success: boolean };

    if (status === 200 && success) {
      queryClient.invalidateQueries(invalidateQuery);
    }
  });

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
