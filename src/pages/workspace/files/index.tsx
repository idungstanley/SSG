import { DocumentTextIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';

function Files() {
  return (
    <>
      <PlaceItem
        label="Forms"
        icon={<DocumentTextIcon className="h-5 w-5" />}
      />
      <Link
        to="/explorer"
        id="home"
        key=""
        className="flex items-center justify-start h-10 pl-2 space-x-3 rounded hover:bg-gray-200"
      >
        <p>Explorer</p>
      </Link>
    </>
  );
}

export default Files;
