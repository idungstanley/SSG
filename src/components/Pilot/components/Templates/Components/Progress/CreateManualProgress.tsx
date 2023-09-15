import React, { useState } from 'react';
import SaveCols from '../SaveCols';
import { useAppSelector } from '../../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../../features/list/listService';

function CreateManualProgress() {
  const [startValue, setStartValue] = useState<string>('');
  const [endValue, setEndValue] = useState<string>('');
  const [value, setValue] = useState('20');

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
      <div className="w-full flex gap-2">
        <div className="w-full 2/4">
          <label>Start value</label>
          <input
            type="number"
            className="h-10 rounded text-alsoit-text-lg w-full border-0 ring-0 outline-0 focus:border-0 focus:ring-0 focus:outline-0"
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
            className="h-10 rounded text-alsoit-text-lg w-full border-0 ring-0 outline-0 focus:border-0 focus:ring-0 focus:outline-0"
            placeholder="Enter end value"
            max={100}
            value={endValue}
            maxLength={3}
            onChange={(e) => setEndValue(e.target.value)}
          />
        </div>
      </div>
      <div>
        <SaveCols
          handleSubmit={handleSubmit}
          header="Progress"
          body="This custom property which allows to track progress of tasks"
        />
      </div>
    </div>
  );
}

export default CreateManualProgress;
