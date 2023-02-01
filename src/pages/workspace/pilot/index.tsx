import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import Tab from "./components/Tab";
import History from "../../newExplorer/components/Pilot/components/History";
import Permissions from "../../newExplorer/components/Pilot/components/Permissions";
import CommentsForPilot from "../../../components/Comments/CommentsForPilot";
import ChatForPilot from "../../../components/Chat/ChatForPilot";
import Commnunication from "./components/communication/Communication";
import Details from "./components/details/Details";
import TimeClock from "./components/timeClock/TimeClock";
import Checklist from "./components/checklist/Checklist";
import { useDispatch } from "react-redux";
import {
  setActiveSubCommunicationTabId,
  setActiveSubDetailsTabId,
} from "../../../features/workspace/workspaceSlice";

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
    element: <Checklist />,
  },
];

export default function Pilot() {
  const [activeTabId, setActiveTabId] = useState<number>(-1);
  const dispatch = useDispatch();
  const {
    showPilot,
    activeSubCommunicationTabId,
    activeItemId,
    activeSubDetailsTabId,
  } = useAppSelector((state) => state.workspace);
  const hoverRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log(activeItemId);
    if (activeItemId != null) {
      setActiveTabId(4);
    }
    const checkHoverOutside = () => {
      if (showPilot === false && hoverRef.current) {
        dispatch(setActiveSubCommunicationTabId(null));
        dispatch(setActiveSubDetailsTabId(null));
      }
    };
    hoverRef.current?.addEventListener("mouseleave", checkHoverOutside);
    return () => {
      hoverRef.current?.removeEventListener("mouseleave", checkHoverOutside);
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
    <div
      className={`flex h-full ease-in-out delay-300 duration-300 transition-all transform bg-white border ${
        !showPilot && selectedSection
          ? "flex-row fixed z-40 top-16 right-0"
          : "flex-col"
      }`}
      ref={hoverRef}
    >
      {/* navigation */}
      <Tab activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
      {/* main section depends of active tab */}
      <div>{selectedSection ? selectedSection.element : null}</div>
    </div>
  );
}
