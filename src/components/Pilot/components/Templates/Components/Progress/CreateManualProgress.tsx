import React, { useState } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../../features/list/listService';
import PermissionIcon from '../../../../../../assets/icons/PermissionIcon';
import InformationsolidIcon from '../../../../../../assets/icons/InformationsolidIcon';
import ClosePalette from '../../../../../../assets/icons/ClosePalette';
import ToolTip from '../../../../../Tooltip/Tooltip';
import SavePalette from '../../../../../../assets/icons/SavePalette';

function CreateManualProgress() {
  const [startValue, setStartValue] = useState<string>('');
  const [endValue, setEndValue] = useState<string>('');

  const { newCustomPropertyDetails, entityForCustom } = useAppSelector((state) => state.task);

  const { mutate: onCreate } = useCreateDropdownField();
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
      const customType = 'progress_manual';
      if (name) {
        onCreate({
          name,
          style,
          color,
          id: entityForCustom.id,
          type: entityForCustom.type,
          options: undefined,
          customType,
          properties: {
            start_value: parseInt(startValue),
            end_value: parseInt(endValue)
          }
        });
      }
    }
  };
  return (
    <div className="w-full">
      <div className="flex w-full gap-2">
        <div className="w-full 2/4">
          <label>Start value</label>
          <input
            type="number"
            className="w-full h-10 border-0 rounded text-alsoit-text-lg ring-0 outline-0 focus:border-0 focus:ring-0 focus:outline-0"
            placeholder="Enter start value"
            value={startValue}
            min={1}
            maxLength={2}
            onChange={(e) => setStartValue(e.target.value)}
          />
        </div>
        <div className="w-full 2/4">
          <label>End value</label>
          <input
            type="number"
            className="w-full h-10 border-0 rounded text-alsoit-text-lg ring-0 outline-0 focus:border-0 focus:ring-0 focus:outline-0"
            placeholder="Enter end value"
            max={100}
            value={endValue}
            maxLength={3}
            onChange={(e) => setEndValue(e.target.value)}
          />
        </div>
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

export default CreateManualProgress;
