import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowPilotSideOver } from '../../features/general/slideOver/slideOverSlice';
import History from '../../pages/explorer/components/Pilot/components/History';
import Information from '../../pages/explorer/components/Pilot/components/Information';
import Permissions from '../../pages/explorer/components/Pilot/components/Permissions';
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

export default function Pilot() {
  const dispatch = useAppDispatch();
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const [activeTabId, setActiveTabId] = useState(1);

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

  return pilotSideOver.id ? (
    <div className="p-2 border-l h-full">
      <button type="button" onClick={togglePilot} className="text-gray-500">
        {showFullPilot ? (
          <ChevronDoubleRightIcon className="w-5 h-5" />
        ) : (
          <ChevronDoubleLeftIcon className="w-5 h-5" />
        )}
      </button>

      {showFullPilot ? (
        <div className="flex flex-col mt-2">
          {/* tab items */}
          <Tabs activeTabId={activeTabId} setActiveTabId={setActiveTabId} />

          {/* main section depends of active tab */}
          {activeSection ? activeSection.element : null}
        </div>
      ) : null}
    </div>
  ) : null;
}
