import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '../../../utils';

interface SectionHeadingWithTabsProps {
  title: string;
  actions?: ReactNode;
  tabs: {
    name: string;
    href: string;
    current: boolean;
    count: number | null;
  }[];
  titleSize: string;
}

function SectionHeadingWithTabs({
  title,
  actions,
  tabs,
  titleSize = 'text-xl',
}: SectionHeadingWithTabsProps) {
  return (
    <div className="relative pb-5 border-b border-gray-200 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between">
        <h3 className={`${titleSize} leading-6 font-medium text-gray-900`}>
          {title}
        </h3>
        {actions && (
          <div className="mt-3 flex md:mt-0 md:absolute md:top-8 md:right-0">
            {actions}
          </div>
        )}
      </div>
      {tabs && (
        <div className="mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue={tabs.find((tab) => tab.current)?.name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  to={tab.href}
                  className={classNames(
                    tab.current
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                    'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                  {tab.count !== null ? (
                    <span
                      className={classNames(
                        tab.current
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'bg-gray-100 text-gray-900',
                        'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block'
                      )}
                    >
                      {tab.count}
                    </span>
                  ) : null}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default SectionHeadingWithTabs;
