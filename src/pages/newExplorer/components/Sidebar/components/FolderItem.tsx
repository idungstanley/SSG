import React from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  TrashIcon,
  PlusIcon,
  PencilIcon,
  DownloadIcon,
  ChatIcon,
  ChatAlt2Icon,
  EyeIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import Dropdown from '../../../../../components/Dropdown/index';
import { classNames } from '../../../../../utils';
import { useAppDispatch } from '../../../../../app/hooks';
import {
  setItemActionForSideOver,
  setShowCommentsSideOver,
  setShowShareSideOver,
  setShowWatchersSideOver,
} from '../../../../../features/general/slideOver/slideOverSlice';
import { useDeleteExplorerItem } from '../../../../../features/explorer/explorerActionsService';
import { resetSelectedItem } from '../../../../../features/explorer/explorerSlice';
import { useNavigate } from 'react-router-dom';
import { DownloadFile } from '../../../../../app/helpers';
import { setSelectedItem } from '../../../../../features/chat/chatSlice';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { useDraggable, useDroppable } from '@dnd-kit/core';

function ArrowsUpDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 cursor-pointer stroke-current text-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
      />
    </svg>
  );
}

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

  const handleShowWatchers = () =>
    dispatch(setShowWatchersSideOver({ show: true, type: 'folder', id }));

  const handleShowComments = () =>
    dispatch(setShowCommentsSideOver({ show: true, type: 'folder', id }));

  const handleShowShare = () =>
    dispatch(setShowShareSideOver({ show: true, id, type: 'folder' }));

  const configForDropdown = [
    {
      label: 'Download',
      onClick: handleDownload,
      icon: <DownloadIcon className="h-5 w-5" aria-hidden="true" />,
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
      label: 'Watchers',
      onClick: handleShowWatchers,
      icon: <EyeIcon className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Comments',
      onClick: handleShowComments,
      icon: <ChatIcon className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Chat',
      onClick: () => dispatch(setSelectedItem({ id, type: 'folder' })),
      icon: <ChatAlt2Icon className="h-5 w-5" aria-hidden="true" />,
    },
  ];

  return (
    <div
      className={classNames(
        'group flex justify-between w-full items-center py-1.5 hover:bg-gray-100',
        isActiveFolder ? 'bg-green-50 text-green-500' : '',
        !transform && isOver ? 'bg-primary-100' : ''
      )}
      ref={droppableRef}
      style={style}
    >
      <div
        onClick={() => handleClickFolder(id, parentId)}
        className="flex items-center cursor-pointer"
      >
        {isActiveFolder || haveAncestors ? (
          <>
            <VscTriangleDown
              className="flex-shrink-0 h-3"
              color="rgba(72, 67, 67, 0.64)"
              aria-hidden="true"
            />
            <FaFolderOpen color="rgba(72, 67, 67, 0.64)" />
          </>
        ) : (
          <>
            <VscTriangleRight
              className="flex-shrink-0 h-3"
              color="rgba(72, 67, 67, 0.64)"
              aria-hidden="true"
            />
            <FaFolder color="rgba(72, 67, 67, 0.64)" />
          </>
        )}
        <div className="tracking-wider capitalize ml-2" style={{ fontSize: '10px' }}>
          <p>{name.length > 10 ? name.substring(0,10) : name }</p>
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
          <ArrowsUpDownIcon />
        </div>
      </div>
    </div>
  );
}
