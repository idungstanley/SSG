import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWalletServices } from '../../../../../features/wallet/walletService';
import { useDispatch } from 'react-redux';
import { setActiveEntity, setActiveItem, setShowHub } from '../../../../../features/workspace/workspaceSlice';
import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import { useAppSelector } from '../../../../../app/hooks';
import WalletItem from '../../../../../components/tasks/WalletItem';
import ListItem from '../../../../../components/tasks/ListItem';
import LastListIndex from './LastListIndex';
import { IList } from '../../../../../features/hubs/hubs.interfaces';
import { DragOverlay } from '@dnd-kit/core';
import OverlayList from '../../../../../components/tasks/OverlayList';
import HubItemOverlay from '../../../../../components/tasks/HubItemOverLay';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';

interface SubWalletIndexProps {
  paddingLeft?: string | number;
}

interface dataProps {
  id: string;
  name: string;
}

function SubWalletIndex({ paddingLeft = '40' }: SubWalletIndexProps) {
  const dispatch = useDispatch();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { toggleArchiveWallet } = useAppSelector((state) => state.wallet);
  const { showMenuDropdown } = useAppSelector((state) => state.hub);
  const { activeItemId } = useAppSelector((state) => state.workspace);

  const [showSubWallet, setShowSubWallet] = useState<string[]>([]);
  const [finalParentId, setFinalWalletParentId] = useState('');

  const { data: subwallet } = getWalletServices({
    Archived: toggleArchiveWallet,
    parentId: activeItemId
  });

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet.includes(id)) {
      setShowSubWallet((prev) => prev.filter((item) => item !== id));
    } else {
      setFinalWalletParentId(id);
      setShowSubWallet((prev) => [...prev, id]);
    }
  };

  const navigate = useNavigate();

  const handleLocation = (id: string, type = 'subwallet3') => {
    dispatch(setShowHub(true));
    navigate(`/${currentWorkspaceId}/tasks/w/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
    dispatch(setActiveEntity({ id, type: EntityType.wallet }));
  };

  const { draggableItemId } = useAppSelector((state) => state.list);

  const draggableItem = draggableItemId ? subwallet?.data?.lists.find((i: IList) => i.id === draggableItemId) : null;

  const draggableWallet = draggableItemId ? subwallet?.data?.wallets.find((i) => i.id === draggableItemId) : null;

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
      {subwallet?.data?.wallets.map((wallet: dataProps) => (
        <div key={wallet.id}>
          <WalletItem
            wallet={wallet}
            walletType="subwallet3"
            handleLocation={handleLocation}
            handleShowSubWallet={handleShowSubWallet}
            paddingLeft={paddingLeft}
            showSubWallet={showSubWallet.includes(wallet.id)}
          />
          {showSubWallet.includes(wallet.id) ? (
            <LastListIndex finalParentId={finalParentId} paddingLeft={Number(paddingLeft) + 13} />
          ) : null}
        </div>
      ))}
      {subwallet?.data?.lists.map((list: IList) => (
        <div key={list.id}>
          <ListItem list={list} paddingLeft={Number(paddingLeft) + 15} />
          {showMenuDropdown === list.id ? <MenuDropdown /> : null}
        </div>
      ))}
    </div>
  );
}

export default SubWalletIndex;
