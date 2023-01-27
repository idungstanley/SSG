import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import SideOver from '../../../components/SideOver';
import {
  setShowPilotSideOver,
  setShowPilotSideOverHub,
} from '../../../features/general/slideOver/slideOverSlice';
import Tab from './components/Tabs';
import History from '../../newExplorer/components/Pilot/components/History';
import Permissions from '../../newExplorer/components/Pilot/components/Permissions';
import CommentsForPilot from '../../../components/Comments/CommentsForPilot';
import WatchersForPilot from '../../../components/Watchers/WatchersForPilot';
import ChatForPilot from '../../../components/Chat/ChatForPilot';
import Commnunication from './components/Communication';
import Details from './components/Details';
import TimeClock from './components/TimeClock';

const sections = [
  {
    id: 0,
    element: <Commnunication />,
  },
  {
    id: 1,
    element: <History />,
  },
  {
    id: 2,
    element: <Permissions />,
  },
  {
    id: 3,
    element: <ChatForPilot />,
  },
  {
    id: 4,
    element: <Details />,
  },
  {
    id: 5,
    element: <CommentsForPilot />,
  },
  {
    id: 6,
    element: <TimeClock />,
  },
];

export default function Pilot() {
  const [activeTabId, setActiveTabId] = useState(4);
  const selectedSection = useMemo(
    () => sections.find((section) => section.id === activeTabId),
    [activeTabId]
  );
  return (
    <div className="flex flex-col h-full border">
      {/* navigation */}
      <Tab activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
      {/* main section depends of active tab */}
      <div>{selectedSection ? selectedSection.element : null}</div>
    </div>
  );
}
