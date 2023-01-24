import React from 'react';
import {
  TrashIcon,
  PlusIcon,
  PencilIcon,
  ShareIcon,
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
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { FaFolder } from 'react-icons/fa';
import { TbArrowRotaryFirstLeft, TbArrowsUpDown } from 'react-icons/tb';

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
      icon: <TbArrowRotaryFirstLeft className="h-5 w-5" aria-hidden="true" />,
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
      label: 'Pilot',
      onClick: () =>
        dispatch(
          setShowPilotSideOver({
            id,
            type: 'folder',
            show: true,
          })
        ),
      icon: <TbArrowsUpDown className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
      icon: <TrashIcon className="h-5 w-5" aria-hidden="true" />,
    },
  ];

  return (
    <div
      className={classNames(
        'grid grid-cols-sidebarItem justify-between w-full items-center py-1 px-1 hover:bg-gray-100',
        isActiveFolder ? 'text-primary-600 bg-primary-50' : '',
        !transform && isOver ? 'bg-primary-100' : ''
      )}
      ref={droppableRef}
      style={style}
    >
      {isActiveFolder && (
        <span className="absolute top-0 bottom-0 left-0 w-0.5 bg-green-500" />
      )}
      <div
        onClick={() => handleClickFolder(id, parentId)}
        className="flex gap-2 mr-2 items-center cursor-pointer"
      >
        {isActiveFolder || haveAncestors ? (
          <>
            <VscTriangleDown className="flex-shrink-0 h-3 text-xs mr-0.5" />
          </>
        ) : (
          <>
            <VscTriangleRight
              className="flex-shrink-0 h-3 text-xs"
              color="rgb(95,99,104)"
              aria-hidden="true"
            />
            <FaFolder color="rgb(95,99,104)" />
          </>
        )}
      </div>

      <div
        onClick={() => handleClickFolder(id, parentId)}
        className="space-x-2 whitespace-nowrap overflow-x-hidden truncate cursor-pointer"
      >
        <FaFolder
          className="h-5 w-5 mb-1 inline-flex items-center"
          aria-hidden="true"
        />
        <p className="inline">{name}</p>
      </div>

      <div className="flex gap-2 items-center">
        <Dropdown config={configForDropdown} iconType="dots" />
        <PlusIcon
          onClick={() =>
            dispatch(setItemActionForSideOver({ action: 'create', id }))
          }
          className="h-5 w-5 cursor-pointer stroke-current text-gray-400"
          aria-hidden="true"
        />
        <div ref={draggableRef} {...listeners} {...attributes}>
          <TbArrowsUpDown
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
