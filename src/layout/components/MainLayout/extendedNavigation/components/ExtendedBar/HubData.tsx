import React from 'react';
import WalletIndex from '../../../../../../components/Index/walletIndex/WalletIndex';
import SubHubIndex from '../../../../../../components/Index/subHubIndex/SubHubIndex';
import ListIndex from '../../../../../../components/Index/listIndex/ListIndex';
import InboxIndex from '../../../../../../components/Index/InboxIndex';
import { useAppSelector } from '../../../../../../app/hooks';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';
import { findCurrentHub } from '../../../../../../managers/Hub';

export default function HubData() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { hub } = useAppSelector((state) => state.hub);

  const currentEntity = findCurrentHub(activeItemId as string, hub);
  const subHubsData = currentEntity.children;
  const walletsData = currentEntity.wallets;
  const listsData = currentEntity.lists;

  return activeItemType === EntityType.hub && activeItemId ? (
    <>
      <SubHubIndex data={subHubsData} />
      <WalletIndex data={walletsData} showHubList={true} paddingLeft="10" />
      <ListIndex data={listsData} showHubList={true} />
    </>
  ) : (
    <InboxIndex />
  );
}
