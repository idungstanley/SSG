import React, { ReactNode, useEffect, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent
  // MouseSensor,
  // TouchSensor,
  // useSensor,
  // useSensors,
} from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { resetSelectedItem, setDraggableItem } from '../../../features/explorer/explorerSlice';
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

  const { draggableItem, selectedFolderId } = useAppSelector((state) => state.explorer);

  // const mouseSensor = useSensor(MouseSensor);
  // const touchSensor = useSensor(TouchSensor);
  // const sensors = useSensors(mouseSensor, touchSensor);

  // invalidate active query data
  const [dataForInvalidation, setDataForInvalidation] = useState<{
    isTargetFile: boolean;
    dropId: string; // fileId
    dragId: string; // fileId
  } | null>(null);

  const { mutate: onMove, isSuccess } = useMoveExplorerItems();

  useEffect(() => {
    if (isSuccess && dataForInvalidation) {
      const invalidate = (query: string, value?: string) => queryClient.invalidateQueries([query, value]);

      const { dropId, dragId, isTargetFile } = dataForInvalidation;

      if (isTargetFile) {
        // invalidate for files
        invalidate('explorer-files', dragId);

        invalidate('explorer-files', dropId);
      } else {
        // invalidate for folders
        invalidate('explorer-folder', dragId);

        invalidate('explorer-folder', dropId);
      }

      // invalidate main request for root folders and files
      if (dropId === 'root' || dragId === 'root' || !isTargetFile) {
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

    if (overId && activeId && draggableItem) {
      const isTargetFile = draggableItem.isFile;
      const dragId = active.data.current?.fileFolderId || active.data.current?.parentId || 'root'; // if draggable is file - get folderId, else - parentId of folder
      const dropId = (overId as string) || over.data.current?.parentId || 'root'; // always folderId

      setDataForInvalidation({
        isTargetFile,
        dragId,
        dropId
      });

      // reset selected folder if it moved to root
      if (activeId === selectedFolderId) {
        dispatch(resetSelectedItem());
        navigate('/explorer');
      }

      // moving file / folder request data
      const moveData = draggableItem?.isFile ? { fileIds: [activeId as string] } : { folderIds: [activeId as string] };

      onMove({
        targetFolderId: overId === 'root' ? '' : (overId as string),
        ...moveData
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
