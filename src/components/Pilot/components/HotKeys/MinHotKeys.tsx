import React, { useCallback, useMemo, useState } from 'react';
import { IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import { Modal } from './components/Modal';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setActiveTabId } from '../../../../features/workspace/workspaceSlice';

interface HotkeysListProps {
  tabs: IPilotTab[];
  showModal: boolean;
  setShowModal: (i: boolean) => void;
}

const hotkeyIdsFromLS = JSON.parse(localStorage.getItem('hotkeys') ?? '[]') as string[];

const HOTKEY_LIMIT = 3;

export default function MinHotkeysList({ tabs, showModal, setShowModal }: HotkeysListProps) {
  const [activeHotkeyIds, setActiveHotkeyIds] = useState<string[]>(hotkeyIdsFromLS);
  const { activeTabId } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();

  const hotkeys = useMemo(
    () => tabs.filter((i) => activeHotkeyIds.includes(i.id)).slice(0, HOTKEY_LIMIT),
    [activeHotkeyIds, tabs]
  );

  const handleClick = useCallback(
    (tabId: string) => {
      const isIncludes = activeHotkeyIds.includes(tabId);

      const newHotkeyIds = isIncludes ? [...activeHotkeyIds.filter((i) => i !== tabId)] : [...activeHotkeyIds, tabId];

      setActiveHotkeyIds(newHotkeyIds);
      localStorage.setItem('hotkeys', JSON.stringify(newHotkeyIds));
    },
    [activeHotkeyIds]
  );

  return (
    <>
      {activeHotkeyIds.length !== 0 ? (
        <div className="flex flex-col flex-wrap col-span-1 gap-2 p-2 border-none gap-y-2">
          {hotkeys.map((hotkey) => (
            <button
              onClick={() => dispatch(setActiveTabId(activeTabId === hotkey.id ? undefined : hotkey.id))}
              title={hotkey.label}
              className={cl(
                activeTabId === hotkey.id ? 'text-primary-500' : 'text-gray-600',
                'flex items-center justify-center px-2 py-2 border border-opacity-0 hover:border-opacity-100 rounded-lg'
              )}
              key={hotkey.id}
            >
              {hotkey.icon}
            </button>
          ))}
        </div>
      ) : null}

      <Modal setShowModal={setShowModal} showModal={showModal}>
        {/* hotkeys list */}
        <div className="z-50 flex flex-col items-start mt-4">
          {tabs.map((tab) => (
            <button
              onClick={() => handleClick(tab.id)}
              key={tab.id}
              className={cl(
                activeHotkeyIds.includes(tab.id) && 'font-semibold',
                'relative flex gap-10 text-gray-500 items-center rounded-md justify-between py-1 px-2 hover:bg-gray-100 cursor-pointer w-full'
              )}
            >
              <div className="flex items-center gap-2">
                <span className={cl(activeHotkeyIds.includes(tab.id) && 'text-black')}>{tab.icon}</span>
                <span className="block truncate">{tab.label}</span>
              </div>

              {activeHotkeyIds.includes(tab.id) && <CheckIcon className="w-4 h-4" aria-hidden="true" />}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
