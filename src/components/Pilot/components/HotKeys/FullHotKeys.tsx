import { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
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
import SlideToggle from '../../../SlideToggle';
import { calculateSlides } from '../../../../utils/calculateSlides';

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
  const { userSettingsData, pilotWidth } = useAppSelector((state) => state.account);

  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [slidesCount, setSlidesCount] = useState<number>(0);

  const saveHotKeysToBE = useMutation(setUserSettingsKeys, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user-settings']);
    }
  });

  const HOTKEY_WIDTH = 30;
  const MARGIN_WIDTH = 20;
  const SLIDE_TOGGLE_WIDTH = 40;

  useEffect(() => {
    setActiveSlide(1);
  }, [pilotWidth]);

  const hotkeys = useMemo(() => {
    if (pilotWidth) {
      const itemWidth = HOTKEY_WIDTH + MARGIN_WIDTH;
      const newSlides = calculateSlides(activeHotkeyIds, itemWidth, pilotWidth - SLIDE_TOGGLE_WIDTH);
      setSlidesCount(newSlides.length);
      return tabs.filter((i) => newSlides[activeSlide - 1].includes(i.id));
    } else {
      return tabs.filter((i) => activeHotkeyIds.includes(i.id));
    }
  }, [activeHotkeyIds, tabs, activeSlide, pilotWidth]);

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
        <div className="flex items-center p-1 border-b">
          <div className="pl-1 pr-2">
            <SlideToggle activeSlide={activeSlide} fullCount={slidesCount} setActiveSlide={setActiveSlide} />
          </div>
          <div className="flex flex-row w-full col-span-1">
            {hotkeys.map((hotkey) => (
              <div key={hotkey.label}>
                <ToolTip title={hotkey.label}>
                  <button
                    onClick={() => dispatch(setActiveTabId(activeTabId === hotkey.id ? undefined : hotkey.id))}
                    title={hotkey.label}
                    className={cl(
                      activeTabId === hotkey.id ? 'text-primary-500 bg-primary-200' : 'text-gray-600',
                      'mx-2 my-1 flex items-center justify-center border px-1 py-1 rounded-md'
                    )}
                    style={{ width: '30px', height: '30px' }}
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
