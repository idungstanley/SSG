import React from 'react';
import FilePreview from './components/FilePreview';
import FilesListWithToolbar from './components/FilesListWithToolbar';

export default function Main() {
  return (
    <div className="flex flex-row border-t">
      <FilesListWithToolbar />

      {/* file preview */}
      <FilePreview />
    </div>
  );
}
