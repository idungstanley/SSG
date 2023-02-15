import React from 'react';
import { useSortable } from '@dnd-kit/sortable';

export default function SortMe({
  id,
  label,
  showPilot,
  showPilotIconView,
}: {
  id: number;
  label: string;
  showPilot: boolean;
  showPilotIconView: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    borderColor: isDragging ? 'red' : undefined,
    zIndex: isDragging ? 1 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p
        className={`text-xs ${showPilot ? 'block' : 'hidden'} ${
          showPilotIconView ? 'hidden' : 'block'
        }`}
      >
        {label}
      </p>
    </div>
  );
}
