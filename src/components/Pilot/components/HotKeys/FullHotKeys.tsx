import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useMemo } from 'react';
import { IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import { Modal } from './components/Modal';
import { setActiveHotkeyIds, setActiveTabId } from '../../../../features/workspace/workspaceSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import ToolTip from '../../../Tooltip/Tooltip';
import { STORAGE_KEYS } from '../../../../app/config/dimensions';
import { setUserSettingsKeys } from '../../../../features/account/accountService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useResolution from '../../../../hooks/useResolution';

interface HotkeysListProps {
  tabs: IPilotTab[];
  showModal: boolean;
  setShowModal: (i: boolean) => void;
}

const hotkeyIdsFromLS = JSON.parse(localStorage.getItem(STORAGE_KEYS.HOT_KEYS) ?? '[]') as string[];

export default function FullHotkeysList({ tabs, showModal, setShowModal }: HotkeysListProps) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const resolution = useResolution();

  const { activeTabId, activeHotkeyIds } = useAppSelector((state) => state.workspace);
  const { userSettingsData } = useAppSelector((state) => state.account);

  const saveHotKeysToBE = useMutation(setUserSettingsKeys, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user-settings']);
    }
  });

  const hotkeys = useMemo(() => tabs.filter((i) => activeHotkeyIds.includes(i.id)), [activeHotkeyIds, tabs]);

  const handleClick = useCallback(
    (tabId: string) => {
      const isIncludes = activeHotkeyIds.includes(tabId);

      const newHotkeyIds = isIncludes ? [...activeHotkeyIds.filter((i) => i !== tabId)] : [...activeHotkeyIds, tabId];

      dispatch(setActiveHotkeyIds(newHotkeyIds));
      saveHotKeysToBE.mutateAsync({
        value: { ...userSettingsData, [STORAGE_KEYS.HOT_KEYS]: newHotkeyIds },
        resolution
      });
      localStorage.setItem(STORAGE_KEYS.HOT_KEYS, JSON.stringify(newHotkeyIds));
    },
    [activeHotkeyIds, hotkeyIdsFromLS]
  );

  return (
    <>
      {activeHotkeyIds.length !== 0 ? (
        <div className="flex">
          {/* unknown */}
          <div className="flex flex-col p-1 m-1 text-gray-700 bg-gray-50">
            <ChevronRightIcon className="w-2 h-2" aria-hidden="true" />
            <p className="flex flex-col px-0.5 items-center" style={{ fontSize: '5px' }}>
              <span>1</span> <span className="w-full h-0.5 bg-gray-400"></span> <span>3</span>
            </p>
            <ChevronLeftIcon className="w-2 h-2 text-gray-400" aria-hidden="true" />
          </div>

          <div className="flex flex-row flex-wrap w-full col-span-1 gap-2 p-2">
            {hotkeys.map((hotkey) => (
              <div key={hotkey.label}>
                <ToolTip title={hotkey.label}>
                  <button
                    onClick={() => dispatch(setActiveTabId(activeTabId === hotkey.id ? undefined : hotkey.id))}
                    title={hotkey.label}
                    className={cl(
                      activeTabId === hotkey.id ? 'text-primary-500 bg-primary-200' : 'text-gray-600',
                      'flex items-center justify-center border-r border-l px-4 py-1 rounded-md'
                    )}
                    key={hotkey.id}
                  >
                    {hotkey.icon}
                  </button>
                </ToolTip>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div />
      )}

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
