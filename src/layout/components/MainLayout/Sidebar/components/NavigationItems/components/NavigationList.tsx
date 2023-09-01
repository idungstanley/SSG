import React from 'react';
import { cl } from '../../../../../../../utils';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setActivePlaceName } from '../../../../../../../features/workspace/workspaceSlice';
import FavoriteIcon from '../../../../../../../assets/branding/FavoriteIcon';
import HomeIcon from '../../../../../../../assets/icons/HomeIcon';
import NotificationIcon from '../../../../../../../assets/icons/NotificationIcon';
import CalendarIcon from '../../../../../../../assets/icons/CalendarIcon';
import TemplateIcon from '../../../../../../../assets/icons/TemplateIcon';
import GoalIcon from '../../../../../../../assets/icons/GoalIcon';
import DashboardIcon from '../../../../../../../assets/icons/DashboardIcon';
import { GrFormClose } from 'react-icons/gr';

export const NavigationList = [
  {
    id: '1',
    name: 'Home',
    icon: <HomeIcon />,
    alwaysShow: true
  },
  {
    id: '2',
    name: 'Notifications',
    icon: <NotificationIcon />,
    alwaysShow: true
  },
  {
    id: '3',
    name: 'Calendar',
    icon: <CalendarIcon active={false} />,
    alwaysShow: false
  },
  {
    id: '4',
    name: 'Community',
    icon: <HiOutlineUserGroup className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    id: '5',
    name: 'Template Center',
    icon: <TemplateIcon />,
    alwaysShow: false
  },
  {
    id: '6',
    name: 'Goals',
    icon: <GoalIcon />,
    alwaysShow: false
  },
  {
    id: '7',
    name: 'Dashboards',
    icon: <DashboardIcon />,
    alwaysShow: false
  },
  {
    id: '8',
    name: 'Favorites',
    icon: <FavoriteIcon />,
    alwaysShow: false
  }
];

interface PinnedNavProps {
  hotkeys: (
    | {
        id: string;
        name: string;
        source: string;
        alwaysShow: boolean;
        icon?: undefined;
      }
    | {
        id: string;
        name: string;
        icon: JSX.Element;
        alwaysShow: boolean;
        source?: undefined;
      }
  )[];
  activeTabId: string | null;
  setActiveTabId: React.Dispatch<React.SetStateAction<string | null>>;
  handleHotkeyClick: (value: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export default function PinnedNavigationItem({
  hotkeys,
  activeTabId,
  setActiveTabId,
  handleHotkeyClick
}: PinnedNavProps) {
  const dispatch = useAppDispatch();
  const { notificationCount } = useAppSelector((state) => state.notification);
  const handleClick = (name: string, id: string) => {
    dispatch(setActivePlaceName(name));
    setActiveTabId(activeTabId === id ? null : id);
  };
  return (
    <div className="flex flex-row flex-wrap w-full col-span-1 gap-y-2">
      {hotkeys.map((item) => (
        <div
          onClick={() => handleClick(item.name, item.id)}
          title={item.name}
          className={cl(
            activeTabId === item.id ? 'text-primary-500' : 'text-gray-600',
            'flex items-center px-1 justify-center m-1 relative group'
          )}
          key={item.id}
        >
          {item.name === 'Notifications' && notificationCount > 0 && (
            <p
              className="absolute top-0 flex items-center justify-center w-auto h-3 px-1 text-white"
              style={{
                fontSize: '8px',
                borderRadius: '50px',
                left: notificationCount > 9 ? '5px' : '10px',
                backgroundColor: '#B30A0B'
              }}
            >
              {notificationCount}
            </p>
          )}
          {item.icon || <img className="w-5 h-5" src={item.source} alt={item.name} />}
          <span
            className="cursor-pointer group-hover:opacity-100 opacity-0 absolute -right-1.5 -top-1.5"
            onClick={(e) => handleHotkeyClick(item.id, e)}
          >
            <GrFormClose />
          </span>
        </div>
      ))}
    </div>
  );
}
