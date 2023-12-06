import { useDispatch } from 'react-redux';
import Uppy from '@uppy/core';
import { useUppy, DashboardModal } from '@uppy/react';
import Webcam from '@uppy/webcam';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { useAppSelector } from '../../../../../app/hooks';
import { setAvatarFile, setShowAvatarUpload } from '../../../../../features/settings/user/userSettingsSlice';

export default function UploadAvatar() {
  const dispatch = useDispatch();

  const { showAvatarUpload } = useAppSelector((state) => state.userSetting);

  // init
  const uppy = useUppy(() =>
    new Uppy({
      debug: true,
      autoProceed: false,
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .use(Webcam, {
        mirror: true,
        facingMode: 'user',
        showRecordingLength: false,
        modes: ['picture']
      })
  );

  uppy.on('complete', (result) => {
    dispatch(setAvatarFile(result.successful[0]));
    dispatch(setShowAvatarUpload(false));
  });

  return (
    <DashboardModal
      id={String(Date.now())}
      uppy={uppy}
      closeModalOnClickOutside
      proudlyDisplayPoweredByUppy={false}
      open={showAvatarUpload}
      onRequestClose={() => dispatch(setShowAvatarUpload(false))}
      showRemoveButtonAfterComplete={false}
      animateOpenClose={true}
      plugins={['Webcam']}
    />
  );
}
