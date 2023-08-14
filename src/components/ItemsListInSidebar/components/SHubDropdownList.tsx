import React from 'react';
import WalletIndex from '../../Index/walletIndex/WalletIndex';
import ListIndex from '../../Index/listIndex/ListIndex';
import InboxIndex from '../../Index/InboxIndex';
import { EntityType } from '../../../utils/EntityTypes/EntityType';
import { useAppSelector } from '../../../app/hooks';

interface SHubDropdownListProps {
  currenId?: string;
}

export default function SHubDropdownList({ currenId }: SHubDropdownListProps) {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  return (activeItemType === EntityType.subHub || activeItemType === EntityType.hub) && activeItemId ? (
    <div>
      <WalletIndex showHubList={true} parentId={currenId ?? ''} paddingLeft="35" />
      <ListIndex showHubList={true} parentId={currenId ?? ''} paddingLeft="40" />
    </div>
  ) : (
    <InboxIndex />
  );
}
