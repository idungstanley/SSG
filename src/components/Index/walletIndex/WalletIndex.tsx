import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubWalletIndex from '../../../pages/workspace/wallet/components/subwallet1/ SubWalletIndex';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import {
  setActiveEntity,
  setActiveEntityName,
  setActiveItem,
  setShowHub
} from '../../../features/workspace/workspaceSlice';
import { getWalletServices } from '../../../features/wallet/walletService';
import { useGetHubWallet } from '../../../features/hubs/hubService';
import WalletItem from '../../tasks/WalletItem';
import { DragOverlay } from '@dnd-kit/core';
import HubItemOverlay from '../../tasks/HubItemOverLay';
import { setCurrentWalletId, setCurrentWalletName, setCurrentWalletType } from '../../../features/wallet/walletSlice';
import { EntityType } from '../../../utils/EntityTypes/EntityType';

interface WalletIndexProps {
  showHubList: boolean;
  paddingLeft: string | number;
}

export interface dataProps {
  id: string;
  name: string;
  color?: string;
}

function WalletIndex({ showHubList, paddingLeft }: WalletIndexProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { toggleArchiveWallet } = useAppSelector((state) => state.wallet);
  const { activeItemId } = useAppSelector((state) => state.workspace);

  const [showSubWallet, setShowSubWallet] = useState<string[]>([]);

  const { data: walletAndListData } = useGetHubWallet(activeItemId);

  const { data: walletData } = getWalletServices({
    hubId: activeItemId,
    Archived: toggleArchiveWallet
  });

  const handleLocation = (id: string, name: string) => {
    dispatch(setShowHub(true));
    navigate(`/${currentWorkspaceId}/tasks/w/${id}`);
    setShowSubWallet((prev) => [...prev, id]);
    dispatch(setCurrentWalletId(id));
    dispatch(setCurrentWalletType(EntityType.wallet));
    dispatch(setCurrentWalletName(name));
    dispatch(setActiveEntityName(name));
    dispatch(
      setActiveItem({
        activeItemType: EntityType.wallet,
        activeItemId: id,
        activeItemName: name
      })
    );
    dispatch(setActiveEntity({ id: id, type: EntityType.wallet }));
  };

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet.includes(id)) {
      setShowSubWallet((prev) => prev.filter((item) => item !== id));
    } else {
      dispatch(setCurrentWalletId(id));
      dispatch(setCurrentWalletType(EntityType.wallet));
      setShowSubWallet((prev) => [...prev, id]);
    }
  };

  const { draggableItemId } = useAppSelector((state) => state.list);
  const draggableItem = draggableItemId ? walletData?.data.wallets.find((i) => i.id === draggableItemId) : null;

  return walletAndListData?.data?.wallets != null ? (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
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
              showSubWallet={showSubWallet.includes(wallet.id)}
              paddingLeft={paddingLeft}
            />
            <div>
              {showSubWallet.includes(wallet.id) ? <SubWalletIndex paddingLeft={Number(paddingLeft) + 15} /> : null}
            </div>
          </div>
        ))}
    </div>
  ) : null;
}

export default WalletIndex;
