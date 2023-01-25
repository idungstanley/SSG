import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { classNames } from '../../../../utils';

import FilePreview from './components/FilePreview';
import FilesListWithToolbar from './components/FilesListWithToolbar';

export default function Main() {
  const { settings } = useAppSelector((state) => state.account);
  const { showPreview } = settings;

  const { fastPreview } = useAppSelector((state) => state.explorer);

  const show = showPreview || fastPreview.show;

  return (
    <div className={classNames('border-t', show ? 'grid grid-cols-2' : '')}>
      <FilesListWithToolbar />

      {/* file preview */}
      {show ? <FilePreview /> : null}
    </div>
  );
}
