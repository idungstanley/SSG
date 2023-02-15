import React, { Fragment } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { cl } from '../../../../../utils';

export default function DropdownMenuForMessage() {
  const options = [
    {
      title: 'Account settings',
      onClick: () => ({}),
    },
    {
      title: 'Support',
      onClick: () => ({}),
    },
    {
      title: 'License',
      onClick: () => ({}),
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex opacity-0 group-hover:opacity-100 transition-all duration-150 items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none ring-0 focus:ring-0">
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 w-56 py-1 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option) => (
            <Menu.Item key={option.title}>
              {({ active }) => (
                <button
                  onClick={option.onClick}
                  className={cl(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left'
                  )}
                >
                  {option.title}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
