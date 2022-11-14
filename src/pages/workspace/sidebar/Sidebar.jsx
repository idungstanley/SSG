/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { HomeIcon } from '@heroicons/react/outline';
import {
  // NotificationOutlined,
  // TrophyOutlined,
  // RocketFilled,
  PlusOutlined,
} from '@ant-design/icons';
import { ArrowDownIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { AvatarWithInitials, Search } from '../../../components';
import MainLogo from '../../../assets/branding/main-logo.png';
import { menuItems, dropDownMenus } from './sidebarData';

function Sidebar() {
  const [active, setIsActive] = useState(false);

  const handleMenuClicks = () => {
    setIsActive(!active);
  };

  return (
    <main className="w-full flex justify-start items-center">
      <section className="w-3/12 p-3 h-screen border-r-2">
        <div className="space-x-4 space-y-6 my-2 flex justify-between items-center">
          {/* <img className="h-6 w-auto" src={MainLogo} alt="Workflow" /> */}
          <img className="w-auto" src={MainLogo} alt="Workflow" />
        </div>
        <div>
          <Search placeholder="Search" />
        </div>
        {/* static menu */}
        <div id="static-menu" className="my-4 text-gray-500">
          {menuItems.map((val) => (
            <Link
              to={val.path}
              id="home"
              key={val.path}
              className="flex items-center justify-start space-x-3 pl-2 h-10 rounded hover:bg-gray-200"
              onClick={handleMenuClicks}
            >
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <p>{val.name}</p>
            </Link>
          ))}
          {/* <div
            id="notifications"
            className="flex items-center justify-start space-x-3 pl-2 h-10 rounded hover:bg-gray-200"
          >
            <NotificationOutlined
              className="flex-shrink-0 h-5 w-5"
              aria-hidden="true"
            />
            <p>Notificaton</p>
          </div>
          <div
            id="community"
            className="flex items-center justify-start space-x-3 pl-2 h-10 rounded hover:bg-gray-200"
          >
            <RocketFilled
              className="flex-shrink-0 h-5 w-5"
              aria-hidden="true"
            />
            <p>Community</p>
          </div>
          <div
            id="goals"
            className="flex items-center justify-start space-x-3 pl-2 h-10 rounded hover:bg-gray-200"
          >
            <TrophyOutlined
              className="flex-shrink-0 h-5 w-5"
              aria-hidden="true"
            />
            <p>Goals</p>
          </div> */}
        </div>
        {/* dropdown menus */}
        <div id="dropdown-menu" className="my-4 text-gray-500">
          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          {dropDownMenus.map((val) => (
            <Link
              to={val.path}
              id="favorites"
              className="flex items-center justify-between rounded h-10 pl-2 hover:bg-gray-200 "
              // onClick={() => {
                // window.location.pathname = val.path;
              // }}
            >
              <p className="font-bold text-sm">{val.name}</p>
              <ArrowDownIcon
                className="flex-shrink-0 h-3 w-5"
                aria-hidden="true"
              />
            </Link>
          ))}

          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          {/* <div
            id="hubs"
            className="flex items-center justify-between rounded h-10 pl-2 hover:bg-gray-200 "
          >
            <p className="font-bold text-sm">HUBS</p>
            <ArrowDownIcon
              className="flex-shrink-0 h-3 w-5"
              aria-hidden="true"
            />
          </div>
          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <div
            id="inbox"
            className="flex items-center justify-between rounded h-10 pl-2 hover:bg-gray-200 "
          >
            <p className="font-bold text-sm">INBOX</p>
            <ArrowDownIcon
              className="flex-shrink-0 h-3 w-5"
              aria-hidden="true"
            />
          </div>
          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <div
            id="files"
            className="flex items-center justify-between rounded h-10 pl-2 hover:bg-gray-200 "
          >
            <p className="font-bold text-sm">FILES</p>
            <ArrowDownIcon
              className="flex-shrink-0 h-3 w-5"
              aria-hidden="true"
            />
          </div>
          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <div
            id="dashboard"
            className="flex items-center justify-between rounded h-10 pl-2 hover:bg-gray-200 "
          >
            <p className="font-bold text-sm">DASHBOARD</p>
            <ArrowDownIcon
              className="flex-shrink-0 h-3 w-5"
              aria-hidden="true"
            />
          </div>
          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" /> */}
        </div>
        {/* dashboard switch and menu */}
        <div className="my-48 sticky top-[100vh] h-px bg-gray-200 border-0 dark:bg-gray-700">
          <div className="p-2 flex items-center justify-start space-x-1">
            <AvatarWithInitials initials="AU" />
            <PlusOutlined className="text-sm" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Sidebar;
