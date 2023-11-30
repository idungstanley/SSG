import * as React from 'react';
import Menu from '@mui/material/Menu';

interface dropdownProps {
  handleClose: () => void;
  anchorEl?: HTMLElement | null;
  children: React.ReactNode | JSX.Element;
  style?: React.CSSProperties;
}

export default function AlsoitMenuDropdown({ handleClose, anchorEl, children, style }: dropdownProps) {
  const open = Boolean(anchorEl);
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      style={style}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
      PaperProps={{
        style: {
          borderRadius: '5px'
        }
      }}
    >
      {children}
    </Menu>
  );
}
