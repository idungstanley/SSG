import React, { useMemo } from 'react';
import { IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setActiveTabId } from '../../../../features/workspace/workspaceSlice';
import ToolTip from '../../../Tooltip/Tooltip';

interface TabsProps {
  tabs: IPilotTab[];
  isMinified: boolean;
}

const pilotFromLS = JSON.parse(localStorage.getItem('pilot') || '""') as { tabOrder: number[]; showTabLabel: boolean };

const tabIdsFromLS = pilotFromLS.tabOrder || [];

export default function MinTabs({ tabs, isMinified }: TabsProps) {
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
    <nav className={`flex flex-col col-span-1 gap-2 px-2 py-2 h-fit w-min ${isMinified ? 'border-none' : 'border-b'}`}>
      {tabItems.map((tab) => (
        <div key={tab.label}>
          <ToolTip title={tab.label}>
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
          </ToolTip>
        </div>
      ))}
    </nav>
  );
}
