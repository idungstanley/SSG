import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import React from 'react';
import PlaceItem from '../sidebar/components/PlaceItem';

function Directory() {
  return (
    <>
      <PlaceItem label="Tracker" icon={<Cog6ToothIcon className="h-5 w-5" />} />
      <div>Directory</div>
    </>
  );
}

export default Directory;
