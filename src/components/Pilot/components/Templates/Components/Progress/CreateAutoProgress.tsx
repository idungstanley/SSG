import React, { useState } from 'react';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import ArrowDown from '../../../../../../assets/icons/ArrowDown';
import SaveCols from '../SaveCols';
import { useAppSelector } from '../../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../../features/list/listService';

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
          className="w-full h-8 bg-white rounded px-2 flex justify-between items-center"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <h3 className="text-black text-alsoit-gray-300-md font-semibold">{selectedOpts}</h3>
          <ArrowDown className="w-4 h-4" />
        </button>
        <AlsoitMenuDropdown anchorEl={anchorEl} handleClose={() => setAnchorEl(null)}>
          <div className="rounded p-2">
            <div className="w-full flex items-center my-2">
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
          className="w-full h-8 bg-white rounded px-2 flex justify-between items-center"
          onClick={(e) => setCompleteAnchor(e.currentTarget)}
        >
          <h3 className="text-black-md font-semibold text-alsoit-text-lg">{selectedType.title}</h3>
          <ArrowDown className="w-4 h-4" />
        </button>
        <AlsoitMenuDropdown anchorEl={CompleteAnchor} handleClose={() => setCompleteAnchor(null)}>
          <div className="p-2">
            {completType.map((item) => {
              return (
                <h3
                  key={item.id}
                  className="h-8 p-2 text-alsoit-text-lg text-black font-semibold cursor-pointer hover:bg-alsoit-gray-50 flex items-center"
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
        <SaveCols
          handleSubmit={handleSubmit}
          header="Progress"
          body="This custom property which allows to track progress of tasks"
        />
      </div>
    </div>
  );
}

export default CreateAutoProgress;
