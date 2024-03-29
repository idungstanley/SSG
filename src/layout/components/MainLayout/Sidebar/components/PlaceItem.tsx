import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setActivePlaceId } from '../../../../../features/workspace/workspaceSlice';
import { cl } from '../../../../../utils';
import { useSortable } from '@dnd-kit/sortable';
import SearchTaskView from './Search/SearchTaskView';
import { setIsSearchActive } from '../../../../../features/search/searchSlice';
import ArrowRight from '../../../../../assets/icons/ArrowRight';
import ArrowOpenDown from '../../../../../assets/icons/ArrowOpenDown';
import Drag from '../../../../../assets/icons/Drag';
import ActiveBarIdentification from '../../../../../components/tasks/Component/ActiveBarIdentification';
import ActiveBackground from '../../../../../components/tasks/Component/ActiveBackground';

interface PlaceItemProps {
  label: string;
  onClick?: () => void; // not required if already clicked in place
  icon: JSX.Element;
  rightContent?: ReactNode;
  midContent?: ReactNode;
  bottomContent?: ReactNode;
  id: string;
  isActiveLayoutCondition?: boolean;
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
  isActiveLayoutCondition
}: PlaceItemProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { hub } = useAppSelector((state) => state.hub);
  const { activeItemId } = useAppSelector((state) => state.workspace);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { isPlace: true }
  });
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const isActivePlace = !onClick;
  const placeActive = isActivePlace && isActiveLayoutCondition;

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    backgroundColor: isDragging
      ? '#f3f4f6'
      : placeActive
      ? 'white'
      : isActivePlace
      ? 'white'
      : isActivePlace && activeItemId && !searchStatus
      ? '#BF00FF08'
      : undefined,
    zIndex: isDragging ? 1 : isActivePlace ? 10 : undefined,
    // height: '50px',
    paddingLeft: searchStatus ? '25px' : undefined
  };

  const resetSelectedPlace = () => {
    dispatch(setActivePlaceId(null));
    navigate(`/${currentWorkspaceId}`);
  };
  const handleCloseSearchView = () => {
    dispatch(setIsSearchActive(false));
  };

  return (
    <li
      id={`${label}`}
      className={cl(
        isActivePlace ? 'sticky top-0' : '',
        'focus:flex hover:bg-alsoit-gray-50 flex-col w-full group',
        bottomContent ? 'gap-2' : ''
      )}
      style={style}
      onClick={isActivePlace ? resetSelectedPlace : onClick}
    >
      {!searchStatus && (
        <div
          className="relative flex items-center justify-center cursor-pointer"
          style={{ height: '50px', paddingLeft: showSidebar ? '25px' : '20px' }}
        >
          <ActiveBackground showBgColor={placeActive as boolean} />
          <ActiveBarIdentification showBar={placeActive as boolean} />
          <span
            className="absolute justify-center text-xl text-gray-500 opacity-0 cursor-move left-1.5 group-hover:opacity-100"
            ref={setNodeRef}
            {...attributes}
            {...listeners}
          >
            <Drag />
          </span>
          <div className="flex items-center justify-between w-full">
            <div
              className={cl(
                'flex gap-4 items-center content-center self-center ml-2.5',
                isActivePlace ? 'justify-center text-black font-extrabold' : ''
              )}
            >
              <span className={`${!showSidebar ? 'hover:text-purple-500' : ''} flex items-center w-6 h-6`}>{icon}</span>
              <span
                className={cl(
                  showSidebar ? 'block' : 'hidden',
                  'w-32 text-left cursor-pointer uppercase truncate',
                  isActivePlace ? 'font-black text-alsoit-purple-300' : ''
                )}
                style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  verticalAlign: 'baseline',
                  letterSpacing: '0.65px',
                  fontWeight: '700'
                }}
              >
                {label}
              </span>
            </div>
            <div className="absolute right-0 flex items-center gap-2">
              <div className="flex items-center opacity-0 group-hover:opacity-100">
                {showSidebar && midContent}
                {showSidebar && rightContent}
              </div>
              <span
                onClick={isActivePlace ? resetSelectedPlace : onClick}
                className={cl(showSidebar ? 'block mr-3' : 'hidden')}
              >
                {isActivePlace ? <ArrowOpenDown /> : <ArrowRight />}
              </span>
            </div>
          </div>
          {bottomContent}
        </div>
      )}
      {searchStatus && (
        <SearchTaskView items={hub} handleCloseSearchView={handleCloseSearchView} placeHolder="Search Hubs.." />
      )}
    </li>
  );
}
