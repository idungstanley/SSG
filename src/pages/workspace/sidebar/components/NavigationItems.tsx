import { BellIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/outline';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { classNames } from "../../../../utils";

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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          // eslint-disable-next-line max-len
          d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
        />
      </svg>
    ),
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
