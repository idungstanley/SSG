import React, { memo, useEffect, useState } from 'react';
import {
  setActivePlaceForNav,
  setActivePlaceId,
  setActivePlaceName,
  setCurrentItem
} from '../../../../../features/workspace/workspaceSlice';
// import Dashboard from '../../../../../pages/workspace/dashboard';
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
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { FaHandsHelping } from 'react-icons/fa';
import { MdAlternateEmail, MdInsights, MdOutlineManageAccounts } from 'react-icons/md';
import { HiOutlineInbox } from 'react-icons/hi';
import Email from '../../../../../pages/workspace/email';
import { BsListCheck } from 'react-icons/bs';
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
import { CiRoute } from 'react-icons/ci';
import { TfiTicket } from 'react-icons/tfi';
import Tickets from '../../../../../pages/workspace/tickets';
import CrManager from '../../../../../pages/workspace/crManager';
import WorkInsights from '../../../../../pages/workspace/tracker';

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
    link: '/tasks'
  },
  {
    name: 'In-tray',
    id: '3',
    place: <Inbox />,
    icon: <HiOutlineInbox className="w-4 h-4" />
  },
  {
    name: 'Cabinet',
    id: '4',
    place: <ExtendedBar />,
    source: cabinetIcon,
    link: '/explorer'
  },
  {
    name: 'Forms',
    id: '5',
    place: <Files />,
    icon: <DocumentTextIcon className="w-4 h-4" />
  },
  {
    name: 'WORK INSIGHTS',
    id: '6',
    place: <WorkInsights />,
    icon: <MdInsights className="w-4 h-4" />
  },
  {
    name: 'ROUTEPLAN',
    id: '7',
    place: <RoutePlanner />,
    icon: <CiRoute className="w-4 h-4" />
  },
  {
    name: 'Also HR',
    id: '8',
    place: <AlsoHr />,
    icon: <FaHandsHelping className="w-4 h-4" />,
    link: '/calendar'
  },
  {
    name: 'TICKETS',
    id: '9',
    place: <Tickets />,
    icon: <TfiTicket className="w-4 h-4" />
  },
  {
    name: 'CR MANAGER',
    id: '10',
    place: <CrManager />,
    icon: <MdOutlineManageAccounts className="w-4 h-4" />,
    link: 'calendar'
  },
  {
    name: 'Commerce',
    id: '11',
    place: <Commerce />,
    icon: <IoBusinessOutline className="w-4 h-4" />
  }
];

function Places() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { activePlaceId } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const idsFromLS = JSON.parse(localStorage.getItem('placeItem') || '[]') as string[];
  const [items, setItems] = useState(places.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)));
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

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

    if (name === 'TASKS') {
      dispatch(
        setCurrentItem({
          currentItemId: null,
          currentItemType: null
        })
      );
    }
    if (link) {
      navigate(`/${currentWorkspaceId}` + link);
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
            className={`border-t border-b border-gray-200 divide-y divide-gray-200 ${
              showSidebar ? '' : 'flex flex-col items-center'
            }`}
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
