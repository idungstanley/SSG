/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { PlusOutlined, TrophyOutlined } from '@ant-design/icons';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { AvatarWithInitials, Search } from '../../../components';
import MainLogo from '../../../assets/branding/main-logo.png';
import { menuItems, dropDownMenus } from './sidebarData';

function Sidebar() {
  const [active, setIsActive] = useState(false);
  const [showMoreActive, setShowMoreIsActive] = useState(false);

  const handleMenuClicks = () => {
    setIsActive(!active);
  };

  const handleShowMoreClick = () => {
    setShowMoreIsActive(!showMoreActive);
  };

  return (
    <main className="w-full relative flex justify-start items-center">
      <section className="w-full p-3 h-screen border-r-2">
        <div className="space-x-4 space-y-6 my-2 flex justify-between items-center">
          <img className="h-6 w-auto" src={MainLogo} alt="Workflow" />
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
              <span className="flex-shrink-0 h-7 w-5" aria-hidden="true">
                {val.icon}
              </span>
              <p>{val.name}</p>
            </Link>
          ))}
          <div
            className={`flex items-center justify-start space-x-3 pl-2 h-10 rounded hover:bg-gray-200 ${
              showMoreActive ? 'block' : 'hidden'
            }`}
          >
            <span className="flex-shrink-0 h-7 w-5" aria-hidden="true">
              <TrophyOutlined />
            </span>
            <p>Goals</p>
          </div>
          <div
            className="flex items-center justify-start space-x-3 pl-2 h-10 rounded hover:bg-gray-200"
            onClick={handleShowMoreClick}
          >
            <span className="flex-shrink-0 h-5 w-5" aria-hidden="true">
              {showMoreActive ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </span>
            {showMoreActive ? <p>Show Less</p> : <p>Show More</p>}
          </div>
        </div>
        {/* dropdown menus */}
        <div id="dropdown-menu" className="my-4 text-gray-500">
          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          {dropDownMenus.map((val) => (
            <>
              <Link
                to={val.path}
                id="favorites"
                className="flex items-center justify-between rounded h-10 pl-2 hover:bg-gray-200 "
              >
                <p className="font-bold text-sm">{val.name}</p>
                <ArrowDownIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              </Link>
              <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />
            </>
          ))}
        </div>
        {/* dashboard switch and menu */}
        <div className="absolute bottom-14 w-auto left-5 h-px">
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
