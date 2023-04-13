import { DocumentTextIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import { cl } from '../../../utils';

function Files() {
  const { showSidebar } = useAppSelector((state) => state.account);
  return (
    <>
      <PlaceItem label="Forms" id={5} icon={<DocumentTextIcon className="w-4 h-4" />} />
      <Link
        to="/explorer"
        id="home"
        key=""
        className={cl(
          'mb-2 flex items-center justify-start h-10 pl-2 space-x-3 rounded hover:bg-gray-200',
          !showSidebar && 'overflow-x-hidden w-12'
        )}
      >
        <p>Explorer</p>
      </Link>
    </>
  );
}

export default Files;
