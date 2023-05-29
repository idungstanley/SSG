import React, { useMemo } from 'react';
import { IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setActiveTabId } from '../../../../features/workspace/workspaceSlice';

interface TabsProps {
  tabs: IPilotTab[];
}

const pilotFromLS = JSON.parse(localStorage.getItem('pilot') || '""') as { tabOrder: number[]; showTabLabel: boolean };

const tabIdsFromLS = pilotFromLS.tabOrder || [];

export default function MinTabs({ tabs }: TabsProps) {
  const { activeTabId } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();
  const tabItems = useMemo(
    () => tabs.sort((a, b) => tabIdsFromLS.indexOf(a.id) - tabIdsFromLS.indexOf(b.id)),
    [tabs, tabIdsFromLS]
  );

  const handleClick = (tabId: number) => {
    dispatch(setActiveTabId(activeTabId === tabId ? undefined : tabId));
  };

  return (
    <nav className="flex py-2 px-2 col-span-1 h-fit flex-col gap-2 w-min">
      {tabItems.map((tab) => (
        <button
          key={tab.id}
          title={tab.label}
          onClick={() => handleClick(tab.id)}
          className={cl(
            'px-2 py-2 border border-opacity-0 hover:border-opacity-100 rounded-lg',
            activeTabId === tab.id ? 'border-primary-500 bg-primary-500 text-gray-100' : 'text-gray-600',
            'flex items-center justify-center'
          )}
          aria-current={activeTabId === tab.id ? 'page' : undefined}
        >
          {tab.icon}
        </button>
      ))}
    </nav>
  );
}
