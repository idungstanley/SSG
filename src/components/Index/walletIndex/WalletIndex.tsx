import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubWalletIndex from '../../../pages/workspace/wallet/components/subwallet1/ SubWalletIndex';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import {
  closeMenu,
  getPrevName,
  getSubMenu,
  setshowMenuDropdown,
} from '../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import {
  setActiveEntity,
  setActiveItem,
  setCurrentWalletId,
  setCurrentWalletName,
  setShowHub,
} from '../../../features/workspace/workspaceSlice';
import MenuDropdown from '../../Dropdown/MenuDropdown';
import { setWalletItem } from '../../../features/wallet/walletSlice';
import SubDropdown from '../../Dropdown/SubDropdown';
import {
  setCreateListSlideOverVisibility,
  setCreateWalletSlideOverVisibility,
} from '../../../features/general/slideOver/slideOverSlice';
import { getWalletServices } from '../../../features/wallet/walletService';
import { useGetHubWallet } from '../../../features/hubs/hubService';

interface WalletIndexProps {
  showHubList: boolean;
  getCurrentHubId: string | null;
  paddingLeft?: string;
}

export interface dataProps {
  id: string;
  name: string;
}

function WalletIndex({
  showHubList,
  getCurrentHubId,
  paddingLeft = '26',
}: WalletIndexProps) {
  const dispatch = useDispatch();
  const [showSubWallet, setShowSubWallet] = useState<string | null>(null);
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { SubMenuId, showMenuDropdown } =
    useAppSelector((state) => state.hub);
  const { toggleArchiveWallet } = useAppSelector((state) => state.wallet);
  const { data: walletAndListData } = useGetHubWallet(getCurrentHubId);

  const { data } = getWalletServices({
    hubId: getCurrentHubId,
    Archived: toggleArchiveWallet,
  });

  const navigate = useNavigate();
  const handleLocation = (id: string, name: string, type = 'wallet') => {
    dispatch(setShowHub(true));
    navigate(`/wallet/${id}`);
    setShowSubWallet(id);
    dispatch(setCurrentWalletId(id));
    dispatch(
      setWalletItem({
        currentWalletParentId: id,
        currentWalletParentType: 'wallet',
      })
    );
    dispatch(
      setActiveItem({
        activeItemType: type,
        activeItemId: id,
        activeItemName: name,
      })
    );
    dispatch(setActiveEntity({ id: id, type: 'wallet' }));
    dispatch(setCurrentWalletName(name));
    dispatch(setCurrentWalletId(id));
  };

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet === id) {
      setShowSubWallet(null);
    } else {
      dispatch(setCurrentWalletId(id));
      setShowSubWallet(id);
      dispatch(
        setWalletItem({
          currentWalletParentId: id,
          currentWalletParentType: 'wallet',
        })
      );
    }
  };
  const handleWalletSettings = (
    id: string,
    name: string,
    e: React.MouseEvent<SVGElement>
  ) => {
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'wallet',
      })
    );
    dispatch(getPrevName(name));
    if (showMenuDropdown != null) {
      if ((e.target as HTMLButtonElement).id == 'menusettings') {
        dispatch(closeMenu());
      }
    }
  };

  const handleItemAction = (id: string) => {
    dispatch(
      getSubMenu({
        SubMenuId: id,
        SubMenuType: 'wallet',
      })
    );
  };

  return walletAndListData?.data?.wallets != null ? (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {walletAndListData?.data.lists.length === 0 &&
        walletAndListData?.data.wallets.length === 0 && (
          <div
            className="flex space-x-1 text-xs py-1.5 h-8 tracking-wider capitalize truncate"
            style={{ paddingLeft: `${paddingLeft}px` }}
          >
            <span>
              Create a
              <span
                onClick={() =>
                  dispatch(setCreateWalletSlideOverVisibility(true))
                }
                className="mx-1 underline cursor-pointer"
              >
                Wallet,
              </span>
              <span
                onClick={() => dispatch(setCreateListSlideOverVisibility(true))}
                className="underline cursor-pointer"
              >
                List
              </span>
            </span>
          </div>
        )}
      {data?.data?.wallets.length !== 0 &&
        data?.data?.wallets.map((wallet: dataProps) => (
          <div key={wallet.id}>
            <section
              className={`flex items-center relative justify-between pr-1.5 py-1.5 text-sm hover:bg-gray-100 h-8 group ${
                wallet.id === activeItemId &&
                'bg-green-100 text-black font-medium'
              }`}
            >
              {wallet.id === activeItemId && (
                <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />
              )}
              <div
                id="walletLeft"
                className="flex items-center justify-center"
                style={{ paddingLeft: `${paddingLeft}px` }}
              >
                {/* showsub1 */}
                <div
                  onClick={() => handleShowSubWallet(wallet.id)}
                  className="flex items-center"
                >
                  {showSubWallet === wallet.id ? (
                    <>
                      <VscTriangleDown
                        className="flex-shrink-0 h-2"
                        aria-hidden="true"
                        color="rgba(72, 67, 67, 0.64)"
                      />
                      <FaFolderOpen color="rgba(72, 67, 67, 0.64)" />
                    </>
                  ) : (
                    <>
                      <VscTriangleRight
                        className="flex-shrink-0 h-2"
                        aria-hidden="true"
                        color="#BBBDC0"
                      />
                      <FaFolder color="rgba(72, 67, 67, 0.64)" />
                    </>
                  )}
                </div>
                <div
                  onClick={() => handleLocation(wallet.id, wallet.name)}
                  className="cursor-pointer hover:underline hover:decoration-dashed"
                  style={{ marginLeft: '17px' }}
                >
                  <p
                    className="tracking-wider capitalize truncate cursor-pointer"
                    style={{ fontSize: '12px' }}
                  >
                    {wallet.name}
                  </p>
                </div>
              </div>

              <div
                id="walletRight"
                className="flex items-center space-x-1 opacity-0 group-hover:opacity-100"
              >
                <AiOutlineEllipsis
                  className="cursor-pointer"
                  onClick={(e) =>
                    handleWalletSettings(wallet.id, wallet.name, e)
                  }
                  id="menusettings"
                />
                <AiOutlinePlus
                  onClick={() => handleItemAction(wallet.id)}
                  className="cursor-pointer"
                />
              </div>
            </section>
            <div>
              {showSubWallet === wallet.id ? (
                <SubWalletIndex paddingLeft="50" />
              ) : null}
            </div>
            {showMenuDropdown === wallet.id ? <MenuDropdown /> : null}
            {SubMenuId === wallet.id ? <SubDropdown /> : null}
          </div>
        ))}
    </div>
  ) : null;
}

export default WalletIndex;
