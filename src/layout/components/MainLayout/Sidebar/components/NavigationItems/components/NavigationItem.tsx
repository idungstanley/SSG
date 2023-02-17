import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../../../../../app/hooks';
import { cl } from '../../../../../../../utils';

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

export default function NavigationItem({
  item,
  isVisible,
}: NavigationItemProps) {
  const { pathname } = useLocation();
  const { showSidebar } = useAppSelector((state) => state.account);

  if (!isVisible) {
    return null;
  }

  return (
    <Link
      to={item.href}
      className={cl(
        pathname === item.href
          ? 'bg-green-100 hover:bg-green-200'
          : 'hover:bg-gray-100',
        !showSidebar ? 'justify-center' : 'gap-2 items-center',
        'relative flex cursor-pointer p-2 w-full'
      )}
    >
      {item.href === pathname ? (
        <span className="absolute rounded-r-lg top-0 bottom-0 left-0 w-1 bg-green-500 " />
      ) : null}

      {item.icon || (
        <img className="w-5 h-5" src={item.source} alt={item.name} />
      )}
      {showSidebar ? <p className="text-xs truncate">{item.name}</p> : null}
    </Link>
  );
}
