import React from 'react';
import { useParams } from 'react-router-dom';
// import { useGetDirectory } from '../../features/directory/directoryService';
import Sidebar from '../workspace/sidebar/Sidebar';
import CreateDirectorySideOver from './components/SideOvers/CreateDirectorySideOver';

function Directory() {
  const { directoryId } = useParams();

  // const { data } = useGetDirectory(directoryId);

  return (
    <>
      <Sidebar />
      <div className="ml-80">
        {directoryId ? (
          <p>Selected directory: {directoryId}</p>
        ) : (
          <p>No selected directory</p>
        )}

        <p className="text-red-500">no design for this page :(</p>
      </div>

      <CreateDirectorySideOver />
    </>
  );
}

export default Directory;
