import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cl } from '../../../../../utils';

const tabs = [
  { name: 'Active', href: '/inbox' },
  { name: 'Archive', href: '/inbox/archived' },
  { name: 'Hidden', href: '/inbox/hidden' }
];

const rightTabs = [{ name: 'Deleted', href: '/inbox/restore' }];

export default function Tabs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const navigateTo = tabs.find((i) => i.name === e.target.value);

    if (navigateTo) {
      navigate(navigateTo.href);
    }
  };

  return (
    <div className="m-5">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs[0].name}
          onChange={(e) => handleChange(e)}
        >
          {[...tabs, ...rightTabs].map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={cl(
                  tab.href === pathname ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                  'px-3 py-2 font-medium text-sm rounded-md'
                )}
                aria-current={tab.href ? 'page' : undefined}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {rightTabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={cl(
                  tab.href === pathname ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                  'px-3 py-2 font-medium text-sm rounded-md'
                )}
                aria-current={tab.href ? 'page' : undefined}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
