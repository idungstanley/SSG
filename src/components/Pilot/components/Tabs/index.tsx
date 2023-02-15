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
import { ChatBubbleLeftEllipsisIcon, ClockIcon, EyeIcon, InformationCircleIcon, LockClosedIcon, SignalIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import Tab from './components/Tab';

const tabs = [
  {
    id: 1,
    label: 'Details',
    icon: <InformationCircleIcon className="w-5 h-5" />,
  },
  {
    id: 2,
    label: 'Logs',
    icon: <ClockIcon className="w-5 h-5" />,
  },
  {
    id: 3,
    label: 'Permissions',
    icon: <LockClosedIcon className="w-5 h-5" />,
  },
  {
    id: 4,
    label: 'Comments',
    icon: <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />,
  },
  {
    id: 5,
    label: 'Watchers',
    icon: <EyeIcon className="w-5 h-5" />,
  },
  {
    id: 6,
    label: 'Communication',
    icon: <SignalIcon className="w-5 h-5" />,
  },
];

interface TabsProps {
  activeTabId: number;
  setActiveTabId: (i: number) => void;
}

export default function Tabs({ activeTabId, setActiveTabId }: TabsProps) {
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
