import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubWalletIndex from '../../../pages/workspace/wallet/components/subwallet1/SubWalletIndex';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import {
  setActiveEntity,
  setActiveEntityName,
  setActiveItem,
  setShowHub
} from '../../../features/workspace/workspaceSlice';
import WalletItem from '../../tasks/WalletItem';
import { DragOverlay } from '@dnd-kit/core';
import HubItemOverlay from '../../tasks/HubItemOverLay';
import { setCurrentWalletId, setCurrentWalletName, setCurrentWalletType } from '../../../features/wallet/walletSlice';
import { EntityType } from '../../../utils/EntityTypes/EntityType';
import { Wallet } from '../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';

interface WalletIndexProps {
  data: Wallet[];
  showHubList: boolean;
  paddingLeft: string | number;
}

export interface dataProps {
  id: string;
  name: string;
  color?: string;
}

function WalletIndex({ data, showHubList, paddingLeft }: WalletIndexProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const [openedIds, setOpenedIds] = useState<string[]>([]);

  const handleLocation = (id: string, name: string) => {
    dispatch(setShowHub(true));
    navigate(`/${currentWorkspaceId}/tasks/w/${id}`);
    setOpenedIds([]);
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
    if (openedIds.includes(id)) {
      setOpenedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setOpenedIds((prev) => [...prev, id]);
    }
    dispatch(setCurrentWalletId(id));
    dispatch(setCurrentWalletType(EntityType.wallet));
  };

  const { draggableItemId } = useAppSelector((state) => state.list);
  const draggableItem = draggableItemId ? data.find((i) => i.id === draggableItemId) : null;

  return data?.length ? (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {draggableItem ? (
        <DragOverlay>
          <HubItemOverlay item={draggableItem} type="wallet" />
        </DragOverlay>
      ) : null}
      {data.length &&
        data.map((wallet) => (
          <div key={wallet.id}>
            <WalletItem
              wallet={wallet as Wallet}
              walletType="wallet"
              handleLocation={handleLocation}
              handleShowSubWallet={handleShowSubWallet}
              showSubWallet={openedIds.includes(wallet.id)}
              paddingLeft={paddingLeft}
            />
            <div>
              {openedIds.includes(wallet.id) ? (
                <SubWalletIndex parentId={wallet.id} paddingLeft={Number(paddingLeft) + 15} />
              ) : null}
            </div>
          </div>
        ))}
    </div>
  ) : null;
}

export default WalletIndex;
