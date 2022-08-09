import React from 'react';
import FileInfo from './FileInfo';
import AddFolders from './AddFolders';

function Main() {
  return (
    <div className="flex flex-col flex-1 md:flex-row w-full bg-white">
      <div className="flex-1 h-full w-full md:w-1/2 overflow-hidden flex flex-col">
        <FileInfo />
      </div>
      <div className="absolute inset-0 flex-1 flex flex-col relative w-full md:h-full h-full md:w-1/2 overflow-hidden border-t border-gray-200 md:border-t-0 md:border-l bg-white justify-between divide-y space-y-0 divide-gray-200">
        <AddFolders />
      </div>
    </div>
  );
}

export default Main;
