import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UseCreatelistItemService,
  UseUpdateChecklistItemService,
} from "../../../../../../features/task/checklist/checklistService";
import { GrDrag } from "react-icons/gr";
import assign from "../../../../../../assets/icons/fileFormats/assign.svg";
import ChecklistModal from "./ChecklistModal";
import { completeOptions } from "../ModalOptions";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { setTriggerItemtUpdate } from "../../../../../../features/task/checklist/checklistSlice";

function ChecklistItem({ Item, checklistId, refetch }: any) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const [newItem, setNewItem] = useState<string>("");
  // const [editName, setEditName] = useState<string>("");
  const [itemId, setItemId] = useState<any>("");
  const [done, setDone] = useState<number>(0);

  const { triggerItemUpdate } = useAppSelector((state) => state.checklist);

  const createChecklist = useMutation(UseCreatelistItemService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleSubmit = async () => {
    await createChecklist.mutateAsync({
      checklist_id: checklistId,
      name: newItem,
    });
    setNewItem("");
  };

  const { data: updateRes, status: updateStatus } =
    UseUpdateChecklistItemService({
      checklist_id: checklistId,
      // name: editName,
      triggerItemUpdate: triggerItemUpdate,
      itemId: itemId,
      is_done: done,
    });

  const isDone = (id, done) => {
    setItemId(id);
    done === 0 ? setDone(1) : setDone(0);
    dispatch(setTriggerItemtUpdate(true));
    refetch();
  };

  return (
    <div>
      <span className="flex items-center">
        <label className="text-xl px-5">+</label>
        <input
          type="text"
          className="border-none hover:boder-none hover:outline-none focus:outline-none h-8 my-1"
          placeholder="New Checklist Item"
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
          onKeyDown={(e) => (e.key == "Enter" ? handleSubmit() : null)}
        />
      </span>
      {Item.map((item) => {
        return (
          <div
            key={item.id}
            className="flex items-center px-5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 py-0.5"
          >
            <span className="text-gray-200 justify-center cursor-move opacity-100 group-hover:opacity-100">
              <GrDrag className="text-base text-gray-200 opacity-30 w-4 h-4" />
            </span>
            <input
              type="checkbox"
              checked={item.is_done == 0 ? false : true}
              className="rounded-lg mx-3"
              onChange={() => {
                setItemId(item.id);
                isDone(item.id, item.is_done);
              }}
            />
            <h1 className="cursor-pointer">{item.name}</h1>
            <span className="p-1 border-2 border-dotted rounded-full mx-2">
              <img className="w-4 h-4" src={assign} alt="assign" />
            </span>
            <div>
              <ChecklistModal options={completeOptions} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChecklistItem;
