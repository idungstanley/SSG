import React, { memo, useMemo, useRef, useState } from 'react';
import { FaHandsHelping, FaRoute, FaWpforms } from 'react-icons/fa';
import Dashboard from '../../../../pages/workspace/dashboard';
import Favourites from '../../../../pages/workspace/favorites';
import Files from '../../../../pages/workspace/files';
import { setExtendedSidebarWidth, setShowExtendedBar } from '../../../../features/workspace/workspaceSlice';
import libraryIcon from '../../../../assets/icons/library.svg';
import emailIcon from '../../../../assets/branding/email-icon.png';
import hubIcon from '../../../../assets/branding/hub.png';
import InboxIcon from '../../../../assets/branding/inbox.png';
import favoriteIcon from '../../../../assets/branding/favorite-icon.png';
import timeClockIcon from '../../../../assets/branding/timeclock.png';
import trackerIcon from '../../../../assets/branding/tracker-icon.png';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../app/hooks';
import ActiveHub from './ActiveParents/ActiveHub';
import Extendedbar from '../../../../pages/explorer/components/Sidebar';
import { BiCabinet } from 'react-icons/bi';
import ResizeBorder from '../../../../components/ResizeBorder';
import CloseExtBtn from './components/extendBtn/CloseExtBtn';
import ExtendedItem from './components/extendedItem';
import InboxData from '../../../../pages/workspace/inbox/InboxData';
import LibraryData from '../../../../pages/directory/components/Sidebar/LibraryData';
import Email from '../../../../pages/workspace/email';
import RoutePlanner from '../../../../pages/workspace/routePlanner';
import AlsoHr from '../../../../pages/workspace/alsoHr';
import Commerce from '../../../../pages/workspace/commerce';
import { IoBusinessOutline } from 'react-icons/io5';

interface ItemData {
  id?: number;
  icon?: JSX.Element;
  source?: string;
  name?: string;
  place?: JSX.Element;
  link?: string;
}

export const secondaryNavigation: ItemData[] = [
  {
    name: 'Email',
    id: 1,
    place: <Email />,
    source: emailIcon
  },
  {
    name: 'TASKS',
    id: 2,
    place: <ActiveHub />,
    source: hubIcon
  },
  {
    name: 'In-tray',
    id: 3,
    place: <InboxData />,
    source: InboxIcon
  },
  {
    name: 'Cabinet',
    id: 4,
    place: <Extendedbar />,
    icon: <BiCabinet className="h-4 mr-4" />
  },
  {
    name: 'forms',
    id: 5,
    place: <Files />,
    icon: <FaWpforms className="h-4 mr-4" />
  },
  {
    name: 'time clock',
    id: 6,
    place: <Dashboard />,
    source: timeClockIcon
  },
  {
    name: 'tracker',
    id: 7,
    place: <Favourites />,
    source: trackerIcon
  },
  {
    name: 'Route Planner',
    id: 8,
    place: <RoutePlanner />,
    icon: <FaRoute className="w-4 h-4" />
  },
  {
    name: 'Also HR',
    id: 9,
    place: <AlsoHr />,
    icon: <FaHandsHelping className="w-4 h-4" />
  },
  {
    name: 'Commerce',
    id: 10,
    place: <Commerce />,
    icon: <IoBusinessOutline className="w-4 h-4" />
  },
  {
    name: 'Library',
    id: 11,
    place: <LibraryData />,
    source: libraryIcon,
    link: 'directory'
  },
  {
    name: 'Favorites',
    id: 12,
    place: <Favourites />,
    source: favoriteIcon,
    link: 'favorite'
  }
];

function ExpandedNav() {
  const dispatch = useDispatch();
  const { activePlaceName, showExtendedBar, extendedSidebarWidth } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);

  const sidebarRef = useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const MIN_SIDEBAR_WIDTH = 230;
  const MAX_SIDEBAR_WIDTH = 320;
  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);
  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);
  const resize = React.useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (sidebarRef !== undefined) {
        if (sidebarRef.current !== undefined && sidebarRef.current !== null)
          if (isResizing) {
            dispatch(
              setExtendedSidebarWidth(mouseMoveEvent.clientX - sidebarRef?.current?.getBoundingClientRect().left)
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

  if (activePlaceName === null && showSidebar) {
    dispatch(setShowExtendedBar(false));
    dispatch(setExtendedSidebarWidth(240));
  }

  const sectionToExtend = useMemo(
    () => secondaryNavigation.find((section) => section.name?.toLowerCase() === activePlaceName?.toLowerCase()),
    [activePlaceName]
  );

  return (
    <div
      className="relative flex-none"
      ref={sidebarRef}
      style={
        showExtendedBar
          ? {
              maxWidth: `${MAX_SIDEBAR_WIDTH}px`,
              width: extendedSidebarWidth,
              minWidth: `${MIN_SIDEBAR_WIDTH}px`
            }
          : { width: '1px', minWidth: '1px' }
      }
    >
      <CloseExtBtn />
      <section
        className={`z-10 h-screen overflow-x-hidden overflow-y-auto border-r ${
          isResizing ? 'border-gray-500' : 'border-gray-300'
        }`}
      >
        <div aria-labelledby="projects-headline">
          <ExtendedItem item={sectionToExtend} />
          <div>{sectionToExtend?.place}</div>
        </div>
        <ResizeBorder
          width={extendedSidebarWidth}
          minWidth={MIN_SIDEBAR_WIDTH}
          maxWidth={MAX_SIDEBAR_WIDTH}
          startResizing={startResizing}
        />
      </section>
    </div>
  );
}
export default memo(ExpandedNav);
