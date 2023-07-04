import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DropdownIcon from '../../../../../assets/icons/dropdownIcon';
import { AiOutlineSearch } from 'react-icons/ai';

export default function ColumnTypeDropdown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="bg-white h-6 flex items-center justify-center cursor-pointer"
        style={{ width: '180px' }}
      >
        <DropdownIcon />
        <p className="text-black text-alsoit-text-md font-semibold">Dropdown</p>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        PaperProps={{
          style: {
            overflowY: 'auto',
            width: '222px'
          }
        }}
      >
        <section className="relative flex items-center sticky top-2 bg-white z-10">
          <AiOutlineSearch className="absolute w-4 h-4 right-3" />
          <input
            type="text"
            placeholder="Search..."
            className="w-11/12 m-auto p-1 border-0 focus:outline-0 rounded-md active:outline-0 outline-0"
          />
        </section>
        <hr />
        <MenuItem onClick={handleClose}>
          {/* <DropdownIcon /> */}
          Dropdown
        </MenuItem>
        <MenuItem className="text-alsoit-text-md" onClick={handleClose}>
          Text
        </MenuItem>
        <MenuItem className="text-alsoit-text-md" onClick={handleClose}>
          Text Area
        </MenuItem>
        <MenuItem className="text-alsoit-text-md" onClick={handleClose}>
          Date
        </MenuItem>
        <MenuItem className="text-alsoit-text-md" onClick={handleClose}>
          Progress
        </MenuItem>
        <MenuItem className="text-alsoit-text-md" onClick={handleClose}>
          Number
        </MenuItem>
        <MenuItem className="text-alsoit-text-md" onClick={handleClose}>
          Checkbox
        </MenuItem>
        <MenuItem className="text-alsoit-text-md" onClick={handleClose}>
          Email
        </MenuItem>
        <MenuItem className="text-alsoit-text-md" onClick={handleClose}>
          Files
        </MenuItem>
        <MenuItem className="text-alsoit-text-md" onClick={handleClose}>
          Formula
        </MenuItem>
        <MenuItem className="text-alsoit-text-md" onClick={handleClose}>
          Labels
        </MenuItem>
        <MenuItem className="text-alsoit-text-md" onClick={handleClose}>
          Location
        </MenuItem>
        <MenuItem className="text-alsoit-text-md" onClick={handleClose}>
          Money
        </MenuItem>
        <MenuItem className="text-alsoit-text-md" onClick={handleClose}>
          People
        </MenuItem>
      </Menu>
    </div>
  );
}
