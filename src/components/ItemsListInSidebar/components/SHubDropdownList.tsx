import React from 'react';
import WalletIndex from '../../Index/walletIndex/WalletIndex';
import ListIndex from '../../Index/listIndex/ListIndex';
import InboxIndex from '../../Index/InboxIndex';
import { useAppSelector } from '../../../app/hooks';

export default function SHubDropdownList() {
  const { currSubHubId, currSubHubIdType } = useAppSelector((state) => state.hub);

  return currSubHubIdType === 'subhub' ? (
    <>
      <div>
        <WalletIndex showHubList={!false} getCurrentHubId={currSubHubId} paddingLeft="25" />
        <ListIndex showHubList={!false} getCurrentHubId={currSubHubId} paddingLeft="40" />
      </div>
    </>
  ) : (
    <InboxIndex />
  );
}
