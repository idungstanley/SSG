import React, { ReactNode } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useAppDispatch } from '../../../app/hooks';
import { setDraggableId } from '../../../features/explorer/explorerSlice';

interface DragContextProps {
  children: ReactNode;
}

export default function DragContext({ children }: DragContextProps) {
  const dispatch = useAppDispatch();
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const onDragStart = (e: DragStartEvent) => {
    dispatch(setDraggableId(e.active.id as string));
  };

  const onDragEnd = (e: DragEndEvent) => {
    dispatch(setDraggableId(null));

    console.log(e);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}
    </DndContext>
  );
}
