import * as React from 'react';
import Menu from '@mui/material/Menu';

interface dropdownProps {
  handleClose: () => void;
  anchorEl: HTMLDivElement | null;
  children: React.ReactNode;
}

export default function AlsoitMenuDropdown({ handleClose, anchorEl, children }: dropdownProps) {
  const open = Boolean(anchorEl);
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
    >
      {children}
    </Menu>
  );
}
