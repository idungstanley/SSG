import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import SideOver from '../../../../components/SideOver';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import Nav from './components/Nav';
import History from './components/History';
import Information from './components/Information';
import Permissions from './components/Permissions';
import CommentsForPilot from '../../../../components/Comments/CommentsForPilot';
import WatchersForPilot from '../../../../components/Watchers/WatchersForPilot';
import ChatForPilot from '../../../../components/Chat/ChatForPilot';

const sections = [
  {
    id: 0,
    element: <Information />,
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
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const onClose = () => {
    setActiveTabId(0);
    dispatch(setShowPilotSideOver({ show: false }));
  };

  const [activeTabId, setActiveTabId] = useState(0);

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === activeTabId),
    [activeTabId]
  );

  return (
    <SideOver
      show={pilotSideOver.show}
      onClose={onClose}
      title="Pilot"
      disableGapForChildren
    >
      {/* navigation */}
      <Nav activeTabId={activeTabId} setActiveTabId={setActiveTabId} />

      {/* main section depends of active tab */}
      {selectedSection ? selectedSection.element : null}
    </SideOver>
  );
}
