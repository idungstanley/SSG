import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  ViewGridIcon,
  ViewListIcon,
} from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedViewId } from '../../../../../../features/explorer/explorerSlice';

const sortingItems = [
  {
    id: 1,
    title: 'Table',
    icon: (
      <ViewListIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 2,
    title: 'Grid',
    icon: (
      <ViewGridIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
    ),
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ChangeView() {
  const dispatch = useDispatch();
  const { selectedViewId } = useSelector((state) => state.explorer);

  const handleClick = (item) => {
    dispatch(setSelectedViewId(item));
    localStorage.setItem('selectedView', JSON.stringify(item));
  };

  const selectedItem = sortingItems.find((i) => i.id === selectedViewId);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ring-0 focus:ring-0">
          {selectedItem.icon}
          <span className="hidden sm:block">{selectedItem.title}</span>
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
        <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          {sortingItems.map((i) => (
            <Menu.Item key={i.id}>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm w-full',
                    selectedViewId === i.id ? 'bg-gray-100 text-gray-900' : null,
                  )}
                  onClick={() => handleClick(i.id)}
                >
                  {i.icon}
                  {i.title}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
