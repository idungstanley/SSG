import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { RiArrowDropDownLine } from 'react-icons/ri';

function Languages() {
  const languages = [
    {
      id: 1,
      name: 'English'
    },
    {
      id: 2,
      name: 'Français'
    },
    {
      id: 3,
      name: 'Español'
    },
    {
      id: 4,
      name: 'Português brasileiro'
    },
    {
      id: 5,
      name: 'Deutsch'
    },
    {
      id: 6,
      name: 'Italiano'
    }
  ];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <section>
        <h2>Language</h2>
      </section>
      <button
        id="basic-button"
        onClick={handleClick}
        className="w-auto flex justify-between text-black items-center border border-gray-300 p-1 rounded w-1/3"
      >
        <h1 className="text-sm">{languages[0].name}</h1>
        <label className="cursor-pointer">
          <RiArrowDropDownLine className="w-8 h-8" />
        </label>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        autoFocus={false}
        disableAutoFocus={true}
        disableAutoFocusItem={true}
        className="ml-10"
        PaperProps={{
          style: {
            width: '300px'
          }
        }}
      >
        {languages.map((language) => (
          <MenuItem key={language.id} onClick={handleClose} className="w-full">
            <div className="flex items-center justify-between cursor-pointer w-full">
              <div className="relative flex items-center space-x-2 cursor-pointer">
                <p className="text-base text-black">{language.name}</p>
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Languages;
