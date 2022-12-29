import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FolderFilled } from '@ant-design/icons';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { getWalletService } from '../../../../../features/wallet/walletService';
import MenuDropdown from '../../../../../components/Dropdown/DropdownForWorkspace';
import PlusDropDown from '../../../hubs/components/PlusDropDown';
import Sub2WalletIndex from '../subwallet2/Sub2WalletIndex';
import TaskDropdown from '../../../tasks/ccomponent/TaskDropdown';

function SubWalletIndex({ walletParentId }) {
  const [wallet2ParentId, setWallet2ParentId] = useState('');
  const [walletId, setGetWalletId] = useState('');
  const [getListId, setGetListId] = useState('');
  const { data: subwallet } = useQuery({
    queryKey: ['subwalletlist', [walletParentId]],
    queryFn: getWalletService,
  });

  const [showSubWallet2, setShowSubWallet2] = useState<string | null>(null);

  const handleShowSubWallet = (id: string) => {
    setWallet2ParentId(id);
    if (showSubWallet2 === id) {
      return setShowSubWallet2(null);
    }
    setShowSubWallet2(id);
  };

  const navigate = useNavigate();
  const handleLocation = (id: string) => {
    navigate(`/workspace/wallet/${id}`);
  };

  const handleListLocation = (id: string) => {
    navigate(`/workspace/list/${id}`);
  };

  return (
    <div>
      {subwallet?.data?.wallets.map((wallet) => (
        <div key={wallet.id}>
          <section className="flex justify-between items-center text-sm pl-10 space-x-1 hover:bg-gray-100">
            {/* showsub2 */}
            <div className="flex items-center">
              <div onClick={() => handleShowSubWallet(wallet.id)}>
                {showSubWallet2 === wallet.id ? (
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
              <div onClick={() => handleLocation(wallet.id)}>{wallet.name}</div>
            </div>
            {/* ends here */}
            <div
              id="walletRight"
              className="space-x-1 flex items-center"
              onClick={() => setGetWalletId(wallet.id)}
            >
              <MenuDropdown />
              <PlusDropDown walletId={walletId} />
            </div>
          </section>
          <div>
            {showSubWallet2 === wallet.id ? (
              <Sub2WalletIndex wallet2ParentId={wallet2ParentId} />
            ) : null}
          </div>
        </div>
      ))}
      {subwallet?.data?.lists.map((list) => (
        <div key={list.id}>
          <section className="flex justify-between items-center text-sm pl-16 space-x-1 hover:bg-gray-100">
            <div className="flex items-center">
              <DotsCircleHorizontalIcon
                className="flex-shrink-0 h-3 w-5"
                aria-hidden="true"
              />
              <div onClick={() => handleListLocation(list.id)}>{list.name}</div>
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

SubWalletIndex.defaultProps = {
  walletParentId: '',
};

SubWalletIndex.propTypes = {
  walletParentId: PropTypes.string,
};

export default SubWalletIndex;
