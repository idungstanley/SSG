import React, { useState } from "react";
import communicationIcon from "../../../../assets/branding/communication.png";
import logsIcon from "../../../../assets/branding/logs.png";
import detailIcon from "../../../../assets/branding/detail.png";
import automationIcon from "../../../../assets/branding/automation.png";
import timeclockIcon from "../../../../assets/branding/timeclock.png";
import permissionIcon from "../../../../assets/branding/permission.png";
import checklistIcon from "../../../../assets/branding/checklist-icon.svg";
import { HiChevronDoubleRight, HiChevronDoubleUp } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAppSelector } from "../../../../app/hooks";
import { useDispatch } from "react-redux";
import {
  setShowPilot,
  setShowPilotIconView,
} from "../../../../features/workspace/workspaceSlice";
import DetailsSubTab from "./details/DetailsSubTab";
import CommunicationSubTab from "./communication/CommunicationSubTab";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import TabDrag from "./TabDrags";

interface TabProps {
  activeTabId: number;
  setActiveTabId: (i: number) => void;
}

const pilotOptions = [
  {
    id: 1,
    name: "Connect",
    source: communicationIcon,
    subTab: <CommunicationSubTab />,
  },
  {
    id: 2,
    name: "Logs",
    source: logsIcon,
  },
  {
    id: 3,
    name: "Permissions",
    source: permissionIcon,
  },

  {
    id: 4,
    name: "Details",
    source: detailIcon,
    subTab: <DetailsSubTab />,
  },
  {
    id: 5,
    name: "Automation",
    source: automationIcon,
  },
  {
    id: 6,
    name: "TimeClock",
    source: timeclockIcon,
  },
  {
    id: 7,
    name: "Checklist",
    source: checklistIcon,
  },
];
function Tab({ activeTabId, setActiveTabId }: TabProps) {
  const dispatch = useDispatch();
  const { showPilot, showPilotIconView, activeItemName, activeItemType } =
    useAppSelector((state) => state.workspace);
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

  const idsFromLS = JSON.parse(localStorage.getItem("pilotSections") || "[]");

  const [items, setItems] = useState(
    pilotOptions.sort(
      (a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)
    )
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.id !== over?.id) {
      const findActive = items.find((i) => i.id === active.id);
      const findOver = items.find((i) => i.id === over?.id);

      if (findActive && findOver) {
        setItems((items) => {
          const oldIndex = items.indexOf(findActive);
          const newIndex = items.indexOf(findOver);

          const sortArray = arrayMove(items, oldIndex, newIndex);

          localStorage.setItem(
            "pilotSections",
            JSON.stringify([...sortArray.map((i) => i.id)])
          );

          return sortArray;
        });
      }
    }
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(e) => handleDragEnd(e)}
    >
      <div
        className={`gap-4 pb-1 border  ${showPilot ? "w-full" : "w-12"}`}
        aria-label="Tabs"
      >
        <section>
          <div id="entity" className="flex -mb-3 p-1 text-xs capitalize">
            <p className="text-gray-600"> {activeItemType && activeItemType}</p>
            <p>:</p>
            <p className="pl-1 text-gray-500 capitalize">
              {activeItemName && activeItemName}
            </p>
          </div>
          <div
            className={`flex items-center h-fit px-2 ${
              showPilot ? "flex-row py-2" : "flex-col gap-1"
            }`}
          >
            <HiChevronDoubleRight
              onClick={() => handleShowPilot()}
              className={`cursor-pointer ${
                showPilot
                  ? "translate-x-4 skew-y-3"
                  : "transform -rotate-180 mb-1"
              }`}
            />
            <BsThreeDotsVertical />
          </div>
        </section>
        <div
          className={`flex relative divide-x ${
            showPilot ? "flex-row" : "flex-col"
          } ${showPilotIconView ? "" : "flex-wrap"}`}
        >
          {showPilot && (
            <span
              className={`absolute left-1 z-10 text-xs top-2.5 hover:text-green-500 ${
                showPilotIconView && "text-green-500"
              }`}
            >
              <HiChevronDoubleUp onClick={() => handleShowPilotIconView()} />
            </span>
          )}
          <SortableContext strategy={rectSortingStrategy} items={items}>
            {items.map((item) => (
              <TabDrag
                key={item.id}
                id={item.id}
                name={item.name}
                source={item.source}
                activeTabId={activeTabId}
                setActiveTabId={setActiveTabId}
                showPilot={showPilot}
                showPilotIconView={showPilotIconView}
                subTab={item.subTab}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}

export default Tab;
