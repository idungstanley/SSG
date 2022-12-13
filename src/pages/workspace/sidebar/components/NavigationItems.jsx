import { BellIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/outline';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  {
    name: 'Home',
    href: '/workspace',
    icon: <HomeIcon />,
    alwaysShow: true,
  },
  {
    name: 'Notifications',
    href: '/workspace/notification',
    icon: <BellIcon />,
    alwaysShow: true,
  },
  {
    name: 'Community',
    href: '/workspace/community',
    icon: <UserGroupIcon />,
    alwaysShow: false,
  },
  {
    name: 'Goals',
    href: '/workspace/community',
    icon: <UserGroupIcon />,
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavigationItems() {
  const { pathname } = useLocation();
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="mt-2 flex flex-col">
      <nav className="flex-1 space-y-1 px-2 pb-4">
        {navigation.map((item) => (showMore ? (
          <Link
            key={item.name}
            to={item.href}
            className={classNames(
              item.href === pathname
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center px-2 py-2 text-base font-medium rounded-md',
            )}
          >
            <div
              className={classNames(
                item.href === pathname
                  ? 'text-gray-500'
                  : 'text-gray-400 group-hover:text-gray-500',
                'mr-4 flex-shrink-0 h-6 w-6',
              )}
              aria-hidden="true"
            >
              {item.icon}
            </div>
            {item.name}
          </Link>
        ) : item.alwaysShow ? (
          <Link
            key={item.name}
            to={item.href}
            className={classNames(
              item.href === pathname
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center px-2 py-2 text-base font-medium rounded-md',
            )}
          >
            <div
              className={classNames(
                item.href === pathname
                  ? 'text-gray-500'
                  : 'text-gray-400 group-hover:text-gray-500',
                'mr-4 flex-shrink-0 h-6 w-6',
              )}
              aria-hidden="true"
            >
              {item.icon}
            </div>
            {item.name}
          </Link>
        ) : null))}
        <button
          type="button"
          onClick={() => setShowMore((prev) => !prev)}
          className="w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900
                      group flex items-center px-2 py-2 text-base font-medium rounded-md"
        >
          <div
            className="text-gray-400 group-hover:text-gray-500
                        mr-4 flex-shrink-0 h-6 w-6"
            aria-hidden="true"
          >
            {showLessOrMore[showMore ? 0 : 1].icon}
          </div>
          {showLessOrMore[showMore ? 0 : 1].name}
        </button>
      </nav>
    </div>
  );
}
