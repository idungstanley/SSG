import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DropdownIcon from '../../../../../assets/icons/dropdownIcon';
import { AiOutlineNumber, AiOutlineSearch } from 'react-icons/ai';
import { BiCaretDownSquare, BiText } from 'react-icons/bi';
import { BsTag, BsTextareaT } from 'react-icons/bs';
import { MdDateRange, MdOutlineAttachFile, MdPersonOutline } from 'react-icons/md';
import { TbBatteryEco } from 'react-icons/tb';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { HiOutlineMail } from 'react-icons/hi';
import { ImClearFormatting } from 'react-icons/im';
import { TfiLocationPin, TfiMoney } from 'react-icons/tfi';

const columnTypes = [
  {
    id: 'Dropdown',
    title: 'Dropdown',
    description: '',
    icon: <BiCaretDownSquare />
  },
  {
    id: 'Text',
    title: 'Text',
    description: '',
    icon: <BiText />
  },
  {
    id: 'Text Area',
    title: 'Text Area',
    description: '',
    icon: <BsTextareaT />
  },
  {
    id: 'Date',
    title: 'Date',
    description: '',
    icon: <MdDateRange />
  },
  {
    id: 'Progress',
    title: 'Progress',
    description: '',
    icon: <TbBatteryEco />
  },
  {
    id: 'Number',
    title: 'Number',
    description: '',
    icon: <AiOutlineNumber />
  },
  {
    id: 'Checkbox',
    title: 'Checkbox',
    description: '',
    icon: <IoMdCheckboxOutline />
  },
  {
    id: 'Email',
    title: 'Email',
    description: '',
    icon: <HiOutlineMail />
  },
  {
    id: 'Files',
    title: 'Files',
    description: '',
    icon: <MdOutlineAttachFile />
  },
  {
    id: 'Formula',
    title: 'Formula',
    description: '',
    icon: <ImClearFormatting />
  },
  {
    id: 'Labels',
    title: 'Labels',
    description: '',
    icon: <BsTag />
  },
  {
    id: 'Location',
    title: 'Location',
    description: '',
    icon: <TfiLocationPin />
  },
  {
    id: 'Money',
    title: 'Money',
    description: '',
    icon: <TfiMoney />
  },
  {
    id: 'People',
    title: 'People',
    description: '',
    icon: <MdPersonOutline />
  }
];

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
        {columnTypes.map((item) => {
          return (
            <MenuItem key={item.id} onClick={handleClose}>
              <span className="mx-1"> {item.icon}</span>
              <p className="text-alsoit-text-lg">{item.title}</p>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
