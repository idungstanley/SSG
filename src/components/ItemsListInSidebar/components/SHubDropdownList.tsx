import React from 'react';
import WalletIndex from '../../Index/walletIndex/WalletIndex';
import ListIndex from '../../Index/listIndex/ListIndex';
import InboxIndex from '../../Index/InboxIndex';
import { useAppSelector } from '../../../app/hooks';
import WalletModal from '../../../pages/workspace/wallet/components/modals/WalletModal';
import ListModal from '../../../pages/workspace/lists/components/modals/ListModal';

export default function SHubDropdownList() {
  const { currSubHubId, currSubHubIdType } = useAppSelector((state) => state.hub);

  return currSubHubIdType === 'subhub' ? (
    <>
      <div>
        <WalletIndex showHubList={!false} getCurrentHubId={currSubHubId} paddingLeft="52" />
        <ListIndex showHubList={!false} getCurrentHubId={currSubHubId} paddingLeft="52" />
        <WalletModal />
        <ListModal />
      </div>
    </>
  ) : (
    <InboxIndex />
  );
}
