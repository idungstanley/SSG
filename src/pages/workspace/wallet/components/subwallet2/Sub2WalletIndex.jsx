import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { FolderFilled } from '@ant-design/icons';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { getWalletService } from '../../../../../features/wallet/walletService';
import PlusDropDown from '../../../hubs/components/PlusDropDown';
import MenuDropdown from '../../../hubs/components/Modal';
import TaskDropdown from '../../../tasks/ccomponent/TaskDropdown';

function Sub2WalletIndex({ wallet2ParentId }) {
  const [walletId, setGetWalletId] = useState('');
  const [showSubWallet3, setShowSubWallet3] = useState(false);
  const [getListId, setGetListId] = useState('');
  const { data: subwallet } = useQuery({
    queryKey: ['sub2walletlist', [wallet2ParentId]],
    queryFn: getWalletService,
  });

  const handleShowSubWallet = (id) => {
    setShowSubWallet3(!showSubWallet3);
    if (showSubWallet3 === id) {
      return setShowSubWallet3(null);
    }
    setShowSubWallet3(id);
  };

  const navigate = useNavigate();
  const handleListLocation = (id) => {
    navigate(`/workspace/list/${id}`);
  };

  const handleLocation = (id) => {
    navigate(`/workspace/wallet/${id}`);
  };

  return (
    <div>
      {subwallet?.data?.wallets.map((wallet) => (
        <div key={wallet.id}>
          <section className="flex justify-between items-center text-sm pl-14 space-x-1 hover:bg-gray-100">
            <div className="flex items-center">
              <div onClick={() => handleShowSubWallet(wallet.id)}>
                {showSubWallet3 === wallet.id ? (
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
              <FolderFilled
                className="flex-shrink-0 h-3 w-5"
                aria-hidden="true"
              />
              <div
                className="text-sm"
                onClick={() => handleLocation(wallet.id)}
              >
                {wallet.name}
              </div>
            </div>
            {/* ends here */}
            <div
              id="walletRight"
              className="space-x-1 flex items-center justify-end"
              onClick={() => setGetWalletId(wallet.id)}
            >
              <MenuDropdown />
              <PlusDropDown walletId={walletId} />
            </div>
          </section>
        </div>
      ))}
      {subwallet?.data?.lists.map((list) => (
        <div key={list.id}>
          <section className="flex justify-between items-center text-sm pl-20 space-x-1 hover:bg-gray-100">
            <div className="flex items-center">
              <DotsCircleHorizontalIcon
                className="flex-shrink-0 h-3 w-5"
                aria-hidden="true"
              />
              <div
                className="text-sm"
                onClick={() => handleListLocation(list.id)}
              >
                {list.name}
              </div>
            </div>
            {/* ends here */}
            <div
              id="listright"
              className="space-x-1 flex items-center justify-end"
              onClick={() => setGetListId(list.id)}
            >
              <TaskDropdown getListId={getListId} />
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}

Sub2WalletIndex.defaultProps = {
  wallet2ParentId: '',
};

Sub2WalletIndex.propTypes = {
  wallet2ParentId: PropTypes.string,
};

export default Sub2WalletIndex;
