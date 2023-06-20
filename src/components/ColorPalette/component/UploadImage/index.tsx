import { useDispatch } from 'react-redux';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { useUppy, DashboardModal } from '@uppy/react';
import Webcam from '@uppy/webcam';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { InvalidateQueryFilters, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { setShowUploadImage } from '../../../../features/account/accountSlice';

interface UploadFileModalProps {
  invalidateQuery?: InvalidateQueryFilters<unknown>;
  endpoint?: string;
}

export default function UploadImage({ invalidateQuery, endpoint }: UploadFileModalProps) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { currentWorkspaceId, accessToken } = useAppSelector((state) => state.auth);
  const { showUploadImage } = useAppSelector((state) => state.account);

  // init
  const uppy = useUppy(() =>
    new Uppy({
      debug: true,
      autoProceed: true,
      meta: {},
      restrictions: {
        maxFileSize: null,
        minFileSize: null,
        maxTotalFileSize: null,
        maxNumberOfFiles: 1,
        minNumberOfFiles: null,
        allowedFileTypes: ['image/*']
      }
    })
      .use(XHRUpload, {
        allowedMetaFields: ['image', 'path'],
        endpoint: '',
        bundle: false,
        headers: currentWorkspaceId
          ? {
              Authorization: `Bearer ${accessToken}`,
              current_workspace_id: currentWorkspaceId
            }
          : undefined,
        method: 'POST',
        formData: true,
        fieldName: 'image'
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .use(Webcam, {
        mirror: true,
        facingMode: 'user',
        showRecordingLength: false,
        modes: ['picture']
      })
  );

  const { xhrUpload } = uppy.getState();

  // setup data
  useEffect(() => {
    uppy.setState({
      xhrUpload: {
        ...xhrUpload,
        endpoint: `${process.env.REACT_APP_API_BASE_URL}/api/${endpoint}`
      }
    });
  }, [endpoint]);

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
      open={showUploadImage}
      onRequestClose={() => dispatch(setShowUploadImage(false))}
      showRemoveButtonAfterComplete={false}
      animateOpenClose={true}
      plugins={['Webcam']}
    />
  );
}
