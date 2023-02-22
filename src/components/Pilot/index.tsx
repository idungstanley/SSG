import {
  ChevronDoubleDownIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowPilotSideOver } from '../../features/general/slideOver/slideOverSlice';
import { cl } from '../../utils';
import Tabs from './components/Tabs';
import { IPilotSection, IPilotTab } from '../../types';

const pilotFromLS: { tabOrder: number[]; showTabLabel: boolean } = JSON.parse(
  localStorage.getItem('pilot') || '""'
);

const showTabLabelFromLS = !!pilotFromLS.showTabLabel;

interface PilotProps {
  pilotConfig: { tabs: IPilotTab[]; sections: IPilotSection[] };
}

export default function Pilot({ pilotConfig }: PilotProps) {
  const { sections, tabs } = pilotConfig;

  const dispatch = useAppDispatch();
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const [activeTabId, setActiveTabId] = useState(1);
  const [showTabLabel, setShowTabLabel] = useState(showTabLabelFromLS);

  const showFullPilot = pilotSideOver.show;

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

  const toggleShowTabLabel = () => {
    setShowTabLabel((prev) => {
      localStorage.setItem(
        'pilot',
        JSON.stringify({
          ...pilotFromLS,
          showTabLabel: !prev,
        })
      );

      return !prev;
    });
  };

  return pilotSideOver.id ? (
    <div
      className={cl(
        'p-2 border-l grid grid-rows-autoAutoFr',
        showFullPilot && 'w-134 min-w-134'
      )}
    >
      <div className="w-full flex justify-between items-center pb-2">
        {/* show / hide pilot toggle */}
        <button type="button" onClick={togglePilot} className="text-gray-500">
          {showFullPilot ? (
            <ChevronDoubleRightIcon className="w-5 h-5" />
          ) : (
            <ChevronDoubleLeftIcon className="w-5 h-5" />
          )}
        </button>

        {/* icon + label / icon views toggle */}
        {showFullPilot ? (
          <button
            type="button"
            onClick={toggleShowTabLabel}
            className="text-gray-500"
          >
            {showTabLabel ? (
              <ChevronDoubleUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDoubleDownIcon className="w-5 h-5" />
            )}
          </button>
        ) : null}
      </div>

      {showFullPilot ? (
        <>
          {/* tab items */}
          <Tabs
            tabs={tabs}
            showTabLabel={showTabLabel}
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
