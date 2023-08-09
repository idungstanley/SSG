import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AiOutlineCaretDown } from 'react-icons/ai';

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
      label: 'Rename',
      handleClick: () => null
    },
    {
      id: 1,
      label: 'List Info',
      handleClick: () => null
    },
    {
      id: 1,
      label: 'Duplicate',
      handleClick: () => null
    },
    {
      id: 1,
      label: 'Select all',
      handleClick: () => {
        handleCheckedGroupTasks();
      }
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
        Add <AiOutlineCaretDown className="text-gray-500 w-3 h-3 " />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              item.handleClick();
              handleClose();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
