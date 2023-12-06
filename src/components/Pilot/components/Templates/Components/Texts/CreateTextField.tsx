import React from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../../features/list/listService';
import InformationsolidIcon from '../../../../../../assets/icons/InformationsolidIcon';
import ToolTip from '../../../../../Tooltip/Tooltip';
import PermissionIcon from '../../../../../../assets/icons/PermissionIcon';
import ClosePalette from '../../../../../../assets/icons/ClosePalette';
import SavePalette from '../../../../../../assets/icons/SavePalette';

function CreateTextField() {
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
      const customType = newCustomPropertyDetails.type === 'Short Text' ? 'text' : newCustomPropertyDetails.type;
      onCreate({
        name,
        style,
        color,
        id: entityForCustom.id,
        type: entityForCustom.type,
        options: undefined,
        customType
      });
    }
  };

  return (
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
  );
}

export default CreateTextField;
