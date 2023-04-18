import React from 'react';
import PriorityDropdown from '../../../../../priority/PriorityDropdown';
import { IHubDetails } from '../../../../../../features/hubs/hubs.interfaces';
import { ITaskFullList } from '../../../../../../features/task/interface.tasks';
import { IListDetails } from '../../../../../../features/list/list.interfaces';

interface PriorityProps {
  Details: IHubDetails | undefined | ITaskFullList | IListDetails;
}

export default function Priority({ Details }: PriorityProps) {
  return Details ? (
    <div className=" p-1 ml-1">
      {'priority' in Details ? <PriorityDropdown TaskCurrentPriority={Details.priority} /> : null}
    </div>
  ) : null;
}
