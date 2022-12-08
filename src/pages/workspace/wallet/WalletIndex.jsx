/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable*/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { FolderFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useGetHubService } from '../../../features/hubs/hubService';
import MenuDropdown from '../hubs/components/MenuDropdown';
import PlusDropDown from '../hubs/components/PlusDropDown';
import WalletModal from './components/WalletModal';
import ListModal from '../Lists/components/ListModal';

function WalletIndex({ showHubList, getCurrentHubId }) {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const { data: hubdataById, status } = useQuery({
    queryKey: ['hubdata_hubByID', getCurrentHubId],
    queryFn: useGetHubService,
  });

  const navigate = useNavigate()
  const handleLocation = (id) => {
    navigate(`/workspace/wallet/${id}`)
  }

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
                <FolderFilled />
                <div
                 onClick={() => handleLocation(wallet.id)}
                >
                  <p className="text-sm">{wallet.name}</p>
                </div>
              </div>

              <div
                id="walletRight"
                className="space-x-1 flex items-center justify-end"
              >
                <MenuDropdown />
                <PlusDropDown />
              </div>
            </section>
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
      <div>
        <WalletModal
          walletVisible={showWalletModal}
          onCloseWalletModal={() => setShowWalletModal(false)}
        />
        <ListModal
          listVisible={showListModal}
          onCloseListModal={() => setShowListModal(false)}
        />
      </div>
    </div>
  ) : null;
}

WalletIndex.propTypes = {
  showHubList: PropTypes.string.isRequired,
  getCurrentHubId: PropTypes.string.isRequired,
};

export default WalletIndex;
