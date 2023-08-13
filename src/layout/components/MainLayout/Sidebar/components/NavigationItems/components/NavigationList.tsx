import React from 'react';
import { cl } from '../../../../../../../utils';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { useAppDispatch } from '../../../../../../../app/hooks';
import { setActivePlaceName } from '../../../../../../../features/workspace/workspaceSlice';
import FavoriteIcon from '../../../../../../../assets/branding/FavoriteIcon';
import HomeIcon from '../../../../../../../assets/icons/HomeIcon';
import NotificationIcon from '../../../../../../../assets/icons/NotificationIcon';
import CalendarIcon from '../../../../../../../assets/icons/CalendarIcon';
import TemplateIcon from '../../../../../../../assets/icons/TemplateIcon';
import GoalIcon from '../../../../../../../assets/icons/GoalIcon';
import DashboardIcon from '../../../../../../../assets/icons/DashboardIcon';

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
}

export default function PinnedNavigationItem({ hotkeys, activeTabId, setActiveTabId }: PinnedNavProps) {
  const dispatch = useAppDispatch();
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
            activeTabId === item.id ? 'text-primary-500 bg-primary-200' : 'text-gray-600',
            'flex items-center justify-center divide-x mr-1'
          )}
          key={item.id}
        >
          {item.icon || <img className="w-5 h-5" src={item.source} alt={item.name} />}
        </div>
      ))}
    </div>
  );
}
