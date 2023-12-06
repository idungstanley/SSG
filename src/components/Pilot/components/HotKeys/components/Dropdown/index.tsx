import React, { useState } from 'react';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import ThreeDotIcon from '../../../../../../assets/icons/ThreeDotIcon';
import ShowTabsLabelToggle from '../../../Tabs/components/ShowTabsLabelToggle';
import HotButtonIcon from '../../../../../../assets/icons/HotButtonIcon';
import FeatureButtonIcon from '../../../../../../assets/icons/FeatureButtonIcon';
import CompactButtonIcon from '../../../../../../assets/icons/CompactButtonIcon';
import ToolTip from '../../../../../Tooltip/Tooltip';

interface HotKeysProps {
  setShowModal: (i: boolean) => void;
}

export default function Menu({ setShowModal }: HotKeysProps) {
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
      handleClick: () => setShowModal(true)
    },
    {
      id: 'show_hide_feature_button',
      icon: <FeatureButtonIcon />,
      label: 'Show/hide feature button',
      handleClick: () => ({})
    },
    {
      id: 'compact_feature_button',
      icon: <CompactButtonIcon />,
      label: 'Compact feature button',
      handleClick: () => ({})
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
          width: '260px',
          minHeight: '148px',
          marginLeft: '8px',
          marginTop: '1px',
          boxShadow: '0px 0px 5px 0px #00000040'
        }}
      >
        <div className="w-52 relative w-full" style={{ paddingTop: '9px', paddingBottom: '8px' }}>
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
          {dropdownConfig?.map((i) => (
            <div key={i.id} className="flex justify-between" style={{ marginRight: '3px' }}>
              <div
                className="group flex items-center w-full text-xs text-gray-600 rounded cursor-pointer hover:bg-alsoit-gray-125 justify-between transition duration-500"
                style={{
                  margin: '8px 3px -6px 6px',
                  padding: '5px 11px 5px 10px'
                }}
                onClick={() => i.handleClick()}
              >
                <div
                  className="flex items-center relative"
                  style={{
                    paddingTop: i.id === 'compact_view' ? '0' : '0'
                  }}
                >
                  {i.icon && (
                    <p className="flex items-center w-5 h-5 group-hover:opacity-30 transition duration-500">{i.icon}</p>
                  )}
                  <p
                    className="font-medium alsoit-gray-300"
                    style={{
                      fontSize: '13px',
                      paddingLeft: '5px',
                      color: i.id == 'show_hide_hot_button' || i.id == 'show_hide_feature_button' ? 'orange' : ''
                    }}
                  >
                    {i.label}
                  </p>
                </div>
                {i.id === 'compact_feature_button' ? (
                  <span style={{ paddingTop: '4px', paddingRight: '3px' }}>
                    <ShowTabsLabelToggle />
                  </span>
                ) : (
                  <span style={{ paddingTop: '4px', paddingRight: '3px' }}>
                    <label className="switch pilot-modal-toggle" style={{ width: '20px', height: '10.53px' }}>
                      <input className="inputShow" type="checkbox" checked={false} />
                      <div className={'slider'}></div>
                    </label>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
