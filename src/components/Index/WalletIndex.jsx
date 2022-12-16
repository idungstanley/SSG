import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FolderFilled } from '@ant-design/icons';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { useGetHub } from '../../features/hubs/hubService';
import PlusDropDown from '../../pages/workspace/hubs/components/PlusDropDown';
import WalletModal from '../../pages/workspace/wallet/components/WalletModal';
import ListModal from '../../pages/workspace/Lists/components/ListModal';
import SubWalletIndex from '../../pages/workspace/wallet/components/SubWalletIndex';
import MenuDropdown from '../Dropdown/DropdownForWorkspace';

function WalletIndex({ showHubList, getCurrentHubId }) {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [showSubWallet, setShowSubWallet] = useState(false);
  const [walletId, setGetWalletId] = useState('');
  const [walletParentId, setWalletParentId] = useState('');
  const { data } = useGetHub(getCurrentHubId);

  const navigate = useNavigate();
  const handleLocation = (id) => {
    navigate(`/workspace/wallet/${id}`);
  };

  const handleShowSubWallet = (id) => {
    setWalletParentId(id);
    setShowSubWallet(!showSubWallet);
    if (showSubWallet === id) {
      setShowSubWallet(null);
    }
    setShowSubWallet(id);
  };

  return data?.data?.wallets != null ? (
    <div id="createWallet" className={`${showHubList ? 'block' : 'hidden'}`}>
      {data?.data?.wallets.length !== 0 ? (
        data?.data?.wallets.map((wallet) => (
          <div key={wallet.id}>
            <section className="flex justify-between items-center text-sm pl-14 hover:bg-gray-100">
              <div
                id="walletLeft"
                className="flex items-center justify-center space-x-1"
              >
                {/* showsub */}
                <button
                  type="button"
                  onClick={() => handleShowSubWallet(wallet.id)}
                >
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
                </button>

                <FolderFilled />
                <button type="button" onClick={() => handleLocation(wallet.id)}>
                  <p className="text-sm">{wallet.name}</p>
                </button>
              </div>

              <div className="space-x-1 flex items-center justify-end">
                <MenuDropdown />
                <PlusDropDown
                  onClick={() => setGetWalletId(wallet.id)}
                  walletId={walletId}
                />
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
            <button type="button" onClick={() => setShowWalletModal(true)}>
              Wallet
            </button>
          </span>
          ,
          <span className="underline text-gray-600">
            <button type="button" onClick={() => setShowListModal(true)}>
              List
            </button>
          </span>
        </div>
      )}
    </div>
  ) : null;
}

WalletIndex.propTypes = {
  showHubList: PropTypes.bool.isRequired,
  getCurrentHubId: PropTypes.string.isRequired,
};

export default WalletIndex;
