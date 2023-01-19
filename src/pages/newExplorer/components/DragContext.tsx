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
  resetSelectedItem,
  setDraggableItem,
} from '../../../features/explorer/explorerSlice';
import { useMoveExplorerItems } from '../../../features/explorer/explorerActionsService';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface DragContextProps {
  children: ReactNode;
}

export default function DragContext({ children }: DragContextProps) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      const invalidate = (query: string, value?: string) =>
        queryClient.invalidateQueries([query, value]);

      const { overId, targetId, isTargetFile } = parentOfDraggable;

      // invalidate for files
      if (isTargetFile) {
        invalidate('explorer-files', targetId);

        invalidate('explorer-files', overId);
      } else {
        invalidate('explorer-folder', targetId);

        invalidate('explorer-folder', overId);
      }

      if (overId === 'root' || targetId === 'root' || !isTargetFile) {
        invalidate('explorer-folders');
      }
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

    if (overId && activeId) {
      if (selectedFolderId && draggableItem) {
        setParentOfDraggable({
          isTargetFile: draggableItem.isFile,
          targetId:
            active.data.current?.fileFolderId ||
            active.data.current?.parentId ||
            'root',
          overId: (overId as string) || over.data.current?.parentId || 'root',
        });
      }

      // reset selected folder if it moved to root
      if (activeId === selectedFolderId) {
        dispatch(resetSelectedItem());
        navigate('/new-explorer');
      }

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
