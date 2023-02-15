import React, { memo, useEffect } from 'react';
import hubIcon from '../../../../../assets/branding/hub.png';
import { FaWpforms } from 'react-icons/fa';
import emailIcon from '../../../../../assets/branding/email-icon.png';
import InboxIcon from '../../../../../assets/branding/inbox.png';
import timeClockIcon from '../../../../../assets/branding/timeclock.png';
// import trackerIcon from '../../../../assets/branding/tracker-icon.png';
import routePlanner from '../../../../../assets/branding/gis_route.png';
import alsoHRIcon from '../../../../../assets/branding/alsohr-icon.png';
// import formsIcon from '../../../../assets/branding/forms-icon.png';
import commerceIcon from '../../../../../assets/branding/commerce.png';
import libraryIcon from '../../../../../assets/icons/library.svg';
import cabinetIcon from '../../../../../assets/icons/cabinet.svg';
import Favorites from '../../../../../pages/workspace/favorites';
import Hubs from '../../../../../pages/workspace/hubs';
import Inbox from '../../../../../pages/workspace/inbox';
import ExtendedBar from '../../../../../pages/explorer/components/Sidebar';
import Files from '../../../../../pages/workspace/files';
import Dashboard from '../../../../../pages/workspace/dashboard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../app/hooks';
import { setActivePlaceId } from '../../../../../features/workspace/workspaceSlice';
import PlaceItem from './PlaceItem';
import Sidebar from '../../../../../pages/directory/components/Sidebar';

const places = [
  {
    name: 'Email',
    id: 1,
    place: <Favorites />,
    source: emailIcon,
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
    source: InboxIcon,
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
    icon: <FaWpforms className="h-4" />,
  },
  {
    name: 'Time clock',
    id: 7,
    place: <Dashboard />,
    source: timeClockIcon,
  },
  {
    name: 'Route Planner',
    id: 8,
    place: <> </>,
    source: routePlanner,
  },
  {
    name: 'Also HR',
    id: 9,
    place: <> </>,
    source: alsoHRIcon,
  },
  {
    name: 'Commerce',
    id: 10,
    place: <> </>,
    source: commerceIcon,
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
    // ? go to active place from URL on mount
    const placeFromUrl = pathname.split('/')[1];

    const activePlace = places.find((i) => i.link === placeFromUrl);

    if (activePlace) {
      dispatch(setActivePlaceId(activePlace.id));
    }
  }, []);

  return (
    <ul
      aria-labelledby="projects-headline relative"
      className="divide-y divide-gray-200 border-t border-b border-gray-200"
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
                    className="h-4 w-4"
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
