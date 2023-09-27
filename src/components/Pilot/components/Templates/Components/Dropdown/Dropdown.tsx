import * as React from 'react';
import Menu from '@mui/material/Menu';
import ArrowRight from '../../../../../../assets/icons/ArrowRight';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setNewCustomPropertyDetails } from '../../../../../../features/task/taskSlice';
import DropdownIcon from '../../../../../../assets/branding/DropdownIcon';

const items = [
  {
    id: 1,
    name: 'Single Label',
    icon: '',
    onclick: () => null
  },
  {
    id: 2,
    name: 'Multi Label',
    icon: '',
    onclick: () => null
  },
  {
    id: 3,
    name: 'Tags',
    icon: '',
    onclick: () => null
  },
  {
    id: 4,
    name: 'Directories',
    icon: '',
    onclick: () => null
  }
];

export default function DropdownOptions() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useAppDispatch();
  const { newCustomPropertyDetails } = useAppSelector((state) => state.task);

  return (
    <div className="w-full">
      <button className="w-full flex items-center justify-between h-10" onClick={handleClick}>
        <div className="flex items-center">
          <span className="mx-1 w-5 h-5">
            <DropdownIcon />
          </span>
          <p className="text-alsoit-gray-300-lg text-alsoit-text-lg font-semibold">Dropdown</p>
        </div>
        <ArrowRight />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{
          marginLeft: '96px',
          borderRadius: '20px'
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          style: {
            borderRadius: '20px'
          }
        }}
      >
        <div className="w-full mt-2 flex justify-center">
          <h1 className="text-alsoit-text-lg font-semibold">DROPDOWN</h1>
        </div>
        <hr />
        <div className="px-1 py-1">
          {items.map((item) => (
            // <MenuItem onClick={handleClose} key={item.name}>
            <button
              key={item.name}
              onClick={() => {
                dispatch(setNewCustomPropertyDetails({ ...newCustomPropertyDetails, type: item.name }));
                handleClose();
              }}
              style={{ width: '174px' }}
              className=" group flex gap-4 w-full items-center rounded-md px-2 py-2 text-alsoit-text-lg font-semibold h-10 hover:bg-alsoit-gray-50"
            >
              {item.name}
            </button>
            // </MenuItem>
          ))}
        </div>
      </Menu>
    </div>
  );
}
