import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../../features/list/listService';
import SaveCols from '../SaveCols';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import ColorPalette from '../../../../../ColorPalette/component/ColorPalette';
import { ListColourProps } from '../../../../../tasks/ListItem';

function CreateDropdownField() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [itemId, setItemId] = useState<number>();
  const [formInputs, setFormInputs] = useState<{ id: number; value?: string; color: null | string }[]>([
    { id: 1, value: '', color: null }
  ]);

  const { newCustomPropertyDetails, entityForCustom } = useAppSelector((state) => state.task);

  const { mutate: onCreate } = useCreateDropdownField(entityForCustom.type, entityForCustom.id);

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

  const handleColor = (color: string | ListColourProps) => {
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
      <div className="space-y-3">
        {formInputs.map((i, index) => (
          <div className="relative" key={i.id}>
            <label
              htmlFor={`input_${i.id}`}
              className="block text-alsoit-gray-100 font-medium text-alsoit-text-xi uppercase mb-1"
            >{`OPTION ${index + 1}`}</label>
            <div className="flex items-center j rounded-md bg-white">
              {i.color && (
                <span
                  className="w-2"
                  style={{ backgroundColor: i.color, height: '30px', borderRadius: '6px 0 0 6px' }}
                ></span>
              )}
              <input
                min={1}
                required
                type="text"
                placeholder="Please input property option"
                name={`input_${index + 1}`}
                value={i.value}
                onChange={(event) => handleInputChange(event, i.id)}
                className="block border-0 py-1 shadow-sm ring-0 ring-inset placeholder-gray-300 focus:ring-0 focus:ring-inset focus:ring-indigo-600 text-alsoit-gray-300 text-alsoit-text-xi sm:text-sm sm:leading-6 w-2/3"
              />
              <div className="flex items-center gap-1">
                <button
                  className="text-alsoit-text-xi text-alsoit-gray-300 font-semibold hover:text-alsoit-purple-300 cursor-pointer"
                  onClick={(e) => handleClick(e, i.id)}
                >
                  Change Option Color
                </button>
                <button onClick={() => handleRemoveOption(i.id)}>
                  <TrashIcon className="w-4 h-4 text-gray-300 cursor-pointer hover:text-primary-300 transition" />
                </button>
              </div>
            </div>
            <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
              <ColorPalette handleClick={handleColor} />
            </AlsoitMenuDropdown>
          </div>
        ))}
      </div>
      {/* add new option */}
      <button
        onClick={handleAddOption}
        className="text-white flex items-center gap-2 my-2 bg-alsoit-purple-300 p-1 rounded"
      >
        <PlusCircleIcon className="w-5 h-5 text-white" />
        <span>Add new option</span>
      </button>
      <SaveCols
        handleSubmit={handleSubmit}
        header="Dropdown"
        body="This custom property which allows creation of different dropdown title as and each fields"
      />
    </>
  );
}

export default CreateDropdownField;