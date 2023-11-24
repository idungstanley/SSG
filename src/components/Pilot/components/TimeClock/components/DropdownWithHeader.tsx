import React from 'react';
import AlsoitMenuDropdown from '../../../../DropDowns';

interface dropDownProps {
  header: string;
  subHeader: string;
  children: React.ReactNode;
  anchor: HTMLElement | null;
  setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function DropdownWithHeader({ header, subHeader, anchor, setAnchor, children }: dropDownProps) {
  return (
    <AlsoitMenuDropdown anchorEl={anchor} handleClose={() => setAnchor(null)}>
      <div className="flex-col bg-white h-fit py-1 outline-none flex items-start text-left mt-2 rounded-md focus:outline-none">
        <p className="text-alsoit-text-sm font-bold flex justify-center pt-3 w-full uppercase">{header}</p>
        <div className="relative flex justify-center mt-2 w-full">
          <hr className="bg-gray-300 h-0.5 w-full relative" />
          <span className="text-alsoit-text-sm font-bold text-gray-400 text-center absolute -top-1 px-1 bg-white uppercase">
            {subHeader}
          </span>
        </div>
      </div>
      <div className="overflow-y-scroll" style={{ maxHeight: '372px' }}>
        {children}
      </div>
    </AlsoitMenuDropdown>
  );
}

export default DropdownWithHeader;
