import React, { useEffect, useRef, useState } from 'react';
import Menu from '@mui/material/Menu';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ActiveTreeSearch from '../ActiveTree/ActiveTreeSearch';
import { useGetHubs, useGetTree } from '../../features/hubs/hubService';

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
  const { createEntityType } = useAppSelector((state) => state.workspace);
  // const { showMenuDropdown, SubMenuId } = useAppSelector((state) => state.hub);
  const open = Boolean(anchorEl);
  const [fetchTree, setFetchTree] = useState<boolean>(false);
  const { data: allHubs } = useGetHubs({ includeTree: false });

  const handleFetch = () => {
    setFetchTree((prev) => !prev);
  };

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
            {createEntityType === item.label.toLowerCase() && (
              <ActiveTreeSearch data={allHubs} handleFetch={handleFetch} fetchTree={fetchTree} />
            )}
          </React.Fragment>
        ))}
      </div>
    </Menu>
  );
}
