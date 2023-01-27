import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { classNames } from '../../../../utils';
import Pilot from '../Pilot';

import FilePreview from './components/FilePreview';
import FilesListWithToolbar from './components/FilesListWithToolbar';

export default function Main() {
  const { settings } = useAppSelector((state) => state.account);
  const { showPreview } = settings;

  const [showExpandedPilot, setShowExpandedPilot] = useState(false);

  const { selectedFileId, selectedFolderId, fastPreview } = useAppSelector(
    (state) => state.explorer
  );

  const showPilot = !!selectedFolderId || !!selectedFileId;

  // show only if preview toggle or fast preview is enabled
  const showFilePreview = showPreview || fastPreview.show;

  const gridCols = showFilePreview
    ? showPilot
      ? showExpandedPilot
        ? 'grid-cols-3'
        : 'grid-cols-frFrAuto'
      : 'grid-cols-2'
    : showPilot
    ? showExpandedPilot
      ? 'grid-cols-2'
      : 'grid-cols-frAuto'
    : 'grid-cols-1';

  return (
    <div className={classNames('border-t grid', gridCols)}>
      <FilesListWithToolbar />

      {/* file preview */}
      {showFilePreview ? <FilePreview /> : null}

      {showPilot ? (
        <div
          className={classNames(
            showPilot ? 'space-y-2' : '',
            'p-2 border-l h-full'
          )}
        >
          <button
            type="button"
            onClick={() => setShowExpandedPilot((prev) => !prev)}
            className="text-gray-500"
          >
            {showPilot ? (
              <ChevronDoubleRightIcon className="w-5 h-5" />
            ) : (
              <ChevronDoubleLeftIcon className="w-5 h-5" />
            )}
          </button>

          {showExpandedPilot ? <Pilot /> : null}
        </div>
      ) : null}
    </div>
  );
}
