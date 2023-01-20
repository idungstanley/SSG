import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetHubWallet } from '../../features/hubs/hubService';
import SubWalletIndex from '../../pages/workspace/wallet/components/subwallet1/ SubWalletIndex';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { showWallet } from '../../features/wallet/walletSlice';
import { useDispatch } from 'react-redux';
import { setActiveItem } from '../../features/workspace/workspaceSlice';
import WalletModal from '../../pages/workspace/wallet/components/modals/WalletModal';
import ListModal from '../../pages/workspace/lists/components/modals/ListModal';
import {
  setCreateListSlideOverVisibility,
  setCreateWalletSlideOverVisibility,
} from '../../features/general/slideOver/slideOverSlice';

interface WalletIndexProps {
  showHubList: boolean;
  getCurrentHubId: string | null;
}

function ActiveWallet({ showHubList, getCurrentHubId }: WalletIndexProps) {
  const dispatch = useDispatch();
  const [showSubWallet, setShowSubWallet] = useState<string | null>(null);
  // const [isHovering, setIsHovering] = useState<number>(-1);
  const [walletParentId, setWalletParentId] = useState('');
  const { data } = useGetHubWallet(getCurrentHubId);

  const navigate = useNavigate();
  const handleLocation = (id: string, type = 'wallet') => {
    navigate(`/workspace/wallet/${id}`);
    dispatch(setActiveItem({ activeItemType: type, activeItemId: id }));
  };
  // const handleMouseOver = (i: number) => {
  //   setIsHovering(i);
  // };
  // const handleMouseOut = () => {
  //   setIsHovering(-1);
  // };

  const handleShowSubWallet = (id: string) => {
    setWalletParentId(id);
    dispatch(showWallet(id));
    if (showSubWallet === id) {
      return setShowSubWallet(null);
    }
    setShowSubWallet(id);
  };

  return data?.data?.wallets != null ? (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {data?.data?.wallets.length == 0 && data?.data?.lists.length == 0 && (
        <div className="flex space-x-1 text-sm pl-7">
          Create a
          <span className="text-gray-600 underline">
            <p
              onClick={() => dispatch(setCreateWalletSlideOverVisibility(true))}
            >
              Wallet
            </p>
          </span>
          ,
          <span className="text-gray-600 underline">
            <p onClick={() => dispatch(setCreateListSlideOverVisibility(true))}>
              List
            </p>
          </span>
        </div>
      )}
      {data?.data?.wallets.length !== 0 &&
        data?.data?.wallets.map((wallet) => (
          <div key={wallet.id}>
            <section
              className="flex relative items-center justify-between pl-3 pr-1.5 py-1.5 text-sm hover:bg-gray-100 h-8"
              // onMouseEnter={() => handleMouseOver(i)}
              // onMouseLeave={handleMouseOut}
            >
              {showSubWallet === wallet.id && (
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
                  onClick={() => handleLocation(wallet.id)}
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
              <div
                id="walletRight"
                // className={`flex items-center justify-end space-x-1 ${
                //   isHovering === i ? 'block' : 'hidden'
                // }`}
              >
                {/* <MenuDropdown /> */}
                {/* <PlusDropDown walletId={walletId} /> */}
              </div>
            </section>
            <div>
              <WalletModal />
              {showSubWallet === wallet.id ? <SubWalletIndex /> : null}
              <ListModal />
            </div>
          </div>
        ))}
    </div>
  ) : null;
}

export default ActiveWallet;
