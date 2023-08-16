import React from 'react';
import WalletIndex from '../../Index/walletIndex/WalletIndex';
import ListIndex from '../../Index/listIndex/ListIndex';
import InboxIndex from '../../Index/InboxIndex';
import { EntityType } from '../../../utils/EntityTypes/EntityType';
import { useAppSelector } from '../../../app/hooks';
import { findCurrentHub } from '../../../managers/Hub';

interface ISHubDropdownListProps {
  parentId?: string;
}

export default function SHubDropdownList({ parentId }: ISHubDropdownListProps) {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { hub } = useAppSelector((state) => state.hub);

  const currentEntity = findCurrentHub(parentId || (activeItemId as string), hub);
  const walletsData = currentEntity.wallets;
  const listsData = currentEntity.lists;

  return (activeItemType === EntityType.subHub || activeItemType === EntityType.hub) && activeItemId ? (
    <div>
      <WalletIndex data={walletsData} showHubList={true} paddingLeft="25" />
      <ListIndex data={listsData} showHubList={true} paddingLeft="30" />
    </div>
  ) : (
    <InboxIndex />
  );
}
