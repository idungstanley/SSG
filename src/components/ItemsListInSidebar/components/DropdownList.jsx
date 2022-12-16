import React from 'react';
import { useSelector } from 'react-redux';
import WalletIndex from '../../Index/WalletIndex';
import ListIndex from '../../Index/ListIndex';

export default function DropdownList() {
  const { currentItemId, currentItemType } = useSelector((state) => state.workspace);

  return currentItemType === 'hub' ? (
    <>
      <WalletIndex showHubList={!false} getCurrentHubId={currentItemId} />
      <ListIndex showHubList={!false} getCurrentHubId={currentItemId} />
    </>
  ) : (
    <div>
      <p>Inbox</p>
    </div>
  );
}
