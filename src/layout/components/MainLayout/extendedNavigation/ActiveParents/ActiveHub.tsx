import React from 'react';
// import { useDispatch } from 'react-redux';
import FullScreenMessage from '../../../../../components/CenterMessage/FullScreenMessage';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
// import { resetCurrentItem, setCurrentItem, setShowHub } from '../../../../../features/workspace/workspaceSlice';
import { AvatarWithInitials } from '../../../../../components';
import { Spinner } from '../../../../../common';
import { useGetHubList, useGetHubWallet, useGetSubHub } from '../../../../../features/hubs/hubService';
import SubWalletIndex from '../../../../../pages/workspace/wallet/components/subwallet1/ SubWalletIndex';
import { getWalletService } from '../../../../../features/wallet/walletService';
import Sub2WalletIndex from '../../../../../pages/workspace/wallet/components/subwallet2/Sub2WalletIndex';
import ActiveWallet from './ActiveWallet';
import ActiveSubWallet from './ActiveSubwallet';
// import MenuDropdown from '../../../../../components/Dropdown/MenuDropdown';
import SHubDropdownList from '../../../../../components/ItemsListInSidebar/components/SHubDropdownList';
import ActiveSubHub from './ActiveSubHub';
import DropdownList from '../../../../../components/ItemsListInSidebar/components/DropdownList';
import { dataProps } from '../../../../../components/Index/walletIndex/WalletIndex';
import { useNavigate } from 'react-router-dom';
import { setActiveItem, setCurrentItem } from '../../../../../features/workspace/workspaceSlice';
import { IHubDetails } from '../../../../../features/hubs/hubs.interfaces';
import { setParentHubExt, setSubHubExt } from '../../../../../features/hubs/hubSlice';

export default function ActiveHub() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentItemId, activeItemId, activeItemType, currentWalletId } = useAppSelector((state) => state.workspace);
  const { parentHubExt } = useAppSelector((state) => state.hub);
  const hubType = 'hub';
  // const { id: parentHubId, type: parentHubType } = ;
  const walletId = useGetHubWallet(currentItemId);
  const { id: parentHubId } = parentHubExt;
  const walletData = walletId?.data?.data.wallets;
  const { data: subwallet } = getWalletService(currentWalletId);
  const { data: subHub } = useGetSubHub({
    parentId: parentHubId
  });
  // const { hubId } = useParams();
  const subHubData = subHub?.data.hubs;
  const subWalletData = subwallet?.data.wallets;
  const { data, status } = useGetHubList({ query: null });

  const items = data?.data.hubs;
  if (status === 'error') {
    return (
      <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." showOneThirdMessage />
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
          return <Sub2WalletIndex key={subWallet.id} currWalId={subWallet.id} paddingLeft="0" />;
        }
        return null;
      });
    }
    return null;
  };

  const displayClickedParent = () => {
    if (activeItemType === 'subhub') {
      return subHubData?.map((subHub: IHubDetails) => {
        if (subHub.id === activeItemId) {
          return <ActiveSubHub key={subHub.id} />;
        }
        return null;
      });
    } else if (activeItemType === 'wallet') {
      return walletData?.map((wallet: dataProps) => {
        if (wallet.id === activeItemId) {
          return <ActiveWallet key={wallet.id} showHubList={!false} getCurrentHubId={currentItemId} />;
        }
      });
    } else if (activeItemType === 'subWallet') {
      return subWalletData?.map((subWallet: dataProps) => {
        if (subWallet.id === activeItemId) {
          return <ActiveSubWallet key={subWallet.id} walletParentId={currentWalletId} padding="pl-0" />;
        }
        return null;
      });
    }
  };

  const handleClick = (id: string) => {
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: hubType
      })
    );
    dispatch(setSubHubExt({ id: null, type: null }));
    dispatch(setParentHubExt({ id: id, type: hubType }));
    dispatch(
      setCurrentItem({
        currentItemId: id,
        currentItemType: hubType
      })
    );

    navigate(`tasks/h/${id}`, {
      replace: true
    });
  };

  return status === 'success' ? (
    <ul className="w-full">
      {items?.map(
        (i: { id: string; name: string }) =>
          i.id === parentHubId && (
            <li key={i.id} className="flex flex-col">
              <div
                className={`flex justify-between items-center hover:bg-gray-100 relative ${
                  i.id === parentHubId && 'text-black-500'
                }`}
                style={{ height: '50px', backgroundColor: `${i.id === activeItemId ? '#BF00FF21' : ''}` }}
                onClick={() => handleClick(i.id)}
              >
                {i.id === activeItemId && (
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
                        <h4 className="tracking-wider capitalize truncate" style={{ fontSize: '10px' }}>
                          {i.name}
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
