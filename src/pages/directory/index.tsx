import React from 'react';
import { RectangleStackIcon } from '@heroicons/react/24/outline';
import PlaceItem from '../workspace/sidebar/components/PlaceItem';

function Directory() {
  return (
    <>
      <PlaceItem
        label="Directory"
        icon={<RectangleStackIcon className="h-5 w-5" />}
      />
      <div>Directory</div>
    </>
  );
}

export default Directory;
