import { ArrowDownIcon, ArrowUpIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import favoriteIcon from '../../../../../../assets/branding/Favourite-icon.svg';
import groupIcon from '../../../../../../assets/branding/Group.png';
import homeIcon from '../../../../../../assets/icons/Home.svg';
import { cl } from '../../../../../../utils';
import { useAppSelector } from '../../../../../../app/hooks';
import NavigationItem from './components/NavigationItem';
import { HiOutlineLibrary, HiOutlineUserGroup } from 'react-icons/hi';
import { CgTemplate } from 'react-icons/cg';
import { IoNotificationsOutline } from 'react-icons/io5';
import { VscCalendar } from 'react-icons/vsc';

const navigation = [
  {
    name: 'Home',
    href: '/',
    source: homeIcon,
    alwaysShow: true
  },
  {
    name: 'Notifications',
    href: '/notification',
    icon: <IoNotificationsOutline className="w-4 h4" aria-hidden="true" />,
    alwaysShow: true
  },
  {
    name: 'Calendar',
    href: '/calendar',
    icon: <VscCalendar className="w-4 h4" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    name: 'Community',
    href: '/community',
    icon: <HiOutlineUserGroup className="w-4 h4" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    name: 'Library',
    href: '/directory',
    icon: <HiOutlineLibrary className="w-4 h4" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    name: 'Template',
    href: '/template',
    icon: <CgTemplate className="w-4 h4" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    name: 'Goals',
    href: '/goals',
    source: groupIcon,
    alwaysShow: false
  },
  {
    name: 'Dashboards',
    href: '/dashboard',
    icon: <Squares2X2Icon className="w-4 h4" aria-hidden="true" />,
    alwaysShow: false
  },
  {
    name: 'Favorites',
    href: '/favorites',
    source: favoriteIcon,
    alwaysShow: false
  }
];

const showLessOrMore = [
  {
    name: 'Show Less',
    icon: <ArrowUpIcon className="w-4 h4" aria-hidden="true" />
  },
  {
    name: 'Show More',
    icon: <ArrowDownIcon className="w-4 h4" aria-hidden="true" />
  }
];

export default function NavigationItems() {
  const [showMore, setShowMore] = useState(false);
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <nav className="flex flex-col mt-1">
      {navigation.map((item) => (
        <NavigationItem key={item.name} item={item} isVisible={item.alwaysShow || showMore} />
      ))}

      {/* show less or more button */}
      <div
        onClick={() => setShowMore((prev) => !prev)}
        className={cl(
          !showSidebar ? 'justify-center' : 'gap-2 items-center',
          'flex cursor-pointer gap-2 items-center pl-4 p-2 w-full hover:text-gray-500 hover:bg-gray-100'
        )}
      >
        {showLessOrMore[showMore ? 0 : 1].icon}
        {showSidebar ? <p className="ml-3 text-xs truncate">{showLessOrMore[showMore ? 0 : 1].name}</p> : null}
      </div>
    </nav>
  );
}
