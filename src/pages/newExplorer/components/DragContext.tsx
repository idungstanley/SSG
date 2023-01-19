import React, { ReactNode, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  // MouseSensor,
  // TouchSensor,
  // useSensor,
  // useSensors,
} from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  resetSelectedItem,
  setDraggableItem,
} from '../../../features/explorer/explorerSlice';
import { useMoveExplorerItems } from '../../../features/explorer/explorerActionsService';
import { useNavigate } from 'react-router-dom';

interface DragContextProps {
  children: ReactNode;
}

export default function DragContext({ children }: DragContextProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedFolderId } = useAppSelector((state) => state.explorer);

  // const mouseSensor = useSensor(MouseSensor);
  // const touchSensor = useSensor(TouchSensor);
  // const sensors = useSensors(mouseSensor, touchSensor);

  // parent id for invalidate active query
  const [parentOfDraggable, setParentOfDraggable] = useState<{
    parentId: string;
    overId: string;
    fileFolderId: string | null;
  } | null>(null);

  const { mutate: onMove } = useMoveExplorerItems(parentOfDraggable);

  const onDragStart = (e: DragStartEvent) => {
    const isFolder = e.active.data.current?.isFolder;

    const id = e.active.id as string;
    // if (e.active.data.current?.isFolder) {
    dispatch(setDraggableItem({ id, isFile: !isFolder }));
    // }
  };

  const onDragEnd = (e: DragEndEvent) => {
    dispatch(setDraggableItem(null));

    const { over, active } = e;

    const overId = over?.id;
    const activeId = active?.id;

    if (overId && activeId) {
      const isFile = active.data.current?.isFile;

      const parentId = isFile
        ? selectedFolderId
        : (active.data.current?.parentId as string);
      setParentOfDraggable({
        parentId: parentId || '',
        overId: overId === 'root' ? '' : (overId as string),
        fileFolderId: active.data.current?.fileFolderId,
      });

      if (activeId === selectedFolderId) {
        dispatch(resetSelectedItem());
        navigate('/new-explorer');
      }

      const moveData = isFile
        ? { fileIds: [activeId as string] }
        : { folderIds: [activeId as string] };

      onMove({
        targetFolderId: overId === 'root' ? '' : (overId as string),
        ...moveData,
      });
    }

    // console.log(e);
  };

  return (
    <DndContext
      // sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}
    </DndContext>
  );
}

// function handleDragEnd(event: DragEndEvent) {
//   const { over, active } = event;

//   const overId = over?.id;
//   const activeId = active.id;

//   if (overId && activeId) {
//     if (overId !== activeId) {
//       setParentOfDraggable({
//         parentId: active.data.current?.parentId as string,
//         overId: overId === 'root' ? '' : (overId as string),
//       });

//       if (activeId === selectedFolderId) {
//         dispatch(resetSelectedItem());
//         navigate('/new-explorer');
//       }

//       onMove({
//         targetFolderId: overId === 'root' ? '' : (overId as string),
//         folderIds: [activeId as string],
//       });
//     }
//   }

//   setShowDragToRoot(false);
// }
