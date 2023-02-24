import React, { memo, useEffect } from 'react';
import { setActivePlaceId } from '../../../../../features/workspace/workspaceSlice';
import Dashboard from '../../../../../pages/workspace/dashboard';
import Favorites from '../../../../../pages/workspace/favorites';
import Files from '../../../../../pages/workspace/files';
import Hubs from '../../../../../pages/workspace/hubs';
import Inbox from '../../../../../pages/workspace/inbox';
import hubIcon from '../../../../../assets/branding/hub.svg';
import { useAppSelector } from '../../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ExtendedBar from '../../../../../pages/explorer/components/Sidebar';
import PlaceItem from './PlaceItem';
import libraryIcon from '../../../../../assets/icons/library.svg';
import cabinetIcon from '../../../../../assets/icons/cabinet.svg';
import AlsoHr from '../../../../../pages/workspace/alsoHr';
import Commerce from '../../../../../pages/workspace/commerce';
import RoutePlanner from '../../../../../pages/workspace/routePlanner';
import { IoBusinessOutline } from 'react-icons/io5';
import { ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { FaHandsHelping, FaRoute } from 'react-icons/fa';
import Sidebar from '../../../../../pages/directory/components/Sidebar';
import { MdAlternateEmail } from 'react-icons/md';
import { InboxStackIcon } from '@heroicons/react/24/solid';

const places = [
  {
    name: 'Email',
    id: 1,
    place: <Favorites />,
    icon: <MdAlternateEmail />,
  },
  {
    name: 'TASK',
    id: 2,
    place: <Hubs />,
    source: hubIcon,
  },
  {
    name: 'In-tray',
    id: 3,
    place: <Inbox />,
    icon: <InboxStackIcon/>,
  },
  {
    name: 'Cabinet',
    id: 4,
    place: <ExtendedBar />,
    source: cabinetIcon,
    link: 'explorer',
  },
  {
    name: 'Library',
    id: 5,
    place: <Sidebar />,
    source: libraryIcon,
    link: 'directory',
  },
  {
    name: 'Forms',
    id: 6,
    place: <Files />,
    icon: <DocumentTextIcon className="w-fit h-fit" />,
  },
  {
    name: 'Time clock',
    id: 7,
    place: <Dashboard />,
    icon: <ClockIcon className="w-fit h-fit"/>,
  },
  {
    name: 'Route Planner',
    id: 8,
    place: <RoutePlanner />,
    icon: <FaRoute className="text-md"/>,
  },
  {
    name: 'Also HR',
    id: 9,
    place: <AlsoHr/>,
    icon: <FaHandsHelping className="w-fit h-fit"/>,
  },
  {
    name: 'Commerce',
    id: 10,
    place: <Commerce/>,
    icon: <IoBusinessOutline className="w-fit h-fit"/>,
  },
];

function Places() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { activePlaceId } = useAppSelector((state) => state.workspace);

  const handleClick = (id: number, link?: string) => {
    dispatch(setActivePlaceId(id));

    if (link) {
      navigate('/' + link);
    }
  };

  useEffect(() => {
    // go to active place from URL on mount
    const placeFromUrl = pathname.split('/')[1];

    const activePlace = places.find((i) => i.link === placeFromUrl);

    if (activePlace) {
      dispatch(setActivePlaceId(activePlace.id));
    }
  }, []);

  return (
    <ul
      aria-labelledby="projects-headline relative"
      className="border-t border-b border-gray-200 divide-y divide-gray-200"
    >
      {places.map((place) => (
        <div key={place.id}>
          {place.id === activePlaceId ? (
            place.place
          ) : (
            <PlaceItem
              icon={
                place.icon ? (
                  place.icon
                ) : (
                  <img
                    src={place.source}
                    alt={place.name + 'Icon'}
                    className="w-4 h-4"
                  />
                )
              }
              label={place.name}
              onClick={() => handleClick(place.id, place.link)}
            />
          )}
        </div>
      ))}
    </ul>
  );
}

export default memo(Places);
