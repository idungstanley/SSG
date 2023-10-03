import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { useUppy, DashboardModal } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { generateFilters } from '../../../../../TasksHeader/lib/generateFilters';

interface UploadFileModalProps {
  fieldId: string;
  listId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  taskId: string;
}

export default function UploadToFile({ fieldId, listId, setOpen, open, taskId }: UploadFileModalProps) {
  const queryClient = useQueryClient();
  const { filters } = generateFilters();
  const { currentWorkspaceId, accessToken } = useAppSelector((state) => state.auth);

  // init
  const uppy = useUppy(() =>
    new Uppy({
      debug: true,
      autoProceed: false,
      meta: {}
    }).use(XHRUpload, {
      fieldName: 'file',
      allowedMetaFields: ['id', 'type'],
      endpoint: `${process.env.REACT_APP_API_BASE_URL}/custom-fields/${fieldId}/file`,
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
    uppy.setFileMeta(file.id, {
      id: taskId,
      type: 'task'
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
      queryClient.invalidateQueries(['task', listId, 'hub', filters]);
    }
  });

  return (
    <div>
      <DashboardModal
        id={String(Date.now())}
        uppy={uppy}
        closeModalOnClickOutside
        proudlyDisplayPoweredByUppy={false}
        open={open}
        onRequestClose={() => setOpen(false)}
        showRemoveButtonAfterComplete={false}
        animateOpenClose={true}
      />
    </div>
  );
}
