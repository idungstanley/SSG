import { useDispatch } from 'react-redux';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { useUppy, DashboardModal } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { InvalidateQueryFilters, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { setShowTaskUploadModal } from '../../../../../../features/task/taskSlice';

interface UploadFileModalProps {
  invalidateQuery?: InvalidateQueryFilters<unknown>;
  endpoint?: string;
}

export default function AddFileModal({ invalidateQuery, endpoint }: UploadFileModalProps) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { currentWorkspaceId, accessToken } = useAppSelector((state) => state.auth);
  const { showTaskUploadModal } = useAppSelector((state) => state.task);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  // init
  const uppy = useUppy(() =>
    new Uppy({
      debug: true,
      autoProceed: false,
      meta: {}
    }).use(XHRUpload, {
      fieldName: 'files[0]',
      allowedMetaFields: ['id', 'type'],
      endpoint: `${process.env.REACT_APP_API_BASE_URL}/api/${endpoint}`,
      headers: currentWorkspaceId
        ? {
            Authorization: `Bearer ${accessToken}`,
            current_workspace_id: currentWorkspaceId
          }
        : undefined,
      method: 'POST'
    })
  );

  uppy.on('file-added', (file) => {
    // Set metadata for the file using uppy.setFileMeta
    uppy.setFileMeta(file.id, {
      id: activeItemId,
      type: activeItemType
    });
  });

  useEffect(() => {
    uppy.on('upload-progress', () => {
      uppy.close();
    });

    return () => {
      uppy.off('upload-success', () => uppy.close());
    };
  }, [uppy]);

  // invalidate query
  uppy.on('upload-success', (_file, response) => {
    const { status } = response;
    const { success } = response.body as { success: boolean };

    if (status === 200 && success) {
      queryClient.invalidateQueries(invalidateQuery);
    }
  });

  return (
    <DashboardModal
      id={String(Date.now())}
      uppy={uppy}
      closeModalOnClickOutside
      proudlyDisplayPoweredByUppy={false}
      open={showTaskUploadModal}
      onRequestClose={() => dispatch(setShowTaskUploadModal(false))}
      showRemoveButtonAfterComplete={false}
      animateOpenClose={true}
    />
  );
}
