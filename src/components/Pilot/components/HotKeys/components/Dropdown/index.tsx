import React, { Fragment, useState } from 'react';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import ThreeDotIcon from '../../../../../../assets/icons/ThreeDotIcon';
import HotButtonIcon from '../../../../../../assets/icons/HotButtonIcon';
import FeatureButtonIcon from '../../../../../../assets/icons/FeatureButtonIcon';
import CompactButtonIcon from '../../../../../../assets/icons/CompactButtonIcon';
import ToolTip from '../../../../../Tooltip/Tooltip';
import { IPilotTab } from '../../../../../../types';
import ParentItemsList from './Components/ParentItemsList';

interface HotKeysProps {
  featureTabs: IPilotTab[];
}

export default function Menu({ featureTabs }: HotKeysProps) {
  const [showPilotToolbarMenu, setShowPilotToolbarMenu] = useState<null | HTMLDivElement>(null);

  const handleOpenSettingsMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowPilotToolbarMenu(event.currentTarget);
  };

  const handleClosePilotToolbarMenu = () => {
    setShowPilotToolbarMenu(null);
  };

  const dropdownConfig = [
    {
      id: 'show_hide_hot_button',
      icon: <HotButtonIcon />,
      label: 'Show/hide hot button',
      children: []
    },
    {
      id: 'show_hide_feature_button',
      icon: <FeatureButtonIcon />,
      label: 'Show/hide feature button',
      children: featureTabs
    },
    {
      id: 'compact_feature_button',
      icon: <CompactButtonIcon />,
      label: 'Compact feature button',
      children: []
    }
  ];

  return (
    <>
      <ToolTip placement="left" title="Pilot settings">
        <div
          className={`flex justify-center items-center hover:bg-alsoit-gray-125 transition duration-500 cursor-pointer ${
            showPilotToolbarMenu ? 'bg-alsoit-purple-50' : ''
          }`}
          style={{
            borderRadius: '3px',
            width: '20px',
            height: '20px'
          }}
          onClick={(e) => {
            handleOpenSettingsMenu(e);
          }}
        >
          <ThreeDotIcon active={!!showPilotToolbarMenu} />
        </div>
      </ToolTip>

      <AlsoitMenuDropdown
        anchorEl={showPilotToolbarMenu}
        handleClose={handleClosePilotToolbarMenu}
        popupStyles={{
          width: '270px',
          minHeight: '148px',
          maxHeight: '468px',
          marginLeft: '8px',
          marginTop: '1px',
          boxShadow: '0px 0px 5px 0px #00000040',
          overflow: 'hidden'
        }}
      >
        <div className="w-52 relative w-full" style={{ paddingTop: '9px', minHeight: '148px' }}>
          <div className="flex w-full justify-center relative px-2">
            <p className="uppercase" style={{ color: '#424242', fontSize: '8px' }}>
              PILOT SETTINGS
            </p>
          </div>
          <div className="flex w-full justify-center relative px-2">
            <span className="absolute w-full z-0" style={{ top: '10px' }}>
              <hr />
            </span>
            <p
              className="px-2 z-10 uppercase"
              style={{ fontSize: '8px', background: '#fff', color: '#B2B2B2', paddingTop: '4px' }}
            >
              CHOOSE OPTION
            </p>
          </div>
          <ParentItemsList dropdownConfig={dropdownConfig} />
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
