import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Setting from '../../../../../assets/branding/setting.png';
import { classNames } from '../../../../../utils';
import { BsArchive } from 'react-icons/bs';
import { useAppSelector } from '../../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { setToggleArchive } from '../../../../../features/hubs/hubSlice';

interface itemsType {
  id: number;
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
  isVisible: boolean;
}

export default function ArchiveMenu() {
  const dispatch = useDispatch();
  const { sidebarSettings } = useAppSelector((state) => state.hub);
  const { toggleArchive } = useAppSelector((state) => state.hub);

  const itemsList: itemsType[] = [
    {
      id: 1,
      title: 'Show archived',
      handleClick: () => {
        if (toggleArchive === 0) {
          dispatch(setToggleArchive(1));
        } else {
          dispatch(setToggleArchive(0));
        }
      },
      icon: <BsArchive />,
      isVisible: true,
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex text-sm text-gray-400">
          <img className="w-auto h-6" src={Setting} alt="Workflow" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        show={sidebarSettings}
      >
        <Menu.Items className="origin-top-right absolute z-20  -right-10 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none ">
          {itemsList.map((i) => (
            <Menu.Item key={i.id}>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'flex items-center px-4 py-2 text-sm text-gray-600 text-left space-x-2 w-full'
                  )}
                  onClick={i.handleClick}
                >
                  {i.icon} <p>{toggleArchive ? 'Hide archived' : i.title}</p>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
