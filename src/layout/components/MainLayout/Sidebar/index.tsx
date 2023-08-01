import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { cl } from '../../../../utils';
import { setIsManageStatus, setSidebarWidthRD } from '../../../../features/workspace/workspaceSlice';
import Header from './components/Header';
import NavigationItems from './components/NavigationItems';
import Places from './components/Places';
import { dimensions } from '../../../../app/config/dimensions';
import { useResize } from '../../../../hooks/useResize';
import { isAllowIncreaseWidth } from '../../../../utils/widthUtils';
import { NavigationList } from './components/NavigationItems/components/NavigationList';
import useResolution from '../../../../hooks/useResolution';
import { setUserSettingsData, useGetUserSettingsKeys } from '../../../../features/account/accountService';
import NonInteractiveSearch from '../../../../components/Search/NonInteractiveSearch';
import CommandSearchModal from './components/CommandSearchModal';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import { setUpdateCords } from '../../../../features/hubs/hubSlice';
import { useScroll } from '../../../../hooks/useScroll';
import { ScrollableContainer } from '../../../../components/ScrollableContainer/ScrollableContainer';
import ModalOverlay from '../../../../components/Modal/ModalOverlay';
import { Button } from '../../../../components';
import PlusIcon from '../../../../assets/icons/PlusIcon';

const MAX_SIDEBAR_WIDTH = dimensions.navigationBar.max;
const MIN_SIDEBAR_WIDTH = dimensions.navigationBar.min;

const statusTabOptions = [{ label: 'Use Space Statuses' }, { label: 'Custom' }];

const statusTypes = [
  { label: 'To do', color: 'grey', model_type: 'open' },
  { label: 'In Progress', color: 'purple', model_type: 'custom' },
  { label: 'Completed', color: 'green', model_type: 'closed' }
];

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { extendedSidebarWidth, sidebarWidthRD, showExtendedBar } = useAppSelector((state) => state.workspace);
  const key = 'sidebar';
  const { showSidebar, userSettingsData } = useAppSelector((state) => state.account);
  const [commandSearchModal, setCommandSearchModal] = useState<boolean>(false);
  const { isManageStatus } = useAppSelector((state) => state.workspace);
  const [activeStatusTab, setActiveStatusTab] = useState<string>(statusTabOptions[0].label);

  const { blockRef, Dividers, size, isMouseUp, isDrag } = useResize({
    dimensions: {
      min: MIN_SIDEBAR_WIDTH,
      max: MAX_SIDEBAR_WIDTH
    },
    storageKey: 'sidebarWidth',
    direction: 'XR',
    defaultSize: dimensions.navigationBar.default
  });
  const resolution = useResolution();
  setUserSettingsData(isMouseUp, key, { ...userSettingsData, sidebarWidth: sidebarWidthRD }, resolution);
  useGetUserSettingsKeys(true, key, resolution);
  const [activeTabId, setActiveTabId] = useState<string | null>('');
  const hotkeyIdsFromLS = JSON.parse(localStorage.getItem('navhotkeys') ?? '[]') as string[];
  const handleCloseManageStatus = () => {
    dispatch(setIsManageStatus(!isManageStatus));
  };
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
  const onScroll = useScroll(() => dispatch(setUpdateCords()));

  return (
    <aside className={cl('flex h-full text-center relative overflow-x-visible')}>
      <Dividers />
      {/* show / hide sidebar icon */}
      {/* sidebar */}
      <section
        style={{
          width: showSidebar ? userSettingsData?.sidebarWidth : sidebarWidthRD
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
        <ScrollableContainer scrollDirection="y" onScroll={onScroll}>
          <section className="overflow-x-hidden">
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
                  className="absolute flex items-center justify-between w-auto w-full font-bold tracking-wider text-gray-400 grow left-6 hover:text-fuchsia-500"
                  style={{ fontSize: '13px' }}
                >
                  <div className="flex items-center justify-between">
                    <SearchIcon />
                    <p className="ml-2">Search</p>
                  </div>
                  <p className="mr-14">Ctrl+k</p>
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
        </ScrollableContainer>
        <ModalOverlay isModalVisible={isManageStatus} onCloseModal={handleCloseManageStatus}>
          <section className="flex flex-col p-4" style={{ height: '450px' }}>
            <div>
              <h1>Edit statuses for List</h1>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex flex-col space-y-3">
                {statusTabOptions.map((item, index) => (
                  <span
                    key={index}
                    onClick={() => setActiveStatusTab(item.label)}
                    className={`flex p-1 cursor-pointer justify-items-start  ${
                      activeStatusTab === item.label ? 'bg-alsoit-purple-300 text-white rounded' : ''
                    }`}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
              {activeStatusTab === statusTabOptions[0].label ? (
                <div className="flex flex-col space-y-2">
                  {statusTypes.map((item, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 p-1 text-white border rounded cursor-pointer justify-items-start"
                    >
                      <span className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></span>
                      <span style={{ color: item.color }}>{item.label}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col space-y-6">
                  {statusTypes.map((item, index) => (
                    <div className="space-y-2" key={index}>
                      <p className="flex uppercase justify-items-start">{item.model_type + ' STATUSES'}</p>
                      <span
                        key={index}
                        className="flex items-center gap-2 p-1 border rounded cursor-pointer justify-items-start"
                      >
                        <span className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></span>
                        <span style={{ color: item.color }}>{item.label}</span>
                      </span>
                      {item.label === 'To do' && (
                        <span className="flex justify-items-start">
                          <Button icon={<PlusIcon />} label="Add Status" buttonStyle="base" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-auto">
              <Button label="Save" buttonStyle="base" width="w-full" />
            </div>
          </section>
        </ModalOverlay>
      </section>
    </aside>
  );
}
