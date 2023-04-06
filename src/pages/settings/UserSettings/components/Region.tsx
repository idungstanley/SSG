import React from 'react';
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment-timezone';
import { RiArrowDropDownLine } from 'react-icons/ri';

interface Timezone {
  value: string;
  label: string;
  zone_name: string;
}

function Region() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const getTimezoneList = (): Timezone[] => {
    const timezones = moment.tz.names();
    const timezoneList: Timezone[] = [];
    timezones.forEach((timezone) => {
      const timezoneOffset = moment.tz(timezone).format('Z');
      const timezoneAbbr = moment.tz(timezone).zoneAbbr();
      const timezoneParts = timezone.split('/');
      const countryName = timezoneParts[0];
      const cityName = timezoneParts[1] || timezoneParts[0];
      timezoneList.push({
        value: timezone,
        zone_name: `${countryName} / ${cityName}`,
        label: `(GMT${timezoneOffset}) ${countryName}/${cityName}(${timezoneAbbr})`
      });
    });
    return timezoneList;
  };

  const timezoneList = getTimezoneList();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <button
        id="basic-button"
        onClick={handleClick}
        className="w-full h-6 flex justify-between items-center border border-gray-500 p-1 rounded cursor-pointer"
      >
        <h1 className="text-xs">{timezoneList[0].zone_name}</h1>
        <label className="cursor-pointer">
          <RiArrowDropDownLine className="w-8 h-8 font-thin" />
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
            height: 500,
            overflowY: 'auto',
            width: '350px'
          }
        }}
      >
        {timezoneList.map((timezone) => (
          <MenuItem key={timezone.label} onClick={handleClose} className="w-full">
            <div className="flex items-center justify-between cursor-pointer w-full">
              <div className="relative flex items-center space-x-2 cursor-pointer">
                <p className="text-sm text-black">{timezone.label}</p>
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Region;
