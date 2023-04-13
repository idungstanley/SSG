import React, { ReactNode } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setActivePlaceId } from '../../../../../features/workspace/workspaceSlice';
import { cl } from '../../../../../utils';
import { useSortable } from '@dnd-kit/sortable';

interface PlaceItemProps {
  label: string;
  onClick?: () => void; // not required if already clicked in place
  icon: JSX.Element;
  rightContent?: ReactNode;
  bottomContent?: ReactNode;
  id: string;
}

export default function PlaceItem({ label, onClick, icon, rightContent, bottomContent, id }: PlaceItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  });
  const isActivePlace = !onClick;

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    backgroundColor: isDragging
      ? '#f3f4f6'
      : isActivePlace && activeItemId !== null
      ? '#BF00FF08'
      : isActivePlace
      ? '#BF00FF08'
      : undefined,
    zIndex: isDragging ? 1 : undefined
  };

  const resetSelectedPlace = () => {
    dispatch(setActivePlaceId(null));
    navigate('/');
  };

  return (
    <li
      id={`${label}`}
      className={cl(
        !isActivePlace ? 'hover:bg-gray-100' : 'hover:bg-gray-100',
        'focus:flex flex-col w-full pl-7 py-5 items-center relative group',
        bottomContent ? 'gap-2' : ''
      )}
      style={style}
      onClick={isActivePlace ? resetSelectedPlace : onClick}
    >
      <span
        className="absolute justify-center text-xl text-gray-500 opacity-0 cursor-move left-1 group-hover:opacity-100"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <MdDragIndicator style={{ color: `${isActivePlace ? '#BF00FFB2' : undefined}` }} />
      </span>
      {/* {isActivePlace && activeItemId == null && (
        <span className="absolute top-0 bottom-0 left-0 w-1 bg-gray-700"></span>
      )} */}
      <div className="flex justify-between w-full">
        <div
          className={cl(
            'flex gap-4 items-center content-center self-center',
            isActivePlace ? 'justify-center text-black font-extrabold' : ''
          )}
        >
          <span className={`${!showSidebar ? 'hover:text-purple-500' : ''} flex items-center w-6 h-6`}>{icon}</span>
          <span
            className={cl(
              showSidebar ? 'block' : 'hidden',
              'w-full cursor-pointer uppercase truncate',
              isActivePlace ? 'font-black' : ''
            )}
            style={{
              color: `${isActivePlace ? '#BF00FFB2' : ''}`,
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
              <FiChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" style={{ color: '#BF00FFB2' }} />
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
