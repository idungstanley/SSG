import React from 'react';
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
import { FaFolder } from 'react-icons/fa';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import ListModal from '../../pages/workspace/lists/components/modals/ListModal';
import {
  setCreateHubSlideOverVisibility,
  setCreateListSlideOverVisibility,
  setCreateTaskSlideOverVisibility,
  setCreateWalletSlideOverVisibility,
} from '../../features/general/slideOver/slideOverSlice';
import TaskModal from '../../pages/workspace/tasks/component/TaskModal';

interface itemsType {
  id: number;
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
  isVisible: boolean;
}

export default function SubDropdown() {
  const dispatch = useDispatch();
  const { showMenuDropdownType, SubMenuType } = useAppSelector(
    (state) => state.hub
  );
  const itemsList: itemsType[] = [
    {
      id: 1,
      title: 'Sub Hub',
      handleClick: () => {
        dispatch(setCreateHubSlideOverVisibility(true));
      },
      icon: (
        <PlusIcon className="w-5 pt-2 text-gray-700 h-7" aria-hidden="true" />
      ),
      isVisible:
        showMenuDropdownType == 'hubs'
          ? true
          : false || SubMenuType == 'hubs'
          ? true
          : false,
    },
    {
      id: 2,
      title:
        ((showMenuDropdownType == 'wallet' ? 'Sub Wallet' : 'Wallet') ||
          (SubMenuType == 'wallet' ? 'Sub Wallet' : '')) &&
        (showMenuDropdownType == 'subwallet' ? 'Sub Wallet' : 'Wallet'),
      handleClick: () => {
        dispatch(setCreateWalletSlideOverVisibility(true));
      },
      icon: <FaFolder className="w-4 h-4" aria-hidden="true" />,
      isVisible: showMenuDropdownType === 'list' ? false : true,
    },
    {
      id: 3,
      title: 'Task',
      handleClick: () => {
        dispatch(setCreateTaskSlideOverVisibility(true));
      },
      icon: (
        <PlusIcon className="w-5 pt-2 text-gray-700 h-7" aria-hidden="true" />
      ),
      isVisible: showMenuDropdownType == 'list' ? true : false,
    },
    {
      id: 4,
      title: 'List',
      handleClick: () => {
        dispatch(setCreateListSlideOverVisibility(true));
      },
      icon: <AiOutlineUnorderedList className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 5,
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
      id: 6,
      title: 'Folder',
      handleClick: () => ({}),
      icon: <LinkIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: false,
    },
    {
      id: 7,
      title: 'From Template',
      handleClick: () => ({}),
      icon: <DocumentDuplicateIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 8,
      title: 'Import',
      handleClick: () => ({}),
      icon: <StarIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
  ];
  return (
    <div className="">
      <div className="absolute w-56 py-1 origin-top-right bg-white rounded-md shadow-lg bottom-32 left-32 z-50 ring-1 ring-black ring-opacity-5 focus:outline-none">
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
      <WalletModal />
      <ListModal />
      <TaskModal />
    </div>
  );
}
