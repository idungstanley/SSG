import React from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { cl } from '../../../../../../utils';
import NewColumn from '../../Components/NewColumn';
import ToolTip from '../../../../../Tooltip/Tooltip';
import ClosePalette from '../../../../../../assets/icons/ClosePalette';
import SavePalette from '../../../../../../assets/icons/SavePalette';
import PermissionIcon from '../../../../../../assets/icons/PermissionIcon';
import InformationsolidIcon from '../../../../../../assets/icons/InformationsolidIcon';

export default function AddProperty() {
  return (
    <div className="text-gray-500 bg-gray-100 rounded-md">
      <div className="flex h-8">
        <div className="flex items-center uppercase">
          <div
            className="flex items-center justify-between gap-1 p-2 uppercase rounded-tl-lg rounded-br-lg bg-alsoit-gray-75 grow"
            style={{ width: '135px' }}
          >
            <span className="w-4 h-4">
              <IoIosAddCircleOutline className={cl('text-base text-white cursor-pointer')} />
            </span>
            <p className="justify-center text-xs bg-['#b2b2b2'] text-white truncate">ADD PROPERTY</p>
          </div>
        </div>
      </div>
      <div className="p-2 pl-4">
        <NewColumn />
        <p className="flex items-center p-1 my-1 rounded text-alsoit-gray-300">Host in template center</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 p-1 rounded bg-alsoit-gray-50 w-fit">
            <PermissionIcon />
            <div className="text-black">Permissions</div>
            <InformationsolidIcon />
          </div>
          <div className="flex items-center justify-end gap-2 p-1">
            <ToolTip title="Cancel">
              <span onClick={() => ({})} className="cursor-pointer text-[#FF3738] hover:text-white">
                <ClosePalette fill="white" />
              </span>
            </ToolTip>
            <ToolTip title="Add Property">
              <span className="cursor-pointer" onClick={() => ({})}>
                <SavePalette />
              </span>
            </ToolTip>
          </div>
        </div>
      </div>
    </div>
  );
}
