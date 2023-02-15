import React, { useEffect, useMemo, useRef } from 'react';
import { useAppSelector } from '../../../app/hooks';
import Tab from './components/Tabs';
import Checklists from './components/checklist/components/Checklist';
import History from '../../explorer/components/Pilot/components/History';
import Permissions from '../../explorer/components/Pilot/components/Permissions';
import CommentsForPilot from '../../../components/Comments/CommentsForPilot';
import Commnunication from './components/communication/Communication';
import Details from './components/details/Details';
import { useDispatch } from 'react-redux';
import TimeClock from './components/timeClock/subtabs/TimeClock';
import {
  setActiveSubCommunicationTabId,
  setActiveSubDetailsTabId,
  setActiveTabId,
} from '../../../features/workspace/workspaceSlice';

const sections = [
  {
    id: 1,
    element: <Commnunication />,
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
  {
    id: 7,
    element: <Checklists />,
  },
];

export default function Pilot() {
  const dispatch = useDispatch();
  const {
    showPilot,
    activeSubCommunicationTabId,
    activeItemId,
    activeSubDetailsTabId,
    activeTabId,
  } = useAppSelector((state) => state.workspace);
  const hoverRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const checkHoverOutside = () => {
      if (showPilot === false && hoverRef.current) {
        dispatch(setActiveSubCommunicationTabId(null));
        dispatch(setActiveSubDetailsTabId(null));
        dispatch(setActiveTabId(0));
      }
    };
    hoverRef.current?.addEventListener('mouseleave', checkHoverOutside);
    return () => {
      hoverRef.current?.removeEventListener('mouseleave', checkHoverOutside);
    };
  }, [
    activeSubCommunicationTabId,
    activeItemId,
    activeSubDetailsTabId,
    showPilot,
    hoverRef,
  ]);
  const selectedSection = useMemo(
    () => sections.find((section) => section.id === activeTabId),
    [activeTabId]
  );
  return (
    <div className="pr-0.5">
      <div
        className={`flex ease-in-out overflow-y-auto pr-1 transition-all transform bg-white border-l border-r h-screen ${
          !showPilot && selectedSection
            ? 'flex-row fixed z-40 top-16 right-0'
            : 'flex-col'
        }`}
        ref={hoverRef}
        style={{ minHeight: '0', maxHeight: '100vh' }}
      >
        {/* navigation */}
        <Tab />
        {/* main section depends of active tab */}
        <div>{selectedSection ? selectedSection.element : null}</div>
      </div>
    </div>
  );
}
