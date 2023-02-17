import React, { useState } from "react";
import { useAppSelector } from "../../../../../../app/hooks";
// import propertiesIcon from "../../../../../assets/branding/properties-icon.png";
import SubtabDrag from "../../SubtabDnd";
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
import { TbChecklist, TbCheckupList } from "react-icons/tb";

export const ChecklistOptions = [
  {
    id: 1,
    name: "Checklist",
    icon: <TbCheckupList />,
    isVisible: false,
  },
  {
    id: 2,
    name: "Add Checklist",
    icon: <TbChecklist />,
    isVisible: false,
  },
];

export default function ChecklistSubtab() {
  const { showPilot, activeSubChecklistTabId } = useAppSelector(
    (state) => state.workspace
  );

  const idsFromLS = JSON.parse(localStorage.getItem("checklistdrag") || "[]");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [items, setItems] = useState(
    ChecklistOptions.sort(
      (a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)
    )
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

          const sortArray: (
            | {
                id: number;
                name: string;
                icon: JSX.Element;
                isVisible: boolean;
              }
            | {
                id: number;
                label: string;
                icon: JSX.Element;
                name: string;
                source?: undefined;
                isVisible: boolean;
              }
          )[] = arrayMove(items, oldIndex, newIndex);

          localStorage.setItem(
            "checklistdrag",
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
      <SortableContext strategy={rectSortingStrategy} items={items}>
        <section>
          <div
            className={`flex bg-gray-400 pt-0.5 ${
              showPilot ? "flex-row" : "flex-col"
            }`}
          >
            {ChecklistOptions.map((item) => {
              console.log(item);
              return (
                <SubtabDrag
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  activeSub={activeSubChecklistTabId}
                  showPilot={showPilot}
                  name={"Checklist"}
                />
              );
            })}
          </div>
        </section>
      </SortableContext>
    </DndContext>
  );
}
