import React, { useState } from 'react';
import { FireIcon, ChevronDoubleRightIcon, EyeIcon } from '@heroicons/react/24/outline';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import ThreeDotIcon from '../../../../../../assets/icons/ThreeDotIcon';
import Close from '../../../../../../assets/icons/Close';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setShowTabLabel } from '../../../../../../features/workspace/workspaceSlice';
import ShowTabsLabelToggle from '../../../Tabs/components/ShowTabsLabelToggle';

const pilotFromLS = JSON.parse(localStorage.getItem('pilot') || '""') as { tabOrder: number[]; showTabLabel: boolean };

interface HotKeysProps {
  setShowModal: (i: boolean) => void;
}

export default function Menu({ setShowModal }: HotKeysProps) {
  const dispatch = useAppDispatch();
  const [showPilotToolbarMenu, setShowPilotToolbarMenu] = useState<null | HTMLDivElement>(null);
  const { showTabLabel } = useAppSelector((state) => state.workspace);

  const handleOpenSettingsMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowPilotToolbarMenu(event.currentTarget);
  };

  const toggleShowTabLabel = () => {
    localStorage.setItem(
      'pilot',
      JSON.stringify({
        ...pilotFromLS,
        showTabLabel: !showTabLabel
      })
    );
    dispatch(setShowTabLabel(!showTabLabel));
    console.log(showTabLabel);
  };

  const handleClosePilotToolbarMenu = () => {
    setShowPilotToolbarMenu(null);
  };

  const dropdownConfig = [
    {
      id: 'add_remove_hot_key',
      icon: <FireIcon className="w-4 h-4 " />,
      label: 'Add / remove Hot Keys',
      handleClick: () => setShowModal(true)
    },
    {
      id: 'show_hide_pilot_feature',
      icon: <EyeIcon className="w-4 h-4 " />,
      label: 'Show or Hide Pilot Feature',
      handleClick: () => ({})
    },
    {
      id: 'compact_view',
      icon: <ChevronDoubleRightIcon className="w-4 h-4 " />,
      label: 'Compact View',
      handleClick: () => toggleShowTabLabel()
    }
  ];

  return (
    <>
      <div
        className="flex justify-center items-center hover:bg-alsoit-gray-125 transition duration-500 cursor-pointer"
        style={{
          borderRadius: '3px',
          width: '20px',
          height: '20px'
        }}
        onClick={(e) => {
          handleOpenSettingsMenu(e);
        }}
      >
        <ThreeDotIcon />
      </div>

      <AlsoitMenuDropdown anchorEl={showPilotToolbarMenu} handleClose={handleClosePilotToolbarMenu}>
        <div className="py-2 w-52 relative">
          <span
            className="absolute right-0 hover:rotate-90 transition duration-500 cursor-pointer z-10"
            style={{ top: '5px', right: '5px' }}
            onClick={() => handleClosePilotToolbarMenu()}
          >
            <Close active={false} width="15" height="15" />
          </span>
          <div className="flex w-full justify-center relative px-2">
            <p className="uppercase" style={{ color: '#424242', fontSize: '8px' }}>
              Toolbar settings
            </p>
          </div>
          <div className="flex w-full justify-center relative px-2">
            <span className="absolute w-full z-0" style={{ top: '8px' }}>
              <hr />
            </span>
            <p
              className="px-2 z-10 uppercase"
              style={{ fontSize: '8px', background: '#fff', color: '#B2B2B2', paddingTop: '2px' }}
            >
              Choose setting
            </p>
          </div>
          {dropdownConfig?.map((i) => (
            <div key={i.id} className="px-2">
              <div
                className="flex items-center w-full text-xs text-gray-600 rounded cursor-pointer px-0.5 hover:bg-alsoit-gray-125 justify-between transition duration-500"
                style={{
                  padding: '6px 3px'
                }}
                onClick={() => i.handleClick()}
              >
                <div className="flex items-center pl-1">
                  <p className="flex items-center w-5 h-5">{i.icon}</p>
                  <p
                    className="font-medium"
                    style={{ fontSize: '12px', color: i.id == 'show_hide_pilot_feature' ? 'orange' : '' }}
                  >
                    {i.label}
                  </p>
                </div>
                <span>{i.id === 'compact_view' ? <ShowTabsLabelToggle /> : null}</span>
              </div>
            </div>
          ))}
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
