import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import { FireIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowPilotSideOver } from '../../features/general/slideOver/slideOverSlice';
import { cl } from '../../utils';
import Tabs from './components/Tabs';
import { IPilotSection, IPilotTab } from '../../types';
import Dropdown from '../Dropdown/index';

interface PilotProps {
  pilotConfig: { tabs: IPilotTab[]; sections: IPilotSection[] };
}

export default function Pilot({ pilotConfig }: PilotProps) {
  const { sections, tabs } = pilotConfig;

  const dispatch = useAppDispatch();
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const [activeTabId, setActiveTabId] = useState(1);

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

  const dropdownConfig = [
    {
      id: 1,
      icon: <FireIcon className="w-4 h-4" />,
      label: 'Add / remove hotkeys',
      onClick: () => ({}),
    },
  ];

  return pilotSideOver.id ? (
    <div
      className={cl(
        'relative p-2 border-l grid grid-rows-autoAutoFr',
        showFullPilot && 'w-134 min-w-134'
      )}
    >
      <div className="w-full flex justify-between items-center pb-2">
        {/* item type and title */}
        {showFullPilot ? (
          <p className="truncate capitalize text-xs font-semibold">
            {type}: <span className=" font-normal">{title}</span>
          </p>
        ) : null}

        <div className="flex gap-2 items-center">
          <button type="button" onClick={togglePilot} className="text-gray-600">
            {showFullPilot ? (
              <ChevronDoubleRightIcon className="w-4 h-4" />
            ) : (
              <ChevronDoubleLeftIcon className="w-4 h-4" />
            )}
          </button>

          {showFullPilot ? (
            <Dropdown config={dropdownConfig} iconType="dots" />
          ) : null}
        </div>
      </div>

      {showFullPilot ? (
        <>
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
  ) : null;
}
