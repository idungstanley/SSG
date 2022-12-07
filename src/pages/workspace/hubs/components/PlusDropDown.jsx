/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  FolderAddOutlined,
  ImportOutlined,
  PlusOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import {
  DocumentAddIcon,
  PencilAltIcon,
  TemplateIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import WalletModal from '../../wallet/components/WalletModal';
import ListModal from '../../Lists/components/ListModal';

function PlusDropDown() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <>
      <WalletModal
        walletVisible={showWalletModal}
        onCloseWalletModal={() => setShowWalletModal(false)}
      />
      <ListModal
        listVisible={showListModal}
        onCloseListModal={() => setShowListModal(false)}
      />

      <Menu as="div" className="">
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
          <Menu.Items className="origin-top-right absolute left-50 bottom-20 z-10 -mt-3 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                  <DocumentAddIcon className="h-4 w-4" aria-hidden="true" />
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
    </>
  );
}

export default PlusDropDown;
