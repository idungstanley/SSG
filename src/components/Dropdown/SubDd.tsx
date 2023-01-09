import React from 'react';
import { Menu } from '@headlessui/react';
import {
  CogIcon,
  DocumentDuplicateIcon,
  EyeOffIcon,
  PencilIcon,
  ShareIcon,
  SparklesIcon,
  StarIcon,
  PlusIcon,
  LinkIcon,
  DotsVerticalIcon,
  ColorSwatchIcon,
  ArrowDownIcon,
  PencilAltIcon,
} from '@heroicons/react/outline';
import { classNames } from '../../utils';

interface itemsType {
  id: number;
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
  isVisible: boolean;
}

const itemsList: itemsType[] = [
  {
    id: 1,
    title: 'Sub Hub',
    handleClick: () => ({}),
    icon: (
      <PlusIcon className="w-5 pt-2 text-gray-700 h-7" aria-hidden="true" />
    ),
    isVisible: true,
  },
  {
    id: 2,
    title: 'List',
    handleClick: () => ({}),
    icon: <PencilIcon className="w-4 h-4" aria-hidden="true" />,
    isVisible: true,
  },
  {
    id: 3,
    title: 'Wallet',
    handleClick: () => ({}),
    icon: <PencilIcon className="w-4 h-4" aria-hidden="true" />,
    isVisible: true,
  },
  {
    id: 4,
    title: 'Sprint',
    handleClick: () => ({}),
    icon: (
      <ColorSwatchIcon
        className="w-5 pt-2 text-gray-700 h-7"
        aria-hidden="true"
      />
    ),
    isVisible: false,
  },
  {
    id: 5,
    title: 'Folder',
    handleClick: () => ({}),
    icon: <LinkIcon className="w-4 h-4" aria-hidden="true" />,
    isVisible: false,
  },
  {
    id: 6,
    title: 'From Template',
    handleClick: () => ({}),
    icon: <DocumentDuplicateIcon className="w-4 h-4" aria-hidden="true" />,
    isVisible: true,
  },
  {
    id: 7,
    title: 'Import',
    handleClick: () => ({}),
    icon: <StarIcon className="w-4 h-4" aria-hidden="true" />,
    isVisible: true,
  },
];

export default function SubDd() {
  return (
    <Menu as="div" className="">
      <div className="absolute left-96  z-20 -mt-10 w-52 rounded-md shadow-lg bg-white">
        {itemsList.map((item) =>
          item.isVisible ? (
            <Menu.Item key={item.id}>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 text-left'
                  )}
                  onClick={() => item.handleClick}
                >
                  {item.icon}
                  <p>{item.title}</p>
                </div>
              )}
            </Menu.Item>
          ) : null
        )}
      </div>
    </Menu>
  );
}
