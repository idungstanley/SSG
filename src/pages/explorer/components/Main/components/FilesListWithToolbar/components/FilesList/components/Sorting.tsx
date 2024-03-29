import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  PencilIcon,
  BarsArrowUpIcon,
  BarsArrowDownIcon,
  ClockIcon,
  PaperClipIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { IStringifiedFile } from '../index';
import { useAppSelector } from '../../../../../../../../../app/hooks';
import { setSelectedSorting } from '../../../../../../../../../features/explorer/explorerSlice';
import { cl } from '../../../../../../../../../utils';

export const sortItems = (items: IStringifiedFile[], sortType: string) =>
  items.sort((a, b) =>
    sortType === 'created_at_latest'
      ? b.created_at.localeCompare(a.created_at)
      : sortType === 'created_at_oldest'
      ? a.created_at.localeCompare(b.created_at)
      : sortType === 'modified_at_latest'
      ? b.updated_at.localeCompare(a.updated_at)
      : sortType === 'modified_at_oldest'
      ? a.updated_at.localeCompare(b.updated_at)
      : sortType === 'name_a_z'
      ? a.name.localeCompare(b.name)
      : sortType === 'name_z_a'
      ? b.name.localeCompare(a.name)
      : sortType === 'size_largest'
      ? +a.size < +b.size
        ? 1
        : -1
      : +b.size < +a.size
      ? 1
      : -1
  );

const sortingItems = [
  {
    id: 'created_at_latest',
    title: 'Created at (latest)',
    icon: <ClockIcon className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
  },
  {
    id: 'created_at_oldest',
    title: 'Created at (oldest)',
    icon: <ClockIcon className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
  },
  {
    id: 'modified_at_latest',
    title: 'Modified at (latest)',
    icon: <PencilIcon className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
  },
  {
    id: 'modified_at_oldest',
    title: 'Modified at (oldest)',
    icon: <PencilIcon className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
  },
  {
    id: 'name_a_z',
    title: 'Name (A-Z)',
    icon: <BarsArrowUpIcon className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
  },
  {
    id: 'name_z_a',
    title: 'Name (Z-A)',
    icon: <BarsArrowDownIcon className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
  },
  {
    id: 'size_largest',
    title: 'Size (largest)',
    icon: <PaperClipIcon className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
  },
  {
    id: 'size_smallest',
    title: 'Size (smallest)',
    icon: <PaperClipIcon className="mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
  }
];

export default function Sorting() {
  const dispatch = useDispatch();
  const { selectedSortingId } = useAppSelector((state) => state.explorer);

  const handleClick = (itemId: string) => {
    dispatch(setSelectedSorting(itemId));
    localStorage.setItem('selectedSortingId', JSON.stringify(itemId));
  };

  return (
    <Menu as="div" className="relative inline-block text-left whitespace-nowrap">
      <Menu.Button className="flex pt-1.5 text-gray-700 focus:outline-none ring-0 focus:ring-0">
        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute z-20 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {sortingItems.map((i) => (
            <Menu.Item key={i.id}>
              {({ active }) => (
                <button
                  type="button"
                  className={cl(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm w-full',
                    selectedSortingId === i.id ? 'bg-gray-100 text-gray-900' : ''
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
