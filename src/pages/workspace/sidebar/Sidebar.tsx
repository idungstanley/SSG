import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { HiChevronDoubleLeft } from 'react-icons/hi';
import { setShowSidebar } from '../../../features/workspace/workspaceSlice';
import MainLogo from '../../../assets/branding/main-logo.png';
import NavigationItems from './components/NavigationItems';
import Places from './components/Places';
import { AvatarWithInitials } from '../../../components';
import Setting from '../../../assets/branding/setting.png';
import { useAppSelector } from '../../../app/hooks';
import Search from '../search';

export default function Sidebar() {
  const dispatch = useDispatch();
  const { showSidebar } = useAppSelector((state) => state.workspace);
  const fakeRef = useRef(null);
  const sidebarRef = useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(360);
  // const rect = sidebarRef?.current?.getBoundingClientRect().left;

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (sidebarRef !== undefined) {
        if (sidebarRef.current !== undefined && sidebarRef.current !== null)
          if (isResizing) {
            setSidebarWidth(
              mouseMoveEvent.clientX -
                sidebarRef?.current?.getBoundingClientRect().left
            );
          }
      }
    },
    [isResizing]
  );
  React.useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <>
      <Transition.Root show={showSidebar} as={Fragment}>
        <Dialog
          initialFocus={fakeRef}
          as="div"
          className="relative z-40 lg:hidden"
          onClose={() => ({})}
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
              <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 pt-2 mr-12">
                    <button
                      ref={fakeRef}
                      tabIndex={0}
                      type="button"
                      className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none ring-0 focus:ring-0"
                      onClick={() => dispatch(setShowSidebar(false))}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="sticky top-0 left-0 z-10 flex items-center justify-between w-full pl-3 pr-4 bg-white w-inherit h-30">
                  <img className="w-10 h-10" src={MainLogo} alt="Workflow" />
                  <div className="flex items-center justify-between space-x-1">
                    <img className="w-auto h-6" src={Setting} alt="Workflow" />
                    <AvatarWithInitials
                      initials="SS"
                      height="h-5"
                      width="w-5"
                      backgroundColour="blue"
                    />
                    <HiChevronDoubleLeft
                      color="blue"
                      className="cursor-pointer"
                      onClick={() => dispatch(setShowSidebar(false))}
                    />
                  </div>
                </div>
                <div className="overflow-y-auto">
                  <Search />
                  <NavigationItems />
                  <Places />
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      {showSidebar ? (
        <div
          className="hidden md:fixed md:inset-y-0 lg:flex md:w-64 md:flex-col relative"
          ref={sidebarRef}
          style={{ maxWidth: sidebarWidth }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="flex flex-col flex-grow bg-white border-r overflow-y-auto border-gray-200">
            <div className="sticky top-0 left-0 z-10 flex items-center justify-between flex-shrink-0 border-separate">
              <div className="flex items-center justify-between w-full py-2 pl-3 pr-4 bg-white w-inherit h-30">
                <img className="w-10 h-10" src={MainLogo} alt="Workflow" />
                <div className="flex items-center justify-between space-x-1">
                  <img className="w-auto h-6" src={Setting} alt="Workflow" />
                  <AvatarWithInitials
                    initials="SS"
                    height="h-5"
                    width="w-5"
                    backgroundColour="blue"
                  />
                  <HiChevronDoubleLeft
                    color="blue"
                    className="cursor-pointer"
                    onClick={() => dispatch(setShowSidebar(false))}
                  />
                </div>
              </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden">
              <Search />
              <NavigationItems />
              <Places />
            </div>
            <div
              className="justify-self-end absolute shrink-0 grow-0 w-1 h-full cursor-all-scroll hover:bg-gray-300 right-0 bottom-0 top-0"
              onMouseDown={startResizing}
              style={{ cursor: 'col-resize' }}
            ></div>
          </div>
        </div>
      ) : null}
    </>
  );
}
