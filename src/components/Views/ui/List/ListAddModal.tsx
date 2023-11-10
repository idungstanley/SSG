import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AiOutlineLink, AiOutlinePlus, AiOutlineSetting, AiOutlineShareAlt, AiOutlineStar } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import { HiOutlineDuplicate, HiOutlineInformationCircle, HiOutlineMail } from 'react-icons/hi';
import { MdOutlineSendToMobile } from 'react-icons/md';
import { CiCircleCheck, CiEdit } from 'react-icons/ci';
import { BsArchive, BsCheck2All } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { IListColor } from './List';
import ArrowDownFilled from '../../../../assets/icons/ArrowDownFilled';

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
      id: 'create_new',
      icon: <AiOutlinePlus />,
      arrowRight: <IoIosArrowForward />,
      label: 'Create new',
      handleClick: () => null
    },
    {
      id: 'rename',
      icon: <GrEdit />,
      arrowRight: null,
      label: 'Rename',
      handleClick: () => null
    },
    {
      id: 'copy_link',
      icon: <AiOutlineLink />,
      arrowRight: null,
      label: 'Copy link',
      handleClick: () => null
    },
    {
      id: 'add_to_favorite',
      icon: <AiOutlineStar />,
      arrowRight: null,
      label: 'Add to favorite',
      handleClick: () => null
    },
    {
      id: 'duplicate',
      icon: <HiOutlineDuplicate />,
      arrowRight: null,
      label: 'Duplicate',
      handleClick: () => null
    },
    {
      id: 'move',
      icon: <MdOutlineSendToMobile />,
      arrowRight: null,
      label: 'Move',
      handleClick: () => null
    },
    {
      id: 'email_to_list',
      icon: <HiOutlineMail />,
      arrowRight: null,
      label: 'Email to List',
      handleClick: () => null
    },
    {
      id: 'show_closed',
      icon: <CiCircleCheck />,
      arrowRight: null,
      label: 'Show closed',
      handleClick: () => null
    },
    {
      id: 'list_info',
      icon: <HiOutlineInformationCircle />,
      arrowRight: null,
      label: 'List Info',
      handleClick: () => null
    },
    {
      id: 'templates',
      icon: <CiEdit />,
      arrowRight: <IoIosArrowForward />,
      label: 'Templates',
      handleClick: () => null
    },
    {
      id: 'list_setting',
      icon: <AiOutlineSetting />,
      arrowRight: <IoIosArrowForward />,
      label: 'List setting',
      handleClick: () => null
    },
    {
      id: 'archive',
      icon: <BsArchive />,
      arrowRight: null,
      label: 'Archive',
      handleClick: () => null
    },
    {
      id: 'delete',
      icon: <RiDeleteBin6Line />,
      arrowRight: null,
      label: 'Delete',
      handleClick: () => null
    }
  ];

  return (
    <div>
      <Button
        sx={{ fontFamily: 'montserrat', textTransform: 'none', fontSize: '13px', fontWeight: 600 }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <span style={{ color: !ListColor?.outerColour ? 'black' : (ListColor?.outerColour as string) }}>Add</span>
        <ArrowDownFilled className="ml-1 w-1.5" />
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
