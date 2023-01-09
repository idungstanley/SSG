import React, { memo } from 'react';
import { FaWpforms } from 'react-icons/fa';
import Dashboard from '../pages/workspace/dashboard';
import Directory from '../pages/workspace/directory';
import Favourites from '../pages/workspace/favourites';
import Files from '../pages/workspace/files';
import Inbox from '../pages/workspace/inbox';
import {
  setActivePlaceId,
  setShowExtendedBar,
} from '../features/workspace/workspaceSlice';
import emailIcon from '../assets/branding/email-icon.png';
import hubIcon from '../assets/branding/hub.png';
import inboxIcon from '../assets/branding/inbox.png';
import filesIcon from '../assets/branding/file.png';
import timeClockIcon from '../assets/branding/timeclock.png';
import trackerIcon from '../assets/branding/tracker-icon.png';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { SearchIcon } from '@heroicons/react/outline';
import { BsPlusLg } from 'react-icons/bs';
import { RiArrowLeftSLine } from 'react-icons/ri';
import ActiveHub from './ActiveHub';

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
    place: <ActiveHub />,
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

function ExpandedNav() {
  const dispatch = useDispatch();
  const { activePlaceId, showExtendedBar } = useAppSelector(
    (state) => state.workspace
  );
  return (
    <section className="mt-2 border-r border-gray w-60 pr-2">
      <div aria-labelledby="projects-headline relative overflow-y-auto ">
        {secondaryNavigation.map(
          (item) =>
            activePlaceId === item.id && (
              <div key={item.id}>
                <div className="relative flex px-4 items-center text-gray-600 cursor-pointer h-6 top-0 border-b border-gray">
                  <span className="absolute -right-5 top z-20 bg-green-400 rounded-full border-2 border-green-400">
                    {showExtendedBar && (
                      <RiArrowLeftSLine
                        className="text-sm text-white"
                        onClick={() => dispatch(setShowExtendedBar(false))}
                      />
                    )}
                  </span>
                  <button
                    className="flex items-center justify-between w-full"
                    type="button"
                    onClick={() => dispatch(setActivePlaceId(item.id))}
                  >
                    <span className="flex items-center content-center self-center">
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
                    <span className="flex flex-end space-x-2">
                      <BsPlusLg
                        className="w-2.5 h-2.5"
                        aria-hidden="true"
                        color="black"
                      />
                      <SearchIcon
                        className="w-2.5 mr-1 h-4"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </div>
                <div className="mt-2">{item.place}</div>
              </div>
            )
        )}
      </div>
    </section>
  );
}

export default memo(ExpandedNav);
