import { useDispatch } from 'react-redux';
import Uppy from '@uppy/core';
import { DashboardModal } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { useAppSelector } from '../../../../../app/hooks';
import { setChatAttachmentsFiles, setShowFileAttachModal } from '../../../../../features/chat/chatSlice';

export default function AttachChatFileModal() {
  const dispatch = useDispatch();

  const { showFileAttachModal } = useAppSelector((state) => state.chat);

  // init
  const uppy = new Uppy({ autoProceed: false });

  uppy.on('file-added', (file) => {
    console.log('file-added', file);
  });

  // uppy.on('upload', (data) => {
  //   // data object consists of `id` with upload ID and `fileIDs` array
  //   // with file IDs in current upload
  //   // data: { id, fileIDs }
  //   // const { id, files } = data;
  //   console.log('upload', data);
  // });

  uppy.on('complete', (result) => {
    console.log('successful files:', typeof result.successful);
    console.log('failed files:', result.failed);
    dispatch(setChatAttachmentsFiles(result.successful));
    dispatch(setShowFileAttachModal(false));
  });

  return (
    <DashboardModal
      id={String(Date.now())}
      uppy={uppy}
      closeModalOnClickOutside
      proudlyDisplayPoweredByUppy={false}
      open={showFileAttachModal}
      onRequestClose={() => dispatch(setShowFileAttachModal(false))}
      showRemoveButtonAfterComplete={false}
      animateOpenClose={true}
      showProgressDetails
    />
  );
}
