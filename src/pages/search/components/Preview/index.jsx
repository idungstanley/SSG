import React from 'react';
import { useSelector } from 'react-redux';
import FolderPreview from './FolderPreview';
import FilePreview from './FilePreview';

function Preview() {
  const selectedItemId = useSelector((state) => state.search.selectedItemId);
  const selectedItemType = useSelector((state) => state.search.selectedItemType);

  return (
    <>
      {selectedItemType === 'folder' && selectedItemId !== null && (
        <FolderPreview />
      )}
      {selectedItemType === 'file' && selectedItemId !== null && (
        <FilePreview />
      )}
    </>
  );
}

export default Preview;
