import React from 'react';
import PriorityDropdown from '../../../../../priority/PriorityDropdown';
import { IHubDetails } from '../../../../../../features/hubs/hubs.interfaces';
import { ITaskFullList } from '../../../../../../features/task/interface.tasks';
import { IListDetails } from '../../../../../../features/list/list.interfaces';
import { IWalletDetails } from '../../../../../../features/wallet/wallet.interfaces';

interface PriorityProps {
  details: IHubDetails | undefined | ITaskFullList | IListDetails | IWalletDetails;
}

export default function Priority({ details }: PriorityProps) {
  return details ? (
    <div className=" p-1 ml-1">
      {'priority' in details ? <PriorityDropdown taskCurrentPriority={details.priority} /> : null}
    </div>
  ) : null;
}
