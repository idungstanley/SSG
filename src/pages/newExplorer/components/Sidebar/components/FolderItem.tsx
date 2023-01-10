import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { classNames } from '../../../../../utils';

interface FolderItemProps {
  id: string;
  name: string;
  parentId: string | null;
  handleClickFolder: (i: string, parentId: string | null) => void;
  isActiveFolder: boolean;
}

export default function FolderItem({
  id,
  name,
  parentId,
  handleClickFolder,
  isActiveFolder,
}: FolderItemProps) {
  return (
    <div
      onClick={() => handleClickFolder(id, parentId)}
      key={id}
      className={classNames(
        'flex w-full items-center py-1 cursor-pointer gap-2 hover:bg-gray-100',
        isActiveFolder ? 'text-primary-600 bg-primary-50' : ''
      )}
    >
      {isActiveFolder ? (
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      )}

      <div className="flex gap-2 items-center">
        <FolderIcon className="h-5 w-5" aria-hidden="true" />
        <p>{name}</p>
      </div>
    </div>
  );
}
