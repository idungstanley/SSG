import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWalletServices } from '../../../../../features/wallet/walletService';
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

interface SubWalletIndexProps {
  paddingLeft?: string | number;
}

interface dataProps {
  id: string;
  name: string;
}

function SubWalletIndex({ paddingLeft = '30' }: SubWalletIndexProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { toggleArchiveWallet, currentWalletId } = useAppSelector((state) => state.wallet);
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { draggableItemId } = useAppSelector((state) => state.list);
  const { showMenuDropdown } = useAppSelector((state) => state.hub);

  const [showSubWallet, setShowSubWallet] = useState<string>('');
  const [currWalId, setCurrWalId] = useState('');

  const { data: subwallet } = getWalletServices({
    Archived: toggleArchiveWallet,
    parentId: currentWalletId || activeItemId
  });

  const handleLocation = (id: string, type = 'subwallet2') => {
    dispatch(setShowHub(true));
    navigate(`/${currentWorkspaceId}/tasks/w/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
    setShowSubWallet('');
  };

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet === id) {
      setShowSubWallet('');
    } else {
      setShowSubWallet(id);
    }
    setCurrWalId(id);
  };

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
            walletType="subwallet2"
            handleLocation={handleLocation}
            handleShowSubWallet={handleShowSubWallet}
            paddingLeft={paddingLeft}
            showSubWallet={showSubWallet.includes(wallet.id)}
          />
          <div>
            {showSubWallet.includes(wallet.id) ? (
              <Sub2WalletIndex currWalId={currWalId} paddingLeft={Number(paddingLeft) + 15} />
            ) : null}
          </div>
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
