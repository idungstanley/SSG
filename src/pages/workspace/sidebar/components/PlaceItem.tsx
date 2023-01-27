import React, { ReactNode } from 'react';
import { classNames } from '../../../../utils';

interface PlaceItemProps {
  label: string;
  onClick: () => void;
  icon: JSX.Element;
  rightContent?: ReactNode;
  bottomContent?: ReactNode;
}

export default function PlaceItem({
  label,
  onClick,
  icon,
  rightContent,
  bottomContent,
}: PlaceItemProps) {
  return (
    <li
      className={classNames(
        !rightContent || !bottomContent ? 'hover:bg-gray-100' : '',
        'flex flex-col w-full px-2 pt-3 pb-2 items-center',
        bottomContent ? 'gap-2' : ''
      )}
    >
      <div className="flex justify-between w-full">
        <div
          onClick={onClick}
          className="flex gap-5 items-center w-full cursor-pointer"
        >
          {icon}
          {label}
        </div>
        {rightContent}
      </div>
      {bottomContent}
    </li>
  );
}
