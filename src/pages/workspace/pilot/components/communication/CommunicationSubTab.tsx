import React, { useState } from 'react';
import { AiOutlineContacts } from 'react-icons/ai';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { RiWechatLine } from 'react-icons/ri';
import { useAppSelector } from '../../../../../app/hooks';
import SubtabDrag from '../SubtabDnd';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { pilotTabs } from '../../../../../app/constants/pilotTabs';

export const communicationOptions = [
  {
    id: 'email',
    name: 'email',
    icon: <MdOutlineMarkEmailUnread />,
    isVisible: false
  },
  { id: 'chat', name: 'chat', icon: <RiWechatLine />, isVisible: false },
  {
    id: 'contact',
    name: 'contact',
    icon: <AiOutlineContacts />,
    isVisible: false
  }
];
export default function CommunicationSubTab() {
  const idsFromLS: string[] = JSON.parse(localStorage.getItem('subTab') || '[]') as string[];
  const { showPilot, activeSubCommunicationTabId } = useAppSelector((state) => state.workspace);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const [items, setItems] = useState(
    communicationOptions.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id))
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

          localStorage.setItem('subTab', JSON.stringify([...sortArray.map((i) => i.id)]));

          return sortArray;
        });
      }
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e)}>
      <SortableContext strategy={rectSortingStrategy} items={items}>
        <div className={`flex  bg-primary-200 pb-0.5 ${showPilot ? 'flex-row' : 'flex-col border'}`}>
          {items.map((item) => (
            <SubtabDrag
              key={item.id}
              id={item.id}
              icon={item.icon}
              activeSub={activeSubCommunicationTabId}
              showPilot={showPilot}
              name={pilotTabs.CONNECT}
              items={items}
              item={item}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
