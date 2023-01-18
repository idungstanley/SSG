import React from 'react';
import WalletIndex from '../../components/Index/walletIndex/WalletIndex';
import ListIndex from '../../components/Index/listIndex/ListIndex';
import InboxIndex from '../../components/Index/InboxIndex';
import { useAppSelector } from '../../app/hooks';

export default function HubData() {
  const { currentItemId, currentItemType, showExtendedBar } = useAppSelector(
    (state) => state.workspace
  );

  return currentItemType === 'hub' ? (
    <>
      <WalletIndex showHubList={!false} getCurrentHubId={currentItemId} />
      <ListIndex showHubList={!false} getCurrentHubId={currentItemId} />
    </>
  ) : (
    <InboxIndex />
  );
}
