import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetHubWallet } from '../../../features/hubs/hubService';
import SubWalletIndex from '../../../pages/workspace/wallet/components/subwallet1/ SubWalletIndex';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import {
  closeMenu,
  getSubMenu,
  setshowMenuDropdown,
} from '../../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import {
  setActiveItem,
  setCurrentWalletId,
  setCurrentWalletName,
} from '../../../features/workspace/workspaceSlice';
import MenuDropdown from '../../Dropdown/MenuDropdown';
import { setWalletId } from '../../../features/wallet/walletSlice';
import SubDropdown from '../../Dropdown/SubDropdown';
import {
  setCreateListSlideOverVisibility,
  setCreateWalletSlideOverVisibility,
} from '../../../features/general/slideOver/slideOverSlice';

interface WalletIndexProps {
  showHubList: boolean;
  getCurrentHubId: string | null;
}

function WalletIndex({ showHubList, getCurrentHubId }: WalletIndexProps) {
  const dispatch = useDispatch();
  const [showSubWallet, setShowSubWallet] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<number>(-1);
  const [walletParentId, setWalletParentId] = useState('');
  const { data } = useGetHubWallet(getCurrentHubId);
  const { activeItemId } = useAppSelector((state) => state.workspace);
  // const { currentWalletId } = useAppSelector((state) => state.wallet);
  const { SubMenuId, showMenuDropdown } = useAppSelector((state) => state.hub);

  const navigate = useNavigate();
  const handleLocation = (id: string, name, type = 'wallet') => {
    navigate(`/workspace/wallet/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
    dispatch(setCurrentWalletName(name));
    dispatch(setCurrentWalletId(id));
  };
  const handleMouseOver = (i: number) => {
    setIsHovering(i);
  };
  const handleMouseOut = () => {
    setIsHovering(-1);
  };

  const handleShowSubWallet = (id: string) => {
    dispatch(setCurrentWalletId(id));
    setWalletParentId(id);
    // dispatch(showWallet(id));
    if (showSubWallet === id) {
      return setShowSubWallet(null);
    }
    setShowSubWallet(id);
  };

  const handleWalletSettings = (id: string, e) => {
    dispatch(setWalletId(id));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'wallet',
      })
    );
    if (showMenuDropdown != null) {
      if (e.target.id == 'menusettings') {
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

  return data?.data?.wallets != null ? (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {data?.data?.wallets.length == 0 && data?.data?.lists.length == 0 && (
        <div className="flex space-x-1 text-xs pl-7 py-1.5 h-8">
          <span className="text-gray-600">
            Create a
            <span
              onClick={() => dispatch(setCreateWalletSlideOverVisibility(true))}
              className="underline mx-1 text-black"
            >
              Wallet,
            </span>
            <span
              onClick={() => dispatch(setCreateListSlideOverVisibility(true))}
              className="underline text-black"
            >
              List
            </span>
          </span>
        </div>
      )}
      {data?.data?.wallets.length !== 0 &&
        data?.data?.wallets.map((wallet, i) => (
          <div key={wallet.id}>
            <section
              className={`flex items-center relative justify-between pl-3 pr-1.5 py-1.5 text-sm hover:bg-gray-100 h-8 ${
                wallet.id === activeItemId && 'bg-green-100 text-green-500'
              } `}
              onMouseEnter={() => handleMouseOver(i)}
              onMouseLeave={handleMouseOut}
            >
              {wallet.id === activeItemId && (
                <span className="absolute top-0 bottom-0 left-0 w-1 rounded-r-lg bg-green-500" />
              )}
              <div id="walletLeft" className="flex items-center justify-center">
                {/* showsub1 */}
                <div
                  onClick={() => handleShowSubWallet(wallet.id)}
                  className="flex items-center"
                >
                  {showSubWallet === wallet.id ? (
                    <>
                      <VscTriangleDown
                        className="flex-shrink-0 h-3"
                        aria-hidden="true"
                        color="rgba(72, 67, 67, 0.64)"
                      />
                      <FaFolderOpen color="rgba(72, 67, 67, 0.64)" />
                    </>
                  ) : (
                    <>
                      <VscTriangleRight
                        className="flex-shrink-0 h-3"
                        aria-hidden="true"
                        color="rgba(72, 67, 67, 0.64)"
                      />
                      <FaFolder color="rgba(72, 67, 67, 0.64)" />
                    </>
                  )}
                </div>
                <div
                  onClick={() => handleLocation(wallet.id, wallet.name)}
                  className="ml-2 cursor-pointer hover:underline hover:decoration-dashed"
                >
                  <p
                    className="tracking-wider capitalize"
                    style={{ fontSize: '10px' }}
                  >
                    {wallet.name}
                  </p>
                </div>
              </div>
              {isHovering === i && (
                <div
                  id="walletRight"
                  className="flex items-center space-x-1 text-black"
                >
                  <AiOutlineEllipsis
                    className="cursor-pointer"
                    onClick={(e) => handleWalletSettings(wallet.id, e)}
                    id="menusettings"
                  />
                  <AiOutlinePlus
                    onClick={() => handleItemAction(wallet.id)}
                    className="cursor-pointer"
                  />
                </div>
              )}
            </section>
            <div>
              {/* <WalletModal
                walletVisible={showWalletModal}
                onCloseWalletModal={() => setShowWalletModal(false)}
                walletId={wallet.id}
              /> */}
              {showSubWallet === wallet.id ? (
                <SubWalletIndex walletParentId={walletParentId} />
              ) : null}
              {/* <ListModal
                // walletId={wallet.id}
                listVisible={showListModal}
                onCloseListModal={() => setShowListModal(false)}
              /> */}
            </div>
            {showMenuDropdown === wallet.id ? <MenuDropdown /> : null}
            {SubMenuId === wallet.id ? <SubDropdown /> : null}
          </div>
        ))}
    </div>
  ) : null;
}

export default WalletIndex;
