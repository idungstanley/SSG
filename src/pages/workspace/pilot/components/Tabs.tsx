import React, { useState } from "react";
import communicationIcon from "../../../../assets/branding/communication.png";
import logsIcon from "../../../../assets/branding/logs.png";
import detailIcon from "../../../../assets/branding/detail.png";
import automationIcon from "../../../../assets/branding/automation.png";
import propertiesIcon from "../../../../assets/branding/properties-icon.png";
import permissionIcon from "../../../../assets/branding/permission.png";
import { classNames } from "../../../../utils";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronDoubleUp,
} from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAppSelector } from "../../../../app/hooks";
import { useDispatch } from "react-redux";
import {
  setShowPilot,
  setShowPilotIconView,
} from "../../../../features/workspace/workspaceSlice";

const pilotOptions = [
  {
    id: 0,
    name: "communication",
    source: communicationIcon,
  },
  {
    id: 1,
    name: "Logs",
    source: logsIcon,
  },
  {
    id: 2,
    name: "Permissions",
    source: permissionIcon,
  },
  {
    id: 3,
    name: "Properties",
    source: propertiesIcon,
  },
  {
    id: 4,
    name: "Details",
    source: detailIcon,
  },
  {
    id: 5,
    name: "Automation",
    source: automationIcon,
  },
];

interface TabProps {
  activeTabId: number;
  setActiveTabId: (i: number) => void;
}
function Tab({ activeTabId, setActiveTabId }: TabProps) {
  const dispatch = useDispatch();
  const [pilots, setPilots] = useState<any>(pilotOptions);
  const { showPilot, showPilotIconView } = useAppSelector(
    (state) => state.workspace
  );
  const handleClick = (tabId: number) => {
    setActiveTabId(tabId);
  };
  const handleShowPilot = () => {
    if (showPilot) {
      dispatch(setShowPilot(false));
    } else {
      dispatch(setShowPilot(true));
    }
  };
  const handleShowPilotIconView = () => {
    if (showPilotIconView) {
      dispatch(setShowPilotIconView(false));
    } else {
      dispatch(setShowPilotIconView(true));
    }
  };

  // Save reference for dragItem and dragOverItem
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  const handleSort = () => {
    const _pilotOptions = [...pilotOptions];
    const draggedItemContent = _pilotOptions.splice(dragItem.current, 1)[0];
    _pilotOptions.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setPilots(_pilotOptions);
  };

  return (
    <div
      className={`gap-4 pb-1  ${showPilot ? "w-full border" : "w-12"}`}
      aria-label="Tabs"
    >
      <div
        className={`flex items-center h-fit px-2 ${
          showPilot ? "flex-row py-2" : "flex-col gap-1"
        }`}
      >
        <HiChevronDoubleRight
          onClick={() => handleShowPilot()}
          className={`cursor-pointer ${
            showPilot ? "-rotate-180 translate-x-4 skew-y-3" : "mb-1"
          }`}
        />
        <BsThreeDotsVertical />
      </div>
      <div
        className={`flex relative divide-x ${
          showPilot ? "flex-row" : "flex-col"
        } ${showPilotIconView ? "" : "flex-wrap"}`}
      >
        {showPilot && (
          <span
            className={`absolute left-0 z-10 top-2.5 hover:text-green-500 ${
              showPilotIconView && "text-green-500"
            }`}
          >
            <HiChevronDoubleUp onClick={() => handleShowPilotIconView()} />
          </span>
        )}
        {pilots.map((item, index) => (
          <div
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e)=>e.preventDefault()}
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={classNames(
              item.id === activeTabId
                ? "bg-gray-300 text-black"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
              showPilot ? "border-y-2 border gap-2" : "py-3",
              showPilotIconView ? "w-12" : "",
              "px-3 relative py-2 font-medium h-fit flex-grow cursor-pointer flex justify-center transition"
            )}
            aria-current={item.id === activeTabId ? "page" : undefined}
          >
            {item.id === activeTabId && (
              <span className="absolute top-0 left-0 right-0 bg-green-500 h-0.5 w-fit"></span>
            )}
            <img src={item.source} alt="" className="w-4 h-4" />
            <p
              className={`text-xs ${showPilot ? "block" : "hidden"} ${
                showPilotIconView ? "hidden" : "block"
              }`}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tab;
