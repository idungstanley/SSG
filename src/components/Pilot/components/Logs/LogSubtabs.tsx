import React, { useState } from 'react';
import SubtabDrag from '../../../../pages/workspace/pilot/components/SubtabDnd';
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
import { useAppSelector } from '../../../../app/hooks';
import { pilotTabs } from '../../../../app/constants/pilotTabs';
import ActivityLogIcon from '../../../../assets/icons/ActivityLogIcon';
import LogsIcons from '../../../../assets/icons/LogsIcons';
import { SiGooglephotos } from 'react-icons/si';

export const logOptions = [
  {
    id: pilotTabs.HISTORY_LOG,
    name: 'History logs',
    icon: <SiGooglephotos className="w-4 h-4" />,
    isVisible: false
  },
  {
    id: pilotTabs.ACTIVITY_LOG,
    name: 'Activity logs',
    icon: <ActivityLogIcon />,
    isVisible: false
  },
  {
    id: pilotTabs.CUSTOM_LOG,
    name: 'Custom logs',
    icon: <LogsIcons />,
    isVisible: false
  }
];

export default function LogSubtabs() {
  const { showPilot, activeSubLogsTabId } = useAppSelector((state) => state.workspace);

  const idsFromLS = JSON.parse(localStorage.getItem('subTab') || '[]') as string[];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const [items, setItems] = useState(logOptions.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)));

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
          <div className="grid  bg-primary-200 pb-0.5 grid-cols-3">
            {logOptions.map((item) => (
              <SubtabDrag
                key={item.id}
                id={item.id}
                icon={item.icon}
                activeSub={activeSubLogsTabId}
                showPilot={showPilot}
                name={pilotTabs.LOGS}
                item={item}
                items={logOptions}
              />
            ))}
          </div>
        </section>
      </SortableContext>
    </DndContext>
  );
}
