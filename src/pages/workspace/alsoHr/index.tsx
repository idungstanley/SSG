import { FaHandsHelping } from 'react-icons/fa';
import PlaceItem from '../../../layout/components/MainLayout/Sidebar/components/PlaceItem';
import ActiveTrees from '../alsoHr/components/ActiveTree/ActiveTrees';
import React from 'react';

export default function AlsoHr() {
  return (
    <>
      <PlaceItem label="ALSO HR" id="8" icon={<FaHandsHelping className="w-4 h-4" />} />

      <ActiveTrees />
    </>
  );
}
