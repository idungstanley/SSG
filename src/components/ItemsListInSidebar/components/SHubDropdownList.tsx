import React from 'react';
import WalletIndex from '../../Index/walletIndex/WalletIndex';
import ListIndex from '../../Index/listIndex/ListIndex';
import InboxIndex from '../../Index/InboxIndex';
import { useAppSelector } from '../../../app/hooks';
import WalletModal from '../../../pages/workspace/wallet/components/modals/WalletModal';
import ListModal from '../../../pages/workspace/lists/components/modals/ListModal';

interface SubHubIndexProps {
  marginLeft?: string;
}
export default function SHubDropdownList({ marginLeft = 'pl-0' }: SubHubIndexProps) {
  const { currSubHubId, currSubHubIdType } = useAppSelector(
    (state) => state.hub
  );

  return currSubHubIdType === 'subhub' ? (
    <>
      <div className={`${marginLeft}`}>
        <WalletIndex showHubList={!false} getCurrentHubId={currSubHubId} />
        <ListIndex showHubList={!false} getCurrentHubId={currSubHubId} />
        <WalletModal />
        <ListModal />
      </div>
    </>
  ) : (
    <InboxIndex />
  );
}
