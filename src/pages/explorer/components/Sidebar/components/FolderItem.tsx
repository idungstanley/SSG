import React from 'react';
import {
  TrashIcon,
  PlusIcon,
  PencilIcon,
  ShareIcon,
  ArrowUpTrayIcon,
  ClipboardIcon
} from '@heroicons/react/24/outline';
import Dropdown from '../../../../../components/Dropdown/index';
import { cl } from '../../../../../utils';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  setItemActionForSideOver,
  setShowShareSideOver
} from '../../../../../features/general/slideOver/slideOverSlice';
import { useCopyItems, useDeleteExplorerItem } from '../../../../../features/explorer/explorerActionsService';
import { resetSelectedItem } from '../../../../../features/explorer/explorerSlice';
import { useNavigate } from 'react-router-dom';
import { DownloadFile } from '../../../../../app/helpers';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';

interface FolderItemProps {
  id: string;
  name: string;
  parentId: string | null;
  handleClickFolder: (i: string, parentId: string | null) => void;
  isActiveFolder: boolean;
  haveActiveChild: boolean;
}

export default function FolderItem({
  id,
  name,
  parentId,
  handleClickFolder,
  haveActiveChild,
  isActiveFolder
}: FolderItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform,
    isDragging
  } = useDraggable({ id, data: { parentId, isFolder: true } });

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const { isOver, setNodeRef: droppableRef } = useDroppable({
    id,
    data: { parentId, isFolder: true }
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 1 : undefined
  };

  const { mutate: onDelete } = useDeleteExplorerItem(parentId || '', 'folder');

  const { mutate: onCopy } = useCopyItems(parentId || '', true);

  const handleDelete = () => {
    onDelete({
      type: 'folder',
      id
    });
    if (isActiveFolder) {
      dispatch(resetSelectedItem());
      navigate(`${currentWorkspaceId}/explorer`, { replace: true });
    }
  };

  const handleDownload = () => {
    const itemName = `${name}.zip`;
    DownloadFile('folder', id, itemName);
  };

  const handleShowShare = () => dispatch(setShowShareSideOver({ show: true, id, type: 'folder' }));

  const handleCopy = () => {
    onCopy({
      copyToFolderId: parentId,
      folderIds: [id]
    });
  };

  const configForDropdown = [
    {
      label: 'Download',
      onClick: handleDownload,
      icon: <ArrowUpTrayIcon className="w-5 h-5" aria-hidden="true" />
    },
    {
      label: 'Rename',
      onClick: () => dispatch(setItemActionForSideOver({ action: 'rename', id, name })),
      icon: <PencilIcon className="w-5 h-5" aria-hidden="true" />
    },
    {
      label: 'Copy',
      icon: <ClipboardIcon className="w-5 h-5 stroke-current" aria-hidden="true" />,
      onClick: handleCopy
    },
    {
      label: 'Share',
      icon: <ShareIcon className="w-5 h-5 stroke-current" aria-hidden="true" />,
      onClick: handleShowShare
    },
    {
      label: 'Delete',
      onClick: handleDelete,
      icon: <TrashIcon className="w-5 h-5" aria-hidden="true" />
    }
  ];

  return (
    <div
      className={cl(
        'group flex relative bg-white justify-between w-full items-center py-1.5 hover:bg-gray-100',
        isActiveFolder && parentId === null ? 'bg-green-200 text-black' : '',
        !transform && isOver ? 'bg-primary-100' : ''
      )}
      ref={droppableRef}
      style={style}
      title={name}
    >
      <div onClick={() => handleClickFolder(id, parentId)} className="flex items-center cursor-pointer ml-0.5">
        <div className="flex items-center gap-2">
          {isActiveFolder || haveActiveChild ? (
            <>
              <VscTriangleDown className="h-4 w-4 text-gray-600" aria-hidden="true" />
              <FaFolderOpen className="text-green-500" />
            </>
          ) : (
            <>
              <VscTriangleRight className="h-4 w-4 text-gray-600" aria-hidden="true" />
              <FaFolder color="rgb(95,99,104)" />
            </>
          )}
        </div>

        <div className="ml-2 text-sm font-medium tracking-wider capitalize">
          <p>{name}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Dropdown config={configForDropdown} iconType="dots" />
        <PlusIcon
          onClick={() => dispatch(setItemActionForSideOver({ action: 'create', id }))}
          className="w-4 h-4 text-black cursor-pointer stroke-current"
          aria-hidden="true"
        />
        <div ref={draggableRef} {...listeners} {...attributes}>
          <MdDragIndicator aria-hidden="true" className="cursor-move" />
        </div>
      </div>
    </div>
  );
}
