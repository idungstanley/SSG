import React, { memo, useEffect } from 'react';
import {
  setActivePlaceForNav,
  setActivePlaceId,
  setActivePlaceName
} from '../../../../../features/workspace/workspaceSlice';
import Dashboard from '../../../../../pages/workspace/dashboard';
import Files from '../../../../../pages/workspace/files';
import Hubs from '../../../../../pages/workspace/hubs';
import Inbox from '../../../../../pages/workspace/inbox';
import { useAppSelector } from '../../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ExtendedBar from '../../../../../pages/explorer/components/Sidebar';
import PlaceItem from './PlaceItem';
import cabinetIcon from '../../../../../assets/icons/cabinet.svg';
import AlsoHr from '../../../../../pages/workspace/alsoHr';
import Commerce from '../../../../../pages/workspace/commerce';
import RoutePlanner from '../../../../../pages/workspace/routePlanner';
import { IoBusinessOutline } from 'react-icons/io5';
import { ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { FaHandsHelping, FaRoute } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { InboxStackIcon } from '@heroicons/react/24/solid';
import Email from '../../../../../pages/workspace/email';
import { BsListCheck } from 'react-icons/bs';

export const places = [
  {
    name: 'Email',
    id: 1,
    place: <Email />,
    icon: <MdAlternateEmail className="w-4 h-4" />
  },
  {
    name: 'TASKS',
    id: 2,
    place: <Hubs />,
    icon: <BsListCheck className="w-4 h-4" />
  },
  {
    name: 'In-tray',
    id: 3,
    place: <Inbox />,
    icon: <InboxStackIcon className="w-4 h-4" />
  },
  {
    name: 'Cabinet',
    id: 4,
    place: <ExtendedBar />,
    source: cabinetIcon,
    link: 'explorer'
  },
  {
    name: 'Forms',
    id: 6,
    place: <Files />,
    icon: <DocumentTextIcon className="w-4 h-4" />
  },
  {
    name: 'Time clock',
    id: 7,
    place: <Dashboard />,
    icon: <ClockIcon className="w-4 h-4" />
  },
  {
    name: 'Route Planner',
    id: 8,
    place: <RoutePlanner />,
    icon: <FaRoute className="w-4 h-4" />
  },
  {
    name: 'Also HR',
    id: 9,
    place: <AlsoHr />,
    icon: <FaHandsHelping className="w-4 h-4" />
  },
  {
    name: 'Commerce',
    id: 10,
    place: <Commerce />,
    icon: <IoBusinessOutline className="w-4 h-4" />
  }
];

function Places() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { activePlaceId } = useAppSelector((state) => state.workspace);

  const handleClick = (id: number, name: string | null, link?: string) => {
    dispatch(setActivePlaceId(id));
    dispatch(setActivePlaceName(name));
    dispatch(
      setActivePlaceForNav({
        activePlaceNameForNavigation: name,
        activePlaceIdForNavigation: id
      })
    );

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
              icon={place.icon ? place.icon : <img src={place.source} alt={place.name + 'Icon'} className="w-4 h-4" />}
              label={place.name}
              onClick={() => handleClick(place.id, place.name, place.link)}
            />
          )}
        </div>
      ))}
    </ul>
  );
}

export default memo(Places);
