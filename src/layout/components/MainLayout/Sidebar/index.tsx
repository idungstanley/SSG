import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { cl } from '../../../../utils';
import { setIsFavoritePinned, setSidebarWidthRD } from '../../../../features/workspace/workspaceSlice';
import Header from './components/Header';
import NavigationItems from './components/NavigationItems';
import Places from './components/Places';
import { STORAGE_KEYS, dimensions } from '../../../../app/config/dimensions';
import { useResize } from '../../../../hooks/useResize';
import { isAllowIncreaseWidth } from '../../../../utils/widthUtils';
import { NavigationList } from './components/NavigationItems/components/NavigationList';
import NonInteractiveSearch from '../../../../components/Search/NonInteractiveSearch';
import CommandSearchModal from './components/CommandSearchModal';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import { setUpdateCords } from '../../../../features/hubs/hubSlice';
import { useScroll } from '../../../../hooks/useScroll';
import { VerticalScroll } from '../../../../components/ScrollableContainer/VerticalScroll';
import { useQueryClient } from '@tanstack/react-query';

const MAX_SIDEBAR_WIDTH = dimensions.navigationBar.max;
const MIN_SIDEBAR_WIDTH = dimensions.navigationBar.min;
const sidebarWidthFromLS =
  (JSON.parse(localStorage.getItem(STORAGE_KEYS.SIDEBAR_WIDTH) || '""') as number) || dimensions.navigationBar.default;

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { extendedSidebarWidth, sidebarWidthRD, showExtendedBar } = useAppSelector((state) => state.workspace);
  const { showSidebar, userSettingsData } = useAppSelector((state) => state.account);

  const [commandSearchModal, setCommandSearchModal] = useState<boolean>(false);

  const { blockRef, Dividers, size, isDrag } = useResize({
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
    (tabId: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation();
      const isIncludes = activeHotkeyIds.includes(tabId);
      const isFavoriteItem = NavigationList.find((item) => item.id === tabId);

      const newHotkeyIds =
        !isIncludes && activeHotkeyIds.length <= 3
          ? [...activeHotkeyIds, tabId]
          : [...activeHotkeyIds.filter((i) => i !== tabId)];
      setActiveHotkeyIds(newHotkeyIds);
      if (newHotkeyIds.includes(isFavoriteItem?.id as string)) {
        dispatch(setIsFavoritePinned(true));
        queryClient.invalidateQueries(['user-settings']);
      } else {
        dispatch(setIsFavoritePinned(false));
      }
      localStorage.setItem('navhotkeys', JSON.stringify(newHotkeyIds));
    },
    [activeHotkeyIds]
  );

  useEffect(() => {
    const { isAllow, allowedSize } = isAllowIncreaseWidth(size, extendedSidebarWidth);
    dispatch(setSidebarWidthRD(isAllow ? size : showExtendedBar ? allowedSize - size : size));
  }, [size]);
  const onScroll = useScroll(() => dispatch(setUpdateCords()));

  return (
    <aside className={cl('flex text-center relative overflow-x-visible')}>
      {showSidebar && <Dividers />}
      {/* show / hide sidebar icon */}
      {/* sidebar */}
      <section
        style={{
          width: showSidebar ? sidebarWidthFromLS || userSettingsData?.sidebarWidth : sidebarWidthRD
        }}
        ref={blockRef}
        className={`relative flex flex-col border-r ${isDrag ? 'border-gray-500' : 'border-gray-300'}`}
      >
        <Header
          activeHotkeyIds={activeHotkeyIds}
          handleHotkeyClick={handleHotkeyClick}
          hotkeys={hotkeys}
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
        />
        <VerticalScroll onScroll={onScroll} style={{ overflowX: 'hidden' }}>
          <section className="h-[calc(100vh-120px)]">
            {showSidebar ? (
              <NonInteractiveSearch
                setAction={setCommandSearchModal}
                modal={
                  <CommandSearchModal
                    commandSearchVisible={commandSearchModal}
                    onCloseCommandSearchModal={() => setCommandSearchModal(false)}
                  />
                }
              >
                <div
                  className="absolute flex items-center justify-between w-auto w-full font-bold tracking-wider text-gray-500 grow hover:text-fuchsia-500"
                  style={{ fontSize: '13px', left: '34px' }}
                >
                  <div className="flex items-center justify-between">
                    <SearchIcon width={13} height={13} />
                    <p className="ml-2">Search</p>
                  </div>
                  <p className="mr-16">Ctrl+k</p>
                </div>
              </NonInteractiveSearch>
            ) : null}
            <NavigationItems
              activeTabId={activeTabId}
              setActiveTabId={setActiveTabId}
              activeHotkeyIds={activeHotkeyIds}
              handleHotkeyClick={handleHotkeyClick}
            />
            <Places />
          </section>
        </VerticalScroll>
      </section>
    </aside>
  );
}
