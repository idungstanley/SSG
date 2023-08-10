import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { AvatarWithInitials } from '../../../../../components';
import SubWalletIndex from '../../../../../pages/workspace/wallet/components/subwallet1/ SubWalletIndex';
import Sub2WalletIndex from '../../../../../pages/workspace/wallet/components/subwallet2/Sub2WalletIndex';
import ActiveWallet from './ActiveWallet';
import ActiveSubWallet from './ActiveSubwallet';
import SHubDropdownList from '../../../../../components/ItemsListInSidebar/components/SHubDropdownList';
import ActiveSubHub from './ActiveSubHub';
import DropdownList from '../../../../../components/ItemsListInSidebar/components/DropdownList';
import { useNavigate } from 'react-router-dom';
import { setActiveItem, setCurrentItem } from '../../../../../features/workspace/workspaceSlice';
import { setParentHubExt, setSubHubExt } from '../../../../../features/hubs/hubSlice';
import { getInitials } from '../../../../../app/helpers';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';
import { Hub, Wallet } from '../../../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { findCurrentWallet } from '../../../../../managers/Wallet';
import { findCurrentHub } from '../../../../../managers/Hub';

export default function ActiveHub() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { hub } = useAppSelector((state) => state.hub);
  const { currentItemId, activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { currentWalletId, parentWalletId } = useAppSelector((state) => state.wallet);
  const { parentHubExt } = useAppSelector((state) => state.hub);

  const [hubData, setHubData] = useState<Hub>();
  const [subHubData, setSubHubData] = useState<Hub>();
  const [walletData, setWalletData] = useState<Wallet>();
  const [subWalletData, setSubWalletData] = useState<Wallet>();

  const { id: parentHubId } = parentHubExt;

  useEffect(() => {
    if (hub.length) {
      if (activeItemId && activeItemType === EntityType.hub) {
        setHubData(findCurrentHub(activeItemId, hub));
      }
      if (parentHubId && activeItemType === EntityType.subHub) {
        setSubHubData(findCurrentHub(parentHubId, hub));
      }
      if (currentWalletId) {
        setWalletData(findCurrentWallet(currentWalletId, hub));
      }
      if (parentWalletId) {
        setSubWalletData(findCurrentWallet(parentWalletId, hub));
      }
    }
  }, [hub]);

  const displayActiveItem = () => {
    if (activeItemType === EntityType.hub) {
      return <DropdownList key={hubData?.id} />;
    } else if (activeItemType === EntityType.subHub) {
      return <SHubDropdownList key={subHubData?.id} />;
    } else if (activeItemType === EntityType.wallet) {
      return <SubWalletIndex key={walletData?.id} paddingLeft="20" />;
    } else if (activeItemType?.includes(EntityType.subWallet)) {
      if (subWalletData?.id && walletData?.id) {
        return <Sub2WalletIndex key={subWalletData.id} currWalId={walletData.id} paddingLeft="15" />;
      }
      return null;
    }
    return null;
  };

  const displayClickedParent = () => {
    if (activeItemType === EntityType.subHub) {
      return <ActiveSubHub key={subHubData?.id} />;
    } else if (activeItemType === EntityType.wallet) {
      return <ActiveWallet key={walletData?.id} showHubList={!false} getCurrentHubId={currentItemId} />;
    } else if (activeItemType === EntityType.subWallet) {
      if (walletData?.id && subWalletData?.id) {
        return <ActiveSubWallet key={subWalletData.id} walletParentId={walletData.id} padding="pl-0" />;
      }
      return null;
    }
  };

  const handleClick = (id: string) => {
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: EntityType.hub
      })
    );
    dispatch(setSubHubExt({ id: null, type: null }));
    dispatch(setParentHubExt({ id: id, type: EntityType.hub }));
    dispatch(
      setCurrentItem({
        currentItemId: id,
        currentItemType: EntityType.hub
      })
    );

    navigate(`tasks/h/${id}`, {
      replace: true
    });
  };

  return hub.length ? (
    <ul className="w-full">
      {hub.map(
        (item: { id: string; name: string }) =>
          item.id === parentHubId && (
            <li key={item.id} className="flex flex-col">
              <div
                className={`flex justify-between items-center hover:bg-gray-100 relative ${
                  item.id === parentHubId && 'text-black-500'
                }`}
                style={{ height: '50px', backgroundColor: `${item.id === activeItemId ? '#BF00FF21' : ''}` }}
                onClick={() => handleClick(item.id)}
              >
                {item.id === activeItemId && (
                  <span className="absolute top-0 bottom-0 left-0 w-0.5" style={{ backgroundColor: '#BF00FF' }} />
                )}
                <div className="relative flex items-center justify-between gap-2" style={{ height: '28px' }}>
                  <div
                    role="button"
                    tabIndex={0}
                    className="flex items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
                  >
                    <div className="flex items-center flex-1 min-w-0 ml-2">
                      <AvatarWithInitials
                        initials={getInitials(item.name)}
                        height="h-4"
                        width="w-4"
                        backgroundColour="blue"
                        roundedStyle="rounded"
                      />
                      <span className="ml-4 overflow-hidden">
                        <h4 className="tracking-wider capitalize truncate" style={{ fontSize: '10px' }}>
                          {item.name}
                        </h4>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full" style={{ backgroundColor: '#BF00FF21' }}>
                {displayClickedParent()}
              </div>
              <hr />
              <div>{displayActiveItem()}</div>
            </li>
          )
      )}
    </ul>
  ) : null;
}
