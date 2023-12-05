import { useAppSelector } from '../../../../../../../../app/hooks';
import { pilotTabs } from '../../../../../../../../app/constants/pilotTabs';
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
import SubtabDrag from '../../../../../../pilot/components/SubtabDnd';
import { IoTimeOutline } from 'react-icons/io5';

export const formsOptions = [
  {
    id: pilotTabs.COMING_SOON,
    name: 'Coming soon',
    icon: <IoTimeOutline />,
    isVisible: true
  },
  {
    id: pilotTabs.COMING_SOON_2,
    name: 'Coming soon',
    icon: <IoTimeOutline />,
    isVisible: true
  }
];

export default function FormsSubTabs() {
  const { showPilot, activeSubComingTabId } = useAppSelector((state) => state.workspace);

  const idsFromLS = JSON.parse(localStorage.getItem('subTab') || '[]') as string[];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const [items, setItems] = useState(formsOptions.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)));

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
            className="grid grid-cols-2 px-1 bg-alsoit-gray-125"
            style={{ borderBottom: `2px solid ${activeSubComingTabId ? '#F9E6FF' : 'transparent'}` }}
          >
            {formsOptions.map((item) => (
              <SubtabDrag
                key={item.id}
                id={item.id}
                icon={item.icon}
                activeSub={activeSubComingTabId}
                showPilot={showPilot}
                name={pilotTabs.COMING_SOON}
                item={item}
                items={formsOptions}
              />
            ))}
          </div>
        </section>
      </SortableContext>
    </DndContext>
  );
}
