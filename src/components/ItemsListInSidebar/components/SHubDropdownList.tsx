import React from 'react';
import WalletIndex from '../../Index/walletIndex/WalletIndex';
import ListIndex from '../../Index/listIndex/ListIndex';
import InboxIndex from '../../Index/InboxIndex';
import { EntityType } from '../../../utils/EntityTypes/EntityType';
import { useAppSelector } from '../../../app/hooks';

export default function SHubDropdownList() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  return activeItemType === EntityType.subHub && activeItemId ? (
    <div>
      <WalletIndex showHubList={true} paddingLeft="25" />
      <ListIndex showHubList={true} paddingLeft="40" />
    </div>
  ) : (
    <InboxIndex />
  );
}
