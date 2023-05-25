import React, { useCallback, useMemo, useState } from 'react';
import Header from '../../../../../layout/components/MainLayout/Sidebar/components/Header/index';
import Workspace from './Workspace';
import { Outlet } from 'react-router-dom';
import User from './User';
import ProgressBar from '../../../../../layout/components/MainLayout/ProgressBar';
import { NavigationList } from '../../../../../layout/components/MainLayout/Sidebar/components/NavigationItems/components/NavigationList';

function SideBarSettings() {
  const [activeTabId, setActiveTabId] = useState<string | null>('');
  const hotkeyIdsFromLS = JSON.parse(localStorage.getItem('navhotkeys') ?? '[]') as string[];

  const [activeHotkeyIds, setActiveHotkeyIds] = useState<string[]>(hotkeyIdsFromLS);

  const hotkeys = useMemo(
    () => NavigationList.filter((i) => activeHotkeyIds.includes(i.id)),
    [activeHotkeyIds, NavigationList]
  );

  const handleHotkeyClick = useCallback(
    (tabId: string, e: React.MouseEvent<SVGElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      const isIncludes = activeHotkeyIds.includes(tabId);

      const newHotkeyIds =
        !isIncludes && activeHotkeyIds.length <= 3
          ? [...activeHotkeyIds, tabId]
          : [...activeHotkeyIds.filter((i) => i !== tabId)];

      setActiveHotkeyIds(newHotkeyIds);
      localStorage.setItem('navhotkeys', JSON.stringify(newHotkeyIds));
    },
    [activeHotkeyIds]
  );
  return (
    <section className="flex">
      <section style={{ height: '100vh' }} className="w-1/5 h-screen overflow-auto bg-white border-r-2 border-gray-300">
        <ProgressBar />
        <section>
          <Header
            activeHotkeyIds={activeHotkeyIds}
            handleHotkeyClick={handleHotkeyClick}
            hotkeys={hotkeys}
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
          />
        </section>
        <section>
          <Workspace />
        </section>
        <section>
          <User />
        </section>
      </section>
      {/* outlets */}
      <div style={{ height: '100vh' }} className="flex w-4/5 h-screen bg-gray-200">
        <Outlet />
      </div>
    </section>
  );
}

export default SideBarSettings;
