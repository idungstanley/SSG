import React, { useEffect, useMemo, useState } from 'react';
import Nav from './components/Nav';
import History from './components/History';
import Information from './components/Information';
import Permissions from './components/Permissions';
import CommentsForPilot from '../../../../components/Comments/CommentsForPilot';
import WatchersForPilot from '../../../../components/Watchers/WatchersForPilot';
import ChatForPilot from '../../../../components/Chat/ChatForPilot';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { setActiveEntity } from '../../../../features/workspace/workspaceSlice';

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
  const [activeTabId, setActiveTabId] = useState(1);

  const { selectedFolderId, selectedFileId } = useAppSelector(
    (state) => state.explorer
  );

  useEffect(() => {
    const id = selectedFileId || selectedFolderId;
    const type = selectedFileId ? 'file' : 'folder';

    if (id) {
      dispatch(setShowPilotSideOver({ type, id, show: true }));
      dispatch(setActiveEntity({ id: id, type: type}));
    }

    return () => setActiveTabId(0);
  }, [selectedFileId, selectedFolderId]);

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === activeTabId),
    [activeTabId]
  );

  return (
    <>
      {/* navigation */}
      <Nav activeTabId={activeTabId} setActiveTabId={setActiveTabId} />

      {/* main section depends of active tab */}
      {selectedSection ? selectedSection.element : null}
    </>
  );
}
