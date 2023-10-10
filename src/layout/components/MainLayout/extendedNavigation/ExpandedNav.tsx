import React, { useEffect, useMemo } from 'react';
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
import CloseExtBtn from './components/extendBtn/CloseExtBtn';
import ExtendedItem from './components/extendedItem';
import InboxData from '../../../../pages/workspace/inbox/InboxData';
import Email from '../../../../pages/workspace/email';
import RoutePlanner from '../../../../pages/workspace/routePlanner';
import Commerce from '../../../../pages/workspace/commerce';
import { IoBusinessOutline } from 'react-icons/io5';
import LibraryData from '../../../../pages/directory/components/Sidebar/LibraryTabs';
import { dimensions } from '../../../../app/config/dimensions';
import { isAllowIncreaseWidth } from '../../../../utils/widthUtils';
import { useResize } from '../../../../hooks/useResize';
import { pages } from '../../../../app/constants/pages';
import AlsoHr from '../../../../pages/hr';

export interface ItemData {
  id?: string;
  icon?: JSX.Element;
  source?: string;
  name?: string;
  place?: JSX.Element;
  link?: string;
}

export const secondaryNavigation: ItemData[] = [
  {
    name: 'Email',
    id: pages.EMAIL,
    place: <Email />,
    source: emailIcon
  },
  {
    name: 'TASKS',
    id: pages.TASKS,
    place: <ActiveHub />,
    source: hubIcon
  },
  {
    name: 'In-tray',
    id: pages.IN_TRAY,
    place: <InboxData />,
    source: InboxIcon
  },
  {
    name: 'Cabinet',
    id: pages.CABINET,
    place: <Extendedbar />,
    icon: <BiCabinet className="h-4 mr-4" />
  },
  {
    name: 'forms',
    id: pages.FORMS,
    place: <Files />,
    icon: <FaWpforms className="h-4 mr-4" />
  },
  {
    name: 'time clock',
    id: pages.TIME_CLOCK,
    place: <Dashboard />,
    source: timeClockIcon
  },
  {
    name: 'tracker',
    id: pages.TRACKER,
    place: <Favourites />,
    source: trackerIcon
  },
  {
    name: 'Route Planner',
    id: pages.ROUTE_PLANNER,
    place: <RoutePlanner />,
    icon: <FaRoute className="w-4 h-4" />
  },
  {
    name: 'Also HR',
    id: pages.ALSO_HR,
    place: <AlsoHr />,
    icon: <FaHandsHelping className="w-4 h-4" />
  },
  {
    name: 'Commerce',
    id: pages.COMMERCE,
    place: <Commerce />,
    icon: <IoBusinessOutline className="w-4 h-4" />
  },
  {
    name: 'Library',
    id: pages.LIBRARY,
    place: <LibraryData />,
    source: libraryIcon,
    link: 'directory'
  },
  {
    name: 'Favorites',
    id: pages.FAVORITES,
    place: <Favourites />,
    source: favoriteIcon,
    link: 'favorite'
  }
];

const MIN_SIDEBAR_WIDTH = dimensions.extendedBar.min;
const MAX_SIDEBAR_WIDTH = dimensions.extendedBar.max;

function ExpandedNav() {
  const dispatch = useDispatch();
  const { activePlaceName, extendedSidebarWidth, sidebarWidthRD } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);

  const { blockRef, Dividers, size } = useResize({
    dimensions: {
      min: MIN_SIDEBAR_WIDTH,
      max: MAX_SIDEBAR_WIDTH
    },
    storageKey: 'extendedBarWidth',
    direction: 'XR',
    defaultSize: dimensions.extendedBar.default
  });

  useEffect(() => {
    const { isAllow, allowedSize } = isAllowIncreaseWidth(size, sidebarWidthRD);
    dispatch(setExtendedSidebarWidth(isAllow ? size : allowedSize - size));
  }, [size]);

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
      className="relative"
      ref={blockRef}
      style={{
        width: extendedSidebarWidth
      }}
    >
      <CloseExtBtn />
      <section className={`z-10 h-screen overflow-x-hidden overflow-y-auto border-r ${'border-gray-300'}`}>
        <div aria-labelledby="projects-headline">
          <ExtendedItem name={sectionToExtend?.name} source={sectionToExtend?.source} icon={sectionToExtend?.icon} />
          <div>{sectionToExtend?.place}</div>
        </div>

        <Dividers />
      </section>
    </div>
  );
}
export default ExpandedNav;
