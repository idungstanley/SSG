import { memo, useEffect } from 'react';
import {
  setActivePlaceForNav,
  setActivePlaceId,
  setActivePlaceName,
  setCurrentItem
} from '../../../../../features/workspace/workspaceSlice';
import Files from '../../../../../pages/workspace/files';
import Hubs from '../../../../../pages/workspace/hubs';
import Inbox from '../../../../../pages/workspace/inbox';
import { useAppSelector } from '../../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ExtendedBar from '../../../../../pages/explorer/components/Sidebar';
import PlaceItem from './PlaceItem';
import AlsoHr from '../../../../../pages/workspace/alsoHr';
import Commerce from '../../../../../pages/workspace/commerce';
import RoutePlanner from '../../../../../pages/workspace/routePlanner';
import Email from '../../../../../pages/workspace/email';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import Tickets from '../../../../../pages/workspace/tickets';
import CrManager from '../../../../../pages/workspace/crManager';
import WorkInsights from '../../../../../pages/workspace/tracker';
import IntraysIcons from '../../../../../assets/icons/IntraysIcons';
import TaskIcon from '../../../../../assets/icons/TaskIcon';
import CabinetIcon from '../../../../../assets/icons/CabinetIcon';
import FormsIcon from '../../../../../assets/icons/FormsIcon';
import InsightsIcon from '../../../../../assets/icons/InsightsIcon';
import AlsoHrIcon from '../../../../../assets/icons/AlsoHrIcon';
import RouteIcon from '../../../../../assets/icons/RouteIcon';
import CommerceIcon from '../../../../../assets/icons/CommerceIcon';
import CrManagerIcon from '../../../../../assets/icons/CrManagerIcon';
import TicketsIcon from '../../../../../assets/icons/TicketsIcon';
import EmailIcon from '../../../../../assets/icons/EmailIcon';

interface Place {
  name: string;
  id: string;
  place: JSX.Element;
  icon?: JSX.Element;
  link?: string;
  source?: string;
}

export const initialPlaces: Place[] = [
  {
    name: 'Email',
    id: '1',
    place: <Email />,
    icon: <EmailIcon />
  },
  {
    name: 'TASKS',
    id: '2',
    place: <Hubs />,
    icon: <TaskIcon />,
    link: '/tasks'
  },
  {
    name: 'In-tray',
    id: '3',
    place: <Inbox />,
    icon: <IntraysIcons />
  },
  {
    name: 'Cabinet',
    id: '4',
    place: <ExtendedBar />,
    icon: <CabinetIcon />,
    link: '/explorer'
  },
  {
    name: 'Forms',
    id: '5',
    place: <Files />,
    icon: <FormsIcon />
  },
  {
    name: 'WORK INSIGHTS',
    id: '6',
    place: <WorkInsights />,
    icon: <InsightsIcon />
  },
  {
    name: 'ROUTEPLAN',
    id: '7',
    place: <RoutePlanner />,
    icon: <RouteIcon />
  },
  {
    name: 'Also HR',
    id: '8',
    place: <AlsoHr />,
    icon: <AlsoHrIcon />
  },
  {
    name: 'TICKETS',
    id: '9',
    place: <Tickets />,
    icon: <TicketsIcon />
  },
  {
    name: 'CR MANAGER',
    id: '10',
    place: <CrManager />,
    icon: <CrManagerIcon />,
    link: 'calendar'
  },
  {
    name: 'Commerce',
    id: '11',
    place: <Commerce />,
    icon: <CommerceIcon />
  }
];

function Places() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { activePlaceId } = useAppSelector((state) => state.workspace);
  const { showSidebar, places } = useAppSelector((state) => state.account);

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

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
    // <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e)}>
    <SortableContext strategy={rectSortingStrategy} items={places}>
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
    // </DndContext>
  );
}

export default memo(Places);
