import React, { useEffect, useState } from 'react';
import { Wallet } from '../../activetree.interfaces';
import LList from '../list/LList';
import WalletItem from '../../../../../../../components/tasks/WalletItem';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
  setActiveEntity,
  setActiveEntityName,
  setActiveItem,
  setCurrentItem,
  setCurrentWalletId,
  setCurrentWalletName,
  setShowHub
} from '../../../../../../../features/workspace/workspaceSlice';
import { setWalletItem } from '../../../../../../../features/wallet/walletSlice';
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
  const { walletId, listId } = useParams();
  const { showExtendedBar } = useAppSelector((state) => state.workspace);

  const [showSubWallet, setShowSubWallet] = useState<string[]>([]);
  const [stickyButtonIndex, setStickyButtonIndex] = useState<number | undefined>(-1);

  const id = walletId || listId;

  useEffect(() => {
    for (const wallet of wallets) {
      if (id && (wallet.children.length || wallet.lists.length)) {
        setShowSubWallet((prev) => [...prev, wallet.id]);
      }
    }
  }, []);

  const handleLocation = (id: string, name: string, index?: number) => {
    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    dispatch(setShowHub(true));
    navigate(`tasks/w/${id}`, {
      replace: true
    });
    if (showSubWallet.includes(id)) {
      setShowSubWallet((prev) => prev.filter((item) => item !== id));
    } else {
      setShowSubWallet((prev) => [...prev, id]);
    }
    dispatch(
      setWalletItem({
        currentWalletParentId: id,
        currentWalletParentType: EntityType.wallet
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
    dispatch(setActiveEntity({ id, type: EntityType.wallet }));
    dispatch(setCurrentWalletName(name));
    dispatch(setCurrentWalletId(id));
  };

  const handleShowSubWallet = (id: string, index?: number) => {
    setStickyButtonIndex(index === stickyButtonIndex ? -1 : index);
    if (showSubWallet.includes(id)) {
      setShowSubWallet((prev) => prev.filter((item) => item !== id));
    } else {
      setShowSubWallet((prev) => [...prev, id]);
      dispatch(
        setCurrentItem({
          currentItemId: id,
          currentItemType: EntityType.wallet
        })
      );
      dispatch(
        setWalletItem({
          currentWalletParentId: id,
          currentWalletParentType: EntityType.wallet
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
            showSubWallet={showSubWallet.includes(wallet.id)}
            paddingLeft={paddingLeft}
            isSticky={stickyButtonIndex !== undefined && stickyButtonIndex !== null && stickyButtonIndex <= index}
            stickyButtonIndex={stickyButtonIndex}
            index={index}
            topNumber={topNumber}
            zNumber={level === 1 ? '3' : level === 2 ? '2' : '1'}
          />
          {wallet.children.length && showSubWallet.includes(wallet.id) ? (
            <WList
              wallets={wallet.children}
              leftMargin={false}
              type={level === 2 ? 'subwallet2' : 'subwallet3'}
              paddingLeft={Number(paddingLeft) + 15}
              level={level + 1}
              topNumber={topNumber + 30}
            />
          ) : null}
          {wallet.lists.length && showSubWallet.includes(wallet.id) && !showExtendedBar ? (
            <LList list={wallet.lists} leftMargin={false} paddingLeft={Number(paddingLeft) + 32} />
          ) : null}
        </div>
      ))}
    </>
  );
}
