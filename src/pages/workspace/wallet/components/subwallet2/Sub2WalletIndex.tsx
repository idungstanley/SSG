import React, { useState } from 'react';
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
import TaskDropdown from '../../../tasks/ccomponent/TaskDropdown';
import MenuDropdown from '../../../../../components/Dropdown/DropdownForWorkspace';
import { IList, IWallet } from '../../../../../features/hubs/hubs.interfaces';

interface Sub2WalletIndexProps {
  wallet2ParentId?: string;
}

function Sub2WalletIndex({ wallet2ParentId }: Sub2WalletIndexProps) {
  const [walletId, setGetWalletId] = useState('');
  const [showSubWallet3, setShowSubWallet3] = useState<string | null>(null);
  const [getListId, setGetListId] = useState('');
  const { data: subwallet } = useQuery<{
    data: { wallets: IWallet[]; lists: IList[] };
  }>({
    queryKey: ['sub2walletlist', [wallet2ParentId]],
    queryFn: getWalletService,
  });

  const handleShowSubWallet = (id: string) => {
    if (showSubWallet3 === id) {
      return setShowSubWallet3(null);
    }
    setShowSubWallet3(id);
  };

  const navigate = useNavigate();
  const handleListLocation = (id: string) => {
    navigate(`/workspace/list/${id}`);
  };

  const handleLocation = (id: string) => {
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

export default Sub2WalletIndex;
