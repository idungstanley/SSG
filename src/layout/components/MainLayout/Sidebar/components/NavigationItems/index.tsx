import React, { useEffect, useMemo, useState } from 'react';
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
import { AvatarWithInitials, Button, Input } from '../../../../../../components';
import ArrowDownwardIcon from '../../../../../../assets/icons/ArrowDownwardIcon';
import ArrowUpwardIcon from '../../../../../../assets/icons/ArrowUpwardIcon';
import { setShowMore } from '../../../../../../features/workspace/workspaceSlice';
import { getInitials } from '../../../../../../app/helpers';
import FavoriteIcon from '../../../../../../assets/branding/FavoriteIcon';
import HomeIcon from '../../../../../../assets/icons/HomeIcon';
import ThreeDotIcon from '../../../../../../assets/icons/ThreeDotIcon';
import AlsoitMenuDropdown from '../../../../../../components/DropDowns';

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
  handleHotkeyClick: (value: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { showSidebar } = useAppSelector((state) => state.account);
  const { workspaceData, showMore } = useAppSelector((state) => state.workspace);

  const [countOfItemToShow, setCountOfItemToShow] = useState<number>(3);
  const [showDropdown, setShowDropdown] = useState<null | HTMLSpanElement | HTMLDivElement>(null);

  const workspaceName = workspaceData?.data?.workspace.name;
  const workspaceColor = workspaceData?.data?.workspace.color as string;

  const idsFromLS = JSON.parse(localStorage.getItem('navItem') || '[]') as string[];

  const handleToggleMore = () => {
    dispatch(setShowMore(!showMore));
  };

  const navigation = [
    {
      id: '1',
      name: 'Home',
      href: '/',
      icon: <HomeIcon />,
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
      icon: <CalendarIcon active={false} />,
      alwaysShow: false
    },
    {
      id: '4',
      name: 'Community',
      href: `/${currentWorkspaceId}/community`,
      icon: (
        <AvatarWithInitials
          initials={getInitials(workspaceName ?? '')}
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
      href: `/${currentWorkspaceId}/favorites`,
      icon: <FavoriteIcon />,
      alwaysShow: false
    }
  ];

  const hotkeys = useMemo(
    () => navigation.filter((i) => !activeHotkeyIds.includes(i.id)),
    [activeHotkeyIds, navigation]
  );

  const [items, setItems] = useState(
    (showSidebar ? hotkeys : navigation).sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id))
  );

  useEffect(() => {
    const activePinnedNav = navigation.find((i) => i.id === activeTabId);
    if (activePinnedNav !== undefined) {
      navigate(activePinnedNav.href);
    }
  }, [activeTabId]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  let showMoreCount = (JSON.parse(localStorage.getItem('showmoreCount') || '""') as number) || 3;
  const displayNavItems = showMore ? navigation : navigation.slice(0, showMoreCount);
  const displayPinnedItems = showMore ? hotkeys : hotkeys.slice(0, showMoreCount);

  const handleOpenDropdown = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    setShowDropdown(event.currentTarget);
  };

  const handleSaveToLS = () => {
    localStorage.setItem('showmoreCount', JSON.stringify(countOfItemToShow));
    showMoreCount = countOfItemToShow;
    setShowDropdown(null);
  };

  const handleCloseDropdown = () => {
    setShowDropdown(null);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value != '' && e.target.value != '0') {
      setCountOfItemToShow(Number(e.target.value));
    }
  };

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
                activeTabId={activeTabId}
                setActiveTabId={setActiveTabId}
              />
            ))}

            {/* show less or more button */}
            <div
              onClick={handleToggleMore}
              className={cl(
                !showSidebar ? 'justify-center pl-5' : 'gap-2 items-center pl-7 justify-between',
                'flex cursor-pointer gap-2 items-center  p-2 w-full hover:text-gray-500 hover:bg-gray-100 mb-4'
              )}
              style={{ height: '30px', fontWeight: '600' }}
            >
              <span className="flex items-center gap-2">
                {showLessOrMore[showMore ? 0 : 1].icon}
                {showSidebar ? <p className="ml-4 text-xs truncate">{showLessOrMore[showMore ? 0 : 1].name}</p> : null}
              </span>
              {showSidebar && (
                <span onClick={(e) => handleOpenDropdown(e)}>
                  <ThreeDotIcon />
                </span>
              )}
            </div>
            {/* )} */}
          </nav>
          <AlsoitMenuDropdown handleClose={handleCloseDropdown} anchorEl={showDropdown}>
            <div className="flex flex-col w-40 gap-2 p-2">
              <p>How many items would you like to show when showing less?</p>
              <Input type="number" onChange={handleOnChange} name="show more count" />
              <Button label="Save" buttonStyle="base" height="h-6" onClick={handleSaveToLS} />
            </div>
          </AlsoitMenuDropdown>
        </section>
      </SortableContext>
    </DndContext>
  );
}
