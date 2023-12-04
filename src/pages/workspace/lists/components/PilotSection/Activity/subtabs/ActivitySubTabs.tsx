import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { IoTimeOutline } from 'react-icons/io5';
import { pilotTabs } from '../../../../../../../app/constants/pilotTabs';
import { useAppSelector } from '../../../../../../../app/hooks';
import SubtabDrag from '../../../../../pilot/components/SubtabDnd';

export const ticketsOptions = [
  {
    id: pilotTabs.COMING_SOON,
    name: 'Coming soon',
    icon: <IoTimeOutline />,
    isVisible: false
  },
  {
    id: pilotTabs.COMING_SOON_2,
    name: 'Coming soon',
    icon: <IoTimeOutline />,
    isVisible: false
  }
];

export default function ActivitySubTabs() {
  const { showPilot, activeSubComingTabId } = useAppSelector((state) => state.workspace);

  const idsFromLS = JSON.parse(localStorage.getItem('subTab') || '[]') as string[];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const [items, setItems] = useState(ticketsOptions.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)));

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
          <div
            className="grid px-1 grid-cols-2"
            style={{ borderBottom: `2px solid ${activeSubComingTabId ? '#F9E6FF' : 'transparent'}` }}
          >
            {ticketsOptions.map((item) => (
              <SubtabDrag
                key={item.id}
                id={item.id}
                icon={item.icon}
                activeSub={activeSubComingTabId}
                showPilot={showPilot}
                name={pilotTabs.COMING_SOON}
                item={item}
                items={ticketsOptions}
              />
            ))}
          </div>
        </section>
      </SortableContext>
    </DndContext>
  );
}
