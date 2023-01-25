import React from 'react';
import WalletIndex from '../../components/Index/walletIndex/WalletIndex';
import SubHubIndex from '../../components/Index/subHubIndex/SubHubIndex';
import ListIndex from '../../components/Index/listIndex/ListIndex';
import InboxIndex from '../../components/Index/InboxIndex';
import { useAppSelector } from '../../app/hooks';

export default function HubData() {
  const { currentItemId, currentItemType, showExtendedBar } = useAppSelector(
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
