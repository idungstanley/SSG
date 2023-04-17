import React from 'react';
import PriorityDropdown from '../../../../../priority/PriorityDropdown';
import { IHubDetails } from '../../../../../../features/hubs/hubs.interfaces';
import { ITaskFullList } from '../../../../../../features/task/interface.tasks';

interface PriorityProps {
  Details: IHubDetails | undefined | ITaskFullList;
}

export default function Priority({ Details }: PriorityProps) {
  return (
    <div className="p-1 ml-1 ">
      <PriorityDropdown TaskCurrentPriority={Details?.priority} />
    </div>
  );
}
