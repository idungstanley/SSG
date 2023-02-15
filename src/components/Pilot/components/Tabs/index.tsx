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
import {
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
  EyeIcon,
  InformationCircleIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { TbShield } from 'react-icons/tb';
import { cl } from '../../../../utils';
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
    icon: <DocumentTextIcon className="w-5 h-5" />,
  },
  {
    id: 3,
    label: 'Permissions',
    icon: <TbShield className="w-5 h-5" />,
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
    label: 'Connect',
    icon: <SignalIcon className="w-5 h-5" />,
  }, // Clock
];

interface TabsProps {
  activeTabId: number;
  setActiveTabId: (i: number) => void;
  showTabLabel: boolean;
}

const pilotFromLS: { tabOrder: number[]; showTabLabel: boolean } = JSON.parse(
  localStorage.getItem('pilot') || '""'
);

const tabIdsFromLS = pilotFromLS.tabOrder || [];

export default function Tabs({
  activeTabId,
  setActiveTabId,
  showTabLabel,
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
          'gap-2 grid overflow-hidden w-full pb-5 border-b',
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
