import React, { useState } from 'react';
import { MdAddToPhotos } from 'react-icons/md';
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
import { BsClipboardData } from 'react-icons/bs';
import { pilotTabs } from '../../../../../app/constants/pilotTabs';

export const DetailOptions = [
  {
    id: pilotTabs.PROPERTIES,
    name: 'Properties',
    icon: <BsClipboardData />,
    isVisible: false
  },
  {
    id: pilotTabs.ATTACHMENTS,
    name: 'Attachments',
    icon: <MdAddToPhotos />,
    isVisible: false
  }
];

export default function DetailsSubTab() {
  const { showPilot, activeSubDetailsTabId } = useAppSelector((state) => state.workspace);

  const idsFromLS: string[] = JSON.parse(localStorage.getItem('subTab') || '[]') as string[];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const [items, setItems] = useState(DetailOptions.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)));

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
        <section>
          <div className={`flex  bg-primary-200 pb-0.5 ${showPilot ? 'flex-row' : 'flex-col'}`}>
            {DetailOptions.map((item) => (
              <SubtabDrag
                key={item.id}
                id={item.id}
                icon={item.icon}
                activeSub={activeSubDetailsTabId}
                showPilot={showPilot}
                name={pilotTabs.DETAILS}
                item={item}
                items={DetailOptions}
              />
            ))}
          </div>
        </section>
      </SortableContext>
    </DndContext>
  );
}
