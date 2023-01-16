import React from 'react';
import FilePreview from './components/FilePreview';
import FilesListWithToolbar from './components/FilesListWithToolbar';

export default function Main() {
  return (
    <div className="grid grid-cols-2 border-t">
      <FilesListWithToolbar />

      {/* file preview */}
      <FilePreview />
    </div>
  );
}
