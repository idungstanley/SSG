import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableContext } from '@dnd-kit/sortable';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { useResize } from '../../../../hooks/useResize';
import { IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import ShowTabsLabelToggle from './components/ShowTabsLabelToggle';
import Tab from './components/Tab';

interface TabsProps {
  activeTabId: number | null;
  setActiveTabId: (i: number | null) => void;
  tabs: IPilotTab[];
}

const pilotFromLS = JSON.parse(localStorage.getItem('pilot') || '""') as { tabOrder: number[]; showTabLabel: boolean };
const tabIdsFromLS = pilotFromLS.tabOrder || [];
const showTabLabelFromLS = !!pilotFromLS.showTabLabel;

const MIN = 100;
const MAX = 200;

export default function FullTabs({ activeTabId, setActiveTabId, tabs }: TabsProps) {
  const [showTabLabel, setShowTabLabel] = useState(showTabLabelFromLS);
  const [tabItems, setTabItems] = useState(
    tabs.sort((a, b) => tabIdsFromLS.indexOf(a.id) - tabIdsFromLS.indexOf(b.id)) // set tabs position as in localStorage
  );

  const navRef = useRef<HTMLDivElement>(null);
  const disableOverflow = (disable: boolean) => {
    if (navRef.current) {
      navRef.current.style.overflow = disable ? 'hidden' : 'auto';
    }
  };

  const { blockRef, Dividers } = useResize({
    dimensions: {
      min: MIN,
      max: MAX
    },
    storageKey: 'pilotFeaturesHeight',
    direction: 'YB'
  });

  return (
    <div
      style={{ height: !showTabLabel ? 'auto' : '' }}
      ref={showTabLabel ? blockRef : null}
      className={cl('relative col-span-1 flex items-center', !showTabLabel && 'overflow-x-scroll')}
    >
      {showTabLabel ? <Dividers /> : null}
      <nav
        ref={navRef}
        className={cl(
          'relative w-full grid border h-fit',
          showTabLabel
            ? 'grid-cols-1 h-full overflow-y-scroll divide-y'
            : 'divide-x overflow-x-scroll grid-rows-1 grid-flow-col'
        )}
        aria-label="Tabs"
      >
        <SortableProvider disableOverflow={disableOverflow} items={tabItems} setItems={setTabItems}>
          {tabItems.map((tab) => (
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
        </SortableProvider>
      </nav>

      <ShowTabsLabelToggle setShowTabLabel={setShowTabLabel} showTabLabel={showTabLabel} />
    </div>
  );
}

interface SortableProviderProps {
  items: IPilotTab[];
  setItems: (i: IPilotTab[]) => void;
  children: ReactNode;
  disableOverflow: (i: boolean) => void;
}

function SortableProvider({ items, children, setItems, disableOverflow }: SortableProviderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;

      if (active.id !== over?.id) {
        const findActive = items.find((i) => i.id === active.id);
        const findOver = items.find((i) => i.id === over?.id);

        if (findActive && findOver) {
          const oldIndex = items.indexOf(findActive);
          const newIndex = items.indexOf(findOver);

          const sortArray = arrayMove(items, oldIndex, newIndex);

          localStorage.setItem(
            'pilot',
            JSON.stringify({
              ...pilotFromLS,
              tabOrder: [...sortArray.map((i) => i.id)]
            })
          );

          setItems([...sortArray]);
          disableOverflow(false);
        }
      }
    },
    [items]
  );

  const handleDragStart = useCallback(() => disableOverflow(true), []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext strategy={rectSortingStrategy} items={items}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
