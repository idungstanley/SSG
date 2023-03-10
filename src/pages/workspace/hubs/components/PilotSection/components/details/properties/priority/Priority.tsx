import React from 'react';
import PriorityDropdown from '../../../../../../../../../components/priority/PriorityDropdown';

interface PriorityProps {
  Details: {
    id: string;
    name: string;
    description: string;
    created_at: string;
    priority: string;
  };
}

export default function Priority({ Details }: PriorityProps) {
  return (
    <div className=" p-1 ml-1">
      <PriorityDropdown TaskCurrentPriority={Details?.priority} />
    </div>
  );
}
