import React, { ReactNode, useEffect, useState } from 'react';
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
  // resetSelectedItem,
  setDraggableItem,
} from '../../../features/explorer/explorerSlice';
import { useMoveExplorerItems } from '../../../features/explorer/explorerActionsService';
import { useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';

interface DragContextProps {
  children: ReactNode;
}

export default function DragContext({ children }: DragContextProps) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const { draggableItem, selectedFolderId } = useAppSelector(
    (state) => state.explorer
  );

  // const mouseSensor = useSensor(MouseSensor);
  // const touchSensor = useSensor(TouchSensor);
  // const sensors = useSensors(mouseSensor, touchSensor);

  // parent id for invalidate active query
  const [parentOfDraggable, setParentOfDraggable] = useState<{
    isTargetFile: boolean;
    overId: string;
    targetId: string;
  } | null>(null);

  const { mutate: onMove, isSuccess } = useMoveExplorerItems();

  useEffect(() => {
    if (isSuccess && parentOfDraggable) {
      // setParentOfDraggable(null);
      queryClient.invalidateQueries([
        'explorer-files',
        parentOfDraggable.targetId,
      ]);
      queryClient.invalidateQueries([
        'explorer-files',
        parentOfDraggable.overId,
      ]);

      if (
        parentOfDraggable.overId === 'root' ||
        parentOfDraggable.targetId === 'root'
      ) {
        queryClient.invalidateQueries(['explorer-folders']);
      }
      // setParentOfDraggable(null);
    }
  }, [isSuccess]);

  const onDragStart = (e: DragStartEvent) => {
    const isFolder = e.active.data.current?.isFolder;

    const id = e.active.id as string;

    dispatch(setDraggableItem({ id, isFile: !isFolder }));
  };

  const onDragEnd = (e: DragEndEvent) => {
    dispatch(setDraggableItem(null));

    const { over, active } = e;

    const overId = over?.id;
    const activeId = active?.id;

    // const isFile = active.data.current?.isFile;
    // const parentId = isFile
    //   ? selectedFolderId
    //   : (active.data.current?.parentId as string);

    // const targetId = isFile ? active.data.current?.fileFolderId : activeId;

    if (overId && activeId) {
      //   console.log({ overId, activeId, targetId });
      //   // setParentOfDraggable({
      //   //   parentId: parentId || '',
      //   //   overId: overId === 'root' ? '' : (overId as string),
      //   //   fileFolderId: active.data.current?.fileFolderId,
      //   // });

      if (selectedFolderId && draggableItem) {
        setParentOfDraggable({
          isTargetFile: draggableItem.isFile,
          targetId: active.data.current?.fileFolderId || 'root',
          overId: (overId as string) || 'root',
        });
      }

      // setParentOfDraggable({
      //   isTargetFile: draggableItem?.isFile || false,
      //   targetId: draggableItem?.id,
      //   overId: '',
      // });

      //   setParentOfDraggable({
      //     isTargetFile: true,
      //     overId: overId as string,
      //     targetId: active.data.current?.fileFolderId,
      //     // targetId: isFile
      //     //   ? active.data.current?.fileFolderId
      //     //   : active.data.current?.parentId,
      //   });

      //   if (activeId === selectedFolderId) {
      //     dispatch(resetSelectedItem());
      //     navigate('/new-explorer');
      //   }

      // moving file / folder request
      const moveData = draggableItem?.isFile
        ? { fileIds: [activeId as string] }
        : { folderIds: [activeId as string] };

      onMove({
        targetFolderId: overId === 'root' ? '' : (overId as string),
        ...moveData,
      });
    }
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
