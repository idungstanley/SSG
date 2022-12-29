import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from "../../utils";
import { useAppSelector } from '../../app/hooks';

interface tabArrayType {
  name: string;
  onClick: ()=> void;
  key: string;
  badge: string;
}
interface TabsType {
  tabs: tabArrayType[]
}
export default function TabsWithUnderline({ tabs }: TabsType) {
  const selectedTab = useAppSelector(
    (state) => state.inbox.selectedInboxTabKey,
  );
  return (
    <nav className="flex w-full -mb-px bg-white border-b border-gray-200" aria-label="Tabs">
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
          <div className="block m-auto">
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
  );
}

TabsWithUnderline.propTypes = {
  tabs: PropTypes.array.isRequired,
};
