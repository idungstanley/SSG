import React, { useState } from 'react';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import ArrowDown from '../../../../../../assets/icons/ArrowDown';
import { useAppSelector } from '../../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../../features/list/listService';
import PermissionIcon from '../../../../../../assets/icons/PermissionIcon';
import InformationsolidIcon from '../../../../../../assets/icons/InformationsolidIcon';
import ToolTip from '../../../../../Tooltip/Tooltip';
import ClosePalette from '../../../../../../assets/icons/ClosePalette';
import SavePalette from '../../../../../../assets/icons/SavePalette';

const completType = [
  {
    id: 1,
    title: 'Display 100% when task is in a done status'
  },
  {
    id: 2,
    title: 'Display 100% Completed'
  },
  {
    id: 3,
    title: 'Display 0% Completed'
  }
];

function CreateAutoProgress() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [CompleteAnchor, setCompleteAnchor] = useState<null | HTMLElement>(null);
  const [selectedType, setSelectedType] = useState(completType[1]);
  const [trackingObj, setTrackingObj] = useState<{ [key: string]: boolean }>({
    Subtasks: true,
    Checklists: true
  });

  const { newCustomPropertyDetails, entityForCustom } = useAppSelector((state) => state.task);

  const { mutate: onCreate } = useCreateDropdownField();

  const selectedOpts = Object.keys(trackingObj)
    .filter((key) => trackingObj[key])
    .join(',');

  const handleSubmit = () => {
    if (newCustomPropertyDetails.name && entityForCustom) {
      const name = newCustomPropertyDetails.name;
      const color = newCustomPropertyDetails.color;
      const is_bold = newCustomPropertyDetails.style?.is_bold;
      const is_italic = newCustomPropertyDetails.style?.is_italic;
      const is_underlined = newCustomPropertyDetails.style?.is_underlined;
      const style = {
        is_bold: is_bold as string,
        is_italic: is_italic as string,
        is_underlined: is_underlined as string
      };
      const customType = 'progress_auto';
      onCreate({
        name,
        style,
        color,
        id: entityForCustom.id,
        type: entityForCustom.type,
        options: undefined,
        customType,
        properties: {
          tracking: {
            Subtasks: trackingObj.Subtasks,
            Checklists: trackingObj.Checklists
          },
          complete_on: selectedType.id
        }
      });
    }
  };

  return (
    <div className="w-full">
      <div className="w-full my-1">
        <label className="text-alsoit-text-lg text-alsoit-gray-300">TRACK COMPLETION OF</label>
        <button
          className="flex items-center justify-between w-full h-8 px-2 bg-white rounded"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <h3 className="font-semibold text-black text-alsoit-gray-300-md">{selectedOpts}</h3>
          <ArrowDown className="w-4 h-4" />
        </button>
        <AlsoitMenuDropdown anchorEl={anchorEl} handleClose={() => setAnchorEl(null)}>
          <div className="p-2 rounded">
            <div className="flex items-center w-full my-2">
              <input
                type="checkbox"
                className="mx-2"
                checked={trackingObj.Subtasks}
                onChange={() => setTrackingObj({ ...trackingObj, Subtasks: !trackingObj.Subtasks })}
              />
              <h1>Subtasks</h1>
            </div>
            <div className="flex items-center my-2">
              <input
                type="checkbox"
                className="mx-2"
                checked={trackingObj.Checklists}
                onChange={() => setTrackingObj({ ...trackingObj, Checklists: !trackingObj.Checklists })}
              />
              <h1>Checklists</h1>
            </div>
            <div className="flex items-center my-2">
              <input type="checkbox" className="mx-2" />
              <h1>Archived subtasks</h1>
            </div>
            <div className="flex items-center my-2">
              <input type="checkbox" className="mx-2" />
              <h1>Assigned comments</h1>
            </div>
          </div>
        </AlsoitMenuDropdown>
      </div>
      <div className="w-full my-4">
        <label className="text-alsoit-text-lg text-alsoit-gray-300">TASKS WITHOUT ACTION ITEMS</label>
        <button
          className="flex items-center justify-between w-full h-8 px-2 bg-white rounded"
          onClick={(e) => setCompleteAnchor(e.currentTarget)}
        >
          <h3 className="font-semibold text-black-md text-alsoit-text-lg">{selectedType.title}</h3>
          <ArrowDown className="w-4 h-4" />
        </button>
        <AlsoitMenuDropdown anchorEl={CompleteAnchor} handleClose={() => setCompleteAnchor(null)}>
          <div className="p-2">
            {completType.map((item) => {
              return (
                <h3
                  key={item.id}
                  className="flex items-center h-8 p-2 font-semibold text-black cursor-pointer text-alsoit-text-lg hover:bg-alsoit-gray-50"
                  onClick={() => {
                    setSelectedType(item);
                    setCompleteAnchor(null);
                  }}
                >
                  {item.title}
                </h3>
              );
            })}
          </div>
        </AlsoitMenuDropdown>
      </div>
      <div>
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
              <span className="cursor-pointer" onClick={handleSubmit}>
                <SavePalette />
              </span>
            </ToolTip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAutoProgress;
