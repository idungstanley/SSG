import React, { useState } from 'react';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import ThreeDotIcon from '../../../../../../assets/icons/ThreeDotIcon';
import ShowTabsLabelToggle from '../../../Tabs/components/ShowTabsLabelToggle';
import EditIcon from '../../../../../../assets/icons/Edit';
import SelectAllIcon from '../../../../../../assets/icons/SelectAllIcon';
import DeleteForeverIcon from '../../../../../../assets/icons/DeleteForeverIcon';
import PermissionIcon from '../../../../../../assets/icons/PermissionIcon';

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
      id: 'add_remove_hot_key',
      icon: <EditIcon active={false} />,
      label: 'Edit',
      handleClick: () => ({})
    },
    {
      id: 'add_remove_hot_key',
      icon: <SelectAllIcon />,
      label: 'Select',
      handleClick: () => setShowModal(true)
    },
    {
      id: 'remove',
      icon: <DeleteForeverIcon />,
      label: 'Remove',
      handleClick: () => ({})
    },
    {
      id: 'permissions',
      icon: <PermissionIcon />,
      label: 'Permissions',
      handleClick: () => ({})
    },
    {
      id: 'compact_view',
      label: 'Hot keys',
      handleClick: () => ({})
    }
  ];

  return (
    <>
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

      <AlsoitMenuDropdown
        anchorEl={showPilotToolbarMenu}
        handleClose={handleClosePilotToolbarMenu}
        popupStyles={{
          width: '145px',
          height: '222px',
          marginLeft: '4px',
          marginTop: '4px',
          boxShadow: '0px 0px 5px 0px #00000040'
        }}
      >
        <div className="w-52 relative" style={{ width: '145px', paddingTop: '9px', paddingBottom: '8px' }}>
          <div className="flex w-full justify-center relative px-2">
            <p className="uppercase" style={{ color: '#424242', fontSize: '8px' }}>
              MORE SETTINGS
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
            <div key={i.id}>
              {i.id == 'compact_view' && (
                <div className="flex w-full justify-center relative px-2">
                  <span className="absolute w-full z-0" style={{ top: '9px' }}>
                    <hr />
                  </span>
                  <p
                    className="px-2 z-10 uppercase"
                    style={{ fontSize: '8px', background: '#fff', color: '#B2B2B2', paddingTop: '4px' }}
                  >
                    HOT KEYS SETTINGS
                  </p>
                </div>
              )}
              <div
                className="flex items-center w-full text-xs text-gray-600 rounded cursor-pointer hover:bg-alsoit-gray-125 justify-between transition duration-500"
                style={{
                  margin: '3px 7px 0 14px',
                  padding: '4px 10px 5px 2px',
                  maxWidth: i.id === 'compact_view' ? '123px' : '120px'
                }}
                onClick={() => i.handleClick()}
              >
                <div
                  className="flex items-center pl-1"
                  style={{
                    paddingTop: i.id === 'compact_view' ? '0' : '0'
                  }}
                >
                  {i.icon && <p className="flex items-center w-5 h-5">{i.icon}</p>}
                  <p
                    className="font-medium alsoit-gray-300"
                    style={{
                      fontSize: '13px',
                      paddingLeft: '5px',
                      color: i.id == 'show_hide_pilot_feature' ? 'orange' : ''
                    }}
                  >
                    {i.label}
                  </p>
                </div>
                {i.id === 'compact_view' ? (
                  <span style={{ paddingTop: '5px' }}>
                    <ShowTabsLabelToggle />
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
