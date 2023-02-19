import React, { useState } from "react";
import { useAppSelector } from "../../../../../../app/hooks";
import {
  UseCreateClistService,
  UseDeleteChecklistService,
  UseGetAllClistService,
} from "../../../../../../features/task/checklist/checklistService";
import { Spinner } from "../../../../../../common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GoPlus } from "react-icons/go";
import SingleChecklist from "../SingleChecklist";
import { itemProps } from "../components/ChecklistItem";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

export default function ChecklistIndex() {
  const queryClient = useQueryClient();
  // RTK states
  const { currentTaskIdForPilot } = useAppSelector((state) => state.task);
  const { triggerDelChecklist, clickedChecklistId } = useAppSelector(
    (state) => state.checklist
  );

  //Create Checklist
  const createChecklist = useMutation(UseCreateClistService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleSubmit = async () => {
    await createChecklist.mutateAsync({
      task_id: currentTaskIdForPilot,
    });
  };

  // Get Checklists
  const { data, status } = UseGetAllClistService({
    task_id: currentTaskIdForPilot,
  });
  const task_checklist = data?.data.task.checklists;

  UseDeleteChecklistService({
    query: clickedChecklistId,
    delChecklist: triggerDelChecklist,
  });

  const idsFromLS = JSON.parse(localStorage.getItem("checklist") || "[]");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // const [items, setItems] = useState(
  //   task_checklist?.sort(
  //     (a: { id: string }, b: { id: string }) =>
  //       idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)
  //   )
  // );

  const [items, setItems] = useState(
    task_checklist?.sort(
      (a: { id: string }, b: { id: string }) =>
        idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)
    ) || []
  );

  const handleDragEnd = (e: DragEndEvent) => {
    console.log("Drag ke");
    const { active, over } = e;

    if (active.id !== over?.id) {
      const findActive = items.find(
        (i: { id: UniqueIdentifier }) => i.id === active.id
      );
      const findOver = items.find(
        (i: { id: UniqueIdentifier | undefined }) => i.id === over?.id
      );

      if (findActive && findOver) {
        setItems((items: [{ id: string }]) => {
          const oldIndex = items?.indexOf(findActive);
          const newIndex = items?.indexOf(findOver);

          const sortArray = arrayMove(items, oldIndex, newIndex);

          localStorage.setItem(
            "checklist",
            JSON.stringify([...sortArray?.map((i: { id: string }) => i.id)])
          );

          return sortArray;
        });
      }
    }
  };

  if (status == "loading") {
    <Spinner size={20} color={"blue"} />;
  }

  return status == "success" ? (
    <div className="p-1">
      <div className="border-2 flex justify-between items-center text-center py-2">
        <h1 className="text-xl ml-8">Checklists</h1>
        <div
          className="rounded-full text-xl cursor-pointer hover:bg-gray-300 mx-3 p-1"
          onClick={handleSubmit}
        >
          <GoPlus className="w-3 h-3" />
        </div>
      </div>
      <div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(e) => handleDragEnd(e)}
        >
          <SortableContext strategy={rectSortingStrategy} items={items}>
            {task_checklist?.length > 0
              ? task_checklist?.map(
                  (item: {
                    id: string;
                    name: string;
                    is_done: number;
                    items: itemProps[];
                  }) => {
                    return (
                      <SingleChecklist key={item.id} item={item} id={item.id} />
                    );
                  }
                )
              : "This task has no Checklist, click on the plus sign to create one"}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  ) : null;
}
