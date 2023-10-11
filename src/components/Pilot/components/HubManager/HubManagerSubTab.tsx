import React, { useState } from 'react';
import AddHubIcon from '../../../../assets/icons/AddHub';
import AddWalletIcon from '../../../../assets/icons/AddWallet';
import AddListIcon from '../../../../assets/icons/AddList';
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import SubtabDrag from '../../../../pages/workspace/pilot/components/SubtabDnd';
import { useAppSelector } from '../../../../app/hooks';
import CalendarIcon from '../../../../assets/icons/CalendarIcon';
import StatusMgIcon from '../../../../assets/icons/StatusMgIcon';
import { dimensions } from '../../../../app/config/dimensions';
import { pilotTabs } from '../../../../app/constants/pilotTabs';

export const HubManagerOptions = [
  {
    id: pilotTabs.CREATE_HUB,
    name: 'Create Hub',
    icon: <AddHubIcon />,
    isVisible: false
  },
  {
    id: pilotTabs.CREATE_WALLET,
    name: 'Create Wallet',
    icon: <AddWalletIcon />,
    isVisible: false
  },
  {
    id: pilotTabs.CREATE_LIST,
    name: 'Create List',
    icon: <AddListIcon />,
    isVisible: false
  },
  {
    id: 'calendar_settings',
    name: 'Calendar Settings',
    icon: <CalendarIcon active={false} />,
    isVisible: false
  },
  {
    id: 'status_management',
    name: 'Status Management',
    icon: <StatusMgIcon />,
    isVisible: false
  }
];

const DEFAULT_PILOT_WIDTH = dimensions.pilot.default;
const pilotWidthFromLS = DEFAULT_PILOT_WIDTH;

export default function HubManagerSubTab() {
  const { showPilot, activeSubHubManagerTabId } = useAppSelector((state) => state.workspace);
  const { show: showFullPilot } = useAppSelector((state) => state.slideOver.pilotSideOver);

  const idsFromLS = JSON.parse(localStorage.getItem('subTab') || '[]') as string[];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const [items, setItems] = useState(
    HubManagerOptions.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id))
  );

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
          <div className="flex w-full bg-primary-200 pb-0.5 flex-row">
            {HubManagerOptions.map((item) => (
              <SubtabDrag
                key={item.id}
                id={item.id}
                icon={item.icon}
                activeSub={activeSubHubManagerTabId}
                showPilot={showPilot}
                name={'hubmanager'}
                item={item}
                items={items}
              />
            ))}
          </div>
        </section>
      </SortableContext>
    </DndContext>
  );
}
