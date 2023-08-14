import React, { useEffect, useMemo, useState } from 'react';
import favoriteIcon from '../../../../../../assets/branding/Favourite-icon.svg';
import homeIcon from '../../../../../../assets/icons/Home.svg';
import { cl } from '../../../../../../utils';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import NavigationItem from './components/NavigationItem';
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
import { useNavigate } from 'react-router-dom';
import NotificationIcon from '../../../../../../assets/icons/NotificationIcon';
import CalendarIcon from '../../../../../../assets/icons/CalendarIcon';
import TemplateIcon from '../../../../../../assets/icons/TemplateIcon';
import GoalIcon from '../../../../../../assets/icons/GoalIcon';
import DashboardIcon from '../../../../../../assets/icons/DashboardIcon';
import { AvatarWithInitials } from '../../../../../../components';
import ArrowDownwardIcon from '../../../../../../assets/icons/ArrowDownwardIcon';
import ArrowUpwardIcon from '../../../../../../assets/icons/ArrowUpwardIcon';
import { setShowMore } from '../../../../../../features/workspace/workspaceSlice';

const showLessOrMore = [
  {
    name: 'Show Less',
    icon: <ArrowUpwardIcon />
  },
  {
    name: 'Show More',
    icon: <ArrowDownwardIcon />
  }
];

interface NavigationProps {
  handleHotkeyClick: (value: string, e: React.MouseEvent<SVGElement, MouseEvent>) => void;
  activeHotkeyIds: string[];
  activeTabId: string | null;
  setActiveTabId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function NavigationItems({
  handleHotkeyClick,
  activeHotkeyIds,
  activeTabId,
  setActiveTabId
}: NavigationProps) {
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { workspaceData, showMore } = useAppSelector((state) => state.workspace);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const workspaceName = workspaceData?.data?.workspace.name;
  const workspaceColor = workspaceData?.data?.workspace.color as string;
  const handleToggleMore = () => {
    dispatch(setShowMore(!showMore));
  };

  const navigation = [
    {
      id: '1',
      name: 'Home',
      href: '/',
      source: homeIcon,
      alwaysShow: true
    },
    {
      id: '2',
      name: 'Notifications',
      href: `/${currentWorkspaceId}/notification`,
      icon: <NotificationIcon />,
      alwaysShow: true
    },
    {
      id: '3',
      name: 'Calendar',
      href: `/${currentWorkspaceId}/calendar`,
      icon: <CalendarIcon active />,
      alwaysShow: false
    },
    {
      id: '4',
      name: 'Community',
      href: `/${currentWorkspaceId}/community`,
      icon: (
        <AvatarWithInitials
          initials={
            workspaceName
              ?.split(' ')
              .slice(0, 2)
              .map((word) => word[0])
              .join('')
              .toUpperCase() as string
          }
          height="h-5"
          width="w-5"
          backgroundColour={workspaceColor}
          roundedStyle="rounded"
          textColor="white"
        />
      ),
      alwaysShow: false
    },
    {
      id: '5',
      name: 'Template Center',
      href: `/${currentWorkspaceId}/directory`,
      icon: <TemplateIcon />,
      alwaysShow: false
    },
    {
      id: '6',
      name: 'Goals',
      href: `/${currentWorkspaceId}/goals`,
      icon: <GoalIcon />,
      alwaysShow: false
    },
    {
      id: '7',
      name: 'Dashboards',
      href: `/${currentWorkspaceId}/dashboard`,
      icon: <DashboardIcon />,
      alwaysShow: false
    },
    {
      id: '8',
      name: 'Favorites',
      href: `${currentWorkspaceId}/favorites`,
      source: favoriteIcon,
      alwaysShow: false
    }
  ];

  const hotkeys = useMemo(
    () => navigation.filter((i) => !activeHotkeyIds.includes(i.id)),
    [activeHotkeyIds, navigation]
  );
  useEffect(() => {
    const activePinnedNav = navigation.find((i) => i.id === activeTabId);
    if (activePinnedNav !== undefined) {
      navigate(activePinnedNav.href);
    }
  }, [activeTabId]);

  const { showSidebar } = useAppSelector((state) => state.account);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const idsFromLS = JSON.parse(localStorage.getItem('navItem') || '[]') as string[];
  const [items, setItems] = useState(
    (showSidebar ? hotkeys : navigation).sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id))
  );
  const displayNavItems = showMore ? navigation : navigation.slice(0, 3);
  const displayPinnedItems = showMore ? hotkeys : hotkeys.slice(0, 3);

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

          localStorage.setItem('navItem', JSON.stringify([...sortArray.map((i) => i.id)]));

          return sortArray;
        });
      }
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e)}>
      <SortableContext strategy={rectSortingStrategy} items={items}>
        <section>
          <nav className="flex flex-col mt-1 items.center">
            {(showSidebar ? displayPinnedItems : displayNavItems).map((item) => (
              <NavigationItem
                handleHotkeyClick={handleHotkeyClick}
                key={item.name}
                item={item}
                // isVisible={pinnedNav.length > 1 && showSidebar ? true : item.alwaysShow || showMore}
                activeTabId={activeTabId}
                setActiveTabId={setActiveTabId}
              />
            ))}

            {/* show less or more button */}
            {/* {(pinnedNav.length < 2 || !showSidebar) && ( */}
            <div
              onClick={handleToggleMore}
              className={cl(
                !showSidebar ? 'justify-center pl-5' : 'gap-2 items-center pl-7',
                'flex cursor-pointer gap-2 items-center p-2 w-full hover:text-gray-500 hover:bg-gray-100'
              )}
              style={{ height: '30px', fontWeight: '600' }}
            >
              {showLessOrMore[showMore ? 0 : 1].icon}
              {showSidebar ? <p className="ml-4 text-xs truncate">{showLessOrMore[showMore ? 0 : 1].name}</p> : null}
            </div>
            {/* )} */}
          </nav>
        </section>
      </SortableContext>
    </DndContext>
  );
}
