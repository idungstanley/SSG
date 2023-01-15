import React from 'react';
import WalletIndex from '../../Index/WalletIndex';
import ListIndex from '../../Index/ListIndex';
import InboxIndex from '../../Index/InboxIndex';
import { useAppSelector } from '../../../app/hooks';

export default function DropdownList() {
  const { currentItemId, currentItemType, showExtendedBar } = useAppSelector(
    (state) => state.workspace
  );

  return currentItemType === 'hub' ? (
    <>
      <WalletIndex showHubList={!false} getCurrentHubId={currentItemId} />
      {!showExtendedBar && (
        <ListIndex showHubList={!false} getCurrentHubId={currentItemId} />
      )}
    </>
  ) : (
    <InboxIndex />
  );
}
