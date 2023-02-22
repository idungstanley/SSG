import emailIcon from '../../../assets/branding/email-icon.png';
import React from 'react';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import { useAppSelector } from '../../../app/hooks';
import { cl } from '../../../utils';

function Favorites() {
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <>
      <PlaceItem
        label="Email"
        icon={<img src={emailIcon} alt="icon" className="h-4 w-4" />}
      />
      <div className={cl(!showSidebar && 'overflow-x-hidden w-12')}>
        favorites
      </div>
    </>
  );
}

export default Favorites;
