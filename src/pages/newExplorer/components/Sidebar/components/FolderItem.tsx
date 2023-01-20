import React from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  TrashIcon,
  PlusIcon,
  PencilIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftEllipsisIcon,
  ShareIcon,
  AdjustmentsVerticalIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/outline';
import Dropdown from '../../../../../components/Dropdown/index';
import { classNames } from '../../../../../utils';
import { useAppDispatch } from '../../../../../app/hooks';
import {
  setItemActionForSideOver,
  setShowPilotSideOver,
  setShowShareSideOver,
} from '../../../../../features/general/slideOver/slideOverSlice';
import { useDeleteExplorerItem } from '../../../../../features/explorer/explorerActionsService';
import { resetSelectedItem } from '../../../../../features/explorer/explorerSlice';
import { useNavigate } from 'react-router-dom';
import { DownloadFile } from '../../../../../app/helpers';
import { setSelectedItem } from '../../../../../features/chat/chatSlice';
import { useDraggable, useDroppable } from '@dnd-kit/core';

interface FolderItemProps {
  id: string;
  name: string;
  parentId: string | null;
  handleClickFolder: (i: string, parentId: string | null) => void;
  isActiveFolder: boolean;
  haveAncestors: boolean;
}

export default function FolderItem({
  id,
  name,
  parentId,
  handleClickFolder,
  isActiveFolder,
  haveAncestors,
}: FolderItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform,
  } = useDraggable({ id, data: { parentId, isFolder: true } });

  const { isOver, setNodeRef: droppableRef } = useDroppable({
    id,
    data: { parentId, isFolder: true },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const { mutate: onDelete } = useDeleteExplorerItem(parentId || '', 'folder');

  const handleDelete = () => {
    onDelete({
      type: 'folder',
      id,
    });

    if (isActiveFolder) {
      dispatch(resetSelectedItem());
      navigate('/new-explorer', { replace: true });
    }
  };

  const handleDownload = () => {
    const itemName = `${name}.zip`;

    DownloadFile('folder', id, itemName);
  };

  const handleShowShare = () =>
    dispatch(setShowShareSideOver({ show: true, id, type: 'folder' }));

  const configForDropdown = [
    {
      label: 'Download',
      onClick: handleDownload,
      icon: <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Rename',
      onClick: () =>
        dispatch(setItemActionForSideOver({ action: 'rename', id, name })),
      icon: <PencilIcon className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Share',
      icon: <ShareIcon className="h-5 w-5 stroke-current" aria-hidden="true" />,
      onClick: handleShowShare,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
      icon: <TrashIcon className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Chat',
      onClick: () => dispatch(setSelectedItem({ id, type: 'folder' })),
      icon: (
        <ChatBubbleLeftEllipsisIcon className="h-5 w-5" aria-hidden="true" />
      ),
    },
    {
      label: 'Pilot',
      onClick: () =>
        dispatch(setShowPilotSideOver({ id, type: 'folder', show: true })),
      icon: <AdjustmentsVerticalIcon className="h-5 w-5" aria-hidden="true" />,
    },
  ];

  return (
    <div
      className={classNames(
        'group flex justify-between w-full items-center py-1 px-1 hover:bg-gray-100',
        isActiveFolder ? 'text-primary-600 bg-primary-50' : '',
        !transform && isOver ? 'bg-primary-100' : ''
      )}
      ref={droppableRef}
      style={style}
    >
      <div
        onClick={() => handleClickFolder(id, parentId)}
        className="flex gap-2 items-center cursor-pointer"
      >
        {isActiveFolder || haveAncestors ? (
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        )}

        <div className="flex gap-2 items-center">
          <FolderIcon className="h-5 w-5" aria-hidden="true" />
          <p className="whitespace-nowrap max-w-34 truncate overflow-hidden">
            {name}
          </p>
        </div>
      </div>

      <div className="flex opacity-40 group-hover:opacity-100 gap-2 items-center">
        <Dropdown config={configForDropdown} iconType="dots" />
        <PlusIcon
          onClick={() =>
            dispatch(setItemActionForSideOver({ action: 'create', id }))
          }
          className="h-5 w-5 cursor-pointer stroke-current text-gray-500"
          aria-hidden="true"
        />
        <div ref={draggableRef} {...listeners} {...attributes}>
          <ArrowsUpDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
