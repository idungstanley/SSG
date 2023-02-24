import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { cl } from '../../utils';

interface TabsWithUnderlineProps {
  tabs: { name: string; key: string; badge?: number; onClick: () => void }[];
}

export default function TabsWithUnderline({ tabs }: TabsWithUnderlineProps) {
  const { selectedInboxTabKey } = useAppSelector((state) => state.inbox);
  return (
    <nav
      className="flex w-full -mb-px bg-white border-b border-gray-200"
      aria-label="Tabs"
    >
      {tabs.map((tab) => (
        <button
          key={tab.name}
          type="button"
          onClick={tab.onClick}
          className={cl(
            tab.key === selectedInboxTabKey
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm'
          )}
          aria-current={tab.key === selectedInboxTabKey ? 'page' : undefined}
        >
          <div className="block m-auto">
            {tab.name}
            {tab.badge !== null && (
              <span
                className={cl(
                  tab.key === selectedInboxTabKey
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-gray-100 text-gray-900',
                  'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block text-center'
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
