import * as React from 'react';
import Menu from '@mui/material/Menu';
import ArrowRight from '../../../../../../assets/icons/ArrowRight';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setNewCustomPropertyDetails } from '../../../../../../features/task/taskSlice';
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';

const items = [
  {
    id: 1,
    name: 'Phone',
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
    <div className="w-full px-2 pl-1">
      <button className="flex items-center justify-between w-full h-full" onClick={handleClick}>
        <div className="flex items-center">
          <span className="flex items-center w-5 h-5 mx-1 text-lg">
            <BsFillTelephoneOutboundFill />
          </span>
          <p className="font-semibold text-alsoit-gray-300-lg text-alsoit-text-lg">Phone</p>
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
        <div key="phoneOptions">
          <div className="flex justify-center w-full mt-2">
            <h1 className="font-semibold text-alsoit-text-lg">PHONE</h1>
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
                className="flex items-center w-full h-10 gap-4 px-2 py-2 font-semibold rounded-md group text-alsoit-text-lg hover:bg-alsoit-gray-50"
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
