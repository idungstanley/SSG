import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetDirectory } from '../../features/directory/directoryService';
import Sidebar from '../workspace/sidebar/Sidebar';

function Directory() {
  const { directoryId } = useParams();

  const { data } = useGetDirectory(directoryId);

  return (
    <>
      <Sidebar />
      <div className="ml-80">
        {data?.name ? (
          <p>Selected directory: {data.name}</p>
        ) : (
          <p>No selected directory</p>
        )}

        <p className="text-red-500">no design for this page :(</p>
      </div>
    </>
  );
}

export default Directory;
