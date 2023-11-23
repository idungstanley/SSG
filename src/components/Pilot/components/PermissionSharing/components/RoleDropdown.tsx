import React from 'react';
import AlsoitMenuDropdown from '../../../../DropDowns';
import { LIST_PERMISSION_TYPES } from '../../../../../app/constants/permissions';

interface dropdownProps {
  anchor: HTMLElement | null;
  setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleSeletRole: (role: string) => void;
}

function RoleDropdown({ anchor, setAnchor, handleSeletRole }: dropdownProps) {
  return (
    <div>
      <AlsoitMenuDropdown anchorEl={anchor} handleClose={() => setAnchor(null)}>
        <div style={{ width: '200px' }} className="p-2">
          {LIST_PERMISSION_TYPES.map((type) => {
            return (
              <div
                key={type.name}
                className="text-left my-1 p-1 hover:bg-alsoit-gray-50 rounded-md cursor-pointer"
                onClick={() => {
                  handleSeletRole(type.name);
                  setAnchor(null);
                }}
              >
                <h3 className="text-alsoit-text-lg font-semibold">{type.name}</h3>
                <p className="text-alsoit-text-md font-semibold">{type.description}</p>
              </div>
            );
          })}
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}

export default RoleDropdown;
