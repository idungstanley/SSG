import {
  ChevronDoubleDownIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowPilotSideOver } from '../../features/general/slideOver/slideOverSlice';
import History from '../../pages/explorer/components/Pilot/components/History';
import Information from '../../pages/explorer/components/Pilot/components/Information';
import Permissions from '../../pages/explorer/components/Pilot/components/Permissions';
import { cl } from '../../utils';
import ChatForPilot from '../Chat/ChatForPilot';
import CommentsForPilot from '../Comments/CommentsForPilot';
import WatchersForPilot from '../Watchers/WatchersForPilot';
import Tabs from './components/Tabs';

const sections = [
  {
    id: 1,
    element: <Information />,
  },
  {
    id: 2,
    element: <History />,
  },
  {
    id: 3,
    element: <Permissions />,
  },
  {
    id: 4,
    element: <CommentsForPilot />,
  },
  {
    id: 5,
    element: <WatchersForPilot />,
  },
  {
    id: 6,
    element: <ChatForPilot />,
  },
];

const pilotFromLS: { tabOrder: number[]; showTabLabel: boolean } = JSON.parse(
  localStorage.getItem('pilot') || '""'
);

const showTabLabelFromLS = !!pilotFromLS.showTabLabel;

export default function Pilot() {
  const dispatch = useAppDispatch();
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const [activeTabId, setActiveTabId] = useState(1);
  const [showTabLabel, setShowTabLabel] = useState(showTabLabelFromLS);

  const showFullPilot = pilotSideOver.show;

  useEffect(() => {
    // reset active tab and current item id on unmount
    return () => {
      setActiveTabId(1);
      // dispatch(setShowPilotSideOver({ show: true }));
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
      className={cl('p-2 border-l h-full', showFullPilot && 'w-134 min-w-134')}
    >
      {/* show / hide pilot toggle */}
      <div className="w-full flex justify-between items-center">
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
        <div className="flex flex-col mt-2 h-full">
          {/* tab items */}
          <Tabs
            showTabLabel={showTabLabel}
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
          />

          {/* main section depends of active tab */}
          {activeSection ? activeSection.element : null}
        </div>
      ) : null}
    </div>
  ) : null;
}
