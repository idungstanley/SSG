import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setActivePlaceName, setShowExtendedBar } from '../../../../../../../features/workspace/workspaceSlice';
import { cl } from '../../../../../../../utils';
import { useNavigate } from 'react-router-dom';
import { useSortable } from '@dnd-kit/sortable';
import { useGetNotificationCountService } from '../../../../../../../features/general/notification/notificationService';
import { VscPinned } from 'react-icons/vsc';
import Drag from '../../../../../../../assets/icons/Drag';

interface NavigationItemProps {
  item: {
    name: string;
    href: string;
    alwaysShow: boolean;
    source?: string;
    icon?: JSX.Element;
    id: string;
  };
  handleHotkeyClick: (value: string, event: React.MouseEvent<SVGElement, MouseEvent>) => void;
  activeTabId: string | null;
  setActiveTabId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function NavigationItem({ item, handleHotkeyClick }: NavigationItemProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { notificationCount } = useAppSelector((state) => state.notification);
  const { id, name } = item;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  });

  const { activePlaceName } = useAppSelector((state) => state.workspace);
  useGetNotificationCountService();
  const handleClick = (name: string | null, link: string) => {
    dispatch(setActivePlaceName(name));
    dispatch(setShowExtendedBar(true));
    if (name !== 'Favorites') {
      navigate(link);
    }
  };

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    backgroundColor: isDragging ? '#f3f4f6' : activePlaceName === name ? '#BF00FF21' : undefined,
    zIndex: isDragging ? 1 : undefined,
    height: '30px',
    paddingLeft: showSidebar ? '24px' : '18px'
  };

  // if (!isVisible) {
  //   return null;
  // }

  return (
    <div
      className={cl(
        activePlaceName === item.name ? 'hover:bg-green-200' : 'hover:bg-gray-100',
        !showSidebar ? 'justify-center' : 'gap-2 items-center justify-between',
        'relative flex cursor-pointer p-2 w-full group'
      )}
      onClick={() => handleClick(item.name, item.href)}
      style={style}
    >
      {activePlaceName === item.name ? (
        <span className="absolute top-0 bottom-0 left-0 w-0.5 rounded-r-lg " style={{ backgroundColor: '#BF00FF' }} />
      ) : null}
      <span
        className={`absolute justify-center text-xl opacity-0 cursor-move left-1.5 group-hover:opacity-100 ${
          name !== 'Home' ? 'block' : 'hidden'
        }`}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <Drag />
      </span>
      <div className={cl(!showSidebar ? 'justify-center' : 'gap-2 items-center', 'relative flex cursor-pointer')}>
        <span className="relative flex items-center justify-center w-5 h-5">
          {item.name === 'Notifications' && notificationCount > 0 && (
            <p
              className="absolute top-0 flex items-center justify-center w-auto h-3 px-1 text-white"
              style={{
                fontSize: '8px',
                borderRadius: '50px',
                left: notificationCount > 9 ? '5px' : '10px',
                backgroundColor: '#B30A0B'
              }}
            >
              {notificationCount}
            </p>
          )}
          {item.icon || <img className="w-5 h-5" src={item.source} alt={item.name} />}
        </span>
        {showSidebar ? (
          <p
            className="ml-3 truncate"
            style={{
              fontSize: '13px',
              lineHeight: '12px',
              verticalAlign: 'baseline',
              letterSpacing: 'normal',
              fontStyle: 'normal',
              fontWeight: '600',
              textDecoration: 'none solid rgb(83,87,94)'
            }}
          >
            {item.name}
          </p>
        ) : null}
      </div>
      {showSidebar && (
        <VscPinned
          onClick={(e) => handleHotkeyClick(item.id, e)}
          className="opacity-0 cursor-pointer group-hover:opacity-100 hover:text-black"
        />
      )}
    </div>
  );
}
