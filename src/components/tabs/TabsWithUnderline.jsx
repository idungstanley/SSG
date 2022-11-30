import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TabsWithUnderline({ tabs }) {
  const selectedTab = useSelector(
    (state) => state.inbox.selectedInboxTabKey,
  );
  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              type="button"
              onClick={tab.onClick}
              className={classNames(
                tab.key === selectedTab
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm',
              )}
              aria-current={tab.key === selectedTab ? 'page' : undefined}
            >
              <div className="m-auto block">
                {tab.name}
                {tab.badge !== null && (
                  <span
                    className={classNames(
                      tab.key === selectedTab
                        ? 'bg-primary-100 text-primary-600'
                        : 'bg-gray-100 text-gray-900',
                      'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block text-center',
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

TabsWithUnderline.propTypes = {
  tabs: PropTypes.array.isRequired,
};
