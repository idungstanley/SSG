import React, { memo, useEffect } from 'react';
import { setActivePlaceId } from '../../../../features/workspace/workspaceSlice';
import Dashboard from '../../dashboard';
import Favorites from '../../favorites';
import Files from '../../files';
import Hubs from '../../hubs';
import Inbox from '../../inbox';
import hubIcon from '../../../../assets/branding/hub.png';
import { useAppSelector } from '../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ExtendedBar from '../../../newExplorer/components/Sidebar';
import PlaceItem from './PlaceItem';
import Directory from '../../../directory/components/Sidebar';
import { FaWpforms } from 'react-icons/fa';
import emailIcon from '../../../../assets/branding/email-icon.png';
import InboxIcon from '../../../../assets/branding/inbox.png';
import timeClockIcon from '../../../../assets/branding/timeclock.png';
// import trackerIcon from '../../../../assets/branding/tracker-icon.png';
import routePlanner from '../../../../assets/branding/gis_route.png';
import alsoHRIcon from '../../../../assets/branding/alsohr-icon.png';
// import formsIcon from '../../../../assets/branding/forms-icon.png';
import commerceIcon from '../../../../assets/branding/commerce.png';
import libraryIcon from '../../../../assets/icons/library.svg';
import cabinetIcon from '../../../../assets/icons/cabinet.svg';

const places = [
  {
    name: 'Email',
    id: 1,
    place: <Favorites />,
    source: emailIcon,
  },
  {
    name: 'Hubs',
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
    link: 'new-explorer',
  },
  {
    name: 'Library',
    id: 5,
    place: <Directory />,
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
