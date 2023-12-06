import React from 'react';
import AlsoitMenuDropdown from '../../../../../../components/DropDowns';
import { InlineBorderLabel } from '../../../../../../components/Dropdown/MenuDropdown';
import ActiveTreeSearch from '../../../../../../components/ActiveTree/ActiveTreeSearch';

interface dropdownProps {
  anchor: HTMLElement | null;
  setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function SelectEntity({ anchor, setAnchor }: dropdownProps) {
  return (
    <AlsoitMenuDropdown anchorEl={anchor} handleClose={() => setAnchor(null)}>
      <div style={{ width: '200px' }}>
        <InlineBorderLabel
          label="CHOOSE ENTITY"
          topElement={<p className="flex justify-center w-full pt-3 font-bold text-alsoit-text-sm">ENTITY LOCATION</p>}
        />
        <ActiveTreeSearch option={'convert_checklist'} />
      </div>
    </AlsoitMenuDropdown>
  );
}

export default SelectEntity;
