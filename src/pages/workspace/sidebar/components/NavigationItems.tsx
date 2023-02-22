import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsCalendar2Minus } from 'react-icons/bs';
import favoriteIcon from '../../../../assets/branding/Favourite-icon.svg';
import groupIcon from '../../../../assets/branding/Group.png';
import notificationIcon from '../../../../assets/branding/notification-logo.png';
import homeIcon from '../../../../assets/branding/Home-icon.svg';
import { classNames } from '../../../../utils';
import { MdOutlineDashboard } from 'react-icons/md';
import { HiUserGroup, HiOutlineLibrary, HiTemplate } from 'react-icons/hi';

const navigation = [
  {
    name: "Home",
    href: "/workspace",
    source: homeIcon,
    alwaysShow: true,
  },
  {
    name: "Notifications",
    href: "/workspace/notification",
    source: notificationIcon,
    alwaysShow: true,
  },
  {
    name: "Calendar",
    href: "/workspace/calendar",
    icon: <BsCalendar2Minus className="text-gray-700 text-l" />,
    alwaysShow: false,
  },
  {
    name: "Community",
    href: "/workspace/community",
    icon: <HiUserGroup className="text-gray-700 text-l" />,
    alwaysShow: false,
  },
  {
    name: "Library",
    href: "/workspace/directory",
    icon: <HiOutlineLibrary className="text-gray-700 text-l" />,
    alwaysShow: false,
  },
  {
    name: "Template",
    href: "/template",
    icon: <HiTemplate className="text-gray-700 text-l" />,
    alwaysShow: false,
  },
  {
    name: "Goals",
    href: "/workspace/goals",
    source: groupIcon,
    alwaysShow: false,
  },
  {
    name: "Dashboards",
    href: "/workspace/dashboard",
    icon: <MdOutlineDashboard className="text-gray-700 text-l" />,
    alwaysShow: false,
  },
  {
    name: "Favorites",
    href: "/workspace/favorites",
    source: favoriteIcon,
    alwaysShow: false,
  },
];

const showLessOrMore = [
  {
    name: "Show Less",
    icon: <ArrowUpIcon />,
  },
  {
    name: "Show More",
    icon: <ArrowDownIcon />,
  },
];

export default function NavigationItems() {
  const { pathname } = useLocation();
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col mt-1">
      <nav className="flex-1">
        {navigation.map((item) =>
          showMore ? (
            <Link
              key={item.name}
              to={item.href}
              className={classNames(
                item.href === pathname
                  ? "bg-green-100 text-gray-900"
                  : "hover:text-gray-900",
                "flex items-center pl-4 py-2 text-base relative font-medium hover:bg-gray-100"
              )}
            >
              {item.href === pathname && (
                <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg " />
              )}
              <div className="flex items-center">
                <div
                  className={classNames(
                    item.href === pathname
                      ? "text-gray-500"
                      : "text-gray-400 hover:text-gray-500 hover:bg-gray-50",
                    "mr-4 flex-shrink-0 h-4 w-4 relative"
                  )}
                  aria-hidden="true"
                >
                  {item.name === "Notifications" && (
                    <p
                      className="flex items-center justify-center px-0.5 h-3 w-min-4 absolute -right-1.5 top-0 text-white bg-red-600"
                      style={{ fontSize: "8px", borderRadius: "50px" }}
                    >
                      24
                    </p>
                  )}
                  {item.icon ? item.icon : <img src={item.source} alt="a" />}
                </div>
                <p
                  style={{ fontSize: "10px" }}
                  className={classNames(
                    item.href === pathname ? "text-green-500" : "",
                    "tracking-wider leading-3 truncate"
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
                  ? "bg-green-100 text-black mr-0"
                  : "hover:text-gray-900",
                "flex items-center relative pl-4 py-2 text-base font-medium hover:bg-gray-100"
              )}
            >
              {item.href === pathname && (
                <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg " />
              )}
              <div className="flex items-center">
                <div
                  className={classNames(
                    item.href === pathname
                      ? "text-gray-500"
                      : "text-gray-400 hover:text-gray-500 hover:bg-gray-50",
                    "mr-4 flex-shrink-0 h-4 w-4 relative"
                  )}
                  aria-hidden="true"
                >
                  {item.name === "Notifications" && (
                    <p
                      className="flex items-center justify-center px-0.5 h-3 w-min-4 absolute -right-1.5 top-0 text-white bg-red-600"
                      style={{ fontSize: "8px", borderRadius: "50px" }}
                    >
                      24
                    </p>
                  )}
                  {item.icon ? item.icon : <img src={item.source} alt="a" />}
                </div>
                <p
                  style={{ fontSize: "10px" }}
                  className={classNames(
                    item.href === pathname ? "text-green-500" : "",
                    "tracking-wider truncate leading-3"
                  )}
                >
                  {item.name}
                </p>
              </div>
            </Link>
          ) : null
        )}
        <div
          onClick={() => setShowMore((prev) => !prev)}
          className="flex items-center w-full py-1 pl-4 text-base font-medium cursor-pointer hover:bg-gray-100 hover:text-gray-900"
        >
          <div
            className="flex-shrink-0 w-4 h-4 mr-4 hover:text-gray-900 hover:bg-gray-100"
            aria-hidden="true"
          >
            {showLessOrMore[showMore ? 0 : 1].icon}
          </div>
          <p style={{ fontSize: "10px" }} className="tracking-wider truncate">
            {showLessOrMore[showMore ? 0 : 1].name}
          </p>
        </div>
      </nav>
    </div>
  );
}
