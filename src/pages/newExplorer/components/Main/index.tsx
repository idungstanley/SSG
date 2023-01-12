import React from 'react';
import FilesListWithToolbar from './components/FilesListWithToolbar';

export default function Main() {
  return (
    <div className="grid grid-cols-2">
      <FilesListWithToolbar />

      {/* file preview */}
      <div className="border">
        <h1>file preview</h1>
      </div>
    </div>
  );
}
