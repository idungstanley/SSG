import React from 'react';
import WalletIndex from '../../Index/WalletIndex';
import ListIndex from '../../Index/ListIndex';
import InboxIndex from '../../Index/InboxIndex';
import { useAppSelector } from '../../../app/hooks';
import SubHubIndex from '../../Index/subwalletIndex/SubHubIndex';

export default function DropdownList() {
  const { currentItemId, currentItemType } = useAppSelector(
    (state) => state.workspace
  );
  const { hubParentId } = useAppSelector((state) => state.hub);

  console.log(currentItemId, currentItemType, hubParentId);
  return currentItemType === 'hub' ? (
    <>
      <SubHubIndex />
      {/* {currentItemId === hubParentId && <SubHubIndex />} */}
      <WalletIndex showHubList={!false} getCurrentHubId={currentItemId} />
      <ListIndex showHubList={!false} getCurrentHubId={currentItemId} />
    </>
  ) : (
    <InboxIndex />
  );
}
