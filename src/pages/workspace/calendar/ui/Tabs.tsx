import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { cl } from '../../../../utils';

const tabs = [
  { name: 'Wallchart', href: '/calendar' },
  { name: 'Calendar', href: '/calendar/year' }
];

export function Tabs() {
  const { pathname } = useLocation();

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
    </nav>
  );
}
