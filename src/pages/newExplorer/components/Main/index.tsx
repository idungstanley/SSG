import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { classNames } from '../../../../utils';

import FilePreview from './components/FilePreview';
import FilesListWithToolbar from './components/FilesListWithToolbar';

export default function Main() {
  const { settings } = useAppSelector((state) => state.account);
  const { showPreview } = settings;

  return (
    <div
      className={classNames('border-t', showPreview ? 'grid grid-cols-2' : '')}
    >
      <FilesListWithToolbar />

      {/* file preview */}
      {showPreview ? <FilePreview /> : null}
    </div>
  );
}
