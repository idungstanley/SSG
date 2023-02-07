import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { setActivePlaceId } from '../../../../features/workspace/workspaceSlice';
import { classNames } from '../../../../utils';

interface PlaceItemProps {
  label: string;
  onClick?: () => void; // not required if already clicked in place
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
  const navigate = useNavigate();

  const isActivePlace = !onClick;

  const resetSelectedPlace = () => {
    dispatch(setActivePlaceId(null));

    navigate('/workspace');
  };

  return (
    <li
      className={classNames(
        !isActivePlace ? 'hover:bg-gray-100' : '',
        'focus:flex flex-col w-full px-2 py-5 items-center',
        bottomContent ? 'gap-2' : ''
      )}
    >
      <div className="flex justify-between w-full">
        <div
          onClick={isActivePlace ? resetSelectedPlace : onClick}
          className={classNames(
            'flex gap-5 items-center w-full cursor-pointer uppercase text-xs',
            isActivePlace ? 'justify-center' : ''
          )}
        >
          {icon}
          {label}
        </div>
        <div className="flex gap-2 items-center">
          {rightContent}

          <span onClick={isActivePlace ? resetSelectedPlace : onClick}>
            {isActivePlace ? (
              <ChevronDownIcon className="h-5 w-5 cursor-pointer text-gray-500" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 cursor-pointer text-gray-500" />
            )}
          </span>
        </div>
      </div>

      {bottomContent}
    </li>
  );
}
