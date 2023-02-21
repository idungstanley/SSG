import React from 'react';
import { IoBusinessOutline } from 'react-icons/io5';
import PlaceItem from '../sidebar/components/PlaceItem';

export default function Commerce() {
  return (
    <div>
      <PlaceItem label="Commerce" icon={<IoBusinessOutline className="w-5 h-5" />} />
      <div>Commerce</div>
    </div>
  );
}
