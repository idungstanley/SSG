import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import PlusDropDown from '../pages/workspace/hubs/components/PlusDropDown';
import FullScreenMessage from '../../components/CenterMessage/FullScreenMessage';
import { useAppSelector } from '../../app/hooks';
// import DropdownList from '../components/ItemsListInSidebar/components/DropdownList';
import {
  resetCurrentItem,
  setCurrentItem,
  setShowHub,
} from '../../features/workspace/workspaceSlice';
import { AvatarWithInitials } from '../../components';
import MenuDropdown from '../../components/Dropdown/DropdownForWorkspace';
import { Spinner } from '../../common';
import { useGetHubList, useGetHubWallet } from '../../features/hubs/hubService';
import { getHub } from '../../features/hubs/hubSlice';
import HubData from '../ExtendedBar/HubData';
import SubWalletIndex from '../../pages/workspace/wallet/components/subwallet1/ SubWalletIndex';
import { getWalletService } from '../../features/wallet/walletService';
import { useQuery } from '@tanstack/react-query';
import Sub2WalletIndex from '../../pages/workspace/wallet/components/subwallet2/Sub2WalletIndex';
import ActiveWallet from './ActiveWallet';
import ActiveSubWallet from './ActiveSubwallet';

export default function ActiveHub() {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState<number>(-1);
  const { currentItemId, activeItemId, activeItemType, currentWalletId } =
    useAppSelector((state) => state.workspace);
  const walletD = useGetHubWallet(currentItemId);
  const walletData = walletD?.data?.data.wallets;
  const { data: subwallet } = useQuery({
    queryKey: ['subwalletlist', [currentWalletId]],
    queryFn: getWalletService,
  });
  const subWalletData = subwallet?.data?.wallets;
  const { data, status } = useGetHubList({ query: null });

  const items = data?.data.hubs;
  if (status === 'success') {
    dispatch(getHub(data?.data.hubs));
  }
  const handleMouseOver = (i: number) => {
    setIsHovering(i);
  };
  const handleMouseOut = () => {
    setIsHovering(-1);
  };

  if (status === 'error') {
    return (
      <FullScreenMessage
        title="Oops, an error occurred :("
        description="Please try again later."
        showOneThirdMessage
      />
    );
  }

  if (status === 'loading') {
    return (
      <div className="mx-auto w-6 mt-10 justify-center">
        <Spinner size={8} color="#0F70B7" />
      </div>
    );
  }

  const displayActiveItem = () => {
    if (activeItemType === 'hub') {
      return items?.map((hub) => {
        if (hub.id === activeItemId) {
          return <HubData key={hub.id} />;
        }
        return null;
      });
    } else if (activeItemType === 'wallet') {
      return walletData?.map((wallet) => {
        if (wallet.id === activeItemId) {
          return (
              <SubWalletIndex
                key={wallet.id}
                walletParentId={wallet.id}
                padding="pl-0"
              />
          );
        }
        return null;
      });
    } else if (activeItemType === 'subWallet') {
      return subWalletData?.map((subWallet) => {
        if (subWallet.id === activeItemId) {
          return (
            <Sub2WalletIndex
              key={subWallet.id}
              wallet2ParentId={subWallet.id}
              padding="pl-0"
            />
          );
        }
        return null;
      });
    }
    return null;
  };

  const displayClickedParent = () => {
    if (activeItemType === 'wallet') {
      return walletData?.map((wallet) => {
        if (wallet.id === activeItemId) {
          return (
            <ActiveWallet
              key={wallet.id}
              showHubList={!false}
              getCurrentHubId={currentItemId}
            />
          );
        }
      });
    } else if (activeItemType === 'subWallet') {
      return subWalletData?.map((subWallet) => {
        if (subWallet.id === activeItemId) {
          return (
            <ActiveSubWallet
              key={subWallet.id}
              walletParentId={currentWalletId}
              padding="pl-0"
            />
          );
        }
        return null;
      });
    }
  };

  const handleClick = (id: string) => {
    const isMatch = id === currentItemId;
    if (isMatch) {
      dispatch(setShowHub(false));
      if (!currentItemId) {
        dispatch(
          setCurrentItem({
            currentItemId: id,
            currentItemType: 'hub',
          })
        );
      } else {
        dispatch(resetCurrentItem());
      }
    } else {
      dispatch(setShowHub(true));
      dispatch(
        setCurrentItem({
          currentItemId: id,
          currentItemType: 'hub',
        })
      );
    }
  };

  return status === 'success' ? (
    <ul className="w-full">
      {items?.map(
        (i: { id: string; name: string }, index) =>
          i.id === currentItemId && (
            <li key={i.id} className="flex flex-col">
              <div
                className={`flex justify-between  items-center hover:bg-gray-100 relative ${
                  i.id === currentItemId && 'bg-green-100 text-black-500'
                }`}
                style={{ height: '28px' }}
                onMouseEnter={() => handleMouseOver(index)}
                onMouseLeave={handleMouseOut}
              >
                {i.id === currentItemId && (
                  <span className="absolute top-0 bottom-0 left-0 w-0.5 bg-green-500" />
                )}
                <div
                  className="flex justify-between gap-2 items-center hover:bg-gray-100 relative"
                  style={{ height: '28px' }}
                  onMouseEnter={() => handleMouseOver(index)}
                  onMouseLeave={handleMouseOut}
                >
                  {i.id === currentItemId && (
                    <span className="absolute rounded-r-lg top-0 bottom-0 left-0 w-1 bg-green-500" />
                  )}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleClick(i.id)}
                    className="flex items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
                  >
                    <div className="flex min-w-0 ml-2 flex-1 items-center">
                      <AvatarWithInitials
                        initials={i.name
                          .split(' ')
                          .slice(0, 2)
                          .map((word) => word[0])
                          .join('')
                          .toUpperCase()}
                        height="h-4"
                        width="w-4"
                        backgroundColour="blue"
                        roundedStyle="rounded"
                      />
                      <span className="ml-4 overflow-hidden">
                        <h4
                          className="font-medium tracking-wider capitalize truncate"
                          style={{ fontSize: '10px' }}
                        >
                          {i.name}
                        </h4>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {currentWalletId && <span className="">/</span>}
                    <span>{displayClickedParent()}</span>
                  </div>
                </div>
                <div
                  className={`flex items-center space-x-1 justify-end pr-1 ${
                    isHovering === index ? 'block' : 'hidden'
                  }`}
                >
                  <MenuDropdown />
                </div>
              </div>
              <hr />
              <div>{displayActiveItem()}</div>
            </li>
          )
      )}
    </ul>
  ) : null;
}
