import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubWalletIndex from '../../../pages/workspace/wallet/components/subwallet1/SubWalletIndex';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import { setActiveItem, setExtendedBarOpenedEntitiesIds } from '../../../features/workspace/workspaceSlice';
import WalletItem from '../../tasks/WalletItem';
import { DragOverlay } from '@dnd-kit/core';
import HubItemOverlay from '../../tasks/HubItemOverLay';
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
  const { extendedBarOpenedEntitiesIds } = useAppSelector((state) => state.workspace);

  const handleLocation = (id: string, name: string) => {
    navigate(`/${currentWorkspaceId}/tasks/w/${id}`);
    dispatch(
      setActiveItem({
        activeItemType: EntityType.wallet,
        activeItemId: id,
        activeItemName: name
      })
    );
  };

  const handleShowSubWallet = (id: string) => {
    if (extendedBarOpenedEntitiesIds.includes(id)) {
      dispatch(setExtendedBarOpenedEntitiesIds(extendedBarOpenedEntitiesIds.filter((item) => item !== id)));
    } else {
      dispatch(setExtendedBarOpenedEntitiesIds([...extendedBarOpenedEntitiesIds, id]));
    }
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
              showSubWallet={extendedBarOpenedEntitiesIds.includes(wallet.id)}
              paddingLeft={paddingLeft}
              isExtendedBar={true}
            />
            <div>
              {extendedBarOpenedEntitiesIds.includes(wallet.id) ? (
                <SubWalletIndex parentId={wallet.id} paddingLeft={Number(paddingLeft) + 15} />
              ) : null}
            </div>
          </div>
        ))}
    </div>
  ) : null;
}

export default WalletIndex;
