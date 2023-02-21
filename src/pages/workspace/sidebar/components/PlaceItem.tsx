import React, { ReactNode } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setActivePlaceId } from '../../../../features/workspace/workspaceSlice';
import { classNames } from '../../../../utils';

interface PlaceItemProps {
  label: string
  onClick?: () => void // not required if already clicked in place
  icon: JSX.Element
  rightContent?: ReactNode
  bottomContent?: ReactNode
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
        'focus:flex flex-col w-full pl-4 py-5 items-center relative',
        bottomContent ? 'gap-2' : '',
      )}
      onClick={isActivePlace ? resetSelectedPlace : onClick}
    >
      {!showSidebar && isActivePlace && (
        <span className="absolute top-0 left-0 right-0 h-1 bg-green-500"></span>
      )}
      <div className="flex justify-between w-full">
        <div
          className={classNames(
            'flex gap-4 items-center content-center self-center',
            isActivePlace ? 'justify-center text-black font-bold' : '',
            showSidebar && isActivePlace ? 'ml-16' : '',
          )}
        >
          <span className="flex items-center w-6 h-6">{icon}</span>
          <span
            className={classNames(
              showSidebar ? 'block' : 'hidden',
              'font-semibold text-xs w-full cursor-pointer uppercase leading-3 truncate tracking-wider',
              isActivePlace ? 'text-black font-bold' : '',
            )}
          >
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {showSidebar && rightContent}

          <span
            onClick={isActivePlace ? resetSelectedPlace : onClick}
            className={classNames(showSidebar ? 'block' : 'hidden')}
          >
            {isActivePlace ? (
              <FiChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" />
            ) : (
              <FiChevronRight className="w-5 h-5 text-gray-500 cursor-pointer" />
            )}
          </span>
        </div>
      </div>
      {bottomContent}
    </li>
  );
}
