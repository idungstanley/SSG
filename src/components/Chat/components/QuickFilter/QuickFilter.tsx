import React, { useState } from 'react';
import AlsoitMenuDropdown from '../../../DropDowns';
import DropdownTitle from '../../../DropDowns/DropdownTitle';
import DropdownSubtitle from '../../../DropDowns/DropdownSubtitle';
import DropdownArrowIcon from '../../../../assets/icons/chatIcons/DropdownArrowIcon';

export default function QuickFilter() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const options = [
    {
      title: 'Starred messages',
      unusing: true,
      onClick: () => null
    },
    {
      title: 'Tagged messages',
      unusing: true,
      onClick: () => null
    },
    {
      title: 'Read messages',
      unusing: true,
      onClick: () => null
    },
    {
      title: 'Unread messages',
      unusing: true,
      onClick: () => null
    },
    {
      title: 'Bookmark',
      unusing: true,
      onClick: () => null
    },
    {
      title: 'Archives',
      unusing: true,
      onClick: () => null
    },
    {
      title: 'See statuses',
      unusing: true,
      onClick: () => null
    }
  ];

  return (
    <>
      <div onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget)}>
        <div
          className={`flex justify-between items-center hover:bg-alsoit-purple-50 text-[10px] px-1 py-0.5 items-center rounded-md cursor-pointer ${
            anchorEl ? 'bg-alsoit-purple-50' : 'bg-white'
          }`}
          style={{ minHeight: '24px' }}
        >
          Quick Filter
          <span className="flex items-center pl-1 pr-1">
            <label className="switch small" onClick={(event) => event.stopPropagation()}>
              <input className="inputShow" type="checkbox" checked={false} />
              <div className="slider" />
            </label>
          </span>
          <DropdownArrowIcon />
        </div>
      </div>
      <AlsoitMenuDropdown anchorEl={anchorEl} handleClose={() => setAnchorEl(null)}>
        <div className="p-2" style={{ minWidth: '200px' }}>
          <DropdownTitle content="FILTER" />
          <DropdownSubtitle content="QUICK FILTER OPTION" />
          {options.map((option) => (
            <div
              key={option.title}
              onClick={option.onClick}
              className="flex items-center px-2 py-1 hover:bg-alsoit-gray-50 text-[13px] text-gray-600 text-left w-full rounded-md cursor-pointer"
            >
              <span className={`${option.unusing && 'text-[orange]'}`}>{option.title}</span>
            </div>
          ))}
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
