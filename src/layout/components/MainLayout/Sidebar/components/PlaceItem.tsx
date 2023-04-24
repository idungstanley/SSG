import React, { ReactNode } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setActivePlaceId } from '../../../../../features/workspace/workspaceSlice';
import { cl } from '../../../../../utils';
import { useSortable } from '@dnd-kit/sortable';
import { BiSearch } from 'react-icons/bi';
import { VscSettings } from 'react-icons/vsc';
import { IoClose } from 'react-icons/io5';
// import { BiSearch } from 'react-icons/bi';

interface PlaceItemProps {
  label: string;
  onClick?: () => void; // not required if already clicked in place
  icon: JSX.Element;
  rightContent?: ReactNode;
  midContent?: ReactNode;
  bottomContent?: ReactNode;
  id: string;
  setIsSearchActive?: React.Dispatch<React.SetStateAction<boolean>>;
  searchStatus?: boolean;
}

export default function PlaceItem({
  label,
  midContent,
  onClick,
  icon,
  rightContent,
  bottomContent,
  id,
  searchStatus,
  setIsSearchActive
}: PlaceItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  });
  const isActivePlace = !onClick;

  const baseColor = '#BF00FFB2';
  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    backgroundColor: isDragging ? '#f3f4f6' : isActivePlace && activeItemId !== null ? '#BF00FF08' : undefined,
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
        !isActivePlace ? 'hover:bg-gray-100' : searchStatus ? undefined : 'hover:bg-gray-100',
        'focus:flex flex-col w-full pl-7 py-5 items-center relative group',
        bottomContent ? 'gap-2' : ''
      )}
      style={style}
      onClick={isActivePlace ? resetSelectedPlace : onClick}
    >
      {!searchStatus && (
        <>
          <span
            className="absolute justify-center text-xl text-gray-500 opacity-0 cursor-move left-1 group-hover:opacity-100"
            ref={setNodeRef}
            {...attributes}
            {...listeners}
          >
            <MdDragIndicator style={{ color: `${isActivePlace ? baseColor : undefined}` }} />
          </span>
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
                  color: `${isActivePlace ? baseColor : ''}`,
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
              <div className="flex items-center group-hover:opacity-100 opacity-0">
                {showSidebar && midContent}
                {showSidebar && rightContent}
              </div>

              <span
                onClick={isActivePlace ? resetSelectedPlace : onClick}
                className={cl(showSidebar ? 'block' : 'hidden')}
              >
                {isActivePlace ? (
                  <FiChevronDown className="w-5 h-5 text-gray-500 cursor-pointer" style={{ color: baseColor }} />
                ) : (
                  <FiChevronRight className="w-5 h-5 text-gray-500 cursor-pointer" />
                )}
              </span>
            </div>
          </div>
          {bottomContent}
        </>
      )}
      {searchStatus && (
        <div className="w-full h-full relative" onClick={(e) => e.stopPropagation()}>
          <BiSearch className="absolute w-6 h-4 -left-1 top-2.5" style={{ color: baseColor }} />
          <input
            type="text"
            name=""
            id=""
            placeholder="Search Hubs. . ."
            className="w-full h-fit pl-5 text-sm border-transparent border-none focus:border-transparent focus:ring-0"
          />
          <div className="flex absolute right-3 top-2.5" style={{ color: baseColor }}>
            <VscSettings className="w-6 h-4" />
            <IoClose className="w-6 h-4" onClick={() => setIsSearchActive?.(false)} />
          </div>
        </div>
      )}
    </li>
  );
}
