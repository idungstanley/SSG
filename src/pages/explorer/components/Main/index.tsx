import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { cl } from '../../../../utils';
import FilePreview from './components/FilePreview';
import FilesListWithToolbar from './components/FilesListWithToolbar';

export default function Main() {
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector((state) => state.account);
  const { showPreview } = settings;

  const { selectedFileId, selectedFolderId, fastPreview } = useAppSelector(
    (state) => state.explorer
  );

  // set data for pilot
  useEffect(() => {
    const selectedItemId = selectedFileId || selectedFolderId;
    const selectedItemType = selectedFileId ? 'file' : 'folder';

    if (selectedItemId) {
      dispatch(
        setShowPilotSideOver({
          id: selectedItemId,
          type: selectedItemType,
          show: true,
        })
      );
    }
  }, [selectedFileId, selectedFolderId]);

  // show only if preview toggle or fast preview is enabled
  const showFilePreview = showPreview || fastPreview.show;

  return (
    <div
      className={cl(
        'border-t h-full w-full grid',
        showFilePreview ? 'grid-cols-2' : 'grid-cols-1'
      )}
    >
      <FilesListWithToolbar />

      {/* file preview */}
      {showFilePreview ? <FilePreview /> : null}
    </div>
  );
}
