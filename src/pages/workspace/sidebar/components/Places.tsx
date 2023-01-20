import React, { memo } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { setActivePlaceId } from '../../../../features/workspace/workspaceSlice';
import { FaWpforms } from 'react-icons/fa';
import Dashboard from '../../dashboard';
import Directory from '../../directory';
import Favourites from '../../favourites';
import Files from '../../files';
import Hubs from '../../hubs';
import Inbox from '../../inbox';
import emailIcon from '../../../../assets/branding/email-icon.png';
import hubIcon from '../../../../assets/branding/hub.png';
import InboxIcon from '../../../../assets/branding/inbox.png';
import filesIcon from '../../../../assets/branding/file.png';
import timeClockIcon from '../../../../assets/branding/timeclock.png';
import trackerIcon from '../../../../assets/branding/tracker-icon.png';
import { useAppSelector } from '../../../../app/hooks';
import { useDispatch } from 'react-redux';

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
    source: InboxIcon,
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
  const { activePlaceId, showSidebar, showHub } = useAppSelector(
    (state) => state.workspace
  );
  const dispatch = useDispatch();
  const handleClick = (id: number) => {
    dispatch(setActivePlaceId(id));
  };
  return (
    <div className="mt-2">
      <ul aria-labelledby="projects-headline relative">
        {secondaryNavigation.map((item) => (
          <div key={item.id}>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <li
              key={item.id}
              className={`relative flex pl-4  pr-2 items-center hover:bg-gray-100 ${
                activePlaceId === item.id && 'ml-0 bg-gray-200'
              } text-gray-600 cursor-pointer h-14 fixed top-0`}
            >
              <button
                className="flex items-center justify-between w-full "
                type="button"
                onClick={() => handleClick(item.id)}
              >
                {activePlaceId === item.id && !showHub && (
                  <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500" />
                )}
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
            {showSidebar && activePlaceId === item.id ? (
              <div className="mt-2">{item.place}</div>
            ) : null}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default memo(Places);
