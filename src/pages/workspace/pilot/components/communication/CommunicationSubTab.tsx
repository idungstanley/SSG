import React, { useState } from 'react';
import { MdAlternateEmail, MdOutlineCall } from 'react-icons/md';
import { useAppSelector } from '../../../../../app/hooks';
import SubtabDrag from '../SubtabDnd';
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
import { pilotTabs } from '../../../../../app/constants/pilotTabs';
import { BsChatLeftText } from 'react-icons/bs';
import TicketsPilotIcon from '../../../../../assets/icons/TicketsPilotIcon';
import CoriDocsIcon from '../../../../../assets/icons/chatIcons/CoriDocsIcon';
import CommentsIcon from '../../../../../assets/icons/chatIcons/CommentsIcon';

export const communicationOptions = [
  { id: pilotTabs.CHAT, name: 'Chat', icon: <BsChatLeftText className="w-4 h-4" />, isVisible: true },
  {
    id: pilotTabs.TICKETS,
    name: 'Tickets',
    icon: <TicketsPilotIcon />,
    isVisible: true
  },
  {
    id: pilotTabs.COMMENTS,
    name: 'Comments',
    icon: <CommentsIcon />,
    isVisible: true
  },
  {
    id: pilotTabs.CORI_DOCS,
    name: 'CoriDocs',
    icon: <CoriDocsIcon />,
    isVisible: true
  },
  {
    id: pilotTabs.EMAIL,
    name: 'Emails',
    icon: <MdAlternateEmail className="w-4 h-4" />,
    isVisible: true
  },
  {
    id: pilotTabs.PHONE,
    name: 'Phone',
    icon: <MdOutlineCall className="w-4 h-4" />,
    isVisible: true
  }
];

export default function CommunicationSubTab() {
  const idsFromLS: string[] = JSON.parse(localStorage.getItem('subTab') || '[]') as string[];
  const { showPilot, activeSubCommunicationTabId } = useAppSelector((state) => state.workspace);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const [items, setItems] = useState(
    communicationOptions.sort((a, b) => idsFromLS.indexOf(a.id) - idsFromLS.indexOf(b.id))
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
        <div
          className="grid grid-cols-6 px-1 bg-alsoit-gray-125"
          style={{ borderBottom: `2px solid ${activeSubCommunicationTabId ? '#F9E6FF' : 'transparent'}` }}
        >
          {communicationOptions.map((item) => (
            <SubtabDrag
              key={item.id}
              id={item.id}
              icon={item.icon}
              activeSub={activeSubCommunicationTabId}
              showPilot={showPilot}
              name={pilotTabs.CONNECT}
              items={communicationOptions}
              item={item}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
