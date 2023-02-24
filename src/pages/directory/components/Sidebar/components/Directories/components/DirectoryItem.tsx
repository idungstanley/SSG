import React from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { AiOutlineBranches } from 'react-icons/ai';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import { useNavigate, useParams } from 'react-router-dom';
import { cl } from '../../../../../../../utils';

interface DirectoryItemProps {
  id: string;
  name: string;
}

export default function DirectoryItem({ id, name }: DirectoryItemProps) {
  const { directoryId } = useParams();
  const navigate = useNavigate();

  const onClickDirectory = (id: string) => {
    const isActiveDirectory = directoryId === id;

    navigate(`/directory/shelf/${isActiveDirectory ? '' : id}`, {
      replace: true,
    });
  };

  return (
    <div
      className={cl(
        'group flex w-full p-1 justify-between items-center',
        directoryId === id
          ? 'hover:bg-green-200 bg-green-100'
          : 'hover:bg-gray-100'
      )}
    >
      <div
        onClick={() => onClickDirectory(id)}
        className="flex truncate items-center gap-2 cursor-pointer"
      >
        {directoryId === id ? (
          <VscTriangleDown
            className="h-4 w-4 text-gray-500"
            aria-hidden="true"
          />
        ) : (
          <VscTriangleRight
            className="h-4 w-4 text-gray-500"
            aria-hidden="true"
          />
        )}
        <AiOutlineBranches className="h-5 w-5 cursor-pointer" />
        <p className="truncate" title={name}>
          {name}
        </p>
      </div>

      <span className="opacity-0 group-hover:opacity-100">
        <EllipsisHorizontalIcon className="h-5 w-5 cursor-pointer" />
      </span>
    </div>
  );
}
