import React, { useState, FormEvent } from "react";
import { Disclosure } from "@headlessui/react";
import { GrDrag } from "react-icons/gr";
import { BiCaretRight } from "react-icons/bi";
import ChecklistModal from "./components/ChecklistModal";
import { completeOptions } from "./ModalOptions";
import { itemProps } from "./components/ChecklistItem";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { UseUpdateChecklistService } from "../../../../../features/task/checklist/checklistService";
import { setTriggerChecklistUpdate } from "../../../../../features/task/checklist/checklistSlice";
import ChecklistItem from "./components/ChecklistItem";
import { useSortable } from "@dnd-kit/sortable";

interface checklistArr {
  id: string;
  name: string;
  is_done: number;
  items: itemProps[];
}

function SingleChecklist({ item, id }: { item: checklistArr; id: string }) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>("");
  // Local states
  const [checklistName, setChecklistName] = useState<string>("");

  const [checklistId, setChecklistId] = useState<string>("");

  const { triggerChecklistUpdate } = useAppSelector((state) => state.checklist);

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

  const editChecklist = (name: string) => {
    setChecklistName(name);
    setEditing(true);
  };

  const handleEdit = (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    dispatch(setTriggerChecklistUpdate(true));
    setEditing(false);
    setChecklistId(id);
  };

  // Update Checklist
  // const { status: updateStatus } =
  UseUpdateChecklistService({
    checklist_id: checklistId,
    name: checklistName,
    triggerUpdate: triggerChecklistUpdate,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    backgroundColor: isDragging ? "#f3f4f6" : undefined,
    zIndex: isDragging ? 1 : undefined,
  };
  const done = item.items.filter((e: { is_done: number }) => e.is_done);

  return (
    // <div style={style}>
    <Disclosure key={item.id}>
      {({ open }) => (
        <div style={style}>
          <div className="group flex items-center border-2 border-t-0 p-1 hover:text-gray-700 hover:bg-gray-200 cursor-pointer">
            <span
              className="text-gray-200 justify-center cursor-move opacity-0 group-hover:opacity-100"
              ref={setNodeRef}
              {...attributes}
              {...listeners}
            >
              <GrDrag className="text-base text-gray-200 opacity-30 w-4 h-4" />
            </span>
            <span className="px-5 flex items-center">
              <Disclosure.Button>
                <div className="mx-1">
                  <BiCaretRight
                    className={open ? "rotate-90 transform w-4 h-4" : ""}
                  />
                </div>
              </Disclosure.Button>
              <div>
                <form onSubmit={(e) => handleEdit(e, item.id)}>
                  <input
                    type="text"
                    value={
                      editing && item.id == itemId ? checklistName : item.name
                    }
                    onChange={(e) => setChecklistName(e.target.value)}
                    onFocus={() => {
                      editChecklist(item.name);
                      setItemId(item.id);
                    }}
                    className="outline-none border-none hover:outline-none hover:border-none hover:bg-gray-200 focus:bg-white h-9 w-40 rounded"
                  />
                </form>
              </div>
              <label>
                ({done.length}/{item.items.length})
              </label>
            </span>
            <div className="opacity-0 group-hover:opacity-100">
              <ChecklistModal options={completeOptions} checklistId={item.id} />
            </div>
          </div>
          <Disclosure.Panel className="ml-6">
            <ChecklistItem Item={item.items} checklistId={item.id} />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

export default SingleChecklist;
