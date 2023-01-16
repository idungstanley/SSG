import React, { useState } from 'react';
import WalletModal from '../../pages/workspace/wallet/components/modals/WalletModal';
import {
  DocumentDuplicateIcon,
  StarIcon,
  PlusIcon,
  LinkIcon,
  ColorSwatchIcon,
} from '@heroicons/react/outline';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setShowModal } from '../../features/workspace/workspaceSlice';
import { FaFolder } from 'react-icons/fa';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import ListModal from '../../pages/workspace/lists/components/modals/ListModal';

interface itemsType {
  id: number;
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
  isVisible: boolean;
}

export default function SubDropdown() {
  const dispatch = useDispatch();
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
  const [showHubListModal, setShowHubListModal] = useState(false);
  const { showMenuDropdownType } = useAppSelector((state) => state.hub);
  const itemsList: itemsType[] = [
    {
      id: 1,
      title: 'Sub Hub',
      handleClick: () => {
        dispatch(setShowModal(true));
      },
      icon: (
        <PlusIcon className="w-5 pt-2 text-gray-700 h-7" aria-hidden="true" />
      ),
      isVisible: showMenuDropdownType == 'hubs' ? true : false,
    },
    {
      id: 2,
      title:
        (showMenuDropdownType == 'wallet' ? 'Sub Wallet' : 'Wallet') &&
        (showMenuDropdownType == 'subwallet' ? 'Sub Wallet' : 'Wallet'),
      handleClick: () => {
        setShowWalletModal(true);
      },
      icon: <FaFolder className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 3,
      title: 'List',
      handleClick: () => {
        setShowHubListModal(true);
      },
      icon: <AiOutlineUnorderedList className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 4,
      title: 'Sprint',
      handleClick: () => ({}),
      icon: (
        <ColorSwatchIcon
          className="w-5 pt-2 text-gray-700 h-7"
          aria-hidden="true"
        />
      ),
      isVisible: false,
    },
    {
      id: 5,
      title: 'Folder',
      handleClick: () => ({}),
      icon: <LinkIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false,
    },
    {
      id: 6,
      title: 'From Template',
      handleClick: () => ({}),
      icon: <DocumentDuplicateIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 7,
      title: 'Import',
      handleClick: () => ({}),
      icon: <StarIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
  ];
  return (
    <div className="">
      <div className="absolute w-56 py-1 origin-top-right bg-white rounded-md shadow-lg bottom-32 left-32 z-20 ring-1 ring-black ring-opacity-5 focus:outline-none">
        {itemsList.map((item) =>
          item.isVisible ? (
            <div key={item.id}>
              <div
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 text-left hover:bg-gray-100"
                onClick={item.handleClick}
              >
                {item.icon}
                <p>{item.title}</p>
              </div>
            </div>
          ) : null
        )}
      </div>
      <WalletModal
        walletVisible={showWalletModal}
        onCloseWalletModal={() => setShowWalletModal(false)}
      />
      <ListModal
        hublistVisible={showHubListModal}
        onCloseHubListModal={() => setShowHubListModal(false)}
      />
    </div>
  );
}
