// import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import React, { useState, memo } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { FaWpforms } from 'react-icons/fa';
import Dashboard from '../../dashboard';
import Directory from '../../directory';
import Favourites from '../../favourites';
import Files from '../../files';
import Hubs from '../../hubs';
import Inbox from '../../inbox';
import emailIcon from '../../../../assets/branding/email-icon.png';
import hubIcon from '../../../../assets/branding/hub.png';
import inboxIcon from '../../../../assets/branding/inbox.png';
import filesIcon from '../../../../assets/branding/file.png';
import timeClockIcon from '../../../../assets/branding/timeclock.png';
import trackerIcon from '../../../../assets/branding/tracker-icon.png';

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
    id: 4,
    place: <Files />,
    icon: <FaWpforms className="h-4 mr-4" />,
  },
  {
    name: 'time clock',
    id: 5,
    place: <Dashboard />,
    source: timeClockIcon,
  },
  {
    name: 'tracker',
    id: 6,
    place: <Directory />,
    source: trackerIcon,
  },
];

function Places() {
  const [activePlaceId, setActivePlaceId] = useState<number | boolean>(0);
    // const handleActive = (id: number) => {
    //   setActivePlaceId((prev) => {
    //     if (prev === id) {
    //       return prev;
    //     } else {
    //       return id;
    //     }
    //   });
    // };

  return (
    <div className="mt-2">
      <ul aria-labelledby="projects-headline relative">
        {secondaryNavigation.map((item) => (
          <>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <li
              key={item.id}
              className={`relative flex px-4 items-center hover:bg-gray-100 ${
                activePlaceId === item.id && 'ml-0 bg-gray-200'
              } text-gray-600 cursor-pointer h-14 fixed top-0`}
            >
              <button
                className="flex items-center justify-between w-full "
                type="button"
                onClick={() =>
                  setActivePlaceId((prev) => prev === item.id || item.id)
                }
              >
                {activePlaceId === item.id && (
                  <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500" />
                )}
                <span
                  className={`flex items-center content-center self-center ${
                    activePlaceId === item.id && 'ml-16'
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
                    className={` font-semibold leading-3 uppercase truncate tracking-wider ${
                      activePlaceId === item.id && 'text-black font-bold'
                    }`}
                    style={{ fontSize: '11px' }}
                  >
                    {item.name}
                  </span>
                </span>
                {activePlaceId === item.id ? (
                  <FiChevronDown
                    className="flex-shrink-0 w-5 h-5"
                    aria-hidden="true"
                  />
                ) : (
                  <FiChevronRight
                    className="flex-shrink-0 w-5 h-5"
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
            {activePlaceId === item.id ? (
              <div className="mt-2">{item.place}</div>
            ) : null}
          </>
        ))}
      </ul>
    </div>
  );
}

export default memo(Places);
