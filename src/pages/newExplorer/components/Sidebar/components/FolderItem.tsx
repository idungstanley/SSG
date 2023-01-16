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
} from '@heroicons/react/outline';
import Dropdown from '../../../../../components/Dropdown/index';
import { classNames } from '../../../../../utils';
import { useAppDispatch } from '../../../../../app/hooks';
import {
  setItemActionForSideOver,
  setShowCommentsSideOver,
  setShowWatchersSideOver,
} from '../../../../../features/general/slideOver/slideOverSlice';
import { useDeleteExplorerItem } from '../../../../../features/explorer/explorerActionsService';
import { resetSelectedItem } from '../../../../../features/explorer/explorerSlice';
import { useNavigate } from 'react-router-dom';
import { DownloadFile } from '../../../../../app/helpers';
import { setSelectedItem } from '../../../../../features/chat/chatSlice';

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
        'group flex justify-between w-full items-center py-1 hover:bg-gray-100',
        isActiveFolder ? 'text-primary-600 bg-primary-50' : ''
      )}
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
          <p>{name}</p>
        </div>
      </div>

      <div className="flex opacity-0 group-hover:opacity-100 gap-2 items-center">
        <Dropdown config={configForDropdown} iconType="dots" />
        <PlusIcon
          onClick={() =>
            dispatch(setItemActionForSideOver({ action: 'create', id }))
          }
          className="h-5 w-5 cursor-pointer stroke-current text-gray-500"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
