import React from 'react';
import WalletIndex from '../../Index/WalletIndex';
import ListIndex from '../../Index/ListIndex';
import InboxIndex from '../../Index/InboxIndex';
import { useAppSelector } from '../../../app/hooks';

export default function SHubDropdownList() {
  const { currSubHubId, currSubHubIdType } = useAppSelector(
    (state) => state.hub
  );

  return currSubHubIdType === 'subhub' ? (
    <>
      <div className="ml-4">
        <WalletIndex showHubList={!false} getCurrentHubId={currSubHubId} />
        <ListIndex showHubList={!false} getCurrentHubId={currSubHubId} />
      </div>
    </>
  ) : (
    <InboxIndex />
  );
}
