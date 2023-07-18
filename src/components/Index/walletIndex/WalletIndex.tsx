import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubWalletIndex from '../../../pages/workspace/wallet/components/subwallet1/ SubWalletIndex';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import {
  setActiveEntity,
  setActiveEntityName,
  setActiveItem,
  setCurrentWalletId,
  setCurrentWalletName,
  setShowHub
} from '../../../features/workspace/workspaceSlice';
import { setWalletItem } from '../../../features/wallet/walletSlice';
import { getWalletServices } from '../../../features/wallet/walletService';
import { useGetHubWallet } from '../../../features/hubs/hubService';
import WalletItem from '../../tasks/WalletItem';
import { DragOverlay } from '@dnd-kit/core';
import HubItemOverlay from '../../tasks/HubItemOverLay';
// import CreateWL from '../../tasks/CreateWL';

interface WalletIndexProps {
  showHubList: boolean;
  getCurrentHubId: string | null;
  paddingLeft: string | number;
}

export interface dataProps {
  id: string;
  name: string;
  color?: string;
}

function WalletIndex({ showHubList, getCurrentHubId, paddingLeft }: WalletIndexProps) {
  const dispatch = useDispatch();
  const [showSubWallet, setShowSubWallet] = useState<string | null>(null);
  const { toggleArchiveWallet } = useAppSelector((state) => state.wallet);
  const { data: walletAndListData } = useGetHubWallet(getCurrentHubId);
  // console.log(walletAndListData);
  const { data: walletData } = getWalletServices({
    hubId: getCurrentHubId,
    Archived: toggleArchiveWallet
  });
  // console.log(walletData);
  // const { currentItemId } = useAppSelector((state) => state.workspace);
  // const { data } = useGetSubHub({
  //   parentId: currentItemId
  // });
  const navigate = useNavigate();
  const handleLocation = (id: string, name: string) => {
    const type = 'wallet';
    dispatch(setShowHub(true));
    navigate(`tasks/w/${id}`);
    setShowSubWallet(id);
    dispatch(setCurrentWalletId(id));
    dispatch(
      setWalletItem({
        currentWalletParentId: id,
        currentWalletParentType: 'wallet'
      })
    );
    dispatch(setActiveEntityName(name));
    dispatch(
      setActiveItem({
        activeItemType: type,
        activeItemId: id,
        activeItemName: name
      })
    );
    dispatch(setActiveEntity({ id: id, type: 'wallet' }));
    dispatch(setCurrentWalletName(name));
    dispatch(setCurrentWalletId(id));
  };

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet === id) {
      setShowSubWallet(null);
    } else {
      dispatch(setCurrentWalletId(id));
      setShowSubWallet(id);
      dispatch(
        setWalletItem({
          currentWalletParentId: id,
          currentWalletParentType: 'wallet'
        })
      );
    }
  };

  const { draggableItemId } = useAppSelector((state) => state.list);
  const draggableItem = draggableItemId ? walletData?.data.wallets.find((i) => i.id === draggableItemId) : null;

  return walletAndListData?.data?.wallets != null ? (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {/* {walletAndListData?.data.lists.length === 0 &&
        walletAndListData?.data.wallets.length === 0 &&
        data?.data?.hubs.length === 0 && <CreateWL paddingLeft={Number(paddingLeft) + 25} />} */}
      {draggableItem ? (
        <DragOverlay>
          <HubItemOverlay item={draggableItem} type="wallet" />
        </DragOverlay>
      ) : null}
      {walletData?.data.wallets.length !== 0 &&
        walletData?.data.wallets.map((wallet: dataProps) => (
          <div key={wallet.id}>
            <WalletItem
              wallet={wallet}
              walletType="wallet"
              handleLocation={handleLocation}
              handleShowSubWallet={handleShowSubWallet}
              showSubWallet={showSubWallet}
              paddingLeft={paddingLeft}
            />
            <div>{showSubWallet === wallet.id ? <SubWalletIndex paddingLeft={Number(paddingLeft) + 15} /> : null}</div>
          </div>
        ))}
    </div>
  ) : null;
}

export default WalletIndex;
