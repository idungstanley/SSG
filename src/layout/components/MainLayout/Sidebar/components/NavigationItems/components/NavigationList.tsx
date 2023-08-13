import React from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { VscCalendar } from 'react-icons/vsc';
import { cl } from '../../../../../../../utils';
import { HiOutlineLibrary, HiOutlineUserGroup } from 'react-icons/hi';
import { CgTemplate } from 'react-icons/cg';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import groupIcon from '../../../../../../../assets/branding/Group.png';
import homeIcon from '../../../../../../../assets/icons/Home.svg';
import { useAppDispatch } from '../../../../../../../app/hooks';
import { setActivePlaceName } from '../../../../../../../features/workspace/workspaceSlice';
import FavoriteIcon from '../../../../../../../assets/branding/FavoriteIcon';
import HomeIcon from '../../../../../../../assets/icons/HomeIcon';

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
    icon: <IoNotificationsOutline className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: true
  },
  {
    id: '3',
    name: 'Calendar',
    icon: <VscCalendar className="w-5 h-5" aria-hidden="true" />,
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
    name: 'Library',
    icon: <HiOutlineLibrary className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    id: '6',
    name: 'Template',
    icon: <CgTemplate className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    id: '7',
    name: 'Goals',
    source: groupIcon,
    alwaysShow: false
  },
  {
    id: '8',
    name: 'Dashboards',
    icon: <Squares2X2Icon className="w-5 h-5" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    id: '9',
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
