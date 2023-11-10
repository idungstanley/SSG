import EverythingIcon from '../../../../../assets/icons/EverythingIcon';
import React from 'react';
import ICONS_INTERACTIONS from '../../../../../utils/Constants/IconInteractions';
import { Checkbox } from '../../../../../components/Checkbox/Checkbox';

function EverythingHr() {
  const handleCheckEverything = (e: boolean) => {
    console.log(e);
  };

  return (
    <div
      className="relative flex items-center justify-start hover:bg-alsoit-gray-50"
      style={{ height: '30px', paddingLeft: '39px' }}
    >
      <div className="flex items-center flex-1 min-w-0 gap-1 cursor-pointer" style={{ zIndex: 1 }}>
        <Checkbox
          styles="ml-0 mr-0 text-primary-500 focus:ring-primary-500 mx-0 hr-checkbox hr-checkbox-parent"
          checked={false}
          setChecked={(e) => handleCheckEverything(e)}
        />
        <EverythingIcon color={ICONS_INTERACTIONS.default} />

        <p className="block text-xs tracking-wider capitalize truncate" style={{ paddingLeft: '3px' }}>
          Everything
        </p>
      </div>
    </div>
  );
}
export default EverythingHr;
