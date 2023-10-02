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
import { GrEdit } from 'react-icons/gr';
import { HiOutlineDuplicate, HiOutlineInformationCircle, HiOutlineMail } from 'react-icons/hi';
import { MdOutlineSendToMobile } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { BsArchive, BsCheck2All } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { IListColor } from './List';

export default function ListAddModal({
  handleCheckedGroupTasks,
  ListColor
}: {
  ListColor?: IListColor;
  handleCheckedGroupTasks: () => void;
}) {
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
      arrowRight: <IoIosArrowForward />,
      label: 'Create new',
      handleClick: () => null
    },
    {
      id: 2,
      icon: <GrEdit />,
      arrowRight: null,
      label: 'Rename',
      handleClick: () => null
    },
    {
      id: 3,
      icon: <AiOutlineLink />,
      arrowRight: null,
      label: 'Copy link',
      handleClick: () => null
    },
    {
      id: 4,
      icon: <AiOutlineStar />,
      arrowRight: null,
      label: 'Add to favorite',
      handleClick: () => null
    },
    {
      id: 5,
      icon: <HiOutlineDuplicate />,
      arrowRight: null,
      label: 'Duplicate',
      handleClick: () => null
    },
    {
      id: 6,
      icon: <MdOutlineSendToMobile />,
      arrowRight: null,
      label: 'Move',
      handleClick: () => null
    },
    {
      id: 7,
      icon: <HiOutlineMail />,
      arrowRight: null,
      label: 'Email to List',
      handleClick: () => null
    },
    {
      id: 8,
      icon: <HiOutlineInformationCircle />,
      arrowRight: null,
      label: 'List Info',
      handleClick: () => null
    },
    {
      id: 9,
      icon: <CiEdit />,
      arrowRight: <IoIosArrowForward />,
      label: 'Templates',
      handleClick: () => null
    },
    {
      id: 10,
      icon: <AiOutlineSetting />,
      arrowRight: <IoIosArrowForward />,
      label: 'List setting',
      handleClick: () => null
    },
    {
      id: 11,
      icon: <BsArchive />,
      arrowRight: null,
      label: 'Archive',
      handleClick: () => null
    },
    {
      id: 12,
      icon: <RiDeleteBin6Line />,
      arrowRight: null,
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
        <span style={{ color: ListColor?.outerColour === null ? 'black' : (ListColor?.outerColour as string) }}>
          Add
        </span>
        <AiOutlineCaretDown className="w-3 h-3 pl-1 text-gray-500 " />
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
          <div key={item.id}>
            <div className="w-full m-2">
              {(item.label === 'List Info' || item.label === 'Archive') && <p className="mr-5 border-t-2"></p>}
            </div>
            <MenuItem
              key={item.label}
              onClick={() => {
                item.handleClick();
                handleClose();
              }}
            >
              <div className="flex items-center w-full space-x-1 ">
                <p className="mr-2">{item.icon}</p>
                <p>{item.label}</p>
              </div>
              {item.arrowRight}
            </MenuItem>
          </div>
        ))}
        <p className="border-t-2"></p>
        <p
          className="flex items-center p-2 mx-3 my-2 text-white rounded-md cursor-pointer border-y-2"
          style={{ backgroundColor: '#5A43EA' }}
        >
          <AiOutlineShareAlt className="mr-2" />
          Sharing & Permissions
        </p>
        <p className="border-t-2"></p>
        <MenuItem
          className="flex items-center p-3 cursor-pointer"
          onClick={() => {
            handleCheckedGroupTasks();
          }}
        >
          <BsCheck2All className="mr-2" />
          Select all
        </MenuItem>
      </Menu>
    </div>
  );
}
