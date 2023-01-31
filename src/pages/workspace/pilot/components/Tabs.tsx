import React, { useState } from "react";
import communicationIcon from "../../../../assets/branding/communication.png";
import logsIcon from "../../../../assets/branding/logs.png";
import detailIcon from "../../../../assets/branding/detail.png";
import automationIcon from "../../../../assets/branding/automation.png";
import timeclockIcon from "../../../../assets/branding/timeclock.png";
import propertiesIcon from "../../../../assets/branding/properties-icon.png";
import permissionIcon from "../../../../assets/branding/permission.png";
import { classNames } from "../../../../utils";
import { HiChevronDoubleRight, HiChevronDoubleUp } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAppSelector } from "../../../../app/hooks";
import { useDispatch } from "react-redux";
import {
  setShowPilot,
  setShowPilotIconView,
} from "../../../../features/workspace/workspaceSlice";
import { MdDragIndicator } from "react-icons/md";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortMe from "../../../../utils/DragnDrop";

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
  {
    id: 6,
    name: "TimeClock",
    source: timeclockIcon,
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
    console.log(tabId);
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

  const [items, setItems] = useState<IItem[]>([
    {
      id: 1,
      name: "communication",
      source: communicationIcon,
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
      name: "Properties",
      source: propertiesIcon,
    },
    {
      id: 5,
      name: "Details",
      source: detailIcon,
    },
    {
      id: 6,
      name: "Automation",
      source: automationIcon,
    },
    {
      id: 7,
      name: "TimeClock",
      source: timeclockIcon,
    },
  ]);
  // Drag an drop functionality
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  const handleSort = () => {
    const _pilotOptions = [...items];
    const draggedItemContent = _pilotOptions.splice(dragItem.current, 1)[0];
    _pilotOptions.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setItems(_pilotOptions);
  };

  interface IItem {
    id: number;
    name: string;
    source: any;
  }

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

          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  };

  return (
    <div
      className={`gap-4 pb-1  ${showPilot ? "w-full border" : "w-12"}`}
      aria-label="Tabs"
    >
      <div
        className={`flex items-center h-fit px-1 ${
          showPilot ? "flex-row py-2" : "flex-col gap-1"
        }`}
      >
        <HiChevronDoubleRight
          onClick={() => handleShowPilot()}
          className={`cursor-pointer ${
            showPilot ? "translate-x-4 skew-y-3" : "transform -rotate-180 mb-1"
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
            className={`absolute left-1 z-10 text-xs top-2.5 hover:text-green-500 ${
              showPilotIconView && "text-green-500"
            }`}
          >
            <HiChevronDoubleUp onClick={() => handleShowPilotIconView()} />
          </span>
        )}
        {items.map((item, index) => (
          <div
            draggable
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={classNames(
              item.id === activeTabId
                ? "bg-gray-300 text-black"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
              showPilot ? "border-y-2 border gap-2 pr-6" : "py-3 px-3",
              showPilotIconView ? "w-12" : "",
              "relative group py-2 font-medium h-fit flex-grow items-center cursor-pointer flex justify-center transition"
            )}
            aria-current={item.id === activeTabId ? "page" : undefined}
          >
            {item.id === activeTabId && (
              <span className="absolute top-0 left-0 right-0 bg-green-500 h-0.5 w-fit"></span>
            )}
            <div className="flex items-center">
              <span
                className={`text-gray-500 justify-center text-xl cursor-move opacity-0 group-hover:opacity-100 ${
                  showPilot ? "block" : "hidden"
                }`}
              >
                <MdDragIndicator />
              </span>
              <img src={item.source} alt="" className="w-4 h-4" />
            </div>
            <p
              className={`text-xs ${showPilot ? "block" : "hidden"} ${
                showPilotIconView ? "hidden" : "block"
              }`}
            >
              {item.name}
            </p>
          </div>
        ))}
        {/* <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(e) => handleDragEnd(e)}
        >
          <SortableContext strategy={rectSortingStrategy} items={items}>
            {items.map((item) => (
              <div
                draggable
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={classNames(
                  item.id === activeTabId
                    ? "bg-gray-300 text-black"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
                  showPilot ? "border-y-2 border gap-2 pr-6" : "py-3 px-3",
                  showPilotIconView ? "w-12" : "",
                  "relative group py-2 font-medium h-fit flex-grow items-center cursor-pointer flex justify-center transition"
                )}
                aria-current={item.id === activeTabId ? "page" : undefined}
              >
                {item.id === activeTabId && (
                  <span className="absolute top-0 left-0 right-0 bg-green-500 h-0.5 w-fit"></span>
                )}
                <div className="flex items-center">
                  <span
                    className={`text-gray-500 justify-center text-xl cursor-move opacity-0 group-hover:opacity-100 ${
                      showPilot ? "block" : "hidden"
                    }`}
                  >
                    <MdDragIndicator />
                  </span>
                  <img src={item.source} alt="" className="w-4 h-4" />
                </div>
                <SortMe
                  key={item.id}
                  id={item.id}
                  label={item.name}
                  showPilot={showPilot}
                  showPilotIconView={showPilotIconView}
                />
              </div>
            ))}
          </SortableContext>
        </DndContext> */}
      </div>
      <div className="container mx-auto w-full mt-5">
        <div className="border p-2 bg-gray-100 gap-2 grid grid-rows-2 grid-cols-3 overflow-hidden">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(e) => handleDragEnd(e)}
          >
            <SortableContext strategy={rectSortingStrategy} items={items}>
              {items.map((item) => (
                <div
                  draggable
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={classNames(
                    item.id === activeTabId
                      ? "bg-gray-300 text-black"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
                    showPilot ? "border-y-2 border gap-2 pr-6" : "py-3 px-3",
                    showPilotIconView ? "w-12" : "",
                    "relative group py-2 font-medium h-fit flex-grow items-center cursor-pointer flex justify-center transition"
                  )}
                  aria-current={item.id === activeTabId ? "page" : undefined}
                >
                  {item.id === activeTabId && (
                    <span className="absolute top-0 left-0 right-0 bg-green-500 h-0.5 w-fit"></span>
                  )}
                  <div className="flex items-center">
                    <span
                      className={`text-gray-500 justify-center text-xl cursor-move opacity-0 group-hover:opacity-100 ${
                        showPilot ? "block" : "hidden"
                      }`}
                    >
                      <MdDragIndicator />
                    </span>
                    <img src={item.source} alt="" className="w-4 h-4" />
                  </div>
                  <SortMe
                    key={item.id}
                    id={item.id}
                    label={item.name}
                    showPilot={showPilot}
                    showPilotIconView={showPilotIconView}
                  />
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default Tab;
