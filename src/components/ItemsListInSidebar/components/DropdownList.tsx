import React from 'react';
import WalletIndex from '../../Index/WalletIndex';
import ListIndex from '../../Index/ListIndex';
import InboxIndex from '../../Index/InboxIndex';
import { useAppSelector } from '../../../app/hooks';
import SubHubIndex from '../../Index/subIndex/SubHubIndex';

export default function DropdownList() {
  const { currentItemId, currentItemType } = useAppSelector(
    (state) => state.workspace
  );

  return currentItemType === 'hub' ? (
    <>
      <SubHubIndex />
      <WalletIndex showHubList={!false} getCurrentHubId={currentItemId} />
      <ListIndex showHubList={!false} getCurrentHubId={currentItemId} />
    </>
  ) : (
    <InboxIndex />
  );
}
