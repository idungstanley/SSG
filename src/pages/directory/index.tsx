import React from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import PlaceItem from '../workspace/sidebar/components/PlaceItem';

function Directory() {
  return (
    <>
      <PlaceItem
        label="Directory"
        icon={<Cog6ToothIcon className="h-5 w-5" />}
      />
      <div>Directory</div>
    </>
  );
}

export default Directory;
