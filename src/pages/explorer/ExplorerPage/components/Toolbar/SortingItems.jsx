import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  PhotographIcon,
  ViewGridIcon,
  ViewListIcon,
  ChevronDownIcon,
  SwitchHorizontalIcon,
  PencilIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  ClockIcon,
} from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSorting } from '../../../../../features/explorer/explorerSlice';

const sortingItems = [
  {
    id: 1,
    title: 'Created at (latest)',
    icon: (
      <ClockIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 2,
    title: 'Created at (oldest)',
    icon: (
      <ClockIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 3,
    title: 'Modified at (latest)',
    icon: (
      <PencilIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 4,
    title: 'Modified at (oldest)',
    icon: (
      <PencilIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 5,
    title: 'Name (A-Z)',
    icon: (
      <SortAscendingIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
    ),
  },
  {
    id: 6,
    title: 'Name (Z-A)',
    icon: (
      <SortDescendingIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
    ),
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sorting() {
  const dispatch = useDispatch();
  const { selectedSorting } = useSelector((state) => state.explorer);

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none ring-0 focus:ring-0">
            <SwitchHorizontalIcon
              className="mr-2.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            {selectedSorting.title}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
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
          <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            {sortingItems.map((i) => (
              <Menu.Item key={i.id}>
                {({ active }) => (
                  <button
                    type="button"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm w-full',
                      selectedSorting === i.id
                        ? 'bg-gray-100 text-gray-900'
                        : null,
                    )}
                    onClick={() => dispatch(setSelectedSorting({ id: i.id, title: i.title }))}
                  >
                    {i.icon}
                    {i.title}
                  </button>
                )}
              </Menu.Item>
            ))}
            {/* <div className="py-1">
            </div> */}
          </Menu.Items>
        </Transition>
      </Menu>

      <Menu as="div" className="hidden relative text-left">
        {/* inline-block */}
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            <ViewListIcon
              className="mr-2.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            List
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
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
          <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="tempurl"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm',
                    )}
                  >
                    <ViewListIcon
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    List
                  </a>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="tempurl"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm',
                    )}
                  >
                    <ViewGridIcon
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    Thumbnails
                  </a>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="tempurl"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm',
                    )}
                  >
                    <PhotographIcon
                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    Gallery
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
