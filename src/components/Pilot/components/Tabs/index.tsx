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
import { IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import Tab from './components/Tab';

interface TabsProps {
  activeTabId: number;
  setActiveTabId: (i: number) => void;
  showTabLabel: boolean;
  tabs: IPilotTab[];
}

const pilotFromLS: { tabOrder: number[]; showTabLabel: boolean } = JSON.parse(
  localStorage.getItem('pilot') || '""'
);

const tabIdsFromLS = pilotFromLS.tabOrder || [];

export default function Tabs({
  activeTabId,
  setActiveTabId,
  showTabLabel,
  tabs,
}: TabsProps) {
  const [tabItems, setTabItems] = useState(
    tabs.sort((a, b) => tabIdsFromLS.indexOf(a.id) - tabIdsFromLS.indexOf(b.id)) // set tabs position as in localStorage
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
            'pilot',
            JSON.stringify({
              ...pilotFromLS,
              tabOrder: [...sortArray.map((i: { id: string }) => i.id)],
            })
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
        className={cl(
          'gap-2 grid overflow-x-scroll w-full pb-2 border-b',
          showTabLabel ? 'grid-cols-2' : 'grid-rows-1 grid-flow-col'
        )}
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
              showTabLabel={showTabLabel}
            />
          ))}
        </SortableContext>
      </nav>
    </DndContext>
  );
}
