import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { cl } from '../../../../../utils';
import { BsArchive } from 'react-icons/bs';
// import { useDispatch } from 'react-redux';
// import { setToggleArchive } from '../../../../../features/hubs/hubSlice';
import { BiWallet } from 'react-icons/bi';
import { RiListSettingsFill } from 'react-icons/ri';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
// import { setToggleArchiveWallet } from '../../../../../features/wallet/walletSlice';
// import { setToggleArchiveList } from '../../../../../features/list/listSlice';

interface itemsType {
  id: string;
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
  isVisible: boolean;
}

export default function ArchiveMenu() {
  // const dispatch = useDispatch();
  // const { sidebarSettings } = useAppSelector((state) => state.hub);
  // const { toggleArchive } = useAppSelector((state) => state.hub);
  // const { toggleArchiveWallet } = useAppSelector((state) => state.wallet);
  // const { toggleArchiveList } = useAppSelector((state) => state.list);

  const itemsList: itemsType[] = [
    {
      id: 'show_archived_hubs',
      title: 'Show archived Hubs',
      handleClick: () => {
        // if (toggleArchive === 0) {
        //   dispatch(setToggleArchive(1));
        // } else {
        //   dispatch(setToggleArchive(0));
        // }
      },
      icon: <BsArchive />,
      isVisible: true
    },
    {
      id: 'show_archived_wallets',
      title: 'Show archived Wallets',
      handleClick: () => {
        // dispatch(setToggleArchiveWallet(!toggleArchiveWallet));
      },
      icon: <BiWallet />,
      isVisible: true
    },
    {
      id: 'show_archived_lists',
      title: 'Show archived Lists',
      handleClick: () => {
        // dispatch(setToggleArchiveList(!toggleArchiveList));
      },
      icon: <RiListSettingsFill />,
      isVisible: true
    }
  ];

  return (
    <Menu as="div" className="relative text-left">
      <Menu.Button className="text-sm text-gray-700">
        <Cog6ToothIcon className="w-5 h-5" aria-hidden />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        show={false}
      >
        <Menu.Items className="origin-top-right absolute z-20  -right-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none ">
          {itemsList.map((i) => (
            <Menu.Item key={i.id}>
              {({ active }) => (
                <button
                  type="button"
                  className={cl(
                    active ? 'bg-gray-100' : '',
                    'flex items-center px-4 py-2 text-sm text-gray-600 text-left space-x-2 w-full'
                  )}
                  onClick={i.handleClick}
                >
                  {i.icon}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
