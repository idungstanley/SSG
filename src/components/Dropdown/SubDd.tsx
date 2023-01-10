import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
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

export default function SubDd() {
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
      title: 'Wallet',
      handleClick: () => ({}),
      icon: <PencilIcon className="w-4 h-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 3,
      title: 'List',
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
  return (
    <Menu as="div" className="">
      {({ open }) => (
        <Fragment>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            show={true}
          >
            <div className="absolute left-96 z-20 -mt-12 w-52 rounded-md shadow-lg bottom-60 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
          </Transition>
        </Fragment>
      )}
    </Menu>
  );
}
