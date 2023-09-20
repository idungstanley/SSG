import React, { useState } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import WorkSpaceSelection from '../WorkSpaceSelection';
import { cl } from '../../../../../../utils';
import UserSettingsModal from '../../../../../../pages/settings/UserSettings/components/UserSettings/UserSettingsModal';
import { Link } from 'react-router-dom';
import Toggle from '../Toggle';
import { Modal } from '../../../../../../components/Pilot/components/HotKeys/components/Modal';
import PinnedNavigationItem, { NavigationList } from '../NavigationItems/components/NavigationList';
import ToolTip from '../../../../../../components/Tooltip/Tooltip';
import AlsoitIcon from '../../../../../../assets/icons/AlsoitIcon';
import PinnedIcon from '../../../../../../assets/icons/PinnedIcon';
import UnpinnedIcon from '../../../../../../assets/icons/UnpinnedIcon';

interface HeaderProps {
  handleHotkeyClick: (value: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  hotkeys: (
    | {
        id: string;
        name: string;
        source: string;
        alwaysShow: boolean;
        icon?: undefined;
      }
    | {
        id: string;
        name: string;
        icon: JSX.Element;
        alwaysShow: boolean;
        source?: undefined;
      }
  )[];
  activeHotkeyIds: string[];
  activeTabId: string | null;
  setActiveTabId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Header({
  handleHotkeyClick,
  hotkeys,
  activeHotkeyIds,
  activeTabId,
  setActiveTabId
}: HeaderProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { showSidebar } = useAppSelector((state) => state.account);
  return (
    <div
      className={cl('flex border-b gap-2 px-2', !showSidebar ? 'flex-col pb-3 items-center' : 'items-center py-4')}
      style={{ height: `${showSidebar ? '100px' : ''}` }}
    >
      <Link to="/" className="flex-shrink-0">
        <AlsoitIcon />
      </Link>
      {!showSidebar && <hr className="w-full my-1 mr-6" />}
      <div
        className={`flex flex-grow flex-shrink-0 ${!showSidebar && 'gap-2 flex-col'} ${
          showSidebar ? 'flex-col space-y-3' : ''
        }`}
      >
        <WorkSpaceSelection />
        <div className={cl('flex', !showSidebar ? 'flex-col items-center justify-center' : 'items-center')}>
          <div
            className={`flex items-center flex-grow flex-shrink-0 ${
              hotkeys.length > 0 && showSidebar ? 'justify-between' : 'justify-end'
            }`}
          >
            {hotkeys.length > 0 && showSidebar && (
              <PinnedNavigationItem
                activeTabId={activeTabId}
                setActiveTabId={setActiveTabId}
                hotkeys={hotkeys}
                handleHotkeyClick={handleHotkeyClick}
              />
            )}
            <div className="flex items-center">
              <UserSettingsModal setShowModal={setShowModal} />
              <Toggle />
            </div>
          </div>
        </div>
        <Modal setShowModal={setShowModal} showModal={showModal} position="top-20 left-44">
          {/* hotkeys list */}
          <div className="z-50 flex flex-col items-start mt-4">
            {NavigationList.map((tab) => (
              <span
                onClick={(e) => handleHotkeyClick(tab.id, e)}
                key={tab.id}
                className={cl(
                  activeHotkeyIds.includes(tab.id) && 'font-semibold',
                  'relative flex text-gray-500 items-center rounded-md justify-between py-1 px-2 hover:bg-gray-100 cursor-pointer w-full'
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cl('w-5 h-5 flex items-center', activeHotkeyIds.includes(tab.id) && 'text-black')}>
                    {tab.icon}
                  </span>
                  <span className="block truncate">{tab.name}</span>
                </div>
                <span className="flex">
                  {activeHotkeyIds.includes(tab.id) && <PinnedIcon />}
                  {!activeHotkeyIds.includes(tab.id) &&
                    (hotkeys.length >= 4 ? (
                      <ToolTip title="Exceeded pin limit">
                        <UnpinnedIcon />
                      </ToolTip>
                    ) : (
                      <UnpinnedIcon />
                    ))}
                </span>
              </span>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
}
