import React, { Fragment, useRef, useState } from 'react';
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
  const { showSidebar, showExtendedBar, sidebarWidth, activePlaceId } =
    useAppSelector((state) => state.workspace);
  const sidebarRef = useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = useState(false);
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
        className="md:fixed relative md:inset-y-0 lg:flex max-w-xs md:flex-col pr-px border-r border-gray-300"
        ref={sidebarRef}
        style={
          showSidebar
            ? { maxWidth: 321, width: sidebarWidth, minWidth: '54px' }
            : { width: '54px', minWidth: '54px' }
        }
        onMouseDown={(e) => e.preventDefault()}
      >
        <span
          className={`absolute -right-2 top-6 z-20 bg-white rounded-full border-2 border-inherit ${
            activePlaceId === true || activePlaceId === 0 ? 'hidden' : 'block'
          }`}
        >
          {!showExtendedBar && (
            <RiArrowRightSLine
              className="text-xs"
              onClick={() => dispatch(setShowExtendedBar(true))}
            />
          )}
        </span>
        <div className="flex flex-col flex-grow bg-white overflow-y-auto mr-1">
          <div className="sticky top-0 left-0 z-10 flex items-center justify-between flex-shrink-0 border-separate">
            <div
              className={`flex items-center justify-between border-b border-gray-300 mb-1.5 w-full py-2 pl-1 pr-1.5 bg-white w-inherit h-30 ${
                showSidebar ? 'flex-row' : 'flex-col space-y-1'
              }`}
            >
              <img className="w-10 h-11" src={MainLogo} alt="Workflow" />
              <WorkSpaceSelection />
              <div
                className={`flex items-center mt-1 ${
                  showSidebar
                    ? 'flex-row space-x-1 justify-between'
                    : 'flex-col space-y-1 justify-center'
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
                className={`cursor-pointer mt-1 ${
                  showSidebar ? 'ml-2' : 'ml-0'
                }`}
                onClick={() => dispatch(setShowSidebar('CHANGE'))}
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
          className="justify-self-end absolute shrink-0 grow-0 w-0.5 h-full cursor-all-scroll hover:bg-green-100 right-0 bottom-0 top-0"
          onMouseDown={startResizing}
          style={{ cursor: 'col-resize' }}
        ></div>
      </div>
    </>
  );
}
