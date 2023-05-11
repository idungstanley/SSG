import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CalendarIcon from '../../../assets/icons/CalendarIcon';
import WallchartIcon from '../../../assets/icons/WallchartIcon';
import { useDisapprovedDaysOff } from '../../../features/calendar/api/daysOffApi';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import { cl } from '../../../utils';
import { checkIsOwner } from '../lib/userUtils';
import { MOCKED_HUB_ID } from './DisapprovedDaysOffList';

const tabs = [
  { name: 'Wallchart', href: '/calendar', icon: <WallchartIcon className="w-5 h-5 cursor-pointer" /> },
  { name: 'NewWallchart', href: '/calendar/new', icon: <CalendarIcon className="w-5 h-5 cursor-pointer" /> },
  { name: 'Multi calendar', href: '/calendar/year', icon: <CalendarIcon className="w-5 h-5 cursor-pointer" /> },
  {
    name: 'Leave types',
    href: '/calendar/types',
    icon: <AdjustmentsHorizontalIcon className="w-5 h-5 cursor-pointer" />
  }
];

const showInputOnTabs = [tabs[0].href, tabs[1].href, tabs[2].href];

export function Tabs() {
  const { pathname } = useLocation();
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const members = data?.data.team_members ?? [];
  const { data: disapprovedDaysOff } = useDisapprovedDaysOff(MOCKED_HUB_ID);

  const isOwner = checkIsOwner(members);

  const count = disapprovedDaysOff?.filter((i) => !i.is_approved).length;

  const privateTabs = isOwner
    ? [
        {
          name: 'Manage',
          href: '/calendar/manage',
          count,
          icon: <AdjustmentsHorizontalIcon className="w-5 h-5 cursor-pointer" />
        }
      ]
    : [];

  return (
    <div className="-mb-px p-2 flex items-center justify-between w-full">
      {showInputOnTabs.includes(pathname) ? <Input /> : <div></div>}

      <nav className="flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.href}
            className={cl(
              'flex gap-3 rounded-md text-gray-900 items-center border whitespace-nowrap px-3 py-2 shadow-sm text-sm font-medium',
              tab.href === pathname ? 'border-primary-200 bg-primary-200' : 'hover:bg-gray-300'
            )}
            aria-current={tab.href === pathname ? 'page' : undefined}
          >
            {tab.icon}
            {tab.name}
          </Link>
        ))}

        {privateTabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.href}
            className={cl(
              'flex gap-3 rounded-md items-center text-gray-900 border whitespace-nowrap px-3 py-2 shadow-sm text-sm font-medium relative',
              tab.href === pathname ? 'border-primary-200 bg-primary-200' : 'hover:bg-gray-300'
            )}
            aria-current={tab.href === pathname ? 'page' : undefined}
          >
            {tab.icon}
            {tab.name}

            <span className="absolute -top-1 -right-2 w-5 text-xs h-5 flex items-center justify-center rounded-full bg-primary-500 text-white">
              {tab.count}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

function Input() {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute w-5 h-5 top-2 left-2 text-gray-400" />
      <input
        type="text"
        placeholder="Search users..."
        className="block font-medium border-gray-100 text-sm placeholder:text-gray-400 text-gray-900 border rounded-md shadow-sm pl-10 p-2"
      />
    </div>
  );
}
