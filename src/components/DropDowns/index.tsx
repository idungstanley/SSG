import * as React from 'react';
import Menu from '@mui/material/Menu';

interface dropdownProps {
  handleClose: () => void;
  anchorEl?: HTMLElement | null;
  children: React.ReactNode | JSX.Element;
  style?: React.CSSProperties;
  popupStyles?: React.CSSProperties;
}

export default function AlsoitMenuDropdown({ handleClose, anchorEl, children, style, popupStyles }: dropdownProps) {
  const open = Boolean(anchorEl);
  const paperStyle = {
    borderRadius: '5px',
    ...popupStyles
  };
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
        style: paperStyle ? paperStyle : { borderRadius: '5px' }
      }}
    >
      {children}
    </Menu>
  );
}
