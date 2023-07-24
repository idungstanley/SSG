import React, { useEffect, useRef } from 'react';
import Menu from '@mui/material/Menu';
import { useAppSelector } from '../../app/hooks';
import ActiveTreeSearch from '../ActiveTree/ActiveTreeSearch';

interface ItemProps {
  label: string;
  icon: JSX.Element;
  onclick: () => void;
}

interface IDropdownWithoutHeaderProps {
  items: ItemProps[];
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
export default function DropdownWithoutHeader({
  items,
  anchorEl,
  handleClose,
  setAnchorEl
}: IDropdownWithoutHeaderProps) {
  const { createEntityType } = useAppSelector((state) => state.workspace);

  const open = Boolean(anchorEl);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setAnchorEl(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [anchorEl]);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      autoFocus={false}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
      className="rounded-md shadow-2xl"
      PaperProps={{
        style: {
          height: '230px',
          overflowY: 'auto',
          width: '250px',
          padding: '0 8px'
        }
      }}
    >
      <div className="absolute w-full text-base text-left transform bg-white">
        {/* item list to show in dropdown*/}
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className="flex items-center cursor-pointer p-2 my-1 gap-2 ml-0.5 hover:bg-gray-200 rounded-md"
              onClick={item.onclick}
              style={{ color: '#4e5258' }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {(index + 1) % 2 === 0 && index !== items.length - 1 && <hr />}
            {createEntityType === item.label.toLowerCase() && <ActiveTreeSearch />}
          </React.Fragment>
        ))}
      </div>
    </Menu>
  );
}
