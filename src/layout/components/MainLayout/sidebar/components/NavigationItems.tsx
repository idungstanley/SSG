import {
  ArrowDownIcon,
  ArrowUpIcon,
  BellIcon,
  Squares2X2Icon,
  CalendarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { BsCalendar2Minus } from 'react-icons/bs';
import favoriteIcon from '../../../../../assets/branding/Favourite-icon.svg';
import groupIcon from '../../../../../assets/branding/Group.png';
// import notificationIcon from '../../../../../assets/branding/notification-logo.png';
import homeIcon from '../../../../../assets/branding/Home-icon.svg';
import { classNames } from '../../../../../utils';
// import { MdOutlineDashboard } from 'react-icons/md';
// import { HiUserGroup } from 'react-icons/hi';
import { useAppSelector } from '../../../../../app/hooks';

const navigation = [
  {
    name: 'Home',
    href: '/',
    source: homeIcon,
    alwaysShow: true,
  },
  {
    name: 'Notifications',
    href: '/notification',
    icon: <BellIcon className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: true,
  },
  {
    name: 'Calendar',
    href: '/calendar',
    icon: <CalendarIcon className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: false,
  },
  {
    name: 'Community',
    href: '/community',
    icon: <UserGroupIcon className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: false,
  },
  {
    name: 'Goals',
    href: '/goals',
    source: groupIcon,
    alwaysShow: false,
  },
  {
    name: 'Dashboards',
    href: '/dashboard',
    icon: <Squares2X2Icon className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: false,
  },
  {
    name: 'Favorites',
    href: '/favorites',
    source: favoriteIcon,
    alwaysShow: false,
  },
];

const showLessOrMore = [
  {
    name: 'Show Less',
    icon: <ArrowUpIcon className="w-5 h-5" aria-hidden="true" />,
  },
  {
    name: 'Show More',
    icon: <ArrowDownIcon className="w-5 h-5" aria-hidden="true" />,
  },
];

interface NavigationItemProps {
  item: {
    name: string;
    href: string;
    alwaysShow: boolean;
    source?: string;
    icon?: JSX.Element;
  };
  isVisible: boolean;
}

function NavigationItem({ item, isVisible }: NavigationItemProps) {
  const { pathname } = useLocation();
  const { showSidebar } = useAppSelector((state) => state.account);

  if (!isVisible) {
    return null;
  }

  return (
    <Link
      to={item.href}
      className={classNames(
        pathname === item.href
          ? 'bg-green-100 hover:bg-green-200'
          : 'hover:bg-gray-100',
        !showSidebar ? 'justify-center' : 'gap-2 items-center',
        'relative flex cursor-pointer p-2 w-full hover:text-gray-500 '
      )}
    >
      {item.href === pathname ? (
        <span className="absolute rounded-r-lg top-0 bottom-0 left-0 w-1 bg-green-500 " />
      ) : null}

      {item.icon || (
        <img className="w-5 h-5" src={item.source} alt={item.name} />
      )}
      {showSidebar ? <p className="text-xs truncate">{item.name}</p> : null}
    </Link>
  );
}

export default function NavigationItems() {
  const [showMore, setShowMore] = useState(false);
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <nav className="flex flex-col mt-1">
      {navigation.map((item) => (
        <NavigationItem
          key={item.href}
          item={item}
          isVisible={item.alwaysShow || showMore}
        />
      ))}
      {/* {navigation.map((item) =>
          showMore ? (
            <Link
              key={item.name}
              to={item.href}
              className={classNames(
                item.href === pathname
                  ? 'bg-green-100 text-gray-900'
                  : 'hover:text-gray-900',
                'flex items-center pl-4 py-2 text-base relative font-medium hover:bg-gray-100'
              )}
            >
              {item.href === pathname && (
                <span className="absolute rounded-r-lg top-0 bottom-0 left-0 w-1 bg-green-500 " />
              )}
              <div className="flex items-center">
                <div
                  className={classNames(
                    item.href === pathname
                      ? 'text-gray-500'
                      : 'text-gray-400 hover:text-gray-500 hover:bg-gray-50',
                    'mr-4 flex-shrink-0 h-4 w-4 relative'
                  )}
                  aria-hidden="true"
                >
                  {item.name === 'Notifications' && (
                    <p
                      className="flex items-center justify-center px-0.5 h-3 w-min-4 absolute -right-1.5 top-0 text-white bg-red-600"
                      style={{ fontSize: '8px', borderRadius: '50px' }}
                    >
                      24
                    </p>
                  )}
                  {item.icon ? item.icon : <img src={item.source} alt="a" />}
                </div>
                <p
                  style={{ fontSize: '10px' }}
                  className={classNames(
                    item.href === pathname ? 'text-green-500' : '',
                    'tracking-wider leading-3 truncate'
                  )}
                >
                  {item.name}
                </p>
              </div>
            </Link>
          ) : item.alwaysShow ? (
            <Link
              key={item.name}
              to={item.href}
              className={classNames(
                item.href === pathname
                  ? 'bg-green-100 text-black mr-0'
                  : 'hover:text-gray-900',
                'flex items-center relative pl-4 py-2 text-base font-medium hover:bg-gray-100'
              )}
            >
              {item.href === pathname && (
                <span className="absolute rounded-r-lg top-0 bottom-0 left-0 w-1 bg-green-500 " />
              )}
              <div className="flex items-center">
                <div
                  className={classNames(
                    item.href === pathname
                      ? 'text-gray-500'
                      : 'text-gray-400 hover:text-gray-500 hover:bg-gray-50',
                    'mr-4 flex-shrink-0 h-4 w-4 relative'
                  )}
                  aria-hidden="true"
                >
                  {item.name === 'Notifications' && (
                    <p
                      className="flex items-center justify-center px-0.5 h-3 w-min-4 absolute -right-1.5 top-0 text-white bg-red-600"
                      style={{ fontSize: '8px', borderRadius: '50px' }}
                    >
                      24
                    </p>
                  )}
                  {item.icon ? item.icon : <img src={item.source} alt="a" />}
                </div>
                <p
                  style={{ fontSize: '10px' }}
                  className={classNames(
                    item.href === pathname ? 'text-green-500' : '',
                    'tracking-wider truncate leading-3'
                  )}
                >
                  {item.name}
                </p>
              </div>
            </Link>
          ) : null
        )} */}
      {/* show less or more button */}
      <div
        onClick={() => setShowMore((prev) => !prev)}
        className={classNames(
          !showSidebar ? 'justify-center' : 'gap-2 items-center',
          'flex cursor-pointer gap-2 items-center p-2 w-full hover:text-gray-500 hover:bg-gray-100'
        )}
      >
        {showLessOrMore[showMore ? 0 : 1].icon}
        {showSidebar ? (
          <p className="text-xs truncate">
            {showLessOrMore[showMore ? 0 : 1].name}
          </p>
        ) : null}
      </div>
    </nav>
  );
}
