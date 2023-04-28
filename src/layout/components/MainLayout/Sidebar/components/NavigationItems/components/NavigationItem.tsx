import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setActivePlaceName, setShowExtendedBar } from '../../../../../../../features/workspace/workspaceSlice';
import { cl } from '../../../../../../../utils';
import { useNavigate } from 'react-router-dom';
import { MdDragIndicator } from 'react-icons/md';
import { useSortable } from '@dnd-kit/sortable';
import { useGetNotificationCountService } from '../../../../../../../features/general/notification/notificationService';

interface NavigationItemProps {
  item: {
    name: string;
    href: string;
    alwaysShow: boolean;
    source?: string;
    icon?: JSX.Element;
    id: string;
  };
  isVisible: boolean;
}

export default function NavigationItem({ item, isVisible }: NavigationItemProps) {
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
    height: '30px'
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cl(
        activePlaceName === item.name ? 'hover:bg-green-200' : 'hover:bg-gray-100',
        !showSidebar ? 'justify-center' : 'gap-2 items-center',
        'relative flex cursor-pointer pl-6 p-2 w-full group'
      )}
      onClick={() => handleClick(item.name, item.href)}
      style={style}
    >
      {activePlaceName === item.name ? (
        <span className="absolute top-0 bottom-0 left-0 w-0.5 rounded-r-lg " style={{ backgroundColor: '#BF00FF' }} />
      ) : null}
      <span
        className={`absolute justify-center text-xl text-gray-500 opacity-0 cursor-move left-1.5 group-hover:opacity-100 ${
          name !== 'Home' ? 'block' : 'hidden'
        }`}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <MdDragIndicator />
      </span>
      <span className="relative w-5 h-5">
        {item.name === 'Notifications' && notificationCount > 0 && (
          <p
            className="flex items-center justify-center px-0.5 h-3 w-3 absolute top-0 text-white bg-red-600"
            style={{ fontSize: '8px', borderRadius: '50px', left: '10px' }}
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
            fontWeight: '400',
            textDecoration: 'none solid rgb(83,87,94)'
          }}
        >
          {item.name}
        </p>
      ) : null}
    </div>
  );
}
