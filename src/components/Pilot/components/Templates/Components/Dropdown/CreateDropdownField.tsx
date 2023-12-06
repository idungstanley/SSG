import { TrashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../../features/list/listService';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import ColorPalette from '../../../../../ColorPalette/component/ColorPalette';
import { ListColourProps } from '../../../../../tasks/ListItem';
import Picker from '../../../../../../assets/icons/Picker';
import PlusIcon from '../../../../../../assets/icons/PlusIcon';
import PermissionIcon from '../../../../../../assets/icons/PermissionIcon';
import InformationsolidIcon from '../../../../../../assets/icons/InformationsolidIcon';
import ToolTip from '../../../../../Tooltip/Tooltip';
import ClosePalette from '../../../../../../assets/icons/ClosePalette';
import SavePalette from '../../../../../../assets/icons/SavePalette';

function CreateDropdownField() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [itemId, setItemId] = useState<number>();
  const [formInputs, setFormInputs] = useState<{ id: number; value?: string; color: null | string }[]>([
    { id: 1, value: '', color: null }
  ]);

  const { newCustomPropertyDetails, entityForCustom } = useAppSelector((state) => state.task);

  const { mutate: onCreate } = useCreateDropdownField();

  const handleRemoveOption = (id: number) => setFormInputs((prev) => prev.filter((i) => i.id !== id));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = e.target;

    setFormInputs((prevInputs) => {
      const newInputs = [...prevInputs];

      return newInputs.map((i) => {
        if (i.id === id) {
          i.value = value;
        }
        return i;
      });
    });
  };

  const handleAddOption = () =>
    setFormInputs((prevInputs) => [...prevInputs, { id: (prevInputs.at(-1)?.id || 1) + 1, value: '', color: null }]);

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

      const customType =
        newCustomPropertyDetails.type === 'Single Label'
          ? 'dropdown'
          : newCustomPropertyDetails.type === 'Multi Label'
          ? 'labels'
          : newCustomPropertyDetails.type;
      const options = formInputs.map((i) => {
        return { name: (i.value as string).trim(), color: i.color };
      });
      onCreate({
        name,
        color,
        style,
        options,
        id: entityForCustom.id,
        type: entityForCustom.type,
        customType
      });

      setFormInputs([{ id: 1, value: '', color: null }]);
    }
  };

  const handleColor = (color: string | ListColourProps | null) => {
    setFormInputs((prevInputs) => {
      const newInputs = [...prevInputs];

      return newInputs.map((i) => {
        if (i.id === itemId) {
          i.color = color as string;
        }
        return i;
      });
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setItemId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div>
        <label className="block mb-1 font-medium uppercase text-alsoit-gray-100 text-alsoit-text-xi">
          LABEL OPTION
        </label>
        <div className="space-y-2">
          {formInputs.map((i, index) => (
            <div className="relative group" key={i.id}>
              <div className="flex items-center h-8 bg-white rounded">
                {i.color && (
                  <span
                    className="absolute top-0 bottom-0"
                    style={{ backgroundColor: i.color, borderRadius: '6px 0 0 6px', width: '5px' }}
                  ></span>
                )}
                <input
                  min={1}
                  required
                  type="text"
                  placeholder="Please input text option"
                  name={`input_${index + 1}`}
                  value={i.value}
                  onChange={(event) => handleInputChange(event, i.id)}
                  className="block w-2/3 py-1 placeholder-gray-300 border-0 rounded ring-0 grow ring-inset focus:ring-0 focus:ring-inset focus:ring-indigo-600 text-alsoit-gray-300 text-alsoit-text-xi sm:text-sm sm:leading-6"
                />
                <div className="flex items-center gap-1 mr-2 opacity-0 group-hover:opacity-100">
                  <button className="flex items-center cursor-pointer" onClick={(e) => handleClick(e, i.id)}>
                    <Picker />
                  </button>
                  <button onClick={() => handleRemoveOption(i.id)}>
                    <TrashIcon className="w-4 h-4 text-gray-300 transition cursor-pointer hover:text-primary-300" />
                  </button>
                </div>
              </div>
              <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
                <ColorPalette handleClick={handleColor} activeColor={i.color ? i.color : undefined} />
              </AlsoitMenuDropdown>
            </div>
          ))}
        </div>
      </div>
      {/* add new option */}
      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={handleAddOption}
          className="flex items-center gap-2 p-1 my-2 rounded bg-alsoit-gray-50 text-alsoit-gray-300"
        >
          <PlusIcon className="w-3 h-3" />
          <span>Add option</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-4 h-4 border-2 border-white rounded-sm bg-alsoit-gray-500">
            <span className="w-3 h-3 rounded-sm bg-alsoit-purple-300"></span>
          </span>
          <p>Auto Generate Colours</p>
        </div>
      </div>
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
    </>
  );
}

export default CreateDropdownField;
