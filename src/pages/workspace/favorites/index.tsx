import emailIcon from '../../../assets/branding/email-icon.png';
import React from 'react';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';

function Favorites() {
  return (
    <>
      <PlaceItem
        label="Email"
        icon={<img src={emailIcon} alt="icon" className="h-4 w-4" />}
      />
      <div>favorites</div>
    </>
  );
}

export default Favorites;
