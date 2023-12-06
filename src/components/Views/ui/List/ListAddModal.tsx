import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { BsCheck2All } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import { IListColor } from './List';
import ArrowDownFilled from '../../../../assets/icons/ArrowDownFilled';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import { InlineBorderLabel } from '../../../Dropdown/MenuDropdown';
import DropdownTitle from '../../../DropDowns/DropdownTitle';
import PlusIcon from '../../../../assets/icons/PlusIcon';
import ChatEdit from '../../../../assets/icons/ChatEdit';
import CopyLinkIcon from '../../../../assets/icons/CopyLinkIcon';
import FavouriteIcon1 from '../../../../assets/icons/FavouriteIcon1';
import { DuplicateIcon } from '../../../../assets/icons/Duplicateicon';
import MoveItemIcon from '../../../../assets/icons/MoveItemIcon';
import TemplateIcon1 from '../../../../assets/icons/TemplateIcon1';
import ArchiveIcon from '../../../../assets/icons/ArchiveIcon';
import ChatDelete from '../../../../assets/icons/ChatDelete';
import InfoCircleIcon from '../../../../assets/icons/InfoCircleIcon';
import EmailIcon from '../../../../assets/icons/propertyIcons/EmailIcon';
import SettingsIcon from '../../../../assets/icons/SettingsIcon';

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

  const defaultSettings = [
    {
      id: 'create_new',
      icon: <PlusIcon />,
      arrowRight: <IoIosArrowForward />,
      label: 'Create new',
      handleClick: () => null
    },
    {
      id: 'rename',
      icon: <ChatEdit />,
      arrowRight: null,
      label: 'Rename',
      handleClick: () => null
    },
    {
      id: 'copy_link',
      icon: <CopyLinkIcon />,
      arrowRight: null,
      label: 'Copy link',
      handleClick: () => null
    },
    {
      id: 'add_to_favorite',
      icon: <FavouriteIcon1 />,
      arrowRight: null,
      label: 'Add to favorites',
      handleClick: () => null
    },
    {
      id: 'duplicate',
      icon: <DuplicateIcon className="w-4 h-4 stroke-[#424242]" />,
      arrowRight: null,
      label: 'Duplicate',
      handleClick: () => null
    },
    {
      id: 'move',
      icon: <MoveItemIcon active={false} />,
      arrowRight: null,
      label: 'Move To',
      handleClick: () => null
    },
    {
      id: 'email_to_list',
      icon: <EmailIcon />,
      arrowRight: null,
      label: 'Email to List',
      handleClick: () => null
    }
  ];
  const advanceSettings = [
    {
      id: 'list_info',
      icon: <InfoCircleIcon />,
      arrowRight: null,
      label: 'List Info',
      handleClick: () => null
    },
    {
      id: 'templates',
      icon: <TemplateIcon1 />,
      arrowRight: <IoIosArrowForward />,
      label: 'Templates',
      handleClick: () => null
    },
    {
      id: 'list_setting',
      icon: <SettingsIcon />,
      arrowRight: <IoIosArrowForward />,
      label: 'List setting',
      handleClick: () => null
    }
  ];
  const moreOptions = [
    {
      id: 'archive',
      icon: <ArchiveIcon />,
      arrowRight: null,
      label: 'Archive',
      handleClick: () => null
    },
    {
      id: 'delete',
      icon: <ChatDelete color="#FF0E0F" />,
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
          style: { minHeight: '300px' }
        }}
      >
        <VerticalScroll>
          <div className="h-96 relative">
            <DropdownTitle content="LIST PROPERTIES" />
            <InlineBorderLabel label="DEFAULT SETTINGS" />
            {defaultSettings.map((item) => (
              <div key={item.id}>
                <MenuItem
                  sx={{ fontFamily: 'montserrat', textTransform: 'none', fontSize: '13px', fontWeight: 600 }}
                  key={item.label}
                  onClick={() => {
                    item.handleClick();
                    handleClose();
                  }}
                >
                  <div className="flex items-center w-full space-x-1 text-alsoit-text-lg">
                    <p className="mr-2 flex justify-center w-5">{item.icon}</p>
                    <p>{item.label}</p>
                  </div>
                  {item.arrowRight}
                </MenuItem>
              </div>
            ))}
            <InlineBorderLabel label="ADVANCED SETTINGS" />
            {advanceSettings.map((item) => (
              <div key={item.id}>
                <MenuItem
                  sx={{ fontFamily: 'montserrat', textTransform: 'none', fontSize: '13px', fontWeight: 600 }}
                  key={item.label}
                  onClick={() => {
                    item.handleClick();
                    handleClose();
                  }}
                >
                  <div className="flex items-center w-full space-x-1 text-alsoit-text-lg">
                    <p className="mr-2 flex justify-center w-5">{item.icon}</p>
                    <p>{item.label}</p>
                  </div>
                  {item.arrowRight}
                </MenuItem>
              </div>
            ))}
            <InlineBorderLabel label="MORE OPTIONS" />
            {moreOptions.map((item) => (
              <div key={item.id}>
                <MenuItem
                  sx={{ fontFamily: 'montserrat', textTransform: 'none', fontSize: '13px', fontWeight: 600 }}
                  key={item.label}
                  onClick={() => {
                    item.handleClick();
                    handleClose();
                  }}
                >
                  <div
                    className={`flex items-center w-full space-x-1 text-alsoit-text-lg ${
                      item.id === 'delete' && 'text-[#FF0E0F]'
                    }`}
                  >
                    <p className="mr-2 flex justify-center w-5">{item.icon}</p>
                    <p>{item.label}</p>
                  </div>
                  {item.arrowRight}
                </MenuItem>
              </div>
            ))}
          </div>
        </VerticalScroll>
        <p className="border-t-2"></p>
        <p
          className="flex items-center p-2 mx-3 my-2 text-white rounded-md cursor-pointer"
          style={{ backgroundColor: '#BF01FE' }}
        >
          <AiOutlineShareAlt className="mr-2" />
          Sharing & Permissions
        </p>
        <p className="border-t-2"></p>

        <MenuItem
          sx={{ fontFamily: 'montserrat', textTransform: 'none', fontSize: '13px', fontWeight: 600 }}
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
