import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { cl } from '../../utils';

interface MenuWithTransitionProps {
  icon: JSX.Element;
  menuItems: {
    id: number;
    type: string;
    title: string;
    onClick: (() => void) | string;
  }[];
}

export default function MenuWithTransition({
  icon,
  menuItems,
}: MenuWithTransitionProps) {
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="flex p-1 text-sm text-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          {icon}
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
      >
        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menuItems.map((i) => (
            <Menu.Item key={i.id}>
              {({ active }) =>
                i.type === 'button' && typeof i.onClick !== 'string' ? (
                  <button
                    type="button"
                    onClick={i.onClick}
                    className={cl(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-left text-gray-700 w-full'
                    )}
                  >
                    {i.title}
                  </button>
                ) : typeof i.onClick === 'string' ? (
                  <Link
                    to={i.onClick}
                    className={cl(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700 text-left'
                    )}
                  >
                    {i.title}
                  </Link>
                ) : (
                  <></>
                )
              }
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
