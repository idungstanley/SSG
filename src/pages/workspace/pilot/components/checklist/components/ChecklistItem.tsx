import React, { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  UseCreatelistItemService,
  UseDeleteChecklistItemService,
  UseUpdateChecklistItemService,
} from "../../../../../../features/task/checklist/checklistService";
import { GrDrag } from "react-icons/gr";
import assign from "../../../../../../assets/icons/fileFormats/assign.svg";
import ChecklistModal from "./ChecklistModal";
import { lessOptions } from "../ModalOptions";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import {
  setClickChecklistItemId,
  setTriggerItemtUpdate,
} from "../../../../../../features/task/checklist/checklistSlice";

interface item {
  id: string;
  name: string;
  is_done: number;
}
interface checkListItemProps {
  Item: item[];
  checklistId: string;
  refetch: () => void;
}

function ChecklistItem({ Item, checklistId, refetch }: checkListItemProps) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const [newItem, setNewItem] = useState<string>("");
  const [itemId, setItemId] = useState<any>("");
  const [done, setDone] = useState<number>(0);
  const [editItemName, setEditItemName] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [editName, setEditName] = useState<string>("");

  const {
    triggerDelChecklistItem,
    clickedChecklistId,
    clickedChecklistItemId,
    triggerItemUpdate,
  } = useAppSelector((state) => state.checklist);

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

  const { status: updateStatus } = UseUpdateChecklistItemService({
    checklist_id: checklistId,
    name: editName,
    triggerItemUpdate: triggerItemUpdate,
    itemId: itemId,
    done,
  });

  if (updateStatus === "success") {
    refetch();
  }

  const isDone = (id: string, done: number, name) => {
    setItemId(id);
    setEditName(name);
    done === 0 ? setDone(1) : setDone(0);
    dispatch(setTriggerItemtUpdate(true));
  };

  const handleEditItemName = (id: string, done: number) => {
    console.log(editName);
    setItemId(id);
    setDone(done);
    dispatch(setTriggerItemtUpdate(true));
    setEditItemName(false);
  };

  const { status: theStatus } = UseDeleteChecklistItemService({
    query: clickedChecklistId,
    itemId: clickedChecklistItemId,
    delItem: triggerDelChecklistItem,
  });

  return (
    <div>
      <span className="flex items-center">
        <label className="text-xl px-5">+</label>
        <input
          autoFocus={true}
          type="text"
          className="border-none hover:border-none hover:outline-none focus:outline-none h-8 my-1"
          placeholder="New Checklist Item"
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
          onKeyDown={(e) => (e.key == "Enter" ? handleSubmit() : null)}
        />
      </span>
      {Item.map((item: { id: string; is_done: number; name: string }) => {
        return (
          <div key={item.id}>
            {/* {item.id == editId && editItemName ? ( */}

            {/* <div> */}
            {/* <input */}
            {/* //     // autoFocus={false}
              //     className="ml-6 w-50 h-8 border-none hover:boder-none hover:outline-none focus:outline-none"
              //     type="text"
              //     value={editName}
              //     onKeyDown={ */}
            {/* //       (e) => {
              //         if (e.key === "Enter") {
              //           handleEditItemName(item.id, item.is_done);
              //         }
              //       }
              //       // e.key == "Enter" ? handleEditItemName(item.id) : null
              //     }
              //     onChange={(e) => setEditName(e.target.value)}
              //   />
              // </div> */}
            <div className="group flex items-center px-5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 py-0.5">
              <span className="text-gray-200 justify-center cursor-move opacity-0 group-hover:opacity-100">
                <GrDrag className="text-base text-gray-200 opacity-30 w-4 h-4" />
              </span>
              <input
                type="checkbox"
                checked={item.is_done == 0 ? false : true}
                className="rounded-lg mx-3"
                onChange={() => {
                  setItemId(item.id);
                  isDone(item.id, item.is_done, item.name);
                }}
              />
              <input
                // autoFocus={false}
                className="outline-none border-none hover:outline-none hover:border-none hover:bg-gray-200 focus:bg-white h-7 w-36 rounded"
                type="text"
                value={item.id == editId && editItemName ? editName : item.name}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEditItemName(item.id, item.is_done);
                  }
                }}
                onChange={(e) => setEditName(e.target.value)}
                onFocus={() => {
                  setEditItemName(true);
                  setItemId(item.id);
                }}
              />
              <span className="p-1 border-2 border-dotted rounded-full mx-2">
                <img className="w-4 h-4" src={assign} alt="assign" />
              </span>
              <div className="opacity-0 group-hover:opacity-100">
                <ChecklistModal
                  options={lessOptions}
                  checklistId={checklistId}
                  checklistItemId={item.id}
                />
              </div>
            </div>
            {/* ) : ""} */}
          </div>
        );
      })}
    </div>
  );
}

export default ChecklistItem;
