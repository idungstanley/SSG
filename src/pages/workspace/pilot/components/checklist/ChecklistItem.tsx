import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { UseCreateChecklistItem } from "../../../../../features/task/checklist/checklistService";
import { useAppSelector } from "../../../../../app/hooks";
import { getOneTaskServices } from "../../../../../features/task/taskService";

function ChecklistItem({ Item, checklistId }: any) {
  const [newItem, setNewItem] = useState<any>("");
  const [trigger, setTrigger] = useState<any>(false);
  const { currentTaskIdForPilot } = useAppSelector((state) => state.task);
  const [items, setItems] = useState<any>(Item);

  const { data: checklistItem, status } = UseCreateChecklistItem({
    task_id: currentTaskIdForPilot,
    checklistId: checklistId,
    triggerItem: trigger,
    name: newItem,
  });
  // console.log(checklistItem);
  useEffect(() => {
    if (checklistItem != undefined && checklistItem.success) {
      const newArr = [...items];
      // console.log(newArr);
      // newArr.push(checklistItem.datatask_checklist_item);
    }
  }, [checklistItem]);

  const handleSubmit = (e) => {
    setTrigger(true);
    setNewItem("");
    // console.log(currentTaskIdForPilot);
    // setNewItem(e.target.value);
  };
  return (
    <div>
      <span className="flex items-center">
        <label className="text-xl px-5">+</label>
        <input
          type="text"
          className="border-none hover:boder-none hover:outline-none"
          placeholder="New Checklist Item"
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
          onKeyDown={(e) => (e.key == "Enter" ? handleSubmit(e) : null)}
        />
        <div className="opacity-0 hover:opacity-100 cursor-pointer">
          <BsThreeDots />
        </div>
      </span>
      {items.map((item) => {
        return <h1 key={item.id}>{item.name}</h1>;
      })}
    </div>
  );
}

export default ChecklistItem;
