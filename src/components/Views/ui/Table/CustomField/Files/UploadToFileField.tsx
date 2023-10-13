import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { useUppy, DashboardModal } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { useQueryClient } from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '../../../../../../app/hooks';
import { generateFilters } from '../../../../../TasksHeader/lib/generateFilters';
import { setOpenFileUploadModal } from '../../../../../../features/task/taskSlice';

const closeModal = { openModal: false, fieldId: undefined, listId: undefined, taskId: undefined };

export default function UploadToFile() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { filters } = generateFilters();
  const { currentWorkspaceId, accessToken } = useAppSelector((state) => state.auth);
  const { fileUploadProps } = useAppSelector((state) => state.task);
  const { taskId, fieldId, listId, openModal } = fileUploadProps;

  // init
  const uppy = useUppy(() =>
    new Uppy({
      debug: true,
      autoProceed: false,
      restrictions: {
        allowedFileTypes: null
      },
      meta: {}
    }).use(XHRUpload, {
      fieldName: 'file',
      endpoint: `${process.env.REACT_APP_API_BASE_URL}/api/custom-fields/${fieldId}/file`,
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
    const fileExtension = file.extension || '';
    uppy.setFileMeta(file.id, {
      id: taskId,
      type: 'task',
      extension: fileExtension
    });
  });

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
        open={openModal}
        onRequestClose={() => dispatch(setOpenFileUploadModal(closeModal))}
        showRemoveButtonAfterComplete={false}
        animateOpenClose={true}
      />
    </div>
  );
}
