import { Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { List } from './ui/List/List';

export function Filter() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex px-4 py-2 text-xs text-gay-500">Filter</Menu.Button>
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
        <Menu.Items className="absolute left-0 z-50 p-2 mt-2 origin-top-left rounded-md bg-white shadow-lg focus:outline-none">
          {/* close */}
          <Menu.Item>
            <XMarkIcon className="absolute h-5 w-5 right-2 top-2 text-gray-500" aria-hidden="true" />
          </Menu.Item>

          {/* title */}
          <h1 className="text-black text-xl font-bold">Filters</h1>
          <List />
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
