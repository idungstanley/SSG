import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { cl } from '../../../../utils';
import { setScrollTop } from '../../../../features/account/accountSlice';
import { setSidebarWidthRD } from '../../../../features/workspace/workspaceSlice';
import Header from './components/Header';
import NavigationItems from './components/NavigationItems';
import Places from './components/Places';
import Search from './components/Search';
import { dimensions } from '../../../../app/config/dimensions';
import { useResize } from '../../../../hooks/useResize';
import { isAllowIncreaseWidth } from '../../../../utils/widthUtils';
import { NavigationList } from './components/NavigationItems/components/NavigationList';

const MAX_SIDEBAR_WIDTH = dimensions.navigationBar.max;
const MIN_SIDEBAR_WIDTH = dimensions.navigationBar.min;

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { extendedSidebarWidth, sidebarWidthRD, showExtendedBar } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);

  const { blockRef, Dividers, size } = useResize({
    dimensions: {
      min: MIN_SIDEBAR_WIDTH,
      max: MAX_SIDEBAR_WIDTH
    },
    storageKey: 'sidebarWidth',
    direction: 'XR',
    defaultSize: dimensions.navigationBar.default
  });
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

  useEffect(() => {
    const { isAllow, allowedSize } = isAllowIncreaseWidth(size, extendedSidebarWidth);
    dispatch(setSidebarWidthRD(isAllow ? size : showExtendedBar ? allowedSize - size : size));
  }, [size]);

  const handleScroll = (event: React.UIEvent<HTMLElement, UIEvent>) => {
    dispatch(setScrollTop(event.currentTarget.scrollTop));
  };

  return (
    <aside className={cl('flex h-full text-center relative overflow-x-visible')}>
      <Dividers />
      {/* show / hide sidebar icon */}
      {/* sidebar */}
      <section
        style={{
          width: sidebarWidthRD
        }}
        ref={blockRef}
        className="relative flex flex-col gap-2 pr-1 border-r border-gray-300"
      >
        <Header
          activeHotkeyIds={activeHotkeyIds}
          handleHotkeyClick={handleHotkeyClick}
          hotkeys={hotkeys}
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
        />
        <section
          className="relative h-full flex flex-col pr-1.5 overflow-y-auto overflow-x-hidden"
          onScroll={(e) => handleScroll(e)}
        >
          {showSidebar ? <Search /> : null}
          <NavigationItems
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
            activeHotkeyIds={activeHotkeyIds}
            handleHotkeyClick={handleHotkeyClick}
          />
          <Places />
        </section>
      </section>
    </aside>
  );
}
