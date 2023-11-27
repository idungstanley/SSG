import * as React from 'react';
import Menu from '@mui/material/Menu';
import ArrowRight from '../../../../../../assets/icons/ArrowRight';
import Text from '../../../../../../assets/branding/Text';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setNewCustomPropertyDetails } from '../../../../../../features/task/taskSlice';

const items = [
  {
    id: 'short_text',
    name: 'Short Text',
    onclick: () => null
  },
  {
    id: 'long_text',
    name: 'Long Text',
    onclick: () => null
  },
  {
    id: 'email',
    name: 'Email',
    onclick: () => null
  },
  {
    id: 'website',
    name: 'Website',
    onclick: () => null
  }
];

export default function TextOptions() {
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
      <button className="w-full flex items-center justify-between h-full" onClick={handleClick}>
        <div className="flex items-center">
          <span className="mx-1 w-5 h-5">
            <Text />
          </span>
          <p className="text-alsoit-gray-300-lg text-alsoit-text-lg font-semibold">Texts</p>
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
        <div key="text">
          <div className="w-full mt-2 flex justify-center">
            <h1 className="text-alsoit-text-lg font-semibold">TEXT</h1>
          </div>
          <hr />
          <div className="px-1 py-1">
            {items.map((item) => (
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
            ))}
          </div>
        </div>
      </Menu>
    </div>
  );
}
