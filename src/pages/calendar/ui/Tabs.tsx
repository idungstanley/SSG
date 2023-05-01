import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import { cl } from '../../../utils';
import { useDaysOff } from '../lib/daysOffContext';
import { isOwner } from '../lib/isOwner';

const tabs = [
  { name: 'Wallchart', href: '/calendar' },
  { name: 'Calendar', href: '/calendar/year' },
  { name: 'Leave types', href: '/calendar/types' }
];

export function Tabs() {
  const { pathname } = useLocation();
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const members = data?.data.team_members ?? [];
  const { daysOff } = useDaysOff();

  const owner = isOwner(members);

  const count = daysOff.filter((i) => !i.isApproved).length;

  const privateTabs = owner ? [{ name: 'Manage', href: '/calendar/manage', count }] : [];

  return (
    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          to={tab.href}
          className={cl(
            tab.href === pathname
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
          )}
          aria-current={tab.href === pathname ? 'page' : undefined}
        >
          {tab.name}
        </Link>
      ))}

      {privateTabs.map((tab) => (
        <Link
          key={tab.name}
          to={tab.href}
          className={cl(
            tab.href === pathname
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            'relative whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
          )}
          aria-current={tab.href === pathname ? 'page' : undefined}
        >
          {tab.name}

          <span className="absolute top-1 -right-2 w-5 text-xs h-5 flex items-center justify-center rounded-full bg-primary-500 text-white">
            {tab.count}
          </span>
        </Link>
      ))}
    </nav>
  );
}
