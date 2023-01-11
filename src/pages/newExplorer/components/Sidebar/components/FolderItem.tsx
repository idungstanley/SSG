import React from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  TrashIcon,
  PlusIcon,
  PencilIcon,
} from '@heroicons/react/outline';
import Dropdown from '../../../../../components/Dropdown/index';
import { classNames } from '../../../../../utils';
import { useAppDispatch } from '../../../../../app/hooks';
import { setItemActionForSideOver } from '../../../../../features/general/slideOver/slideOverSlice';

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
  const configForDropdown = [
    {
      label: 'Create new',
      onClick: () => ({}),
      icon: <PlusIcon className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Rename',
      onClick: () =>
        dispatch(setItemActionForSideOver({ action: 'rename', id, name })),
      icon: <PencilIcon className="h-5 w-5" aria-hidden="true" />,
    },
    {
      label: 'Delete',
      onClick: () => ({}),
      icon: <TrashIcon className="h-5 w-5" aria-hidden="true" />,
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
