import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { setShowSidebar } from '../../../features/workspace/workspaceSlice';
import MainLogo from '../../../assets/branding/main-logo.png';
import NavigationItems from './components/NavigationItems';
import Places from './components/Places';
import { AvatarWithInitials } from '../../../components';
import Search from '../Search';

export default function Sidebar() {
  const dispatch = useDispatch();
  const { showSidebar } = useSelector((state) => state.workspace);
  const fakeRef = useRef(null);

  return (
    <>
      <Transition.Root show={showSidebar} as={Fragment}>
        <Dialog
          initialFocus={fakeRef}
          as="div"
          className="relative z-40 lg:hidden"
          onClose={() => {}}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      ref={fakeRef}
                      tabIndex={0}
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none ring-0 focus:ring-0"
                      onClick={() => dispatch(setShowSidebar(false))}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="px-4 pb-3">
                  <img className="h-6 w-auto" src={MainLogo} alt="Workflow" />
                </div>
                <Search />
                <NavigationItems />
                <Places />
                <div className="absolute bottom-14 w-auto h-px">
                  <div className="p-2 flex items-center justify-start space-x-1">
                    <AvatarWithInitials initials="AU" />
                    <PlusOutlined className="text-sm" />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      {showSidebar ? (
        <div className="hidden md:fixed md:inset-y-0 lg:flex md:w-64 md:flex-col">
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-2">
            <div className="flex justify-between flex-shrink-0 items-center pl-2">
              <img className="h-6 w-auto" src={MainLogo} alt="Workflow" />
              <div>
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none ring-0 focus:ring-0"
                  onClick={() => dispatch(setShowSidebar(false))}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
                </button>
              </div>
            </div>
            <Search />
            <NavigationItems />
            <Places />
            <div className="absolute bottom-14 w-auto h-px">
              <div className="p-2 flex items-center justify-start space-x-1">
                <AvatarWithInitials initials="AU" />
                <PlusOutlined className="text-sm" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
