/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  BgColorsOutlined,
  EllipsisOutlined,
  LinkOutlined,
  PlusOutlined,
  StarOutlined,
} from '@ant-design/icons';
import {
  ArchiveIcon,
  ChevronRightIcon,
  CogIcon,
  DocumentDuplicateIcon,
  EyeOffIcon,
  PencilIcon,
  ShareIcon,
  SparklesIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

function MenuDropdown() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className=" text-gray-400 mt-4 flex text-sm">
          <EllipsisOutlined className="h-6 w-6" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute right-0 left-2 z-10 -mt-28 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'flex items-center justify-between space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                )}
              >
                <div className="flex items-center space-x-1">
                  <PlusOutlined
                    className="h-7 w-5 pt-2 text-gray-700"
                    aria-hidden="true"
                  />
                  <p>Create new</p>
                </div>
                <ChevronRightIcon
                  className="h-5 w-5 pt-2 text-gray-700"
                  aria-hidden="true"
                />
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                )}
              >
                <PencilIcon className="h-4 w-4" aria-hidden="true" />
                <p>Rename</p>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'flex items-center justify-between space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                )}
              >
                <div className="flex items-center space-x-1">
                  <BgColorsOutlined
                    className="h-7 w-5 pt-2 text-gray-700"
                    aria-hidden="true"
                  />
                  <p>Color & Avatar</p>
                </div>
                <ChevronRightIcon
                  className="h-5 w-5 pt-2 text-gray-700"
                  aria-hidden="true"
                />
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                )}
              >
                <LinkOutlined className="h-4 w-4" aria-hidden="true" />
                <p>Copy link</p>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                )}
              >
                <DocumentDuplicateIcon className="h-4 w-4" aria-hidden="true" />
                <p>Duplicate</p>
              </Link>
            )}
          </Menu.Item>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                )}
              >
                <StarOutlined className="h-4 w-4" aria-hidden="true" />
                <p>Add to favorites</p>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                )}
              >
                <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                <p>Hide in my sidebar</p>
              </Link>
            )}
          </Menu.Item>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'flex items-center justify-between space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                )}
              >
                <div className="flex items-center space-x-1">
                  <SparklesIcon
                    className="h-6 w-5 pt-2 text-gray-700"
                    aria-hidden="true"
                  />
                  <p>Templates</p>
                </div>
                <ChevronRightIcon
                  className="h-5 w-5 pt-2 text-gray-700"
                  aria-hidden="true"
                />
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'flex items-center justify-between space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                )}
              >
                <div className="flex items-center space-x-1">
                  <CogIcon
                    className="h-6 w-5 pt-2 text-gray-700"
                    aria-hidden="true"
                  />
                  <p>More settings</p>
                </div>
                <ChevronRightIcon
                  className="h-5 w-5 pt-2 text-gray-700"
                  aria-hidden="true"
                />
              </Link>
            )}
          </Menu.Item>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                )}
              >
                <ShareIcon className="h-4 w-4" aria-hidden="true" />
                <p>Sharing & Permission</p>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                )}
              >
                <ArchiveIcon className="h-4 w-4" aria-hidden="true" />
                <p>Archive</p>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'flex items-center space-x-2 px-4 py-2 text-sm text-red-700 text-left',
                )}
              >
                <TrashIcon className="h-4 w-4" aria-hidden="true" />
                <p>Delete</p>
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default MenuDropdown;
