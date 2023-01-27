import { AtSymbolIcon } from '@heroicons/react/24/outline';
import React from 'react';
import PlaceItem from '../sidebar/components/PlaceItem';

function Favorites() {
  return (
    <>
      <PlaceItem
        label="Email"
        icon={<AtSymbolIcon className="h-5 w-5" />}
      />
      <div>favorites</div>
    </>
  );
}

export default Favorites;
