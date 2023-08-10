import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  AiOutlineCaretDown,
  AiOutlineLink,
  AiOutlinePlus,
  AiOutlineSetting,
  AiOutlineShareAlt,
  AiOutlineStar
} from 'react-icons/ai';
import Permissions from '../../../Pilot/components/Permissions/index';
import { GrEdit } from 'react-icons/gr';
import { HiOutlineDuplicate, HiOutlineInformationCircle, HiOutlineMail } from 'react-icons/hi';
import { MdOutlineSendToMobile } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { BsArchive, BsCheck2All } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function ListAddModal({ handleCheckedGroupTasks }: { handleCheckedGroupTasks: () => void }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const items = [
    {
      id: 1,
      icon: <AiOutlinePlus />,
      label: 'Create new',
      handleClick: () => null
    },
    {
      id: 2,
      icon: <GrEdit />,
      label: 'Rename',
      handleClick: () => null
    },
    {
      id: 3,
      icon: <AiOutlineLink />,
      label: 'Copy link',
      handleClick: () => null
    },
    {
      id: 4,
      icon: <AiOutlineStar />,
      label: 'Add to favorite',
      handleClick: () => null
    },
    {
      id: 5,
      icon: <HiOutlineDuplicate />,
      label: 'Duplicate',
      handleClick: () => null
    },
    {
      id: 6,
      icon: <MdOutlineSendToMobile />,
      label: 'Move',
      handleClick: () => null
    },
    {
      id: 7,
      icon: <HiOutlineMail />,
      label: 'Email to List',
      handleClick: () => null
    },
    {
      id: 8,
      icon: <HiOutlineInformationCircle />,
      label: 'List Info',
      handleClick: () => null
    },
    {
      id: 9,
      icon: <CiEdit />,
      label: 'Templates',
      handleClick: () => null
    },
    {
      id: 10,
      icon: <AiOutlineSetting />,
      label: 'List setting',
      handleClick: () => null
    },
    {
      id: 11,
      icon: <BsArchive />,
      label: 'Archive',
      handleClick: () => null
    },
    {
      id: 12,
      icon: <RiDeleteBin6Line />,
      label: 'Delete',
      handleClick: () => null
    }
  ];

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Add <AiOutlineCaretDown className="text-gray-500 pl-1 w-3 h-3 " />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          style: { minHeight: '300px', minWidth: '250px' }
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              item.handleClick();
              handleClose();
            }}
          >
            <div className="flex items-center space-x-1">
              <p className="mr-2">{item.icon}</p>
              <p>{item.label}</p>
            </div>
          </MenuItem>
        ))}
        <p
          className="border-y flex items-center p-2 m-3 cursor-pointer text-white rounded-md"
          style={{ backgroundColor: '#5A43EA' }}
        >
          <AiOutlineShareAlt className="mr-2" />
          Sharing & Permissions
        </p>
        <p
          className="p-3 flex items-center cursor-pointer"
          onClick={() => {
            handleCheckedGroupTasks();
          }}
        >
          <BsCheck2All className="mr-2" />
          Select all
        </p>
      </Menu>
    </div>
  );
}
