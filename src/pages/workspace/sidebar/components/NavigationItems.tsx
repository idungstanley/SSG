import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsCalendar2Minus } from 'react-icons/bs';
import dashboardIcon from '../../../../assets/branding/dashboard-icon.png';
import favoriteIcon from '../../../../assets/branding/favorite-icon.png';
import groupIcon from '../../../../assets/branding/Group.png';
import communityIcon from '../../../../assets/branding/community-icon.png';
import notificationIcon from '../../../../assets/branding/notification-logo.png';
import homeIcon from '../../../../assets/branding/home-icon.png';
import { classNames } from '../../../../utils';

const navigation = [
  {
    name: 'Home',
    href: '/workspace',
    source: homeIcon,
    alwaysShow: true,
  },
  {
    name: 'Notifications',
    href: '/workspace/notification',
    source: notificationIcon,
    alwaysShow: true,
  },
  {
    name: 'Calendar',
    href: '/workspace/calendar',
    icon: <BsCalendar2Minus color="rgba(75, 75, 75, 0.64)" />,
    alwaysShow: false,
  },
  {
    name: 'Community',
    href: '/workspace/community',
    source: communityIcon,
    alwaysShow: false,
  },
  {
    name: 'Goals',
    href: '/workspace/goals',
    source: groupIcon,
    alwaysShow: false,
  },
  {
    name: 'Dashboards',
    href: '/workspace/dashboard',
    source: dashboardIcon,
    alwaysShow: false,
  },
  {
    name: 'Favorites',
    href: '/workspace/favorite',
    source: favoriteIcon,
    alwaysShow: false,
  },
];

const showLessOrMore = [
  {
    name: 'Show Less',
    icon: <ArrowUpIcon />,
  },
  {
    name: 'Show More',
    icon: <ArrowDownIcon />,
  },
];

export default function NavigationItems() {
  const { pathname } = useLocation();
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col mt-2">
      <nav className="flex-1">
        {navigation.map((item) =>
          showMore ? (
            <Link
              key={item.name}
              to={item.href}
              className={classNames(
                item.href === pathname
                  ? 'bg-green-50 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900',
                'flex items-center pl-4 py-1 text-base relative font-medium hover:bg-green-50'
              )}
            >
              {item.href === pathname && (
                <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 " />
              )}
              <div className="flex items-center">
                <div
                  className={classNames(
                    item.href === pathname
                      ? 'text-gray-500'
                      : 'text-gray-400 hover:text-gray-500 hover:bg-gray-50',
                    'mr-4 flex-shrink-0 h-4 w-4'
                  )}
                  aria-hidden="true"
                >
                  {item.icon ? item.icon : <img src={item.source} alt="a" />}
                </div>
                <p style={{ fontSize: '10px' }} className="tracking-wider">
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
                  ? 'bg-green-50 text-gray-900 mr-0'
                  : 'text-gray-600 hover:text-gray-900',
                'flex items-center relative pl-4 py-1 text-base font-medium hover:bg-green-50'
              )}
            >
              {item.href === pathname && (
                <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 " />
              )}
              <div className="flex items-center">
                <div
                  className={classNames(
                    item.href === pathname
                      ? 'text-gray-500'
                      : 'text-gray-400 hover:text-gray-500 hover:bg-gray-50',
                    'mr-4 flex-shrink-0 h-4 w-4'
                  )}
                  aria-hidden="true"
                >
                  {item.icon ? item.icon : <img src={item.source} alt="a" />}
                </div>
                <p style={{ fontSize: '10px' }} className="tracking-wider">
                  {item.name}
                </p>
              </div>
            </Link>
          ) : null
        )}
        <button
          type="button"
          onClick={() => setShowMore((prev) => !prev)}
          className="flex items-center w-full px-2 py-2 ml-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
        >
          <div
            className="flex-shrink-0 w-4 h-4 mr-4 text-gray-400 hover:text-gray-500"
            aria-hidden="true"
          >
            {showLessOrMore[showMore ? 0 : 1].icon}
          </div>
          <p style={{ fontSize: '10px' }} className="tracking-wider">
            {showLessOrMore[showMore ? 0 : 1].name}
          </p>
        </button>
      </nav>
    </div>
  );
}
