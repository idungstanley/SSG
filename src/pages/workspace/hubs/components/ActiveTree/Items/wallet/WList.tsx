import React from 'react';
import { Wallet } from '../../activetree.interfaces';
import LList from '../list/LList';
import WalletItem from '../../../../../../../components/tasks/WalletItem';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  setActiveItem,
  setCurrentItem,
  setOpenedEntitiesIds
} from '../../../../../../../features/workspace/workspaceSlice';
import { EntityType } from '../../../../../../../utils/EntityTypes/EntityType';
import { DragOverlay } from '@dnd-kit/core';
import HubItemOverlay from '../../../../../../../components/tasks/HubItemOverLay';
import { generateViewsUrl } from '../../../../../../../utils/generateViewsUrl';
import { IWallet } from '../../../../../../../features/hubs/hubs.interfaces';

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

  const { showExtendedBar, openedEntitiesIds } = useAppSelector((state) => state.workspace);

  const handleLocation = (id: string, name: string, item: IWallet) => {
    const viewsUrl = generateViewsUrl(id, item) as string;

    navigate(viewsUrl, { replace: true });
    if (openedEntitiesIds.includes(id)) {
      dispatch(setOpenedEntitiesIds(openedEntitiesIds.filter((item) => item !== id)));
    } else {
      dispatch(setOpenedEntitiesIds([...openedEntitiesIds, id]));
    }
    dispatch(
      setActiveItem({
        activeItemType: type,
        activeItemId: id,
        activeItemName: name
      })
    );
  };

  const handleShowSubWallet = (id: string, clickType?: string) => {
    dispatch(
      setActiveItem({
        activeItemType: type,
        activeItemId: id
      })
    );

    if (openedEntitiesIds.includes(id) && clickType !== 'isOver') {
      dispatch(setOpenedEntitiesIds(openedEntitiesIds.filter((item) => item !== id)));
    } else {
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
      {wallets.map((wallet) => (
        <div key={wallet.id} style={{ marginLeft: leftMargin ? 20 : 0 }}>
          <WalletItem
            wallet={wallet}
            walletType={level === 1 ? EntityType.wallet : level === 2 ? 'subwallet2' : 'subwallet3'}
            handleLocation={handleLocation}
            handleShowSubWallet={handleShowSubWallet}
            showSubWallet={openedEntitiesIds.includes(wallet.id)}
            paddingLeft={paddingLeft}
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
