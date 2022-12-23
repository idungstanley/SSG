import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, FolderAddIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';
import { setCreateFolderSlideOverVisibility } from '../../../../../../features/general/slideOver/slideOverSlice';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function CreateNewSelect() {
  const dispatch = useDispatch();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ring-0 focus:ring-0">
          <PlusCircleIcon
            className="mr-2.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <span className="sm:ml-2.5 hidden sm:block">Create</span>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="origin-top-left absolute z-20 left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => dispatch(setCreateFolderSlideOverVisibility(true))}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm w-full',
                  )}
                >
                  <FolderAddIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Folder
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
