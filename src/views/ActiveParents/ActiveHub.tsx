import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FullScreenMessage from '../../components/CenterMessage/FullScreenMessage';
import { useAppSelector } from '../../app/hooks';
import {
  resetCurrentItem,
  setCurrentItem,
  setShowHub,
} from '../../features/workspace/workspaceSlice';
import { AvatarWithInitials } from '../../components';
import { Spinner } from '../../common';
import {
  useGetHubList,
  useGetHubWallet,
  useGetSubHub,
} from '../../features/hubs/hubService';
import { getHub } from '../../features/hubs/hubSlice';
import SubWalletIndex from '../../pages/workspace/wallet/components/subwallet1/ SubWalletIndex';
import { getWalletService } from '../../features/wallet/walletService';
import { useQuery } from '@tanstack/react-query';
import Sub2WalletIndex from '../../pages/workspace/wallet/components/subwallet2/Sub2WalletIndex';
import ActiveWallet from './ActiveWallet';
import ActiveSubWallet from './ActiveSubwallet';
import MenuDropdown from '../../components/Dropdown/MenuDropdown';
import SHubDropdownList from '../../components/ItemsListInSidebar/components/SHubDropdownList';
import ActiveSubHub from './ActiveSubHub';
import DropdownList from '../../components/ItemsListInSidebar/components/DropdownList';
import { dataProps } from '../../components/Index/walletIndex/WalletIndex';

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
  const { data: subHub } = useGetSubHub({
    parentId: currentItemId,
  });
  const subHubData = subHub?.data.hubs;
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
      <div className="justify-center w-6 mx-auto mt-10">
        <Spinner size={8} color="#0F70B7" />
      </div>
    );
  }

  const displayActiveItem = () => {
    if (activeItemType === 'hub') {
      return items?.map((hub) => {
        if (hub.id === activeItemId) {
          return <DropdownList key={hub.id} />;
        }
        return null;
      });
    } else if (activeItemType === 'subhub') {
      return subHubData?.map((subHub) => {
        if (subHub.id === activeItemId) {
          return <SHubDropdownList key={subHub.id} />;
        }
        return null;
      });
    } else if (activeItemType === 'wallet') {
      return walletData?.map((wallet) => {
        if (wallet.id === activeItemId) {
          return <SubWalletIndex key={wallet.id} paddingLeft="0" />;
        }
        return null;
      });
    } else if (activeItemType === 'subWallet') {
      return subWalletData?.map((subWallet: dataProps) => {
        if (subWallet.id === activeItemId) {
          return (
            <Sub2WalletIndex
              key={subWallet.id}
              currWalId={subWallet.id}
              paddingLeft="0"
            />
          );
        }
        return null;
      });
    }
    return null;
  };

  const displayClickedParent = () => {
    if (activeItemType === 'subhub') {
      return subHubData?.map((subHub: dataProps) => {
        if (subHub.id === activeItemId) {
          return <ActiveSubHub key={subHub.id} />;
        }
        return null;
      });
    } else if (activeItemType === 'wallet') {
      return walletData?.map((wallet: dataProps) => {
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
      return subWalletData?.map((subWallet: dataProps) => {
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
                  className="relative flex items-center justify-between gap-2 hover:bg-gray-100"
                  style={{ height: '28px' }}
                  onMouseEnter={() => handleMouseOver(index)}
                  onMouseLeave={handleMouseOut}
                >
                  {i.id === currentItemId && (
                    <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />
                  )}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleClick(i.id)}
                    className="flex items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm"
                  >
                    <div className="flex items-center flex-1 min-w-0 ml-2">
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
                          className="tracking-wider capitalize truncate"
                          style={{ fontSize: '10px' }}
                        >
                          {i.name}
                        </h4>
                      </span>
                    </div>
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
              <div className="w-full border bg-green-50 flex items-center">
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
