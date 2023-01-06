import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { HiChevronDoubleLeft } from 'react-icons/hi';
import {
  setShowExtendedBar,
  setShowSidebar,
  setSidebarWidth,
} from '../../../features/workspace/workspaceSlice';
import MainLogo from '../../../assets/branding/main-logo.png';
import NavigationItems from './components/NavigationItems';
import Places from './components/Places';
import { AvatarWithInitials } from '../../../components';
import Setting from '../../../assets/branding/setting.png';
import { useAppSelector } from '../../../app/hooks';
import { RiArrowRightSLine } from 'react-icons/ri';
import Search from '../search';
import WorkSpaceSelection from './components/WorkSpaceSelection';

export default function Sidebar() {
  const dispatch = useDispatch();
  const { showSidebar, showExtendedBar, sidebarWidth } = useAppSelector(
    (state) => state.workspace
  );
  // const fakeRef = useRef(null);
  const sidebarRef = useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  // const [sidebarWidth, setSidebarWidth] = useState(380);

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
            dispatch(
              setSidebarWidth(
                mouseMoveEvent.clientX -
                  sidebarRef?.current?.getBoundingClientRect().left
              )
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
      {/* Static sidebar for desktop */}
      <div
        className="md:fixed relative md:inset-y-0 lg:flex md:w-72 max-w-xs md:flex-col"
        ref={sidebarRef}
        style={showSidebar ? { maxWidth: sidebarWidth } : { width: '50px' }}
        onMouseDown={(e) => e.preventDefault()}
      >
        <span className="absolute -right-2 top-6 z-20 bg-white rounded-full border-2 border-inherit">
          {!showExtendedBar && (
            <RiArrowRightSLine
              className="text-xs"
              onClick={() => dispatch(setShowExtendedBar(true))}
            />
          )}
        </span>
        <div className="flex flex-col flex-grow bg-white border-r overflow-y-auto border-gray-200">
          <div className="sticky top-0 left-0 z-10 flex items-center justify-between flex-shrink-0 border-separate">
            <div className="flex items-center justify-between border-b border-gray-300 mb-1.5 w-full py-2 pl-1 pr-1.5 bg-white w-inherit h-30">
              <img className="w-10 h-11" src={MainLogo} alt="Workflow" />
              <WorkSpaceSelection />
              <div
                className={`items-center justify-between space-x-1 mt-1 ${
                  showSidebar ? 'flex' : 'hidden'
                }`}
              >
                <img className="w-auto h-6" src={Setting} alt="Workflow" />
                <AvatarWithInitials
                  initials="SS"
                  height="h-5"
                  width="w-5"
                  backgroundColour="blue"
                />
              </div>
              <HiChevronDoubleLeft
                color="blue"
                className="cursor-pointer ml-2 mt-1"
                onClick={() => dispatch(setShowSidebar(false))}
              />
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden">
            <Search />
            <NavigationItems />
            <Places />
          </div>
        </div>
        <div
          className="justify-self-end hover:ml-1 absolute shrink-0 grow-0 w-1 h-full cursor-all-scroll hover:bg-green-50 right-0 bottom-0 top-0"
          onMouseDown={startResizing}
          style={{ cursor: 'col-resize' }}
        ></div>
      </div>
    </>
  );
}
