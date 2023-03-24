import React, { ReactNode } from 'react';
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

export default function PlaceItem({ label, onClick, icon, rightContent, bottomContent }: PlaceItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const isActivePlace = !onClick;

  const resetSelectedPlace = () => {
    dispatch(setActivePlaceId(null));
    navigate('/');
  };

  return (
    <li
      id={`${label}`}
      className={cl(
        !isActivePlace ? 'hover:bg-gray-100' : 'hover:bg-gray-100',
        'focus:flex flex-col w-full pl-5 py-5 items-center relative',
        bottomContent ? 'gap-2' : ''
      )}
      style={{
        backgroundColor: `${
          isActivePlace && activeItemId !== null ? 'rgba(0, 0, 0, 0.15)' : isActivePlace ? 'rgba(0, 0, 0, 0.35)' : ''
        }`
      }}
      onClick={isActivePlace ? resetSelectedPlace : onClick}
    >
      {isActivePlace && activeItemId == null && (
        <span className="absolute top-0 bottom-0 left-0 w-1 bg-gray-700"></span>
      )}
      <div className="flex justify-between w-full">
        <div
          className={cl(
            'flex gap-4 items-center content-center self-center',
            isActivePlace ? 'justify-center text-black font-extrabold' : ''
          )}
        >
          <span className="flex items-center w-6 h-6 hover:text-green-400">{icon}</span>
          <span
            className={cl(
              showSidebar ? 'block' : 'hidden',
              'w-full cursor-pointer uppercase truncate',
              isActivePlace ? 'text-black font-black' : ''
            )}
            style={{
              fontSize: '13px',
              lineHeight: '18px',
              verticalAlign: 'baseline',
              letterSpacing: '0.65px',
              fontWeight: '700'
            }}
          >
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {showSidebar && rightContent}

          <span onClick={isActivePlace ? resetSelectedPlace : onClick} className={cl(showSidebar ? 'block' : 'hidden')}>
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
