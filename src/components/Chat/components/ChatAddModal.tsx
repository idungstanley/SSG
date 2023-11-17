import React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import ArrowDownFilled from '../../../assets/icons/ArrowDownFilled';
import { useAppDispatch } from '../../../app/hooks';
import { setShowCreateChatSideOver } from '../../../features/chat/chatSlice';
import AlsoitMenuDropdown from '../../DropDowns';

export default function ChatAddModal() {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const items = [
    {
      id: 'create_new',
      icon: <AiOutlinePlus />,
      arrowRight: <IoIosArrowForward />,
      label: 'Create new',
      handleClick: () => dispatch(setShowCreateChatSideOver(true))
    }
  ];

  return (
    <div>
      <Button
        sx={{ fontFamily: 'montserrat', textTransform: 'none', fontSize: '13px', fontWeight: 600 }}
        id="basic-button"
        aria-controls={anchorEl ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleClick}
      >
        <span style={{ color: 'black' }}>Add</span>
        <ArrowDownFilled className="ml-1 w-1.5" />
      </Button>
      <AlsoitMenuDropdown anchorEl={anchorEl} handleClose={() => setAnchorEl(null)}>
        {items.map((item) => (
          <div key={item.id}>
            <MenuItem
              key={item.label}
              onClick={() => {
                item.handleClick();
                setAnchorEl(null);
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
      </AlsoitMenuDropdown>
    </div>
  );
}
