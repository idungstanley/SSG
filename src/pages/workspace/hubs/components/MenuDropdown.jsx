import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ArchiveIcon,
  CogIcon,
  DocumentDuplicateIcon,
  EyeOffIcon,
  PencilIcon,
  ShareIcon,
  SparklesIcon,
  TrashIcon,
  StarIcon,
  PlusIcon,
  LinkIcon,
  DotsVerticalIcon,
  ColorSwatchIcon,
} from '@heroicons/react/outline';
// import { useSelector } from 'react-redux';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function MenuDropdown() {
  // const { currentItemId, type } = useSelector((state) => state.workspace);

  // ! actions here (create, delete, rename)

  const itemsList = [
    {
      id: 1,
      title: 'Create new',
      onClick: () => {},
      icon: (
        <PlusIcon className="h-7 w-5 pt-2 text-gray-700" aria-hidden="true" />
      ),
      isVisible: true,
    },
    {
      id: 2,
      title: 'Rename',
      onClick: () => {},
      icon: <PencilIcon className="h-4 w-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 3,
      title: 'Color & Avatar',
      onClick: () => {},
      icon: (
        <ColorSwatchIcon
          className="h-7 w-5 pt-2 text-gray-700"
          aria-hidden="true"
        />
      ),
      isVisible: true,
    },
    {
      id: 4,
      title: 'Copy link',
      onClick: () => {},
      icon: <LinkIcon className="h-4 w-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 5,
      title: 'Duplicate',
      onClick: () => {},
      icon: <DocumentDuplicateIcon className="h-4 w-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 6,
      title: 'Add to favorites',
      onClick: () => {},
      icon: <StarIcon className="h-4 w-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 7,
      title: 'Hide in sidebar',
      onClick: () => {},
      icon: <EyeOffIcon className="h-4 w-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 8,
      title: 'Templates',
      onClick: () => {},
      icon: (
        <SparklesIcon
          className="h-6 w-5 pt-2 text-gray-700"
          aria-hidden="true"
        />
      ),
      isVisible: true,
    },
    {
      id: 9,
      title: 'More settings',
      onClick: () => {},
      icon: (
        <CogIcon className="h-6 w-5 pt-2 text-gray-700" aria-hidden="true" />
      ),
      isVisible: true,
    },
    {
      id: 10,
      title: 'Sharing & Permission',
      onClick: () => {},
      icon: <ShareIcon className="h-4 w-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 11,
      title: 'Archive',
      onClick: () => {},
      icon: <ArchiveIcon className="h-4 w-4" aria-hidden="true" />,
      isVisible: true,
    },
    {
      id: 12,
      title: 'Delete',
      onClick: () => {},
      icon: <TrashIcon className="h-4 w-4" aria-hidden="true" />,
      isVisible: true,
    },
  ];

  return (
    <Menu as="div">
      <Menu.Button className="text-gray-400 flex text-sm">
        <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute bottom-20 left-50 z-10 -mt-28 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {itemsList.map((item) => (item.isVisible ? (
            <Menu.Item key={item.id} onClick={item.onClick}>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'flex items-center space-x-2 px-4 py-2 text-sm text-red-700 text-left',
                  )}
                >
                  <TrashIcon className="h-4 w-4" aria-hidden="true" />
                  <p>{item.title}</p>
                </div>
              )}
            </Menu.Item>
          ) : null))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default MenuDropdown;
