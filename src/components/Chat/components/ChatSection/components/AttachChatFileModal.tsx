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
  const uppy = new Uppy();

  uppy.on('complete', (result) => {
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
