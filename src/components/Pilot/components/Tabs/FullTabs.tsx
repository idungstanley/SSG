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
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import { useAppSelector } from '../../../../app/hooks';
import { HorizontalScroll } from '../../../ScrollableContainer/HorizontalScroll';

interface TabsProps {
  tabs: IPilotTab[];
}

const pilotFromLS = JSON.parse(localStorage.getItem('pilot') || '""') as { tabOrder: number[]; showTabLabel: boolean };
const tabIdsFromLS = pilotFromLS.tabOrder || [];
const showTabLabelFromLS = !!pilotFromLS.showTabLabel;

const MIN = 100;
const MAX = 200;

export default function FullTabs({ tabs }: TabsProps) {
  const [tabItems, setTabItems] = useState(
    tabs.sort((a, b) => tabIdsFromLS.indexOf(a.id) - tabIdsFromLS.indexOf(b.id)) // set tabs position as in localStorage
  );
  const { showTabLabel } = useAppSelector((state) => state.workspace);
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
    <>
      {showTabLabel ? (
        <VerticalScroll>
          <div
            style={{ height: !showTabLabel ? 'auto' : '' }}
            ref={showTabLabel ? blockRef : null}
            className={cl('relative col-span-1 flex items-center')}
          >
            {showTabLabel ? <Dividers /> : null}
            <nav
              ref={navRef}
              className={cl(
                'relative h-fit',
                showTabLabel ? 'grid grid-cols-1 h-full divide-y grow' : 'divide-x border flex mr-10'
              )}
              aria-label="Tabs"
            >
              <SortableProvider disableOverflow={disableOverflow} items={tabItems} setItems={setTabItems}>
                {tabItems.map((tab) => (
                  <Tab key={tab.id} id={tab.id} icon={tab.icon} label={tab.label} showTabLabel={showTabLabel} />
                ))}
              </SortableProvider>
            </nav>
          </div>
          <ShowTabsLabelToggle />
        </VerticalScroll>
      ) : (
        <HorizontalScroll>
          <div
            style={{ height: !showTabLabel ? 'auto' : '' }}
            ref={showTabLabel ? blockRef : null}
            className={cl('relative col-span-1 flex items-center')}
          >
            {showTabLabel ? <Dividers /> : null}
            <nav
              ref={navRef}
              className={cl(
                'relative h-fit',
                showTabLabel ? 'grid grid-cols-1 h-full divide-y grow' : 'divide-x border flex mr-10'
              )}
              aria-label="Tabs"
            >
              <SortableProvider disableOverflow={disableOverflow} items={tabItems} setItems={setTabItems}>
                {tabItems.map((tab) => (
                  <Tab key={tab.id} id={tab.id} icon={tab.icon} label={tab.label} showTabLabel={showTabLabel} />
                ))}
              </SortableProvider>
            </nav>
          </div>
          <ShowTabsLabelToggle />
        </HorizontalScroll>
      )}
    </>
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
