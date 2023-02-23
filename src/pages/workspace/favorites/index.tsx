import React from 'react';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import { useAppSelector } from '../../../app/hooks';
import { cl } from '../../../utils';
import { MdAlternateEmail } from 'react-icons/md';

function Favorites() {
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <>
      <PlaceItem
        label="Email"
        icon={<MdAlternateEmail className="w-4 h-4" />}
      />
      <div className={cl(!showSidebar && 'overflow-x-hidden w-12')}>
        favorites
      </div>
    </>
  );
}

export default Favorites;
