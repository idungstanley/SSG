import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setActivePlaceName, setShowExtendedBar } from '../../../../../../../features/workspace/workspaceSlice';
import { cl } from '../../../../../../../utils';
import { useNavigate } from 'react-router-dom';

interface NavigationItemProps {
  item: {
    name: string;
    href: string;
    alwaysShow: boolean;
    source?: string;
    icon?: JSX.Element;
  };
  isVisible: boolean;
}

export default function NavigationItem({ item, isVisible }: NavigationItemProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { activePlaceName } = useAppSelector((state) => state.workspace);
  const handleClick = (name: string | null, link: string) => {
    dispatch(setActivePlaceName(name));
    dispatch(setShowExtendedBar(true));
    if (name !== 'Favorites') {
      navigate(link);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cl(
        activePlaceName === item.name ? 'hover:bg-green-200' : 'hover:bg-gray-100',
        !showSidebar ? 'justify-center' : 'gap-2 items-center',
        'relative flex cursor-pointer pl-4 p-2 w-full'
      )}
      onClick={() => handleClick(item.name, item.href)}
      style={{ backgroundColor: `${activePlaceName === item.name ? '#BF00FF21' : ''}` }}
    >
      {activePlaceName === item.name ? (
        <span className="absolute top-0 bottom-0 left-0 w-1 rounded-r-lg " style={{ backgroundColor: '#BF00FF' }} />
      ) : null}
      <span className="relative w-5 h-5">
        {item.name === 'Notifications' && (
          <p
            className="flex items-center justify-center px-0.5 h-3 w-min-4 absolute -right-1.5 top-0 text-white bg-red-600"
            style={{ fontSize: '8px', borderRadius: '50px' }}
          >
            24
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
