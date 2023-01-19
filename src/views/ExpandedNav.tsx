import React, { memo, useRef, useState } from 'react';
import { FaWpforms } from 'react-icons/fa';
import Dashboard from '../pages/workspace/dashboard';
import Directory from '../pages/workspace/directory';
import Favourites from '../pages/workspace/favorites';
import Files from '../pages/workspace/files';
import Inbox from '../pages/workspace/inbox';
import {
  setActivePlaceId,
  setExtendedSidebarWidth,
  setIsExtSearchActive,
  setShowExtendedBar,
  setShowModal,
} from '../features/workspace/workspaceSlice';
import emailIcon from '../assets/branding/email-icon.png';
import hubIcon from '../assets/branding/hub.png';
import inboxIcon from '../assets/branding/inbox.png';
import filesIcon from '../assets/branding/file.png';
import timeClockIcon from '../assets/branding/timeclock.png';
import trackerIcon from '../assets/branding/tracker-icon.png';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { SearchIcon } from '@heroicons/react/outline';
import { BsPlusLg } from 'react-icons/bs';
import { RiArrowLeftSLine } from 'react-icons/ri';
import ActiveHub from './ActiveParents/ActiveHub';
import { IoMdCloseCircle } from 'react-icons/io';
import Extendedbar from '../pages/newExplorer/components/Sidebar';

const secondaryNavigation = [
  {
    name: 'email',
    id: 1,
    place: <Favourites />,
    source: emailIcon,
  },
  {
    name: 'hubs',
    id: 2,
    place: <ActiveHub />,
    source: hubIcon,
  },
  {
    name: 'intrail',
    id: 3,
    place: <Inbox />,
    source: inboxIcon,
  },
  {
    name: 'Cabinet',
    id: 4,
    place: <Extendedbar />,
    source: filesIcon,
  },
  {
    name: 'forms',
    id: 5,
    place: <Files />,
    icon: <FaWpforms className="h-4 mr-4" />,
  },
  {
    name: 'time clock',
    id: 6,
    place: <Dashboard />,
    source: timeClockIcon,
  },
  {
    name: 'tracker',
    id: 7,
    place: <Directory />,
    source: trackerIcon,
  },
];

function ExpandedNav() {
  const dispatch = useDispatch();
  const {
    activePlaceId,
    showExtendedBar,
    extendedSidebarWidth,
    isExtSearchActive,
  } = useAppSelector((state) => state.workspace);
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
              setExtendedSidebarWidth(
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
  if (extendedSidebarWidth < 140 || activePlaceId === (0 || true)) {
    dispatch(setShowExtendedBar(false));
    dispatch(setExtendedSidebarWidth(240));
  }
  return (
    <div
      className="relative flex-none"
      ref={sidebarRef}
      style={
        showExtendedBar
          ? { maxWidth: 321, width: extendedSidebarWidth, minWidth: '100px' }
          : { width: '1px', minWidth: '1px' }
      }
      // onMouseDown={(e) => e.preventDefault()}
    >
      <span className="absolute -right-2 cursor-pointer top-2 z-20 bg-green-400 rounded-full border-2 border-green-400">
        {showExtendedBar && (
          <RiArrowLeftSLine
            className="text-sm text-white"
            onClick={() => dispatch(setShowExtendedBar(false))}
          />
        )}
      </span>
      <section className="border-r h-screen border-gray overflow-y-auto overflow-x-hidden">
        <div aria-labelledby="projects-headline">
          {secondaryNavigation.map(
            (item) =>
              activePlaceId === item.id && (
                <div key={item.id} className="">
                  <div className="relative flex p-2 items-center text-gray-600 cursor-pointer h-8 top-0 border-b border-gray">
                    <button
                      className={`${
                        isExtSearchActive ? 'hidden' : 'flex'
                      } items-center justify-between w-full`}
                      type="button"
                      onClick={() => dispatch(setActivePlaceId(item.id))}
                    >
                      <span className="flex items-center content-center self-center">
                        {item.icon ? (
                          item.icon
                        ) : (
                          <img
                            src={item.source}
                            alt="Hub Icon"
                            className="h-4 mr-4"
                          />
                        )}
                        <span
                          className={` font-semibold leading-3 uppercase truncate tracking-wider ${
                            activePlaceId === item.id && 'text-black font-bold'
                          }`}
                          style={{ fontSize: '11px' }}
                        >
                          {item.name}
                        </span>
                      </span>
                      <span className="flex flex-end space-x-2 mr-1">
                        <BsPlusLg
                          className="w-2.5 h-2.5"
                          aria-hidden="true"
                          color="black"
                          onClick={() => dispatch(setShowModal(true))}
                        />
                        <SearchIcon
                          className="w-2.5 h-2.5 mr-1 h-4"
                          aria-hidden="true"
                          onClick={() =>
                            dispatch(setIsExtSearchActive('TOGGLE'))
                          }
                        />
                      </span>
                    </button>
                    {activePlaceId === item.id && (
                      <div
                        className={`w-full ${
                          isExtSearchActive ? 'flex' : 'hidden'
                        } relative`}
                      >
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Filter List, Hubs, & Wallets"
                          className="w-full h-14 pl-5 border-none bg-gray-200 hover:bg-gray-100 border-transparent focus:border-transparent focus:ring-0"
                        />
                        <IoMdCloseCircle
                          className="absolute w-6 top-5 h-4 right-0 text-green-500"
                          onClick={() =>
                            dispatch(setIsExtSearchActive('TOGGLE'))
                          }
                        />
                        <SearchIcon
                          className="left-0 top-5  absolute w-6 h-4 text-green-500"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                  <div>{item.place}</div>
                </div>
              )
          )}
        </div>
        <div
          className="justify-self-end absolute shrink-0 grow-0 h-full cursor-all-scroll hover:bg-green-100 right-0 bottom-0 top-0"
          onMouseDown={startResizing}
          style={{ cursor: 'col-resize', width: '3px' }}
        ></div>
      </section>
    </div>
  );
}
export default memo(ExpandedNav);
