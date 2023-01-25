import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import SideOver from '../../../components/SideOver';
import {
  setShowPilotSideOver,
  setShowPilotSideOverHub,
} from '../../../features/general/slideOver/slideOverSlice';
import Tab from './components/Tabs';
import History from '../../newExplorer/components/Pilot/components/History';
import Information from '../../newExplorer/components/Pilot/components/Information';
import Permissions from '../../newExplorer/components/Pilot/components/Permissions';
import CommentsForPilot from '../../../components/Comments/CommentsForPilot';
import WatchersForPilot from '../../../components/Watchers/WatchersForPilot';
import ChatForPilot from '../../../components/Chat/ChatForPilot';
import Commnunication from './components/Communication';

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
    element: <WatchersForPilot />,
  },
  {
    id: 5,
    element: <CommentsForPilot />,
  },
];

export default function Pilot() {
  const dispatch = useAppDispatch();
  const onClose = () => {
    setActiveTabId(0);
    dispatch(setShowPilotSideOverHub({ show: false }));
  };
  const [activeTabId, setActiveTabId] = useState(0);

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === activeTabId),
    [activeTabId]
  );

  return (
    <div className="flex flex-col h-full border">
      {/* navigation */}
      <Tab activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
      <div>{selectedSection ? selectedSection.element : null}</div>
      {/* main section depends of active tab */}
    </div>
  );
}
