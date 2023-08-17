import React from 'react';
import WalletIndex from '../../Index/walletIndex/WalletIndex';
import ListIndex from '../../Index/listIndex/ListIndex';
import InboxIndex from '../../Index/InboxIndex';
import { useAppSelector } from '../../../app/hooks';
import SubHubIndex from '../../Index/subHubIndex/SubHubIndex';
import { EntityType } from '../../../utils/EntityTypes/EntityType';
import { findCurrentHub } from '../../../managers/Hub';

export default function DropdownList() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { hub } = useAppSelector((state) => state.hub);

  const currentEntity = findCurrentHub(activeItemId as string, hub);
  const subHubsData = currentEntity.children;
  const walletsData = currentEntity.wallets;
  const listsData = currentEntity.lists;

  return activeItemType === EntityType.hub && activeItemId ? (
    <>
      <SubHubIndex data={subHubsData} />
      <WalletIndex data={walletsData} showHubList={true} paddingLeft="20" />
      <ListIndex data={listsData} showHubList={true} paddingLeft="35" />
    </>
  ) : (
    <InboxIndex />
  );
}
