import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { ReactNode } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { setActivePlaceId } from '../../../../features/workspace/workspaceSlice';
import { classNames } from '../../../../utils';

interface PlaceItemProps {
  label: string;
  onClick?: () => void;
  icon: JSX.Element;
  rightContent?: ReactNode;
  bottomContent?: ReactNode;
}

export default function PlaceItem({
  label,
  onClick,
  icon,
  rightContent,
  bottomContent,
}: PlaceItemProps) {
  const dispatch = useAppDispatch();
  const isActivePlace = !onClick;

  const resetSelectedPlace = () => dispatch(setActivePlaceId(null));

  return (
    <li
      className={classNames(
        !isActivePlace ? 'hover:bg-gray-100' : '',
        'group focus:flex flex-col w-full px-2 py-3.5 items-center',
        bottomContent ? 'gap-2' : ''
      )}
    >
      <div className=" flex justify-between w-full">
        <div
          onClick={isActivePlace ? resetSelectedPlace : onClick}
          className="flex gap-5 items-center w-full cursor-pointer"
        >
          {icon}
          {label}
        </div>
        <div className="flex gap-2 items-center group-hover:opacity-100 opacity-0 transition">
          {rightContent}

          <span onClick={isActivePlace ? resetSelectedPlace : onClick}>
            {isActivePlace ? (
              <ChevronDownIcon className="h-5 w-5 cursor-pointer" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 cursor-pointer" />
            )}
          </span>
        </div>
      </div>
      {bottomContent}
    </li>
  );
}
