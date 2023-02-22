import React from 'react';
import PlaceItem from '../sidebar/components/PlaceItem';
import { MdAlternateEmail } from 'react-icons/md';

function Favorites() {
  return (
    <>
      <PlaceItem
        label="Email"
        icon={<MdAlternateEmail className="w-4 h-4" />}
      />
      <div>favorites</div>
    </>
  );
}

export default Favorites;
