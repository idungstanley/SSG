import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, UserIcon, UsersIcon } from '@heroicons/react/24/solid';
import ResponsibleData from '../ResponsibleData';

export default function MinMenuForResponsible() {
  const [isGroups, setIsGroups] = useState<boolean | null>(null);
  const [showResponsibleModal, setShowResponsibleModal] = useState(false);

  const items = [
    {
      label: 'members',
      onClick: () => {
        setShowResponsibleModal(!showResponsibleModal);
        setIsGroups(false);
      },
      icon: <UserIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
    },
    {
      label: 'member groups',
      onClick: () => {
        setShowResponsibleModal(!showResponsibleModal);
        setIsGroups(true);
      },
      icon: <UsersIcon className="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
    }
  ];

  return (
    <>
      {showResponsibleModal && isGroups !== null ? (
        <ResponsibleData setShowModal={setShowResponsibleModal} isGroups={isGroups} />
      ) : null}

      <div className="inline-flex rounded-md shadow-sm bg-white">
        <p className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
          Responsible
        </p>
        <Menu as="div" className="relative -ml-px block">
          <Menu.Button className="relative w-10 h-10 flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
            <span className="sr-only">Open options</span>
            <ChevronDownIcon className="h-7 w-7" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {items.map((item) => (
                  <Menu.Item key={item.label}>
                    {() => (
                      <div
                        // type="button"
                        onClick={item.onClick}
                        className="flex whitespace-nowrap cursor-pointer items-center hover:bg-gray-100 px-3"
                      >
                        {item.icon}
                        <p className="block py-2 text-sm text-gray-700">{item.label}</p>
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
}
