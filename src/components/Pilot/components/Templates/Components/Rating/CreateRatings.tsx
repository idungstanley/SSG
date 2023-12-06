import React, { useState, ChangeEvent } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { useAppSelector } from '../../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../../features/list/listService';
import PermissionIcon from '../../../../../../assets/icons/PermissionIcon';
import InformationsolidIcon from '../../../../../../assets/icons/InformationsolidIcon';
import ToolTip from '../../../../../Tooltip/Tooltip';
import ClosePalette from '../../../../../../assets/icons/ClosePalette';
import SavePalette from '../../../../../../assets/icons/SavePalette';

function CreateRatings() {
  const [value, setValue] = useState<number>(1);
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>(undefined);

  const { newCustomPropertyDetails, entityForCustom } = useAppSelector((state) => state.task);

  const { mutate: onCreate } = useCreateDropdownField();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue: number = parseFloat(e.target.value);
    setValue(newValue);
  };

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
      const customType = newCustomPropertyDetails.type.toLowerCase();
      if (value && selectedEmoji && name) {
        onCreate({
          name,
          style,
          color,
          id: entityForCustom.id,
          type: entityForCustom.type,
          options: undefined,
          customType,
          properties: {
            number: value,
            emoji: selectedEmoji
          }
        });
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <div className="block w-2/4">
          <label>Emoji Type</label>
          <div
            className="flex items-center w-full h-8 p-2 bg-white border rounded cursor-pointer"
            onClick={() => setIsPickerVisible(!isPickerVisible)}
          >
            {selectedEmoji ? selectedEmoji : 'Select Emoji'}
          </div>
        </div>
        <div className="w-2/4">
          <label
            htmlFor="steps-range"
            className="block mb-2 text-sm font-alsoit-text-lg text-alsoit-gray-300 dark:text-white"
          >
            Number
          </label>
          <input
            type="range"
            className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
            onChange={handleChange}
            min="1"
            max="5"
            step="1"
            id="customRange3"
            value={value}
          />
          <div className="flex justify-between w-full">
            <h3>1</h3>
            <h3>2</h3>
            <h3>3</h3>
            <h3>4</h3>
            <h3>5</h3>
          </div>
        </div>
      </div>
      <div className={isPickerVisible ? 'block absolute' : 'hidden'}>
        <Picker
          data={data}
          previewPosition="none"
          onEmojiSelect={(e: { native: React.SetStateAction<string | undefined> }) => {
            setSelectedEmoji(e.native);
          }}
        />
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

export default CreateRatings;
