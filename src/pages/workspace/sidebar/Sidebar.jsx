/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { PlusOutlined, TrophyOutlined } from '@ant-design/icons';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { AvatarWithInitials, Search } from '../../../components';
import MainLogo from '../../../assets/branding/main-logo.png';
import { menuItems } from './sidebarData';
import Hubs from '../hubs';
import Favourites from '../favourites';
import Inbox from '../inbox';
import Files from '../files';
import Dashboard from '../dashboard';
import Directory from '../directory';

function Sidebar() {
  const [active, setIsActive] = useState(false);
  const [hubClicks, setHubClicks] = useState(false);
  const [favClicks, setFavClicks] = useState(false);
  const [inboxClicks, setInboxClicks] = useState(false);
  const [filesClicks, setFilesClicks] = useState(false);
  const [dashClicks, setDashClicks] = useState(false);
  const [dirClicks, setDirClicks] = useState(false);
  const [showMoreActive, setShowMoreIsActive] = useState(false);

  const handleMenuClicks = () => {
    setIsActive(!active);
  };

  const handleShowMoreClick = () => {
    setShowMoreIsActive(!showMoreActive);
  };

  const handleFavClicks = () => {
    setHubClicks(false);
    setInboxClicks(false);
    setFilesClicks(false);
    setDashClicks(false);
    setDirClicks(false);
    setFavClicks(!favClicks);
  };

  const handleHubClicks = () => {
    setFavClicks(false);
    setInboxClicks(false);
    setFilesClicks(false);
    setDashClicks(false);
    setDirClicks(false);
    setHubClicks(!hubClicks);
  };

  const handleInboxClicks = () => {
    setFavClicks(false);
    setHubClicks(false);
    setFilesClicks(false);
    setDashClicks(false);
    setDirClicks(false);
    setInboxClicks(!inboxClicks);
  };

  const handleFilesClicks = () => {
    setFavClicks(false);
    setHubClicks(false);
    setInboxClicks(false);
    setDashClicks(false);
    setDirClicks(false);
    setFilesClicks(!filesClicks);
  };

  const handleDashClicks = () => {
    setFavClicks(false);
    setHubClicks(false);
    setInboxClicks(false);
    setFilesClicks(false);
    setDirClicks(false);
    setDashClicks(!dashClicks);
  };

  const handleDirClicks = () => {
    setFavClicks(false);
    setHubClicks(false);
    setInboxClicks(false);
    setFilesClicks(false);
    setDashClicks(false);
    setDirClicks(!dirClicks);
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

          <section id="favorites" className="rounded flex-col   ">
            <div
              onClick={() => handleFavClicks()}
              className="flex items-stretch justify-between"
            >
              <p className="font-bold text-sm">FAVOURITE</p>
              {favClicks ? (
                <ChevronDownIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              ) : (
                <ChevronRightIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              )}
            </div>

            <div
              className={`bg-white mt-2 hover:bg-white ${
                favClicks ? 'block' : 'hidden'
              }`}
            >
              <Favourites />
            </div>
          </section>

          {/* hubs */}
          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />

          <section id="favorites" className="rounded flex-col ">
            <div
              onClick={() => handleHubClicks()}
              className="flex items-stretch justify-between"
            >
              <p className="font-bold text-sm">HUBS</p>
              {hubClicks ? (
                <ChevronDownIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              ) : (
                <ChevronRightIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              )}
            </div>

            <div
              className={`bg-white mt-2 hover:bg-white ${
                hubClicks ? 'block' : 'hidden'
              }`}
            >
              <Hubs />
            </div>
          </section>

          {/* inbox */}
          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />

          <section id="favorites" className="rounded flex-col">
            <div
              onClick={() => handleInboxClicks()}
              className="flex items-stretch justify-between"
            >
              <p className="font-bold text-sm">INBOX</p>
              {inboxClicks ? (
                <ChevronDownIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              ) : (
                <ChevronRightIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              )}
            </div>

            <div
              className={`bg-white mt-2 hover:bg-white ${
                inboxClicks ? 'block' : 'hidden'
              }`}
            >
              <Inbox />
            </div>
          </section>
          {/* files */}
          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />

          <section id="favorites" className="rounded flex-col">
            <div
              onClick={() => handleFilesClicks()}
              className="flex items-stretch justify-between"
            >
              <p className="font-bold text-sm">FILES</p>
              {filesClicks ? (
                <ChevronDownIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              ) : (
                <ChevronRightIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              )}
            </div>

            <div
              className={`bg-white mt-2 hover:bg-white ${
                filesClicks ? 'block' : 'hidden'
              }`}
            >
              <Files />
            </div>
          </section>
          {/* dashboard */}
          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />

          <section id="favorites" className="rounded flex-col">
            <div
              onClick={() => handleDashClicks()}
              className="flex items-stretch justify-between"
            >
              <p className="font-bold text-sm">DASHBOARD</p>
              {dashClicks ? (
                <ChevronDownIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              ) : (
                <ChevronRightIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              )}
            </div>

            <div
              className={`bg-white mt-2 hover:bg-white ${
                dashClicks ? 'block' : 'hidden'
              }`}
            >
              <Dashboard />
            </div>
          </section>
          {/* directory */}
          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />

          <section
            id="favorites"
            className="rounded flex-col"
          >
            <div onClick={() => handleDirClicks()} className="flex items-stretch justify-between">
              <p className="font-bold text-sm">DIRECTORY</p>
              {dirClicks ? (
                <ChevronDownIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              ) : (
                <ChevronRightIcon
                  className="flex-shrink-0 h-3 w-5"
                  aria-hidden="true"
                />
              )}
            </div>

            <div
              className={`bg-white mt-2 hover:bg-white ${
                dirClicks ? 'block' : 'hidden'
              }`}
            >
              <Directory />
            </div>
          </section>
          <hr className="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />
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
