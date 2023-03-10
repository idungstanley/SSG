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
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import Tab from './components/Tab';

interface TabsProps {
  activeTabId: number | null;
  setActiveTabId: (i: number | null) => void;
  tabs: IPilotTab[];
}

const pilotFromLS = JSON.parse(localStorage.getItem('pilot') || '""') as { tabOrder: number[]; showTabLabel: boolean };
interface ShowTabsLabelToggleProps {
  showTabLabel: boolean;
  setShowTabLabel: (i: boolean) => void;
}

function ShowTabsLabelToggle({ showTabLabel, setShowTabLabel }: ShowTabsLabelToggleProps) {
  const { show } = useAppSelector((state) => state.slideOver.pilotSideOver);

  const toggleShowTabLabel = () => {
    localStorage.setItem(
      'pilot',
      JSON.stringify({
        ...pilotFromLS,
        showTabLabel: !showTabLabel
      })
    );
    setShowTabLabel(!showTabLabel);
  };

  return show ? (
    <button
      type="button"
      onClick={toggleShowTabLabel}
      className={cl(
        'border flex items-center justify-center text-gray-600',
        showTabLabel ? 'absolute right-1 top-1 w-7 h-7' : 'p-2 mb-1'
      )}
    >
      {showTabLabel ? <ChevronDoubleUpIcon className="w-4 h-4" /> : <ChevronDoubleDownIcon className="w-4 h-4" />}
    </button>
  ) : null;
}

const tabIdsFromLS = pilotFromLS.tabOrder || [];
const showTabLabelFromLS = !!pilotFromLS.showTabLabel;

export default function FullTabs({ activeTabId, setActiveTabId, tabs }: TabsProps) {
  const [showTabLabel, setShowTabLabel] = useState(showTabLabelFromLS);
  const [tabItems, setTabItems] = useState(
    tabs.sort((a, b) => tabIdsFromLS.indexOf(a.id) - tabIdsFromLS.indexOf(b.id)) // set tabs position as in localStorage
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
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
              tabOrder: [...sortArray.map((i) => i.id)]
            })
          );

          return [...sortArray];
        });
      }
    }
  };

  return (
    <div className="col-span-1 relative flex items-center overflow-x-scroll">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e)}>
        <nav
          className={cl(
            'relative grid overflow-x-scroll w-full',
            showTabLabel ? 'grid-cols-1 h-40' : 'grid-rows-1 grid-flow-col'
          )}
          aria-label="Tabs"
        >
          <SortableContext strategy={rectSortingStrategy} items={tabItems}>
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
          </SortableContext>
        </nav>
      </DndContext>

      <ShowTabsLabelToggle setShowTabLabel={setShowTabLabel} showTabLabel={showTabLabel} />
    </div>
  );
}
