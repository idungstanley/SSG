import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setMovingGraphId, setUpdatePosition } from '../../features/insights/insightsSlice';

interface IDragMoveProps {
  id: string;
  children: React.ReactNode;
  onDragMove: (e: React.PointerEvent<HTMLDivElement>) => void;
}

export default function DragMove({ id, children, onDragMove }: IDragMoveProps) {
  const dispatch = useAppDispatch();

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = () => {
    setIsDragging(true);
    dispatch(setUpdatePosition(true));
    dispatch(setMovingGraphId(id));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dispatch(setUpdatePosition(false));
    dispatch(setMovingGraphId(''));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) onDragMove(e);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={(e) => handlePointerMove(e)}
    >
      {children}
    </div>
  );
}
