import React, { useCallback, useMemo, useState } from 'react';
import { IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import { Modal } from './components/Modal';
import { CheckIcon } from '@heroicons/react/24/outline';

interface HotkeysListProps {
  tabs: IPilotTab[];
  setActiveTabId: (i: number | null) => void;
  activeTabId: number | null;
  showModal: boolean;
  setShowModal: (i: boolean) => void;
}

const hotkeyIdsFromLS = JSON.parse(localStorage.getItem('hotkeys') ?? '[]') as number[];

const HOTKEY_LIMIT = 3;

export default function MinHotkeysList({
  tabs,
  setActiveTabId,
  activeTabId,
  showModal,
  setShowModal
}: HotkeysListProps) {
  const [activeHotkeyIds, setActiveHotkeyIds] = useState<number[]>(hotkeyIdsFromLS);

  const hotkeys = useMemo(
    () => tabs.filter((i) => activeHotkeyIds.includes(i.id)).slice(0, HOTKEY_LIMIT),
    [activeHotkeyIds, tabs]
  );

  const handleClick = useCallback(
    (tabId: number) => {
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
        <div className="flex flex-wrap gap-y-2 p-2 col-span-1 flex-col gap-2">
          {hotkeys.map((hotkey) => (
            <button
              onClick={() => setActiveTabId(activeTabId === hotkey.id ? null : hotkey.id)}
              title={hotkey.label}
              className={cl(
                activeTabId === hotkey.id ? 'text-green-500' : 'text-gray-600',
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
        <div className="flex items-start flex-col mt-4 z-50">
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

              {activeHotkeyIds.includes(tab.id) && <CheckIcon className="h-4 w-4" aria-hidden="true" />}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
