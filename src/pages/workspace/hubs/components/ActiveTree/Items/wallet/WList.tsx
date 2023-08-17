import React, { useState } from 'react';
import { Wallet } from '../../activetree.interfaces';
import LList from '../list/LList';
import WalletItem from '../../../../../../../components/tasks/WalletItem';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  setActiveEntity,
  setActiveEntityName,
  setActiveItem,
  setCurrentItem,
  setOpenedEntitiesIds,
  setOpenedParentsIds,
  setShowHub
} from '../../../../../../../features/workspace/workspaceSlice';
import {
  setCurrentWalletId,
  setCurrentWalletName,
  setCurrentWalletType,
  setParentWalletId
} from '../../../../../../../features/wallet/walletSlice';
import { EntityType } from '../../../../../../../utils/EntityTypes/EntityType';
import { DragOverlay } from '@dnd-kit/core';
import HubItemOverlay from '../../../../../../../components/tasks/HubItemOverLay';

interface IWListProps {
  wallets: Wallet[];
  leftMargin: boolean;
  paddingLeft: string | number;
  type: string;
  level?: number;
  topNumber: number;
}

export default function WList({ wallets, leftMargin, paddingLeft, type, level = 1, topNumber }: IWListProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { showExtendedBar, openedEntitiesIds, openedParentsIds } = useAppSelector((state) => state.workspace);

  const [openedIds, setOpenedIds] = useState<string[]>([]);
  const [stickyButtonIndex, setStickyButtonIndex] = useState<number | undefined>(-1);

  const handleLocation = (id: string, name: string, parent_id: string | null, index?: number) => {
    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    dispatch(setShowHub(true));
    navigate(`tasks/w/${id}`, { replace: true });
    if (openedIds.includes(id)) {
      setOpenedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setOpenedIds((prev) => [...prev, id]);
    }
    dispatch(setCurrentWalletType(EntityType.wallet));
    dispatch(setActiveEntityName(name));
    dispatch(
      setActiveItem({
        activeItemType: type,
        activeItemId: id,
        activeItemName: name
      })
    );
    dispatch(setActiveEntity({ id, type: EntityType.wallet }));
    dispatch(setCurrentWalletName(name));
    dispatch(setCurrentWalletId(id));
    if (parent_id) dispatch(setParentWalletId(parent_id));
  };

  const handleShowSubWallet = (id: string, parent_id: string | null, index?: number) => {
    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    dispatch(setCurrentWalletId(id));
    if (parent_id) dispatch(setParentWalletId(parent_id));
    dispatch(
      setActiveItem({
        activeItemType: type,
        activeItemId: id
      })
    );

    if (openedIds.includes(id)) {
      if (openedIds.length === 1) {
        dispatch(setOpenedParentsIds(openedParentsIds.filter((item) => item !== parent_id)));
      }
      setOpenedIds((prev) => prev.filter((item) => item !== id));
      dispatch(setOpenedEntitiesIds(openedEntitiesIds.filter((item) => item !== id)));
    } else {
      setOpenedIds((prev) => [...prev, id]);
      if (parent_id) {
        dispatch(setOpenedParentsIds([...openedParentsIds, parent_id]));
      }
      dispatch(setOpenedEntitiesIds([...openedEntitiesIds, id]));
      dispatch(
        setCurrentItem({
          currentItemId: id,
          currentItemType: EntityType.wallet
        })
      );
    }
  };

  const { draggableItemId } = useAppSelector((state) => state.list);
  const draggableItem = draggableItemId ? wallets.find((i) => i.id === draggableItemId) : null;

  return (
    <>
      {draggableItem ? (
        <DragOverlay>
          <HubItemOverlay item={draggableItem} type="subhub" />
        </DragOverlay>
      ) : null}
      {wallets.map((wallet, index) => (
        <div key={wallet.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <WalletItem
            wallet={wallet}
            walletType={level === 1 ? EntityType.wallet : level === 2 ? 'subwallet2' : 'subwallet3'}
            handleLocation={handleLocation}
            handleShowSubWallet={handleShowSubWallet}
            showSubWallet={openedEntitiesIds.includes(wallet.id)}
            paddingLeft={paddingLeft}
            isSticky={stickyButtonIndex !== undefined && stickyButtonIndex !== null && stickyButtonIndex <= index}
            stickyButtonIndex={stickyButtonIndex}
            index={index}
            topNumber={topNumber}
            zNumber={level === 1 ? '3' : level === 2 ? '2' : '1'}
          />
          {wallet.children.length && openedEntitiesIds.includes(wallet.id) ? (
            <WList
              wallets={wallet.children}
              leftMargin={false}
              type={level === 1 ? 'subwallet2' : 'subwallet3'}
              paddingLeft={Number(paddingLeft) + 15}
              level={level + 1}
              topNumber={topNumber + 30}
            />
          ) : null}
          {wallet.lists.length && openedEntitiesIds.includes(wallet.id) && !showExtendedBar ? (
            <LList list={wallet.lists} leftMargin={false} paddingLeft={Number(paddingLeft) + 32} />
          ) : null}
        </div>
      ))}
    </>
  );
}
