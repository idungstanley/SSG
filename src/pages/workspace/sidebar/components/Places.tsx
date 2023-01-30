import React, { memo, useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import {
  setActivePlaceId,
  setSearchIsActive,
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
import InboxIcon from '../../../../assets/branding/inbox.png';
import filesIcon from '../../../../assets/branding/file.png';
import timeClockIcon from '../../../../assets/branding/timeclock.png';
import trackerIcon from '../../../../assets/branding/tracker-icon.png';
import routePlanner from '../../../../assets/branding/gis_route.png';
import alsoHRIcon from '../../../../assets/branding/alsohr-icon.png';
import formsIcon from '../../../../assets/branding/forms-icon.png';
import commerceIcon from '../../../../assets/branding/commerce.png';
import { useAppSelector } from '../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { BsPlusLg } from 'react-icons/bs';
import {
  FolderPlusIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { IoMdCloseCircle } from 'react-icons/io';
import { GoSettings } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import Extendedbar from '../../../newExplorer/components/Sidebar';
// import { setQuery } from '../../../../features/explorer/explorerSlice';
import Dropdown from '../../../../components/Dropdown/index';
import {
  setCreateInboxSlideOverVisibility,
  setItemActionForSideOver,
} from '../../../../features/general/slideOver/slideOverSlice';
import { setCreateHubSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';
import { BiCabinet } from 'react-icons/bi';

function Places() {
  const { activePlaceId, showSidebar, searchIsActive } = useAppSelector(
    (state) => state.workspace
  );
  const { folderId } = useParams();
  // const { query } = useAppSelector((state) => state.explorer);
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

  const configForDropdown = [
    {
      label: 'Folder',
      icon: <FolderPlusIcon className="w-5 h-5" aria-hidden="true" />,
      onClick: () =>
        dispatch(
          setItemActionForSideOver({
            action: 'create',
            id: folderId || '',
          })
        ),
    },
  ];

  const secondaryNavigation = [
    {
      name: 'email',
      id: 1,
      place: <Favourites />,
      source: emailIcon,
      plusIcon: (
        <BsPlusLg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          color="black"
          onClick={() => console.log('stan')}
        />
      ),
    },
    {
      name: 'hubs',
      id: 2,
      place: <Hubs />,
      source: hubIcon,
      plusIcon: (
        <BsPlusLg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          color="black"
          onClick={() => dispatch(setCreateHubSlideOverVisibility(true))}
        />
      ),
    },
    {
      name: 'in-tray',
      id: 3,
      place: <Inbox />,
      source: InboxIcon,
      plusIcon: (
        <BsPlusLg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          color="black"
          onClick={() => dispatch(setCreateInboxSlideOverVisibility(true))}
        />
      ),
    },
    {
      name: 'Cabinet',
      id: 4,
      place: <Extendedbar />,
      icon: <BiCabinet className="h-5 mr-4 text-lg" />,
      plusIcon: <Dropdown config={configForDropdown} iconType="plus" />,
    },
    {
      name: 'forms',
      id: 5,
      place: <Files />,
      icon: <FaWpforms className="h-4 mr-4" />,
      plusIcon: (
        <BsPlusLg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          color="black"
          onClick={() => console.log('stan')}
        />
      ),
    },
    {
      name: 'time clock',
      id: 6,
      place: <Dashboard />,
      source: timeClockIcon,
      plusIcon: (
        <BsPlusLg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          color="black"
          onClick={() => console.log('stan')}
        />
      ),
    },
    {
      name: 'tracker',
      id: 7,
      place: <Directory />,
      source: trackerIcon,
      plusIcon: (
        <BsPlusLg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          color="black"
          onClick={() => console.log('stan')}
        />
      ),
    },
    {
      name: 'Route Planner',
      id: 8,
      place: <Directory />,
      source: routePlanner,
      plusIcon: (
        <BsPlusLg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          color="black"
          onClick={() => console.log('stan')}
        />
      ),
    },
    {
      name: 'Also HR',
      id: 9,
      place: <Directory />,
      source: alsoHRIcon,
      plusIcon: (
        <BsPlusLg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          color="black"
          onClick={() => console.log('stan')}
        />
      ),
    },
    {
      name: 'Commerce',
      id: 10,
      place: <Directory />,
      source: commerceIcon,
      plusIcon: (
        <BsPlusLg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          color="black"
          onClick={() => console.log('stan')}
        />
      ),
    },
    {
      name: 'Forms',
      id: 11,
      place: <Directory />,
      source: formsIcon,
      plusIcon: (
        <BsPlusLg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          color="black"
          onClick={() => console.log('stan')}
        />
      ),
    },
  ];

  return (
    <div className="mt-2">
      <ul aria-labelledby="projects-headline relative">
        {secondaryNavigation.map((item, index) => (
          <div key={item.id}>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <li
              key={item.id}
              className={`flex pl-4 z-20 pr-2 items-center hover:bg-gray-100 ${
                activePlaceId === item.id && 'ml-0 bg-gray-200 sticky top-0'
              } text-gray-600 cursor-pointer h-14 relative top-0`}
              onMouseEnter={() => handleMouseOver(index)}
              onMouseLeave={handleMouseOut}
            >
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
                    className={`font-semibold ${
                      showSidebar ? 'block' : 'hidden'
                    } leading-3 uppercase truncate tracking-wider ${
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
                    placeholder="Search for List, Hubs, & Wallets"
                    // onChange={(e) => dispatch(setQuery(e.target.value))}
                    // value={query}
                    className="w-full pl-6 bg-gray-200 border-transparent border-none place h-14 hover:bg-gray-100 focus:border-transparent focus:ring-0"
                  />
                  <IoMdCloseCircle
                    className="absolute right-0 w-6 h-4 text-green-500 top-5"
                    onClick={() => dispatch(setSearchIsActive('TOGGLE'))}
                  />
                  <GoSettings
                    className="absolute left-0 w-6 h-4 text-green-500 top-5"
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
                  <span
                    className={`${
                      showSidebar ? 'block' : 'hidden'
                    } flex items-center space-x-1`}
                  >
                    <MagnifyingGlassIcon
                      className="w-3 h-4"
                      aria-hidden="true"
                      onClick={() => dispatch(setSearchIsActive('TOGGLE'))}
                    />
                    {isHovering === index && item.plusIcon}
                  </span>
                )}
                <span className={`${showSidebar ? 'block' : 'hidden'}`}>
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
                </span>
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
