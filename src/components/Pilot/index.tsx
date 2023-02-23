import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowPilotSideOver } from '../../features/general/slideOver/slideOverSlice';
import { cl } from '../../utils';
import Tabs from './components/Tabs';
import { IPilotSection, IPilotTab } from '../../types';
import HotKeys, { Modal } from './components/HotKeys';

interface PilotProps {
  pilotConfig: { tabs: IPilotTab[]; sections: IPilotSection[] };
}

export default function Pilot({ pilotConfig }: PilotProps) {
  const { sections, tabs } = pilotConfig;

  const dispatch = useAppDispatch();
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const [activeTabId, setActiveTabId] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [activeHotkeyIds, setActiveHotkeyIds] = useState<number[]>([]);

  const showFullPilot = pilotSideOver.show;
  const { type, title } = pilotSideOver;

  useEffect(() => {
    // reset active tab and current item id on unmount
    return () => {
      setActiveTabId(1);
      dispatch(setShowPilotSideOver({ show: true }));
    };
  }, []);

  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeTabId),
    [activeTabId]
  );

  const togglePilot = () => {
    dispatch(setShowPilotSideOver({ ...pilotSideOver, show: !showFullPilot }));
  };

  return pilotSideOver.id ? (
    <>
      <div
        className={cl(
          'relative p-2 border-l flex flex-col gap-2 h-full',
          showFullPilot && 'w-134 min-w-134'
        )}
      >
        <div className="w-full flex justify-between items-center">
          {/* item type and title */}
          {showFullPilot ? (
            <p className="truncate capitalize text-xs font-semibold">
              {type}: <span className=" font-normal">{title}</span>
            </p>
          ) : null}

          <div className="relative flex gap-2 items-center">
            <button
              type="button"
              onClick={togglePilot}
              className="text-gray-600"
            >
              {showFullPilot ? (
                <ChevronDoubleRightIcon className="w-4 h-4" />
              ) : (
                <ChevronDoubleLeftIcon className="w-4 h-4" />
              )}
            </button>

            <HotKeys setShowModal={setShowModal} />
          </div>
        </div>

        {showFullPilot ? (
          <>
            {activeHotkeyIds.length ? (
              <div className="flex gap-2 h-fit w-full px-2 border-t py-4 border-b">
                {tabs
                  .filter((i) => activeHotkeyIds.includes(i.id))
                  .map((hotkey) => (
                    <div
                      onClick={() => setActiveTabId(hotkey.id)}
                      title={hotkey.label}
                      className={cl(
                        activeTabId === hotkey.id
                          ? 'bg-green-500 border-green-500'
                          : 'bg-white border-gray-200',
                        'flex items-center justify-center p-2 rounded-lg border border-opacity-0 hover:border-opacity-100 duration-200'
                      )}
                      key={hotkey.id}
                    >
                      {hotkey.icon}
                    </div>
                  ))}
              </div>
            ) : null}

            {/* tab items */}
            <Tabs
              tabs={tabs}
              activeTabId={activeTabId}
              setActiveTabId={setActiveTabId}
            />

            {/* main section depends of active tab */}
            {activeSection ? activeSection.element : null}
          </>
        ) : null}
      </div>
      <Modal
        activeHotkeyIds={activeHotkeyIds}
        setActiveHotkeyIds={setActiveHotkeyIds}
        setShowModal={setShowModal}
        showModal={showModal}
        tabs={tabs}
      />
    </>
  ) : null;
}
