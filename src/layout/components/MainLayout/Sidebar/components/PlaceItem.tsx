import React, { memo, ReactNode } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setActivePlaceId } from '../../../../../features/workspace/workspaceSlice';
import { cl } from '../../../../../utils';

interface PlaceItemProps {
  label: string;
  onClick?: () => void; // not required if already clicked in place
  icon: JSX.Element;
  rightContent?: ReactNode;
  bottomContent?: ReactNode;
}

function PlaceItem({
  label,
  onClick,
  icon,
  rightContent,
  bottomContent,
}: PlaceItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showSidebar } = useAppSelector((state) => state.account);

  const isActivePlace = !onClick;

  const resetSelectedPlace = () => {
    dispatch(setActivePlaceId(null));
    navigate('/');
  };

  return (
    <li
      className={cl(
        !isActivePlace ? 'hover:bg-gray-100' : 'hover:bg-gray-100 bg-gray-200',
        'focus:flex flex-col w-full pl-4 py-5 items-center relative',
        bottomContent ? 'gap-2' : ''
      )}
    >
      {isActivePlace && (
        <span className="absolute top-0 left-0 right-0 bg-green-500 h-1"></span>
      )}
      <div className="flex justify-between w-full">
        <div
          onClick={isActivePlace ? resetSelectedPlace : onClick}
          className={cl(
            'flex cursor-pointer gap-4 items-center content-center self-center',
            isActivePlace && 'justify-center text-black font-bold',
            isActivePlace && showSidebar && 'ml-16'
          )}
        >
          {icon}
          {showSidebar ? (
            <span
              className={cl(
                'font-semibold text-xs w-full cursor-pointer uppercase leading-3 truncate tracking-wider',
                isActivePlace && 'text-black font-bold'
              )}
            >
              {label}
            </span>
          ) : null}
        </div>
        {showSidebar ? (
          <div className="flex gap-2 items-center">
            {rightContent}

            <span onClick={isActivePlace ? resetSelectedPlace : onClick}>
              {isActivePlace ? (
                <FiChevronDown className="h-5 w-5 cursor-pointer text-gray-500" />
              ) : (
                <FiChevronRight className="h-5 w-5 cursor-pointer text-gray-500" />
              )}
            </span>
          </div>
        ) : null}
      </div>
      {showSidebar ? bottomContent : null}
    </li>
  );
}

export default memo(PlaceItem);