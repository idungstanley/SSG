import React, { memo, useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import {
  setActivePlaceId,
  setSearchIsActive,
  setShowModal,
} from '../../../../features/workspace/workspaceSlice';
import { FaWpforms } from 'react-icons/fa';
import Dashboard from '../../dashboard';
import Directory from '../../directory';
import Favourites from '../../favorites';
import Files from '../../files';
import Hubs from '../../hubs';
import Inbox from '../../inbox';
import emailIcon from '../../../../assets/branding/email-icon.png';
import hubIcon from '../../../../assets/branding/hub.png';
import inboxIcon from '../../../../assets/branding/inbox.png';
import filesIcon from '../../../../assets/branding/file.png';
import timeClockIcon from '../../../../assets/branding/timeclock.png';
import trackerIcon from '../../../../assets/branding/tracker-icon.png';
import { useAppSelector } from '../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { BsPlusLg } from 'react-icons/bs';
import { SearchIcon } from '@heroicons/react/outline';
import { IoMdCloseCircle } from 'react-icons/io';
import { GoSettings } from 'react-icons/go';

const secondaryNavigation = [
  {
    name: 'email',
    id: 1,
    place: <Favourites />,
    source: emailIcon,
  },
  {
    name: 'hubs',
    id: 2,
    place: <Hubs />,
    source: hubIcon,
  },
  {
    name: 'inbox',
    id: 3,
    place: <Inbox />,
    source: inboxIcon,
  },
  {
    name: 'files',
    id: 4,
    place: <Files />,
    source: filesIcon,
  },
  {
    name: 'forms',
    id: 5,
    place: <Files />,
    icon: <FaWpforms className="h-4 mr-4" />,
  },
  {
    name: 'time clock',
    id: 6,
    place: <Dashboard />,
    source: timeClockIcon,
  },
  {
    name: 'tracker',
    id: 7,
    place: <Directory />,
    source: trackerIcon,
  },
];

function Places() {
  const { activePlaceId, showSidebar, showHub, searchIsActive } =
    useAppSelector((state) => state.workspace);
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState<number>(-1);
  const handleMouseOver = (i: number) => {
    setIsHovering(i);
  };
  const handleMouseOut = () => {
    setIsHovering(-1);
  };
  const handleClick = (id: number) => {
    dispatch(setActivePlaceId(id));
  };
  return (
    <div className="mt-2">
      <ul aria-labelledby="projects-headline ">
        {secondaryNavigation.map((item, index) => (
          <div key={item.id}>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <li
              key={item.id}
              className={`relative flex pl-4  pr-2 items-center hover:bg-gray-100 ${
                activePlaceId === item.id && 'ml-0 bg-gray-200'
              } text-gray-600 cursor-pointer h-14 fixed top-0`}
              onMouseEnter={() => handleMouseOver(index)}
              onMouseLeave={handleMouseOut}
            >
              {activePlaceId === item.id && !showHub && (
                <span className="absolute rounded-r-lg top-0 bottom-0 left-0 w-1 bg-green-500" />
              )}
              <button
                className={`${
                  searchIsActive && activePlaceId === item.id
                    ? 'hidden'
                    : 'flex'
                } items-center justify-between w-full`}
                type="button"
                onClick={() => handleClick(item.id)}
              >
                <span
                  className={`flex items-center content-center self-center ${
                    showSidebar && activePlaceId === item.id && 'ml-16'
                  }`}
                >
                  {item.icon ? (
                    item.icon
                  ) : (
                    <img
                      src={item.source}
                      alt="Hub Icon"
                      className="h-4 mr-4"
                    />
                  )}
                  <span
                    className={`font-semibold leading-3 uppercase truncate tracking-wider ${
                      activePlaceId === item.id && 'text-black font-bold'
                    }`}
                    style={{ fontSize: '11px' }}
                  >
                    {item.name}
                  </span>
                </span>
              </button>
              {activePlaceId === item.id && (
                <div
                  className={`w-full ${
                    searchIsActive ? 'flex' : 'hidden'
                  } relative`}
                >
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Search for List, Hubs, & Wallets"
                    className="place w-full h-14 pl-6 border-none bg-gray-200 hover:bg-gray-100 border-transparent focus:border-transparent focus:ring-0"
                  />
                  <IoMdCloseCircle
                    className="absolute w-6 top-5 h-4 right-0 text-green-500"
                    onClick={() => dispatch(setSearchIsActive('TOGGLE'))}
                  />
                  <GoSettings
                    className="left-0 top-5 absolute w-6 h-4 text-green-500"
                    aria-hidden="true"
                  />
                </div>
              )}
              <div
                className={`${
                  searchIsActive ? 'hidden' : 'flex'
                } flex-end space-x-2`}
              >
                {activePlaceId === item.id && (
                  <span className="flex items-center space-x-1">
                    <SearchIcon
                      className="w-3 h-4"
                      aria-hidden="true"
                      onClick={() => dispatch(setSearchIsActive('TOGGLE'))}
                    />
                    {isHovering === index && (
                      <BsPlusLg
                        className="w-2.5 h-2.5"
                        aria-hidden="true"
                        color="black"
                        onClick={() => dispatch(setShowModal(true))}
                      />
                    )}
                  </span>
                )}
                {activePlaceId === item.id ? (
                  <FiChevronDown
                    className="flex-shrink-0 w-5 h-5"
                    aria-hidden="true"
                    onClick={() => handleClick(item.id)}
                  />
                ) : (
                  <FiChevronRight
                    className="flex-shrink-0 w-5 h-5"
                    aria-hidden="true"
                    onClick={() => handleClick(item.id)}
                  />
                )}
              </div>
            </li>
            {showSidebar && activePlaceId === item.id ? (
              <div>{item.place}</div>
            ) : null}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default memo(Places);
