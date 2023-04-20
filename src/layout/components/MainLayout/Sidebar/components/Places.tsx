import React, { memo, useEffect, useState } from 'react';
import {
  setActivePlaceForNav,
  setActivePlaceId,
  setActivePlaceName,
  setCurrentItem
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
import Tracker from '../../../../../pages/workspace/tracker';
import { SiPivotaltracker } from 'react-icons/si';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

export const places = [
  {
    name: 'Email',
    id: '1',
    place: <Email />,
    icon: <MdAlternateEmail className="w-4 h-4" />
  },
  {
    name: 'TASKS',
    id: '2',
    place: <Hubs />,
    icon: <BsListCheck className="w-4 h-4" />,
    link: 'hub'
  },
  {
    name: 'In-tray',
    id: '3',
    place: <Inbox />,
    icon: <InboxStackIcon className="w-4 h-4" />
  },
  {
    name: 'Cabinet',
    id: '4',
    place: <ExtendedBar />,
    source: cabinetIcon,
    link: 'explorer'
  },
  {
    name: 'Forms',
    id: '5',
    place: <Files />,
    icon: <DocumentTextIcon className="w-4 h-4" />
  },
  {
    name: 'Time clock',
    id: '6',
    place: <Dashboard />,
    icon: <ClockIcon className="w-4 h-4" />
  },
  {
    name: 'TRACKER',
    id: '7',
    place: <Tracker />,
    icon: <SiPivotaltracker className="w-4 h-4" />
  },
  {
    name: 'ROUTEPLAN',
    id: '8',
    place: <RoutePlanner />,
    icon: <FaRoute className="w-4 h-4" />
  },
  {
    name: 'Also HR',
    id: '9',
    place: <AlsoHr />,
    icon: <FaHandsHelping className="w-4 h-4" />
  },
  {
    name: 'Commerce',
    id: '10',
    place: <Commerce />,
    icon: <IoBusinessOutline className="w-4 h-4" />
  }
];

function Places() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { activePlaceId } = useAppSelector((state) => state.workspace);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const idsFromLS = JSON.parse(localStorage.getItem('placeItem') || '[]') as string[];
  const [items, setItems] = useState(places.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)));

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.id !== over?.id) {
      const findActive = items.find((i) => i.id === active.id);
      const findOver = items.find((i) => i.id === over?.id);

      if (findActive && findOver) {
        setItems((items) => {
          const oldIndex = items.indexOf(findActive);
          const newIndex = items.indexOf(findOver);

          const sortArray = arrayMove(items, oldIndex, newIndex);

          localStorage.setItem('placeItem', JSON.stringify([...sortArray.map((i) => i.id)]));

          return sortArray;
        });
      }
    }
  };

  const handleClick = (id: string, name: string | null, link?: string) => {
    localStorage.setItem('activePlaceIdLocale', JSON.stringify(id));
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
      if (name === 'TASKS') {
        dispatch(
          setCurrentItem({
            currentItemId: null,
            currentItemType: null
          })
        );
      }
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
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e)}>
      <SortableContext strategy={rectSortingStrategy} items={items}>
        <section>
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
                    id={place.id}
                    icon={
                      place.icon ? place.icon : <img src={place.source} alt={place.name + 'Icon'} className="w-4 h-4" />
                    }
                    label={place.name}
                    onClick={() => handleClick(place.id, place.name, place.link)}
                  />
                )}
              </div>
            ))}
          </ul>
        </section>
      </SortableContext>
    </DndContext>
  );
}

export default memo(Places);
