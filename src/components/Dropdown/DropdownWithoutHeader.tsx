import React, { useEffect, useRef } from 'react';
import Menu from '@mui/material/Menu';

interface ItemProps {
  label: string;
  icon: JSX.Element;
  onclick: () => void;
}

interface ModalProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  items: ItemProps[];
}
export default function DropdownWithoutHeader({ setAnchorEl, anchorEl, handleClose, items }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const open = Boolean(anchorEl);

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
      <div className="relative w-full text-left text-gray-500 transform bg-white">
        {/* item list to show in dropdown*/}
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className="flex cursor-pointer p-2 my-1 gap-2 ml-0.5 hover:bg-gray-200 rounded-md"
              onClick={item.onclick}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {(index + 1) % 2 === 0 && index !== items.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </Menu>
  );
}
