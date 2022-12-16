/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { FolderFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useGetHub } from '../../features/hubs/hubService';
import MenuDropdown from '../../pages/workspace/hubs/components/MenuDropdown';
import PlusDropDown from '../../pages/workspace/hubs/components/PlusDropDown';
import WalletModal from '../../pages/workspace/wallet/components/WalletModal';
import ListModal from '../../pages/workspace/Lists/components/ListModal';
import SubWalletIndex from '../../pages/workspace/wallet/components/SubWalletIndex';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/outline';

function WalletIndex({ showHubList, getCurrentHubId }) {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [showSubWallet, setShowSubWallet] = useState(false);
  const [walletId, setGetWalletId] = useState('');
  const [walletParentId, setWalletParentId] = useState('');
  const { data: hubdataById } = useGetHub(getCurrentHubId);

  console.log(hubdataById);
  const navigate = useNavigate();
  const handleLocation = (id) => {
    console.log(id);
    navigate(`/workspace/wallet/${id}`);
  };

  const handleShowSubWallet = (id) => {
    setWalletParentId(id);
    setShowSubWallet(!showSubWallet);
    if (showSubWallet === id) {
      return setShowSubWallet(null);
    }
    setShowSubWallet(id);
  };
  // console.log(showSubWallet);
  // console.log(walletId);

  return hubdataById?.data?.wallets != null ? (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {hubdataById?.data?.wallets.length !== 0 ? (
        hubdataById?.data?.wallets.map((wallet) => (
          <div key={wallet.id}>
            <section className="flex justify-between items-center text-sm pl-14 hover:bg-gray-100">
              <div
                id="walletLeft"
                className="flex items-center justify-center space-x-1"
              >
                {/* showsub */}
                <div onClick={() => handleShowSubWallet(wallet.id)}>
                  {showSubWallet === wallet.id ? (
                    <ChevronDownIcon
                      className="flex-shrink-0 h-3 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronRightIcon
                      className="flex-shrink-0 h-3 w-5"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <FolderFilled />
                <div onClick={() => handleLocation(wallet.id)}>
                  <p className="text-sm">{wallet.name}</p>
                </div>
              </div>

              <div
                id="walletRight"
                className="space-x-1 flex items-center justify-end"
                onClick={() => setGetWalletId(wallet.id)}
              >
                <MenuDropdown />
                <PlusDropDown walletId={walletId} />
              </div>
            </section>
            <div>
              <WalletModal
                walletVisible={showWalletModal}
                onCloseWalletModal={() => setShowWalletModal(false)}
              />
              {showSubWallet === wallet.id ? (
                <SubWalletIndex
                  walletParentId={walletParentId}
                  getCurrentHubId={getCurrentHubId}
                />
              ) : null}
              <ListModal
                listVisible={showListModal}
                onCloseListModal={() => setShowListModal(false)}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="text-sm pl-7 flex space-x-1">
          Create a
          <span className="underline text-gray-600">
            <p onClick={() => setShowWalletModal(true)}>Wallet</p>
          </span>
          ,
          <span className="underline text-gray-600">
            <p onClick={() => setShowListModal(true)}>List</p>
          </span>
        </div>
      )}
    </div>
  ) : null;
}

WalletIndex.propTypes = {
  showHubList: PropTypes.string.isRequired,
  getCurrentHubId: PropTypes.string.isRequired,
};

export default WalletIndex;
