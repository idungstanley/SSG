import React from 'react';
import PriorityDropdown from '../../../../../../../components/priority/PriorityDropdown';
import Details from '../../../../../../../components/ItemPreviewSidebar/Components/Details';

interface PriorityProps {
  Details: any;
}

export default function Priority({ Details }: PriorityProps) {
  return (
    <div className=" p-1 ml-1">
      <PriorityDropdown TaskCurrentPriority={Details?.priority} />
    </div>
  );
}
