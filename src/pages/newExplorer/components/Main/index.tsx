import React from 'react';
import FilesList from './components/FilesList';

export default function Main() {
  return (
    <div className="grid grid-cols-2">
      <div className="grid grid-rows-mainContent border">
        {/* toolbar */}
        <div className="border">
          <h1>toolbar</h1>
        </div>

        {/* file list */}
        <FilesList />
      </div>

      {/* file preview */}
      <div className="border">
        <h1>file preview</h1>
      </div>
    </div>
  );
}
