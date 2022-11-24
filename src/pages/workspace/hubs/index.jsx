/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  BgColorsOutlined,
  EllipsisOutlined, FolderAddOutlined, ImportOutlined, LinkOutlined, PlusOutlined, StarOutlined, WalletOutlined,
} from '@ant-design/icons';
import { Menu, Transition } from '@headlessui/react';
import {
  ArchiveIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CogIcon,
  DocumentAddIcon,
  DocumentDuplicateIcon,
  EyeOffIcon,
  PencilAltIcon,
  PencilIcon,
  ShareIcon,
  SparklesIcon,
  TemplateIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import React, { useState, Fragment } from 'react';
// import { FolderAddIcon } from '@heroicons/react/solid';
import { AvatarWithInitials, Hyperlink } from '../../../components';
import Modal from './components/Modal';
import ListModal from '../Lists/components/ListModal';
import WalletModal from '../wallet/components/WalletModal';

function Hubs() {
  const [showModal, setShowModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [showHubList, setShowHubList] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <>
      <div
        id="createHubs"
        className="flex items-center justify-center bg-gray-100 space-x-2 rounded-xl w-full"
        onClick={() => setShowModal(true)}
      >
        <PlusOutlined />
        <p>New Hub</p>
      </div>
      <Modal
        isVisible={showModal}
        onCloseHubModal={() => setShowModal(false)}
      />
      <ListModal
        listVisible={showListModal}
        onCloseListModal={() => setShowListModal(false)}
      />
      <WalletModal
        walletVisible={showWalletModal}
        onCloseWalletModal={() => setShowWalletModal(false)}
      />
      {/* show hublist */}
      <section id="hubList">
        <div className="flex justify-between items-center hover:bg-gray-100 p-1 rounded mt-1 mb-1">
          <div
            id="hubListLeft"
            className="flex items-center space-x-1 justify-start text-sm mt-1"
          >
            <div onClick={() => setShowHubList(!showHubList)}>
              {showHubList ? (
                <ChevronRightIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              )}
            </div>
            <AvatarWithInitials initials="hn" height="h-6" width="w-6" />
            <h4 className="text-sm font-bold">HubName</h4>
          </div>
          <div
            id="hubListRight"
            className="space-x-1 flex items-center justify-end"
          >
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
                        <DocumentDuplicateIcon
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
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
            {/* new */}
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className=" text-gray-400 mt-4 flex text-sm">
                  <PlusOutlined className="h-6 w-6" aria-hidden="true" />
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
                <Menu.Items className="origin-top-right absolute right-0 left-9 z-10 -mt-3 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'px-4 py-2 text-sm text-gray-700 text-left flex items-center space-x-2',
                        )}
                        onClick={() => setShowListModal(true)}
                      >
                        <FolderAddOutlined
                          className="h-7 w-5 pt-2 text-gray-700"
                          aria-hidden="true"
                        />
                        <p>List</p>
                      </div>
                    )}
                  </Menu.Item>
                  <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/workspace/docs"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                        )}
                      >
                        <DocumentAddIcon
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                        <p>Doc</p>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/workspace/docs"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                        )}
                      >
                        <PencilAltIcon className="h-4 w-4" aria-hidden="true" />
                        <p>Whiteboard</p>
                      </Link>
                    )}
                  </Menu.Item>
                  <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => setShowWalletModal(true)}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                        )}
                      >
                        <WalletOutlined
                          className="h-7 w-5 pt-2 text-gray-700"
                          aria-hidden="true"
                        />
                        <p>Wallet</p>
                      </div>
                    )}
                  </Menu.Item>
                  <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                        )}
                      >
                        <TemplateIcon className="h-4 w-4" aria-hidden="true" />
                        <p>From template</p>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 text-left',
                        )}
                      >
                        <ImportOutlined
                          className="h-7 w-5 pt-2 text-gray-700"
                          aria-hidden="true"
                        />
                        <p>Import</p>
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div
          id="createWallet"
          className={`${showHubList ? 'block' : 'hidden'}`}
        >
          <p className="text-sm pl-7">
            Create a
            {' '}
            <span className="underline text-gray-600">
              <Hyperlink label="Wallet" href="/" />
            </span>
            ,
            {' '}
            <span className="underline text-gray-600">
              <Hyperlink label="List" href="/" />
            </span>
            {' '}
          </p>
        </div>
      </section>
    </>
  );
}

export default Hubs;
