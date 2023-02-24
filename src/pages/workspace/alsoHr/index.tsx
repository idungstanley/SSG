import React from 'react';
import { FaHandsHelping } from 'react-icons/fa';
import PlaceItem from '../sidebar/components/PlaceItem';

export default function AlsoHr() {
  return (
    <div>
      <PlaceItem label="ALSO HR" icon={<FaHandsHelping className="w-5 h-5" />} />
      <div>ALSO HR</div>
    </div>
  );
}
