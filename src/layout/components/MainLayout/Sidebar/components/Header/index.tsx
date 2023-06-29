import React, { useState } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import WorkSpaceSelection from '../WorkSpaceSelection';
import MainLogo from '../../../../../../assets/icons/mainIcon.svg';
import { cl } from '../../../../../../utils';
import UserSettingsModal from '../../../../../../pages/settings/UserSettings/components/UserSettings/UserSettingsModal';
import { Link } from 'react-router-dom';
import Toggle from '../Toggle';
import { Modal } from '../../../../../../components/Pilot/components/HotKeys/components/Modal';
import PinnedNavigationItem, { NavigationList } from '../NavigationItems/components/NavigationList';
import { VscPinned } from 'react-icons/vsc';
import { BsFillPinFill } from 'react-icons/bs';
import ToolTip from '../../../../../../components/Tooltip/Tooltip';

interface HeaderProps {
  handleHotkeyClick: (
    value: string,
    e: React.MouseEvent<SVGElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
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
      className={cl(
        'flex border-b gap-1',
        !showSidebar ? 'flex-col pb-3 items-center' : 'items-center',
        hotkeys.length > 0 && showSidebar ? '' : 'py-2'
      )}
      style={{ height: `${showSidebar ? '115px' : ''}` }}
    >
      <Link to="/">
        <img className="h-16" style={{ width: '50px' }} src={MainLogo} alt="Workflow" />
      </Link>
      {!showSidebar && <hr className="w-full my-1 mr-6" />}
      <div
        className={`flex flex-grow flex-shrink-0 ${!showSidebar && 'gap-2 flex-col'} ${
          hotkeys.length > 0 && showSidebar ? 'flex-col space-y-4' : ''
        }`}
      >
        <WorkSpaceSelection />
        <div className={cl('flex', !showSidebar ? 'flex-col items-center justify-center' : 'items-center pl-2')}>
          <div
            className={`flex items-center justify-between ${
              hotkeys.length > 0 && showSidebar ? 'flex-grow flex-shrink-0' : ''
            }`}
          >
            {hotkeys.length > 0 && showSidebar && (
              <PinnedNavigationItem activeTabId={activeTabId} setActiveTabId={setActiveTabId} hotkeys={hotkeys} />
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
              <button
                onClick={(e) => handleHotkeyClick(tab.id, e)}
                key={tab.id}
                className={cl(
                  activeHotkeyIds.includes(tab.id) && 'font-semibold',
                  'relative flex gap-10 text-gray-500 items-center rounded-md justify-between py-1 px-2 hover:bg-gray-100 cursor-pointer w-full'
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cl(activeHotkeyIds.includes(tab.id) && 'text-black')}>
                    {tab.icon || <img className="w-5 h-5" src={tab.source} alt={tab.name} />}
                  </span>
                  <span className="block truncate">{tab.name}</span>
                </div>
                {activeHotkeyIds.includes(tab.id) && <BsFillPinFill className="w-4 h-4" aria-hidden="true" />}
                {!activeHotkeyIds.includes(tab.id) &&
                  (hotkeys.length >= 4 ? (
                    <ToolTip tooltip="Exceeded pin limit">
                      <VscPinned className="w-4 h-4" aria-hidden="true" />
                    </ToolTip>
                  ) : (
                    <VscPinned className="w-4 h-4" aria-hidden="true" />
                  ))}
              </button>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
}
