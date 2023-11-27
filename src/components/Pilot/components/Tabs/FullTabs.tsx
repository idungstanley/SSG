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
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useResize } from '../../../../hooks/useResize';
import { IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import ShowTabsLabelToggle from './components/ShowTabsLabelToggle';
import Tab from './components/Tab';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import { useAppSelector } from '../../../../app/hooks';
import ToolTip from '../../../Tooltip/Tooltip';
import SlideToggle from '../../../SlideToggle';
import { calculateSlides } from '../../../../utils/calculateSlides';

interface TabsProps {
  tabs: IPilotTab[];
}

const pilotFromLS = JSON.parse(localStorage.getItem('pilot') || '""') as { tabOrder: string[]; showTabLabel: boolean };
const tabIdsFromLS = pilotFromLS.tabOrder || [];

const MIN = 99;
const MAX = 264;

export default function FullTabs({ tabs }: TabsProps) {
  const { showTabLabel } = useAppSelector((state) => state.workspace);
  const { pilotWidth } = useAppSelector((state) => state.account);

  const [tabItems, setTabItems] = useState(
    tabs.sort((a, b) => tabIdsFromLS.indexOf(a.id) - tabIdsFromLS.indexOf(b.id)) // set tabs position as in localStorage
  );
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [slidesCount, setSlidesCount] = useState<number>(0);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveSlide(1);
  }, [pilotWidth]);

  const disableOverflow = (disable: boolean) => {
    if (navRef.current) {
      navRef.current.style.overflow = disable ? 'hidden' : 'auto';
    }
  };

  const { size, blockRef, Dividers } = useResize({
    dimensions: {
      min: MIN,
      max: MAX
    },
    storageKey: 'pilotFeaturesHeight',
    direction: 'YB'
  });

  const TAB_WIDTH = 60;
  const SLIDE_TOGGLE_WIDTH = 40;

  const showingTabItems = useMemo(() => {
    if (pilotWidth && tabItems.length && !showTabLabel) {
      const newSlides = calculateSlides(tabItems, TAB_WIDTH, pilotWidth - SLIDE_TOGGLE_WIDTH);
      setSlidesCount(newSlides.length);
      return newSlides[newSlides[activeSlide - 1] ? activeSlide - 1 : 0] as IPilotTab[];
    } else {
      return tabItems.sort((a, b) => tabIdsFromLS.indexOf(a.id) - tabIdsFromLS.indexOf(b.id));
    }
  }, [tabIdsFromLS, tabItems, activeSlide, pilotWidth]);

  return (
    <>
      {showTabLabel ? (
        <VerticalScroll>
          <div style={{ height: size }}>
            <div ref={blockRef} className={cl('relative h-fit col-span-1 border-r-0 flex items-center')}>
              <nav ref={navRef} className={cl('relative h-full grid grid-cols-1 divide-y grow')} aria-label="Tabs">
                <SortableProvider disableOverflow={disableOverflow} items={tabItems} setItems={setTabItems}>
                  {tabItems.map((tab) => (
                    <Tab key={tab.id} id={tab.id} icon={tab.icon} label={tab.label} showTabLabel={showTabLabel} />
                  ))}
                </SortableProvider>
              </nav>
            </div>
            <Dividers />
            <ShowTabsLabelToggle />
          </div>
        </VerticalScroll>
      ) : (
        <>
          <div style={{ height: 'auto' }} ref={null} className={cl('relative col-span-1 flex items-center p-1')}>
            <nav ref={navRef} className={cl('relative h-fit divide-x flex')} aria-label="Tabs">
              <div className="pl-1 pr-2">
                <SlideToggle activeSlide={activeSlide} fullCount={slidesCount} setActiveSlide={setActiveSlide} />
              </div>
              <SortableProvider disableOverflow={disableOverflow} items={tabItems} setItems={setTabItems}>
                {showingTabItems.map((tab) => (
                  <div key={tab.label}>
                    <ToolTip title={tab.label} enterDelay={300}>
                      <div className="h-full">
                        <Tab key={tab.id} id={tab.id} icon={tab.icon} label={tab.label} showTabLabel={showTabLabel} />
                      </div>
                    </ToolTip>
                  </div>
                ))}
              </SortableProvider>
            </nav>
          </div>
          <ShowTabsLabelToggle />
        </>
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
