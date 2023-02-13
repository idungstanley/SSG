import React from "react";
import { MdDragIndicator } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";
import {
  setActiveSubChecklistTabId,
  setActiveSubCommunicationTabId,
  setActiveSubDetailsTabId,
} from "../../../../../features/workspace/workspaceSlice";

interface TabProps {
  id: number;
  icon?: JSX.Element;
  showPilot?: boolean;
  activeSub?: number;
  name: string;
  source?: string;
}

export default function SubtabDrag({
  id,
  icon,
  showPilot,
  activeSub,
  name,
  source,
}: TabProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const dispatch = useDispatch();

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    backgroundColor: isDragging ? "#f3f4f6" : undefined,
    zIndex: isDragging ? 1 : undefined,
  };

  const handleClick = (id: number) => {
    if (name === "connect") {
      dispatch(setActiveSubCommunicationTabId(id));
    } else if (name === "details") {
      dispatch(setActiveSubDetailsTabId(id));
    } else if (name === "Checklist") {
      dispatch(setActiveSubChecklistTabId(id));
    }
  };

  return (
    <section
      className={`flex flex-col w-full bg-white ${
        id === activeSub && showPilot ? "rounded-t-lg bg-white" : ""
      }`}
      key={id}
      style={style}
    >
      <div
        key={id}
        onClick={() => handleClick(id)}
        className={`relative flex justify-center flex-grow py-2 font-medium text-gray-500 transition cursor-pointer group hover:text-gray-700 border-y-2 ${
          id === activeSub && showPilot && "rounded-t-lg bg-white"
        } ${id != activeSub && showPilot && "rounded-b-lg bg-gray-400"}`}
      >
        <span
          className={`absolute left-2 text-gray-500 justify-center text-xl cursor-move opacity-0 group-hover:opacity-100 ${
            showPilot ? "block" : "hidden"
          }`}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
        >
          <MdDragIndicator />
        </span>
        <span
          className={`${!showPilot && "text-xs"} ${
            id === activeSub && !showPilot && "bg-green-500 p-2 rounded"
          }`}
        >
          {icon ? (
            icon
          ) : (
            <img src={source} alt="Hub Icon" className="w-3 h-3" />
          )}
        </span>
      </div>
    </section>
  );
}
