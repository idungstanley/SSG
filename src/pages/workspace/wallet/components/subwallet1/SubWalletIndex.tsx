import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sub2WalletIndex from '../subwallet2/Sub2WalletIndex';
import { useDispatch } from 'react-redux';
import { setActiveItem, setShowHub } from '../../../../../features/workspace/workspaceSlice';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import { useAppSelector } from '../../../../../app/hooks';
import WalletItem from '../../../../../components/tasks/WalletItem';
import ListItem from '../../../../../components/tasks/ListItem';
import { IList } from '../../../../../features/hubs/hubs.interfaces';
import { DragOverlay } from '@dnd-kit/core';
import OverlayList from '../../../../../components/tasks/OverlayList';
import HubItemOverlay from '../../../../../components/tasks/HubItemOverLay';
import { List, Wallet } from '../../../hubs/components/ActiveTree/activetree.interfaces';
import { findCurrentWallet } from '../../../../../managers/Wallet';

interface SubWalletIndexProps {
  paddingLeft?: string | number;
  parentId?: string;
}

interface dataProps {
  id: string;
  name: string;
}

function SubWalletIndex({ paddingLeft = '30', parentId }: SubWalletIndexProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { hub } = useAppSelector((state) => state.hub);
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { draggableItemId } = useAppSelector((state) => state.list);
  const { showMenuDropdown } = useAppSelector((state) => state.hub);

  const [openedIds, setOpenedIds] = useState<string[]>([]);
  const [data, setData] = useState<{ wallets: Wallet[]; lists: List[] }>();

  useEffect(() => {
    if (activeItemId || parentId) {
      const currentEntity = findCurrentWallet(parentId || (activeItemId as string), hub);
      const walletsData = currentEntity.children;
      const listsData = currentEntity.lists;
      setData({ wallets: walletsData, lists: listsData });
    }
  }, [activeItemId, parentId]);

  const handleLocation = (id: string, type = 'subwallet2') => {
    dispatch(setShowHub(true));
    navigate(`/${currentWorkspaceId}/tasks/w/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
    setOpenedIds([]);
  };

  const handleShowSubWallet = (id: string) => {
    if (openedIds.includes(id)) {
      setOpenedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setOpenedIds((prev) => [...prev, id]);
    }
  };

  const draggableItem = draggableItemId ? data?.lists.find((i: IList) => i.id === draggableItemId) : null;
  const draggableWallet = draggableItemId ? data?.wallets.find((i) => i.id === draggableItemId) : null;

  return (
    <div>
      {draggableItem ? (
        <DragOverlay>
          <OverlayList list={draggableItem} />
        </DragOverlay>
      ) : null}
      {draggableWallet ? (
        <DragOverlay>
          <HubItemOverlay item={draggableWallet} type="wallet" />
        </DragOverlay>
      ) : null}
      {data?.wallets?.map((wallet: dataProps) => (
        <div key={wallet.id}>
          <WalletItem
            wallet={wallet as Wallet}
            walletType="subwallet2"
            handleLocation={handleLocation}
            handleShowSubWallet={handleShowSubWallet}
            paddingLeft={paddingLeft}
            showSubWallet={openedIds.includes(wallet.id)}
          />
          <div>
            {openedIds.includes(wallet.id) ? (
              <Sub2WalletIndex parentId={wallet.id} paddingLeft={Number(paddingLeft) + 15} />
            ) : null}
          </div>
        </div>
      ))}
      {data?.lists?.map((list: IList) => (
        <div key={list.id}>
          <ListItem list={list} paddingLeft={Number(paddingLeft) + 15} />
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </div>
  );
}

export default SubWalletIndex;
