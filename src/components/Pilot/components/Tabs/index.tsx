import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableContext } from '@dnd-kit/sortable';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import { ITab } from '../..';
import Tab from './components/Tab';

interface TabsProps {
  tabs: ITab[];
  activeTabId: number;
  setActiveTabId: (i: number) => void;
}

export default function Tabs({ tabs, activeTabId, setActiveTabId }: TabsProps) {
  const idsFromLS = JSON.parse(localStorage.getItem('pilotSections') || '[]');

  const [tabItems, setTabItems] = useState(
    tabs.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)) // set tabs position as in localStorage
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (active.id !== over?.id) {
      const findActive = tabItems.find((i) => i.id === active.id);
      const findOver = tabItems.find((i) => i.id === over?.id);

      if (findActive && findOver) {
        setTabItems((tabItems) => {
          const oldIndex = tabItems.indexOf(findActive);
          const newIndex = tabItems.indexOf(findOver);

          const sortArray = arrayMove(tabItems, oldIndex, newIndex);

          localStorage.setItem(
            'pilotSections',
            JSON.stringify([...sortArray.map((i: { id: string }) => i.id)])
          );

          return sortArray;
        });
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(e) => handleDragEnd(e)}
    >
      <nav
        className="gap-2 grid grid-cols-3 overflow-hidden w-full pb-5 border-b"
        aria-label="Tabs"
      >
        <SortableContext strategy={rectSortingStrategy} items={tabItems}>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              icon={tab.icon}
              label={tab.label}
              activeTabId={activeTabId}
              setActiveTabId={setActiveTabId}
            />
          ))}
        </SortableContext>
      </nav>
    </DndContext>
  );
}
