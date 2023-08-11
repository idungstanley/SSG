import React from 'react';
import WalletIndex from '../../Index/walletIndex/WalletIndex';
import ListIndex from '../../Index/listIndex/ListIndex';
import InboxIndex from '../../Index/InboxIndex';
import { useAppSelector } from '../../../app/hooks';
import SubHubIndex from '../../Index/subHubIndex/SubHubIndex';
import { EntityType } from '../../../utils/EntityTypes/EntityType';

export default function DropdownList() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  return activeItemType === EntityType.hub && activeItemId ? (
    <>
      <SubHubIndex />
      <WalletIndex showHubList={true} paddingLeft="20" />
      <ListIndex showHubList={true} />
    </>
  ) : (
    <InboxIndex />
  );
}
