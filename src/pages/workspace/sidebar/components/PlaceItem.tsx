import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { ReactNode } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
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
  const { showSidebar } = useAppSelector((state) => state.workspace);
  const isActivePlace = !onClick;

  const resetSelectedPlace = () => {
    dispatch(setActivePlaceId(null));

    navigate('/workspace');
  };

  return (
    <li
      className={classNames(
        !isActivePlace ? 'hover:bg-gray-100' : 'hover:bg-gray-100 bg-gray-200',
        'focus:flex flex-col w-full pl-4 py-5 items-center',
        bottomContent ? 'gap-2' : ''
      )}
    >
      <div className="flex justify-between w-full">
        <div
          onClick={isActivePlace ? resetSelectedPlace : onClick}
          className={classNames(
            'flex gap-4 items-center content-center self-center',
            isActivePlace ? 'justify-center text-black font-bold' : '',
            showSidebar && isActivePlace && 'ml-16'
          )}
        >
          {icon}
          <span
            className={classNames(
              showSidebar ? 'block' : 'hidden',
              'font-semibold text-xs w-full cursor-pointer uppercase leading-3 truncate tracking-wider',
              isActivePlace ? 'text-black font-bold' : ''
            )}
          >
            {label}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          {rightContent}

          <span
            onClick={isActivePlace ? resetSelectedPlace : onClick}
            className={classNames(showSidebar ? 'block' : 'hidden')}
          >
            {isActivePlace ? (
              <FiChevronDown className="h-5 w-5 cursor-pointer text-gray-500" />
            ) : (
              <FiChevronRight className="h-5 w-5 cursor-pointer text-gray-500" />
            )}
          </span>
        </div>
      </div>

      {bottomContent}
    </li>
  );
}
