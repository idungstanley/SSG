import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { UseCreateChecklistItem } from '../../../../../features/task/checklist/checklistService';
import { useAppSelector } from '../../../../../app/hooks';
import { dataProps } from '../../../../../components/Index/walletIndex/WalletIndex';

interface checkListProps {
  Item: dataProps[];
  checklistId: string;
}
function ChecklistItem({ Item, checklistId }: checkListProps) {
  const [newItem, setNewItem] = useState<string>('');
  const [trigger, setTrigger] = useState<boolean>(false);
  const { currentTaskIdForPilot } = useAppSelector((state) => state.task);
  // const [items, setItems] = useState<Array<dataProps>>(Item);

  const { data: checklistItem } = UseCreateChecklistItem({
    task_id: currentTaskIdForPilot,
    checklistId: checklistId,
    triggerItem: trigger,
    name: newItem,
  });
  console.log(checklistItem);

  // useEffect(() => {
  //   if (checklistItem != undefined && checklistItem.success) {
  //     const newArr = [...Item];
  //     return newArr;
  //   }
  // }, [checklistItem]);

  const handleSubmit = () => {
    setTrigger(true);
    setNewItem('');
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
          onKeyDown={(e) => (e.key == 'Enter' ? handleSubmit() : null)}
        />
        <div className="opacity-0 hover:opacity-100 cursor-pointer">
          <BsThreeDots />
        </div>
      </span>
      {Item.map((item: dataProps) => {
        return <h1 key={item.id}>{item.name}</h1>;
      })}
    </div>
  );
}

export default ChecklistItem;
