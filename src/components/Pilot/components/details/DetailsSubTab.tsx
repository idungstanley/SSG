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
import AttachFileIcon from '../../../../assets/icons/AttachFileIcon';
import CkecklistIcon from '../../../../assets/icons/CkecklistIcon';
import SubtaskIcon from '../../../../assets/icons/SubtaskIcon';
import TiesIcon from '../../../../assets/icons/TiesIcon';
import PropertyIcons from '../../../../assets/icons/PropertyIcons';

export const detailOptions = [
  {
    id: pilotTabs.PROPERTIES,
    name: 'Properties',
    icon: <PropertyIcons />,
    isVisible: true
  },
  {
    id: pilotTabs.SUBTASK,
    name: 'Subtask',
    icon: <SubtaskIcon />,
    isVisible: true
  },
  {
    id: pilotTabs.CHECKLISTS,
    name: 'Checklist',
    icon: <CkecklistIcon />,
    isVisible: true
  },
  {
    id: pilotTabs.ATTACHMENTS,
    name: 'Attachments',
    icon: <AttachFileIcon />,
    isVisible: true
  },
  {
    id: pilotTabs.TIES,
    name: 'Ties',
    icon: <TiesIcon />,
    isVisible: true
  }
];

export default function DetailsSubTab() {
  const { showPilot, activeSubDetailsTabId } = useAppSelector((state) => state.workspace);

  const idsFromLS = JSON.parse(localStorage.getItem('subTab') || '[]') as string[];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const [items, setItems] = useState(detailOptions.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id)));

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
          <div
            className="grid grid-cols-5 px-1"
            style={{ borderBottom: `3px solid ${activeSubDetailsTabId ? '#ebd1fc' : 'transparent'}` }}
          >
            {detailOptions.map((item) => (
              <SubtabDrag
                key={item.id}
                id={item.id}
                icon={item.icon}
                activeSub={activeSubDetailsTabId}
                showPilot={showPilot}
                name={pilotTabs.DETAILS}
                item={item}
                items={detailOptions}
              />
            ))}
          </div>
        </section>
      </SortableContext>
    </DndContext>
  );
}
