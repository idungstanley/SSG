import React from 'react';
import WalletIndex from '../../../../../../components/Index/walletIndex/WalletIndex';
import SubHubIndex from '../../../../../../components/Index/subHubIndex/SubHubIndex';
import ListIndex from '../../../../../../components/Index/listIndex/ListIndex';
import InboxIndex from '../../../../../../components/Index/InboxIndex';
import { useAppSelector } from '../../../../../../app/hooks';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';

export default function HubData() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  return activeItemType === EntityType.hub && activeItemId ? (
    <>
      <SubHubIndex />
      <WalletIndex showHubList={true} paddingLeft="10" />
      <ListIndex showHubList={true} />
    </>
  ) : (
    <InboxIndex />
  );
}
