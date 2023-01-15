import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetHub } from '../../features/hubs/hubService';

import WalletModal from '../../pages/workspace/wallet/components/modals/WalletModal';

import SubWalletIndex from '../../pages/workspace/wallet/components/subwallet1/ SubWalletIndex';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai';
import {
  getCurrHubId,
  setshowMenuDropdown,
} from '../../features/hubs/hubSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import MenuDropdown from '../Dropdown/MenuDropdown';
import { setWalletId } from '../../features/wallet/walletSlice';

interface WalletIndexProps {
  showHubList: boolean;
  getCurrentHubId: string | null;
}

function WalletIndex({ showHubList, getCurrentHubId }: WalletIndexProps) {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [showSubWallet, setShowSubWallet] = useState<string | null>(null);
  const [walletId, setGetWalletId] = useState('');
  const [isHovering, setIsHovering] = useState<number>(-1);
  const [walletParentId, setWalletParentId] = useState('');
  const { data } = useGetHub(getCurrentHubId);
  const dispatch = useDispatch();
  const { hubParentId, showMenuDropdown } = useAppSelector(
    (state) => state.hub
  );
  const { currentWalletId } = useAppSelector((state) => state.wallet);

  const navigate = useNavigate();
  const handleLocation = (id: string) => {
    navigate(`/workspace/wallet/${id}`);
  };
  const handleMouseOver = (i: number) => {
    setIsHovering(i);
  };
  const handleMouseOut = () => {
    setIsHovering(-1);
  };

  const handleShowSubWallet = (id: string) => {
    setWalletParentId(id);
    if (showSubWallet === id) {
      return setShowSubWallet(null);
    }
    setShowSubWallet(id);
  };

  const handleWalletSettings = (id) => {
    dispatch(setWalletId(id));
    dispatch(
      setshowMenuDropdown({
        showMenuDropdown: id,
        showMenuDropdownType: 'wallet',
      })
    );
  };

  return data?.data?.wallets != null ? (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {data?.data?.wallets.length == 0 && data?.data?.lists.length == 0 && (
        <div className="flex space-x-1 text-sm pl-7">
          Create a
          <span className="text-gray-600 underline">
            <p onClick={() => setShowWalletModal(true)}>Wallet</p>
          </span>
          ,
          <span className="text-gray-600 underline">
            <p onClick={() => setShowListModal(true)}>List</p>
          </span>
        </div>
      )}
      {data?.data?.wallets.length !== 0 &&
        data?.data?.wallets.map((wallet, i) => (
          <div key={wallet.id}>
            <section
              className="flex items-center justify-between pl-3 pr-1.5 py-1.5 text-sm hover:bg-gray-100 h-8"
              // onMouseEnter={() => handleMouseOver(i)}
              // onMouseLeave={handleMouseOut}
            >
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
                className="flex items-center space-x-1"
                // className={`flex items-center justify-end space-x-1 ${
                //   isHovering === i ? 'block' : 'hidden'
                // }`}
                // onClick={() => setGetWalletId(wallet.id)}
              >
                {/* <MenuDropdown />
                <PlusDropDown walletId={walletId} /> */}
                <AiOutlineEllipsis
                  className="cursor-pointer"
                  onClick={() => handleWalletSettings(wallet.id)}
                />
                <AiOutlinePlus />
              </div>
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
            {currentWalletId === wallet.id ? <MenuDropdown /> : null}
          </div>
        ))}
    </div>
  ) : null;
}

export default WalletIndex;
